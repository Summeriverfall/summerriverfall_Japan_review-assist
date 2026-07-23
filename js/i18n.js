/**
 * 中 / EN / 日本語
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "review-assist-lang";
  var SUPPORTED = ["zh", "en", "ja"];

  var UI = {
    zh: {
      pageTitleSuffix: "评论辅助",
      storeFallback: "本店",
      subMassage:
        "简单答 3 个问题，帮你写成更自然的评价。可手改后复制去谷歌粘贴。",
      subBar:
        "简单答 3 个问题，帮你写成更自然的评价。可手改后复制去谷歌粘贴。",
      quickSelect: "快速选择",
      impression: "你的印象（可选）",
      lengthLabel: "评论长度",
      lengthShort: "短",
      lengthMedium: "中",
      lengthLong: "长",
      lengthHint: "短约几句，中等一段，长评更具体。改长度会重新生成。",
      notePlaceholderMassage: "例如：肩颈按完轻松不少，店在楼上好找…",
      notePlaceholderBar: "例如：第二杯特调意外好喝，座位靠窗…",
      noteHint: "自由输入会当作改写参考。改完后点下面按钮才会按印象重写。",
      btnRegenNote: "按印象重新生成",
      preview: "评论预览",
      previewHint: "请先答完上面 3 个问题，预览会出现在这里。",
      previewAria: "评论正文，可手动修改",
      previewEditHint: "可直接改字。不满意就点「换一版话术」，每次都会换说法。",
      btnRegen: "换一版话术",
      btnCopy: "复制评论",
      btnCopied: "已复制",
      btnOpen: "打开评论页",
      foot: "请使用门店二维码进入",
      statusGenerating: "生成预览…",
      statusRegen: "正在换一版话术…",
      statusGemini: "已用 Gemini 生成（{model}）· 可点「换一版话术」",
      statusNoKey: "尚未配置 API Key，当前为本地话术 · 配置后会更自然",
      statusApiFail: "Gemini 调用失败，已用本地话术。原因：{error}",
      statusApiInvalidKey:
        "线上直连 Gemini 会被拦截。请按 proxy/google-apps-script.js 部署代理，把 /exec 地址填入 config.js 的 geminiProxyUrl。",
      statusNeedAnswers: "请先答完这 3 个问题",
      statusEmptyCopy: "还没有可复制的内容",
      statusCopied: "已复制，可前往评论页粘贴",
      statusNoUrl: "评论页链接尚未配置",
      openTitlePending: "评论页链接待配置",
      langLabel: "语言"
    },
    en: {
      pageTitleSuffix: "Review Assist",
      storeFallback: "This store",
      subMassage:
        "Answer 3 quick questions and we’ll draft a natural review you can edit and paste on Google.",
      subBar:
        "Answer 3 quick questions and we’ll draft a natural review you can edit and paste on Google.",
      quickSelect: "Quick picks",
      impression: "Your notes (optional)",
      lengthLabel: "Review length",
      lengthShort: "Short",
      lengthMedium: "Medium",
      lengthLong: "Long",
      lengthHint: "Short is a few lines; medium one block; long is more detailed. Changing length regenerates.",
      notePlaceholderMassage:
        "e.g. Shoulders felt lighter; shop is upstairs and easy to find…",
      notePlaceholderBar: "e.g. Second cocktail was surprisingly good; window seats…",
      noteHint:
        "Free text is used as a rewrite hint. Tap the button below after editing to regenerate.",
      btnRegenNote: "Regenerate from notes",
      preview: "Review preview",
      previewHint: "Answer the 3 questions above to see a preview here.",
      previewAria: "Review text — editable",
      previewEditHint:
        "Edit freely. Tap “Another version” anytime for different wording.",
      btnRegen: "Another version",
      btnCopy: "Copy review",
      btnCopied: "Copied",
      btnOpen: "Open review page",
      foot: "Please enter via the store QR code",
      statusGenerating: "Generating preview…",
      statusRegen: "Writing another version…",
      statusGemini: "Generated with Gemini ({model}) · tap “Another version”",
      statusNoKey: "No API key yet — using local draft. Configure a key for better phrasing.",
      statusApiFail: "Gemini failed; using local draft. Reason: {error}",
      statusApiInvalidKey:
        "API key auth failed. Paste the full key from aistudio.google.com/apikey (AQ. or AIza) into geminiApiKey in config.js, then refresh.",
      statusNeedAnswers: "Please answer all 3 questions first",
      statusEmptyCopy: "Nothing to copy yet",
      statusCopied: "Copied — paste on the review page",
      statusNoUrl: "Review page URL not configured yet",
      openTitlePending: "Review URL pending",
      langLabel: "Language"
    },
    ja: {
      pageTitleSuffix: "口コミアシスト",
      storeFallback: "当店",
      subMassage:
        "3問に答えるだけで、自然な口コミ文を作成。手直ししてGoogleに貼れます。",
      subBar:
        "3問に答えるだけで、自然な口コミ文を作成。手直ししてGoogleに貼れます。",
      quickSelect: "かんたん選択",
      impression: "感想メモ（任意）",
      lengthLabel: "口コミの長さ",
      lengthShort: "短",
      lengthMedium: "中",
      lengthLong: "長",
      lengthHint: "短は数行、中は一段落、長は詳しく。長さを変えると再生成します。",
      notePlaceholderMassage: "例：肩がかなり楽になった、階上が分かりやすい…",
      notePlaceholderBar: "例：2杯目のカクテルが意外と美味しかった、窓際席…",
      noteHint:
        "自由記述は書き換えの参考になります。直したら下のボタンで再生成してください。",
      btnRegenNote: "メモから再生成",
      preview: "口コミプレビュー",
      previewHint: "上の3問に答えると、ここにプレビューが出ます。",
      previewAria: "口コミ本文（編集可）",
      previewEditHint:
        "そのまま編集できます。不満なら「別バージョン」で言い回しを変えられます。",
      btnRegen: "別バージョン",
      btnCopy: "口コミをコピー",
      btnCopied: "コピー済み",
      btnOpen: "口コミページを開く",
      foot: "店舗のQRコードからご入場ください",
      statusGenerating: "プレビュー生成中…",
      statusRegen: "別バージョン作成中…",
      statusGemini: "Geminiで生成（{model}）·「別バージョン」で再生成可",
      statusNoKey: "APIキー未設定のためローカル文です。設定すると自然になります。",
      statusApiFail: "Gemini失敗。ローカル文を使用。理由：{error}",
      statusApiInvalidKey:
        "APIキー認証に失敗しました。aistudio.google.com/apikey の完全なキー（AQ. または AIza）を config.js の geminiApiKey に貼り付けて更新してください。",
      statusNeedAnswers: "先に3問すべて答えてください",
      statusEmptyCopy: "コピーできる内容がありません",
      statusCopied: "コピーしました。口コミページに貼り付けてください",
      statusNoUrl: "口コミページのURLが未設定です",
      openTitlePending: "口コミURL未設定",
      langLabel: "言語"
    }
  };

  function q(title, options) {
    return { title: title, options: options };
  }

  var PAGES = {
    massage: {
      zh: {
        typeLabel: "按摩・放松",
        questions: [
          {
            id: "purpose",
            title: "你这次到这边，主要是？",
            options: [
              { id: "travel", label: "来日本旅游 / 观光" },
              { id: "business", label: "出差 / 办事" },
              { id: "live", label: "在附近生活 / 常驻" },
              { id: "passby", label: "路过顺路" }
            ]
          },
          {
            id: "companion",
            title: "和谁一起来的？",
            options: [
              { id: "solo", label: "自己一个人" },
              { id: "couple", label: "伴侣 / 情侣" },
              { id: "family", label: "家人（含亲子）" },
              { id: "friends", label: "朋友 / 同事" }
            ]
          },
          {
            id: "service",
            title: "这次主要做了什么？",
            options: [
              { id: "foot", label: "足疗 / 足底" },
              { id: "body", label: "身体按摩 / 整体" },
              { id: "oil", label: "精油类" },
              { id: "set", label: "足+身套餐 / 组合" }
            ]
          },
          {
            id: "feel",
            title: "整体感觉怎么样？",
            options: [
              { id: "relaxed", label: "很放松，舒服" },
              { id: "refreshed", label: "做完精神好些了" },
              { id: "soreness", label: "酸痛有缓解" },
              { id: "ok", label: "还不错" }
            ]
          },
          {
            id: "technique",
            title: "手法方面？",
            options: [
              { id: "gentle", label: "力度适中、细致" },
              { id: "strong", label: "力度偏强，按得到位" },
              { id: "professional", label: "手法专业、节奏稳" },
              { id: "patient", label: "会沟通、比较耐心" }
            ]
          },
          {
            id: "place",
            title: "环境和位置？",
            options: [
              { id: "quiet", label: "环境安静干净" },
              { id: "convenient", label: "位置好找、方便" },
              { id: "late", label: "营业到比较晚，方便" },
              { id: "normal", label: "环境正常、能接受" }
            ]
          },
          {
            id: "again",
            title: "以后还会来吗？",
            options: [
              { id: "yes", label: "会再来" },
              { id: "recommend", label: "会推荐朋友" },
              { id: "maybe", label: "有需要会再考虑" }
            ]
          }
        ]
      },
      en: {
        typeLabel: "Massage · Relaxation",
        questions: [
          {
            id: "purpose",
            title: "What brought you here?",
            options: [
              { id: "travel", label: "Traveling / sightseeing in Japan" },
              { id: "business", label: "Business / errands" },
              { id: "live", label: "Live nearby / stay here often" },
              { id: "passby", label: "Just passing by" }
            ]
          },
          {
            id: "companion",
            title: "Who did you come with?",
            options: [
              { id: "solo", label: "Just myself" },
              { id: "couple", label: "Partner / couple" },
              { id: "family", label: "Family (incl. kids)" },
              { id: "friends", label: "Friends / colleagues" }
            ]
          },
          {
            id: "service",
            title: "What did you mainly get?",
            options: [
              { id: "foot", label: "Foot massage / reflexology" },
              { id: "body", label: "Body massage" },
              { id: "oil", label: "Oil treatment" },
              { id: "set", label: "Foot + body combo" }
            ]
          },
          {
            id: "feel",
            title: "How did it feel overall?",
            options: [
              { id: "relaxed", label: "Very relaxing and comfortable" },
              { id: "refreshed", label: "Felt fresher afterward" },
              { id: "soreness", label: "Helped with sore spots" },
              { id: "ok", label: "Pretty good" }
            ]
          },
          {
            id: "technique",
            title: "About the technique?",
            options: [
              { id: "gentle", label: "Balanced pressure, careful" },
              { id: "strong", label: "Firm pressure, hit the right spots" },
              { id: "professional", label: "Skilled, steady rhythm" },
              { id: "patient", label: "Communicative and patient" }
            ]
          },
          {
            id: "place",
            title: "Space & location?",
            options: [
              { id: "quiet", label: "Quiet and clean" },
              { id: "convenient", label: "Easy to find / convenient" },
              { id: "late", label: "Open late — handy" },
              { id: "normal", label: "Fine / acceptable" }
            ]
          },
          {
            id: "again",
            title: "Would you come back?",
            options: [
              { id: "yes", label: "Yes, I’d return" },
              { id: "recommend", label: "I’d recommend to friends" },
              { id: "maybe", label: "Maybe if I need it again" }
            ]
          }
        ]
      },
      ja: {
        typeLabel: "マッサージ・リラクゼーション",
        questions: [
          {
            id: "purpose",
            title: "今回の来店目的は？",
            options: [
              { id: "travel", label: "日本旅行・観光" },
              { id: "business", label: "出張・用事" },
              { id: "live", label: "近くに住んでいる／よく来る" },
              { id: "passby", label: "通りすがり" }
            ]
          },
          {
            id: "companion",
            title: "誰と来ましたか？",
            options: [
              { id: "solo", label: "一人" },
              { id: "couple", label: "パートナー／カップル" },
              { id: "family", label: "家族（親子含む）" },
              { id: "friends", label: "友人／同僚" }
            ]
          },
          {
            id: "service",
            title: "主なメニューは？",
            options: [
              { id: "foot", label: "足つぼ／フット" },
              { id: "body", label: "ボディマッサージ" },
              { id: "oil", label: "オイル系" },
              { id: "set", label: "足＋ボディのセット" }
            ]
          },
          {
            id: "feel",
            title: "全体の感想は？",
            options: [
              { id: "relaxed", label: "とてもリラックスできた" },
              { id: "refreshed", label: "終わったあとスッキリ" },
              { id: "soreness", label: "コリが少し楽になった" },
              { id: "ok", label: "悪くない" }
            ]
          },
          {
            id: "technique",
            title: "施術について？",
            options: [
              { id: "gentle", label: "力加減がちょうどよい／丁寧" },
              { id: "strong", label: "しっかりめ、ポイントが効く" },
              { id: "professional", label: "手技が安定・プロ感" },
              { id: "patient", label: "コミュニケーションがあり、親切" }
            ]
          },
          {
            id: "place",
            title: "店内・アクセスは？",
            options: [
              { id: "quiet", label: "静かで清潔" },
              { id: "convenient", label: "分かりやすい／便利" },
              { id: "late", label: "遅くまで営業で助かる" },
              { id: "normal", label: "普通・問題なし" }
            ]
          },
          {
            id: "again",
            title: "また来ますか？",
            options: [
              { id: "yes", label: "また来たい" },
              { id: "recommend", label: "友人に勧めたい" },
              { id: "maybe", label: "必要ならまた検討" }
            ]
          }
        ]
      }
    },
    bar: {
      zh: {
        typeLabel: "酒吧・餐吧",
        questions: [
          {
            id: "purpose",
            title: "你这次到这边，主要是？",
            options: [
              { id: "travel", label: "来日本旅游 / 观光" },
              { id: "business", label: "出差 / 办事" },
              { id: "live", label: "在附近生活 / 常驻" },
              { id: "passby", label: "路过顺路" }
            ]
          },
          {
            id: "companion",
            title: "和谁一起来的？",
            options: [
              { id: "solo", label: "自己一个人" },
              { id: "couple", label: "伴侣 / 情侣" },
              { id: "family", label: "家人（含亲子）" },
              { id: "friends", label: "朋友 / 同事" }
            ]
          },
          {
            id: "vibe",
            title: "氛围怎么样？",
            options: [
              { id: "chill", label: "轻松好待" },
              { id: "lively", label: "有点热闹但不吵" },
              { id: "cozy", label: "空间舒服、适合久坐" },
              { id: "ok", label: "氛围还行" }
            ]
          },
          {
            id: "drink",
            title: "酒水 / 饮品？",
            options: [
              { id: "taste", label: "味道不错" },
              { id: "choice", label: "选择够用" },
              { id: "value", label: "性价比可以" },
              { id: "normal", label: "中规中矩" }
            ]
          },
          {
            id: "service",
            title: "服务？",
            options: [
              { id: "friendly", label: "态度友好" },
              { id: "fast", label: "上饮品比较快" },
              { id: "attentive", label: "会照顾到位" },
              { id: "ok", label: "服务正常" }
            ]
          },
          {
            id: "again",
            title: "以后还会来吗？",
            options: [
              { id: "yes", label: "会再来坐坐" },
              { id: "recommend", label: "会跟朋友提一下" },
              { id: "maybe", label: "路过可能会再进" }
            ]
          }
        ]
      },
      en: {
        typeLabel: "Bar · Lounge",
        questions: [
          {
            id: "purpose",
            title: "What brought you here?",
            options: [
              { id: "travel", label: "Traveling / sightseeing in Japan" },
              { id: "business", label: "Business / errands" },
              { id: "live", label: "Live nearby / stay here often" },
              { id: "passby", label: "Just passing by" }
            ]
          },
          {
            id: "companion",
            title: "Who did you come with?",
            options: [
              { id: "solo", label: "Just myself" },
              { id: "couple", label: "Partner / couple" },
              { id: "family", label: "Family (incl. kids)" },
              { id: "friends", label: "Friends / colleagues" }
            ]
          },
          {
            id: "vibe",
            title: "How was the vibe?",
            options: [
              { id: "chill", label: "Easygoing, good to hang" },
              { id: "lively", label: "Lively but not too loud" },
              { id: "cozy", label: "Cozy, good for lingering" },
              { id: "ok", label: "Decent atmosphere" }
            ]
          },
          {
            id: "drink",
            title: "Drinks?",
            options: [
              { id: "taste", label: "Tasted good" },
              { id: "choice", label: "Enough options" },
              { id: "value", label: "Fair value" },
              { id: "normal", label: "Average / fine" }
            ]
          },
          {
            id: "service",
            title: "Service?",
            options: [
              { id: "friendly", label: "Friendly staff" },
              { id: "fast", label: "Drinks came fairly quickly" },
              { id: "attentive", label: "Attentive when needed" },
              { id: "ok", label: "Normal service" }
            ]
          },
          {
            id: "again",
            title: "Would you come back?",
            options: [
              { id: "yes", label: "Yes, I’d sit here again" },
              { id: "recommend", label: "I’d mention it to friends" },
              { id: "maybe", label: "Might drop in if nearby" }
            ]
          }
        ]
      },
      ja: {
        typeLabel: "バー・ダイニングバー",
        questions: [
          {
            id: "purpose",
            title: "今回の来店目的は？",
            options: [
              { id: "travel", label: "日本旅行・観光" },
              { id: "business", label: "出張・用事" },
              { id: "live", label: "近くに住んでいる／よく来る" },
              { id: "passby", label: "通りすがり" }
            ]
          },
          {
            id: "companion",
            title: "誰と来ましたか？",
            options: [
              { id: "solo", label: "一人" },
              { id: "couple", label: "パートナー／カップル" },
              { id: "family", label: "家族（親子含む）" },
              { id: "friends", label: "友人／同僚" }
            ]
          },
          {
            id: "vibe",
            title: "雰囲気は？",
            options: [
              { id: "chill", label: "落ち着いて過ごしやすい" },
              { id: "lively", label: "にぎやかだがうるさすぎない" },
              { id: "cozy", label: "居心地がよく長居しやすい" },
              { id: "ok", label: "悪くない雰囲気" }
            ]
          },
          {
            id: "drink",
            title: "ドリンクは？",
            options: [
              { id: "taste", label: "味が良い" },
              { id: "choice", label: "選択肢は十分" },
              { id: "value", label: "コスパは悪くない" },
              { id: "normal", label: "普通" }
            ]
          },
          {
            id: "service",
            title: "接客は？",
            options: [
              { id: "friendly", label: "感じが良い" },
              { id: "fast", label: "提供が比較的早い" },
              { id: "attentive", label: "気が利く" },
              { id: "ok", label: "普通" }
            ]
          },
          {
            id: "again",
            title: "また来ますか？",
            options: [
              { id: "yes", label: "また座りに来たい" },
              { id: "recommend", label: "友人に伝えたい" },
              { id: "maybe", label: "近くに来たら寄るかも" }
            ]
          }
        ]
      }
    }
  };

  // silence unused helper warning in older tooling
  void q;

  function normalizeLang(lang) {
    lang = String(lang || "").toLowerCase();
    if (lang.indexOf("ja") === 0) return "ja";
    if (lang.indexOf("en") === 0) return "en";
    if (lang.indexOf("zh") === 0) return "zh";
    return "";
  }

  function detectBrowserLang() {
    var list = navigator.languages || [navigator.language || "zh"];
    for (var i = 0; i < list.length; i++) {
      var n = normalizeLang(list[i]);
      if (n) return n;
    }
    return "zh";
  }

  function getLang() {
    try {
      var fromUrl = normalizeLang(
        new URLSearchParams(location.search).get("lang")
      );
      if (fromUrl) return fromUrl;
      var saved = normalizeLang(localStorage.getItem(STORAGE_KEY));
      if (saved) return saved;
    } catch (e) {}
    return detectBrowserLang();
  }

  function setLang(lang) {
    lang = normalizeLang(lang) || "zh";
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
    return lang;
  }

  function ui(lang) {
    return UI[normalizeLang(lang) || getLang()] || UI.zh;
  }

  function format(str, vars) {
    return String(str || "").replace(/\{(\w+)\}/g, function (_, k) {
      return vars && vars[k] != null ? String(vars[k]) : "";
    });
  }

  function getPage(type, lang) {
    lang = normalizeLang(lang) || getLang();
    var pack = PAGES[type] && (PAGES[type][lang] || PAGES[type].zh);
    return pack || null;
  }

  /** 兼容旧代码：默认中文快照 */
  function buildLegacyData() {
    return {
      massage: getPage("massage", "zh"),
      bar: getPage("bar", "zh")
    };
  }

  global.ReviewAssistI18n = {
    langs: SUPPORTED,
    getLang: getLang,
    setLang: setLang,
    ui: ui,
    format: format,
    getPage: getPage,
    htmlLang: function (lang) {
      lang = normalizeLang(lang) || getLang();
      return lang === "ja" ? "ja" : lang === "en" ? "en" : "zh-CN";
    }
  };

  global.REVIEW_ASSIST_DATA = buildLegacyData();
})(window);
