(function () {
  "use strict";

  var QUESTION_COUNT = 3;

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  }

  function getParams() {
    var p = new URLSearchParams(location.search);
    return { id: p.get("id") || "", lang: p.get("lang") || "" };
  }

  function resolveStore(id, ui) {
    var cfg = window.REVIEW_ASSIST_CONFIG || { stores: {} };
    var s = (cfg.stores && cfg.stores[id]) || null;
    var fallback = (ui && ui.storeFallback) || "本店";
    return {
      id: id,
      name: (s && s.name) || (id ? id : fallback),
      reviewUrl: (s && s.reviewUrl) || ""
    };
  }

  function hasApiKey() {
    var cfg = window.REVIEW_ASSIST_CONFIG || {};
    if (cfg.geminiProxyUrl && String(cfg.geminiProxyUrl).trim()) return true;
    if (cfg.geminiApiKey && String(cfg.geminiApiKey).trim()) return true;
    return !!(
      window.ReviewAssistGenerate &&
      window.ReviewAssistGenerate.hasKey &&
      window.ReviewAssistGenerate.hasKey()
    );
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function pickQuestionIds(pool, n, avoidIds) {
    var ids = pool.map(function (q) {
      return q.id;
    });
    var avoid = avoidIds || [];
    var preferred = shuffle(
      ids.filter(function (id) {
        return avoid.indexOf(id) < 0;
      })
    );
    var rest = shuffle(
      ids.filter(function (id) {
        return preferred.indexOf(id) < 0;
      })
    );
    return preferred.concat(rest).slice(0, Math.min(n, ids.length));
  }

  function formatApiError(err, ui) {
    var msg = String(err || "");
    if (/invalid authentication|API key not valid|API_KEY_INVALID|PERMISSION_DENIED/i.test(msg)) {
      return ui.statusApiInvalidKey;
    }
    return I18n.format(ui.statusApiFail, { error: msg });
  }

  function init(pageType) {
    var I18n = window.ReviewAssistI18n;
    if (!I18n) return;

    var lang = I18n.setLang(I18n.getLang());
    var ui = I18n.ui(lang);
    var data = I18n.getPage(pageType, lang);
    if (!data) return;

    var store = resolveStore(getParams().id, ui);
    var answers = {};
    var activeIds = pickQuestionIds(data.questions, QUESTION_COUNT, []);
    var reviewLength = "long";
    var generating = false;
    var lastText = "";

    var elStore = qs("#storeName");
    var elType = qs("#typeLabel");
    var elSub = qs("#pageSub");
    var elForm = qs("#questionForm");
    var elNote = qs("#freeNote");
    var elPreview = qs("#previewText");
    var elPreviewWrap = qs("#previewPanel");
    var elHint = qs("#previewHint");
    var elStatus = qs("#genStatus");
    var btnRegenNote = qs("#btnRegenNote");
    var btnRegen = qs("#btnRegen");
    var btnCopy = qs("#btnCopy");
    var btnOpen = qs("#btnOpen");
    var lengthSwitch = qs("#lengthSwitch");
    var langSwitch = qs("#langSwitch");

    function getUi() {
      return I18n.ui(lang);
    }

    function getData() {
      return I18n.getPage(pageType, lang);
    }

    function activeQuestions() {
      data = getData();
      var byId = {};
      data.questions.forEach(function (q) {
        byId[q.id] = q;
      });
      return activeIds
        .map(function (id) {
          return byId[id];
        })
        .filter(Boolean);
    }

    function slimAnswers() {
      var out = {};
      activeIds.forEach(function (id) {
        if (answers[id]) out[id] = answers[id];
      });
      return out;
    }

    function applyChrome() {
      ui = getUi();
      data = getData();
      document.documentElement.lang = I18n.htmlLang(lang);

      var cfg = window.REVIEW_ASSIST_CONFIG || { stores: {} };
      var configured = cfg.stores && cfg.stores[store.id];
      if (!configured || !configured.name) {
        store.name = store.id ? store.id : ui.storeFallback;
      }

      document.title = store.name + " · " + ui.pageTitleSuffix;

      if (elStore) elStore.textContent = store.name;
      if (elType) elType.textContent = data.typeLabel;
      if (elSub) elSub.textContent = pageType === "bar" ? ui.subBar : ui.subMassage;

      var hQuick = qs("#hQuick");
      var hImpression = qs("#hImpression");
      var hLength = qs("#hLength");
      var hPreview = qs("#hPreview");
      var noteHint = qs("#noteHint");
      var lengthHint = qs("#lengthHint");
      var previewEditHint = qs("#previewEditHint");
      var foot = qs("#footNote");

      if (hQuick) hQuick.textContent = ui.quickSelect;
      if (hImpression) hImpression.textContent = ui.impression;
      if (hLength) hLength.textContent = ui.lengthLabel;
      if (hPreview) hPreview.textContent = ui.preview;
      if (elHint) elHint.textContent = ui.previewHint;
      if (noteHint) noteHint.textContent = ui.noteHint;
      if (lengthHint) lengthHint.textContent = ui.lengthHint;
      if (previewEditHint) previewEditHint.textContent = ui.previewEditHint;
      if (foot) foot.textContent = ui.foot;

      if (lengthSwitch) {
        lengthSwitch.setAttribute("aria-label", ui.lengthLabel);
        qsa("[data-length]", lengthSwitch).forEach(function (btn) {
          var len = btn.getAttribute("data-length");
          btn.classList.toggle("is-active", len === reviewLength);
          btn.setAttribute("aria-pressed", len === reviewLength ? "true" : "false");
          if (len === "short") btn.textContent = ui.lengthShort;
          else if (len === "long") btn.textContent = ui.lengthLong;
          else btn.textContent = ui.lengthMedium;
        });
      }

      if (elNote) {
        elNote.placeholder =
          pageType === "bar" ? ui.notePlaceholderBar : ui.notePlaceholderMassage;
      }
      if (elPreview) elPreview.setAttribute("aria-label", ui.previewAria);
      if (btnRegenNote) btnRegenNote.textContent = ui.btnRegenNote;
      if (btnRegen) btnRegen.textContent = ui.btnRegen;
      if (btnCopy) btnCopy.textContent = ui.btnCopy;
      if (btnOpen) btnOpen.textContent = ui.btnOpen;

      if (langSwitch) {
        langSwitch.setAttribute("aria-label", ui.langLabel);
        qsa("[data-lang]", langSwitch).forEach(function (btn) {
          btn.classList.toggle("is-active", btn.getAttribute("data-lang") === lang);
          btn.setAttribute(
            "aria-pressed",
            btn.getAttribute("data-lang") === lang ? "true" : "false"
          );
        });
      }

      syncOpenBtn();
    }

    function renderQuestions() {
      var list = activeQuestions();
      elForm.innerHTML = list
        .map(function (q, qi) {
          var opts = q.options
            .map(function (o) {
              var checked = answers[q.id] === o.id ? " checked" : "";
              return (
                '<label class="opt">' +
                '<input type="radio" name="' +
                q.id +
                '" value="' +
                o.id +
                '"' +
                checked +
                ">" +
                "<span>" +
                o.label +
                "</span></label>"
              );
            })
            .join("");
          return (
            '<fieldset class="q-block" data-qid="' +
            q.id +
            '">' +
            "<legend>" +
            (qi + 1) +
            ". " +
            q.title +
            "</legend>" +
            '<div class="opt-grid">' +
            opts +
            "</div></fieldset>"
          );
        })
        .join("");
    }

    function allAnswered() {
      return activeIds.every(function (id) {
        return !!answers[id];
      });
    }

    function optionLabels() {
      return activeQuestions()
        .map(function (q) {
          var oid = answers[q.id];
          if (!oid) return null;
          var opt = q.options.filter(function (o) {
            return o.id === oid;
          })[0];
          return q.title + " → " + (opt ? opt.label : oid);
        })
        .filter(Boolean);
    }

    function setStatus(msg, isErr) {
      if (!elStatus) return;
      elStatus.textContent = msg || "";
      elStatus.classList.toggle("is-error", !!isErr);
    }

    function showPreviewPanel(show) {
      if (elPreviewWrap) elPreviewWrap.hidden = !show;
      if (elHint) elHint.hidden = show;
    }

    function setBusy(busy) {
      generating = busy;
      if (btnRegen) btnRegen.disabled = busy || !allAnswered();
      if (btnRegenNote) btnRegenNote.disabled = busy || !allAnswered();
    }

    function runGenerate(reason) {
      if (!allAnswered()) {
        showPreviewPanel(false);
        return;
      }
      if (generating) return;
      setBusy(true);

      ui = getUi();
      var forceNew =
        reason === "regen" ||
        reason === "note" ||
        reason === "lang" ||
        reason === "length";
      setStatus(forceNew ? ui.statusRegen : ui.statusGenerating);

      var note = elNote ? elNote.value : "";
      var labels = optionLabels();
      var avoid = forceNew ? lastText || (elPreview && elPreview.value) || "" : "";
      var ans = slimAnswers();

      var localText = window.ReviewAssistGenerate.local(
        pageType,
        ans,
        note,
        store.name,
        avoid,
        lang,
        reviewLength
      );

      var apply = function (finalText, statusMsg, isErr) {
        if (avoid && finalText === avoid) {
          finalText = window.ReviewAssistGenerate.local(
            pageType,
            ans,
            note,
            store.name,
            avoid,
            lang,
            reviewLength
          );
        }
        elPreview.value = finalText;
        lastText = finalText;
        showPreviewPanel(true);
        setBusy(false);
        syncOpenBtn();
        setStatus(statusMsg || "", !!isErr);
      };

      window.ReviewAssistGenerate.remote(
        pageType,
        ans,
        note,
        store.name,
        labels,
        avoid,
        lang,
        reviewLength
      ).then(function (res) {
        ui = getUi();
        if (res && res.ok && res.text) {
          apply(
            res.text,
            I18n.format(ui.statusGemini, { model: res.model || "online" })
          );
          return;
        }
        var reason = (res && res.reason) || "";
        var err = (res && res.error) || "request failed";
        if (reason === "no_key" || !hasApiKey()) {
          apply(localText, ui.statusNoKey);
          return;
        }
        apply(
          localText,
          formatApiError(err, ui),
          true
        );
      }).catch(function (err) {
        ui = getUi();
        apply(
          localText,
          formatApiError(err && err.message ? err.message : err, ui),
          true
        );
      });
    }

    function syncOpenBtn() {
      if (!btnOpen) return;
      ui = getUi();
      var ok = !!store.reviewUrl;
      btnOpen.disabled = !ok;
      btnOpen.title = ok ? "" : ui.openTitlePending;
    }

    function switchLang(next) {
      if (!next || next === lang) return;
      lang = I18n.setLang(next);
      applyChrome();
      renderQuestions();
      lastText = "";
      if (elPreview) elPreview.value = "";
      setStatus("");
      if (allAnswered()) runGenerate("lang");
      else {
        showPreviewPanel(false);
        setBusy(false);
      }
    }

    if (langSwitch) {
      langSwitch.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-lang]");
        if (!btn) return;
        switchLang(btn.getAttribute("data-lang"));
      });
    }

    if (lengthSwitch) {
      lengthSwitch.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-length]");
        if (!btn) return;
        var next = btn.getAttribute("data-length");
        if (!next || next === reviewLength) return;
        reviewLength = next;
        applyChrome();
        if (allAnswered()) runGenerate("length");
      });
    }

    elForm.addEventListener("change", function (e) {
      var t = e.target;
      if (!t || t.type !== "radio") return;
      answers[t.name] = t.value;
      if (allAnswered()) runGenerate("options");
      else showPreviewPanel(false);
      setBusy(false);
    });

    if (elNote) {
      elNote.addEventListener("input", function () {
        if (btnRegenNote) {
          btnRegenNote.classList.toggle(
            "pulse",
            !!elNote.value.trim() && allAnswered()
          );
        }
      });
    }

    if (btnRegenNote) {
      btnRegenNote.addEventListener("click", function () {
        ui = getUi();
        if (!allAnswered()) {
          setStatus(ui.statusNeedAnswers, true);
          return;
        }
        runGenerate("note");
        btnRegenNote.classList.remove("pulse");
      });
    }

    if (btnRegen) {
      btnRegen.addEventListener("click", function () {
        ui = getUi();
        if (!allAnswered()) {
          setStatus(ui.statusNeedAnswers, true);
          return;
        }
        runGenerate("regen");
      });
    }

    if (btnCopy) {
      btnCopy.addEventListener("click", function () {
        ui = getUi();
        var text = (elPreview && elPreview.value) || "";
        if (!text.trim()) {
          setStatus(ui.statusEmptyCopy, true);
          return;
        }
        var done = function () {
          setStatus(ui.statusCopied);
          btnCopy.textContent = ui.btnCopied;
          setTimeout(function () {
            btnCopy.textContent = getUi().btnCopy;
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done).catch(function () {
            elPreview.select();
            document.execCommand("copy");
            done();
          });
        } else {
          elPreview.select();
          document.execCommand("copy");
          done();
        }
      });
    }

    if (btnOpen) {
      btnOpen.addEventListener("click", function () {
        ui = getUi();
        if (!store.reviewUrl) {
          setStatus(ui.statusNoUrl, true);
          return;
        }
        window.open(store.reviewUrl, "_blank", "noopener,noreferrer");
      });
    }

    applyChrome();
    renderQuestions();
    showPreviewPanel(false);
  }

  window.ReviewAssistApp = { init: init };
})();
