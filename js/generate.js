/**
 * 生成逻辑（问卷文案见 i18n.js）
 *
 * 设计依据（Google Maps 常见机制，便于写出“有用长评”）：
 * - Place Topics / 评论摘要：靠多人评论里反复出现的具体主题词（服务项目、氛围、人群）
 * - 人群相关印象（旅游/情侣/亲子等）：多来自评论文本里的情境描写 + 平台侧问卷属性，
 *   不是堆标签口号；要写清「和谁来、来做什么、做了什么」
 * - 真实感：具体细节、个人情境、自然口语、可有轻微不完美；避免刷评套话与编造
 */
(function (global) {
  "use strict";

  /* —— 本地长评素材（无 Key 时兜底；结构模仿真实叙事） —— */
  var FRAG_ZH = {
    massage: {
      purpose: {
        travel: [
          "这次来日本旅游，走了一天脚很累，",
          "观光间隙想找地方放松一下，",
          "旅行中临时想做个按摩，"
        ],
        business: [
          "出差间隙抽空过来，",
          "办事结束后想松一松，",
          "工作跑完顺路放松一下，"
        ],
        live: [
          "平时住这附近，",
          "当作常规放松来的，",
          "下班后来放松一下，"
        ],
        passby: [
          "路过看到就进来试了试，",
          "本来只是顺路看看，",
          "临时决定进来做一次，"
        ]
      },
      companion: {
        solo: ["自己一个人来的。", "就我自己。", "一个人体验的。"],
        couple: [
          "和伴侣一起来的。",
          "两个人一起来放松。",
          "跟另一半一起过来。"
        ],
        family: [
          "和家人一起来的。",
          "带家人一起过来。",
          "亲子出行顺路放松一下。"
        ],
        friends: [
          "和朋友一起来的。",
          "同事一起过来。",
          "跟朋友约着来的。"
        ]
      },
      service: {
        foot: ["我做了足疗/足底。", "主要做了足部护理。", "点的是足疗。"],
        body: ["我做了身体按摩。", "主要是身体整体放松。", "点了身体项目。"],
        oil: ["做了精油类项目。", "点的是精油放松。", "精油按摩体验。"],
        set: ["做了足+身的组合。", "选了套餐组合。", "足部和身体一起做了。"]
      },
      feel: {
        relaxed: [
          "整体很放松，过程舒服。",
          "做完整个人松下来了。",
          "体验偏舒缓，压力小很多。"
        ],
        refreshed: [
          "做完精神好一些。",
          "出来明显清爽不少。",
          "疲劳感轻了一截。"
        ],
        soreness: [
          "酸痛的地方有缓解。",
          "紧的位置按完松一点了。",
          "肩颈那种僵感下去了一些。"
        ],
        ok: [
          "整体还可以。",
          "体验中规中矩偏上。",
          "没有翻车，感觉不错。"
        ]
      },
      technique: {
        gentle: [
          "力度合适，不会乱使猛劲。",
          "手法细致，按着安心。",
          "该轻的地方会收着，细节稳。"
        ],
        strong: [
          "力度偏实，该按的点有按到。",
          "力道够，解乏比较明显。",
          "按得比较到位。"
        ],
        professional: [
          "手法熟练，节奏不乱。",
          "流程清楚，专业感有。",
          "手法稳，不会东一下西一下。"
        ],
        patient: [
          "过程中会沟通力度，比较耐心。",
          "态度细致，不会催。",
          "问需求会调整，体验更舒服。"
        ]
      },
      place: {
        quiet: [
          "店里相对安静，卫生也还好。",
          "环境干净，能静下来。",
          "空间不嘈杂，适合放松。"
        ],
        convenient: [
          "位置不算难找。",
          "过去方便，交通还算顺。",
          "地址好找，没绕路。"
        ],
        late: [
          "营业到比较晚，赶时间也能来。",
          "深夜还能做，挺实用。",
          "收工晚也能约到，方便。"
        ],
        normal: [
          "环境一般但能接受。",
          "设施正常，没有明显问题。",
          "空间中规中矩。"
        ]
      },
      again: {
        yes: [
          "下次有需要还会再来。",
          "行程允许的话还会再约。",
          "可以当作旅行中的放松点。"
        ],
        recommend: [
          "有朋友来玩我会提一句。",
          "可以推荐给同样走累的人。",
          "值得一试。"
        ],
        maybe: [
          "以后有需要会再考虑。",
          "看行程再决定。",
          "印象还可以，先记着。"
        ]
      },
      soft: [
        "",
        "人多的时候可能要稍等。",
        "高峰期最好提前说一声。",
        "如果追求特别奢华装修，这里更偏实用放松。"
      ]
    },
    bar: {
      purpose: {
        travel: [
          "旅游晚上想找地方坐坐，",
          "观光结束后想来喝一杯，",
          "旅行中路过想歇脚，"
        ],
        business: [
          "出差间隙过来坐一会儿，",
          "办事完想来放松一下，",
          "工作结束后进来坐坐，"
        ],
        live: [
          "平时住附近，",
          "当常规小坐来的，",
          "下班后来坐一会儿，"
        ],
        passby: [
          "路过进来喝一杯，",
          "临时决定进来坐坐，",
          "看到就试了一下，"
        ]
      },
      companion: {
        solo: ["自己一个人。", "就我自己。", "一个人坐坐。"],
        couple: [
          "和伴侣一起来的。",
          "两个人一起来喝。",
          "跟另一半一起过来。"
        ],
        family: [
          "和家人一起来的。",
          "带家人一起坐坐。",
          "亲子出行顺路进来。"
        ],
        friends: [
          "和朋友一起来的。",
          "同事一起过来。",
          "跟朋友约着来的。"
        ]
      },
      vibe: {
        chill: [
          "氛围轻松，待着不累。",
          "节奏偏慢，适合聊天。",
          "整体放松，不会紧绷。"
        ],
        lively: [
          "有点热闹但还能说话。",
          "气氛活泼，不至于吵到烦。",
          "人气还行，不冷清。"
        ],
        cozy: [
          "座位舒服，适合久坐。",
          "空间自在，坐着放松。",
          "环境偏舒适向。"
        ],
        ok: [
          "氛围中规中矩。",
          "环境还过得去。",
          "坐一会儿没问题。"
        ]
      },
      drink: {
        taste: [
          "喝的味道不错。",
          "口感比较顺。",
          "那杯挺好喝。"
        ],
        choice: [
          "选择够日常喝。",
          "菜单够用。",
          "想喝的基本能点到。"
        ],
        value: [
          "价格还能接受。",
          "性价比还行。",
          "花的钱和体验比较匹配。"
        ],
        normal: [
          "酒水中规中矩。",
          "味道正常。",
          "喝着还行。"
        ]
      },
      service: {
        friendly: [
          "服务态度友好。",
          "招呼比较自然。",
          "沟通轻松。"
        ],
        fast: [
          "上得不算慢。",
          "等待还好。",
          "出杯速度可以。"
        ],
        attentive: [
          "照顾比较到位。",
          "需要时能叫到人。",
          "细节有注意到。"
        ],
        ok: [
          "服务正常。",
          "没有明显问题。",
          "流程顺畅。"
        ]
      },
      again: {
        yes: [
          "下次还会再来坐坐。",
          "附近常来也行。",
          "还会再来一杯。"
        ],
        recommend: [
          "可以跟朋友提一下。",
          "有人问我会提到。",
          "值得来试试。"
        ],
        maybe: [
          "路过可能会再进。",
          "看心情再决定。",
          "印象还可以。"
        ]
      },
      soft: [
        "",
        "周末人可能多一点。",
        "想久坐聊天的话，错峰更舒服。",
        "不是那种特别嘈杂的局。"
      ]
    }
  };

  var FRAG_EN = {
    massage: {
      purpose: {
        travel: [
          "I was sightseeing in Japan and my feet were done after a long day, ",
          "Between sightseeing stops I wanted somewhere to unwind, "
        ],
        business: [
          "I stopped by between work errands, ",
          "After wrapping up for the day I wanted a quick reset, "
        ],
        live: [
          "I live nearby so I came for a regular unwind, ",
          "Came after work to loosen up, "
        ],
        passby: [
          "I was just passing by and decided to try it, ",
          "Dropped in on a whim, "
        ]
      },
      companion: {
        solo: ["on my own.", "by myself."],
        couple: ["with my partner.", "as a couple."],
        family: ["with family.", "with family, including kids."],
        friends: ["with friends.", "with colleagues."]
      },
      service: {
        foot: ["I got a foot massage.", "Mostly foot reflexology."],
        body: ["I got a body massage.", "Focused on full-body relaxation."],
        oil: ["I booked an oil treatment.", "Went for oil massage."],
        set: ["I did a foot + body combo.", "Chose a set menu."]
      },
      feel: {
        relaxed: ["Overall it felt relaxing and comfortable.", "I left feeling looser."],
        refreshed: ["I felt clearer afterward.", "Fatigue eased a bit."],
        soreness: ["Sore spots felt better.", "Tight areas eased somewhat."],
        ok: ["It was pretty good overall.", "Solid, nothing off."]
      },
      technique: {
        gentle: ["Pressure was balanced and careful.", "Gentle where it needed to be."],
        strong: ["Firm pressure that hit the right spots.", "Strong enough to actually help."],
        professional: ["Technique felt steady and practiced.", "Rhythm was consistent."],
        patient: ["They checked in on pressure and were patient.", "Easy to communicate with."]
      },
      place: {
        quiet: ["The room was relatively quiet and clean.", "Calm space, easy to settle."],
        convenient: ["Location was easy enough to find.", "Convenient to get to."],
        late: ["Open late, which helped my schedule.", "Useful if you finish late."],
        normal: ["Space was fine / acceptable.", "Nothing fancy, but workable."]
      },
      again: {
        yes: ["I’d come back when I need it.", "Worth returning on another trip."],
        recommend: ["I’d mention it to friends who are tired from walking.", "Worth a try."],
        maybe: ["Might reconsider if I need it again.", "Decent enough to keep in mind."]
      },
      soft: [
        "",
        "It can get a bit busy at peak times.",
        "Better to message ahead if you’re in a rush."
      ]
    },
    bar: {
      purpose: {
        travel: [
          "After sightseeing I wanted somewhere to sit with a drink, ",
          "Traveling and stopped in for a quick rest, "
        ],
        business: [
          "Came in between work commitments, ",
          "After errands I wanted a quiet drink, "
        ],
        live: [
          "I live nearby so this was a casual stop, ",
          "Dropped by after work, "
        ],
        passby: [
          "Passing by and decided to try a drink, ",
          "Came in on impulse, "
        ]
      },
      companion: {
        solo: ["on my own.", "solo."],
        couple: ["with my partner.", "as a couple."],
        family: ["with family.", "family outing."],
        friends: ["with friends.", "with colleagues."]
      },
      vibe: {
        chill: ["Easygoing vibe, comfortable to stay.", "Relaxed pace for chatting."],
        lively: ["A bit lively but still conversational.", "Busy enough without being chaotic."],
        cozy: ["Cozy seating, good for lingering.", "Comfortable space."],
        ok: ["Atmosphere was fine.", "Decent enough to hang for a bit."]
      },
      drink: {
        taste: ["Drinks tasted good.", "Smooth and enjoyable."],
        choice: ["Enough options for a casual visit.", "Menu covered what I wanted."],
        value: ["Fair value for what I got.", "Price felt reasonable."],
        normal: ["Drinks were average / fine.", "Nothing special, but fine."]
      },
      service: {
        friendly: ["Staff were friendly.", "Easy, natural service."],
        fast: ["Drinks came at a decent pace.", "Wait wasn’t long."],
        attentive: ["Attentive when I needed something.", "Noticed the small things."],
        ok: ["Service was normal.", "No issues."]
      },
      again: {
        yes: ["I’d sit here again.", "Happy to come back for another round."],
        recommend: ["I’d mention it to friends.", "Worth trying once."],
        maybe: ["Might drop in again if nearby.", "Decent enough to remember."]
      },
      soft: [
        "",
        "Weekends can get busier.",
        "For a long chat, off-peak is nicer."
      ]
    }
  };

  var FRAG_JA = {
    massage: {
      purpose: {
        travel: [
          "日本観光で一日歩き疲れて、",
          "観光の合間にリラックスしたくて、"
        ],
        business: [
          "出張の合間に寄って、",
          "用事のあとで体をほぐしたくて、"
        ],
        live: [
          "近所に住んでいて、",
          "仕事終わりに寄って、"
        ],
        passby: [
          "通りすがりで入ってみたら、",
          "ついでに試してみたくて、"
        ]
      },
      companion: {
        solo: ["一人で来ました。", "自分一人です。"],
        couple: ["パートナーと一緒に。", "二人でリラックスしに。"],
        family: ["家族と一緒に。", "親子連れで寄りました。"],
        friends: ["友人と一緒に。", "同僚と来ました。"]
      },
      service: {
        foot: ["足つぼ／フットを受けました。", "主に足のケアです。"],
        body: ["ボディマッサージを受けました。", "全身リラックス中心です。"],
        oil: ["オイル系を選びました。", "オイルマッサージでした。"],
        set: ["足＋ボディのセットでした。", "セットメニューを選びました。"]
      },
      feel: {
        relaxed: ["全体的にとてもリラックスできました。", "終わったあと体が軽く感じました。"],
        refreshed: ["終わったあと少しスッキリしました。", "疲れが少し和らぎました。"],
        soreness: ["コリが少し楽になりました。", "つらいところが少し緩みました。"],
        ok: ["全体として悪くありませんでした。", "特に問題なく良かったです。"]
      },
      technique: {
        gentle: ["力加減がちょうどよく丁寧でした。", "無理のない押し方で安心でした。"],
        strong: ["しっかりめでポイントが効きました。", "力があり、疲れが取れやすい感じ。"],
        professional: ["手技が安定していました。", "リズムが一定でプロ感がありました。"],
        patient: ["力の確認などコミュニケーションがあり親切でした。", "要望を聞いて調整してくれました。"]
      },
      place: {
        quiet: ["店内は比較的静かで清潔でした。", "落ち着いて受けられました。"],
        convenient: ["場所は分かりやすかったです。", "アクセスは悪くありません。"],
        late: ["遅くまでやっていて助かりました。", "夜遅くでも利用しやすいです。"],
        normal: ["店内は普通で問題ありません。", "特別豪華ではないですが十分です。"]
      },
      again: {
        yes: ["また必要なら来たいです。", "旅行中の休憩先としても良さそうです。"],
        recommend: ["歩き疲れた友人には伝えたいです。", "一度試す価値はあると思います。"],
        maybe: ["また必要なら検討します。", "印象は悪くないので覚えておきます。"]
      },
      soft: [
        "",
        "混雑時は少し待つこともあります。",
        "急ぐときは事前連絡があると安心です。"
      ]
    },
    bar: {
      purpose: {
        travel: [
          "観光のあとで一杯飲みたくて、",
          "旅行中に休憩したくて、"
        ],
        business: [
          "仕事の合間に寄って、",
          "用事のあとで少し休みたくて、"
        ],
        live: [
          "近所なので気軽に寄って、",
          "仕事終わりに座って、"
        ],
        passby: [
          "通りすがりで入って、",
          "ついでに一杯試して、"
        ]
      },
      companion: {
        solo: ["一人で。", "自分一人です。"],
        couple: ["パートナーと一緒に。", "二人で。"],
        family: ["家族と一緒に。", "家族連れで。"],
        friends: ["友人と一緒に。", "同僚と。"]
      },
      vibe: {
        chill: ["落ち着いて過ごしやすい雰囲気でした。", "ゆるめで話しやすいです。"],
        lively: ["にぎやかですがうるさすぎません。", "活気はあるが会話はできます。"],
        cozy: ["居心地がよく長居しやすいです。", "座り心地が良いです。"],
        ok: ["雰囲気は悪くありません。", "しばらく座るには十分です。"]
      },
      drink: {
        taste: ["味は良かったです。", "飲みやすくて美味しかったです。"],
        choice: ["選択肢は日常使いには十分。", "欲しいものはだいたい頼めます。"],
        value: ["コスパは悪くない印象。", "値段と内容のバランスは普通以上。"],
        normal: ["ドリンクは普通でした。", "特別ではないですが問題なし。"]
      },
      service: {
        friendly: ["接客は感じが良かったです。", "自然な対応でした。"],
        fast: ["提供は比較的早かったです。", "待ちは気になりませんでした。"],
        attentive: ["必要なときに気が利きます。", "細かいところに気づいてくれました。"],
        ok: ["接客は普通です。", "特に問題ありません。"]
      },
      again: {
        yes: ["また座りに来たいです。", "また一杯来ても良さそうです。"],
        recommend: ["友人にも伝えたいです。", "一度試す価値あり。"],
        maybe: ["近くに来たら寄るかも。", "印象は悪くないです。"]
      },
      soft: [
        "",
        "週末は少し混むことがあります。",
        "長居して話すなら、空いている時間の方が楽です。"
      ]
    }
  };

  function normLang(lang) {
    lang = String(lang || "").toLowerCase();
    if (lang.indexOf("ja") === 0) return "ja";
    if (lang.indexOf("en") === 0) return "en";
    return "zh";
  }

  function normLength(len) {
    len = String(len || "").toLowerCase();
    if (len === "short" || len === "long") return len;
    return "medium";
  }

  /** 目标篇幅说明（给模型 + 本地裁剪） */
  function lengthGuide(lang, length) {
    lang = normLang(lang);
    length = normLength(length);
    if (lang === "en") {
      if (length === "short")
        return {
          label: "SHORT",
          rule: "Length: SHORT — about 40–70 words, ONE short paragraph only. Still complete the last sentence.",
          minChars: 80,
          minLetters: 35,
          minHan: 0,
          targetSents: 2,
          paragraphs: false
        };
      if (length === "long")
        return {
          label: "LONG",
          rule: "Length: LONG — about 160–260 words, 2–4 short paragraphs with concrete traveler details.",
          minChars: 280,
          minLetters: 140,
          minHan: 0,
          targetSents: 7,
          paragraphs: true
        };
      return {
        label: "MEDIUM",
        rule: "Length: MEDIUM — about 90–140 words, 1–2 paragraphs.",
        minChars: 160,
        minLetters: 80,
        minHan: 0,
        targetSents: 4,
        paragraphs: true
      };
    }
    if (lang === "ja") {
      if (length === "short")
        return {
          label: "短",
          rule: "分量：短文。おおよそ70〜120字、1段落のみ。必ず書き切る。",
          minChars: 50,
          minLetters: 0,
          minHan: 40,
          targetSents: 2,
          paragraphs: false
        };
      if (length === "long")
        return {
          label: "長",
          rule: "分量：長文。おおよそ280〜420字、2〜4段落。具体的な体験を厚めに。",
          minChars: 220,
          minLetters: 0,
          minHan: 180,
          targetSents: 7,
          paragraphs: true
        };
      return {
        label: "中",
        rule: "分量：中くらい。おおよそ150〜230字、1〜2段落。",
        minChars: 110,
        minLetters: 0,
        minHan: 90,
        targetSents: 4,
        paragraphs: true
      };
    }
    if (length === "short")
      return {
        label: "短",
        rule: "篇幅：短评。约 60～110 字，只写 1 小段，仍须写完收尾。",
        minChars: 45,
        minLetters: 0,
        minHan: 40,
        targetSents: 2,
        paragraphs: false
      };
    if (length === "long")
      return {
        label: "长",
        rule: "篇幅：长评。约 280～420 字，分 2～4 段，多写具体情境与感受细节。",
        minChars: 220,
        minLetters: 0,
        minHan: 200,
        targetSents: 7,
        paragraphs: true
      };
    return {
      label: "中",
      rule: "篇幅：中等。约 140～220 字，1～2 段。",
      minChars: 100,
      minLetters: 0,
      minHan: 90,
      targetSents: 4,
      paragraphs: true
    };
  }

  function getFrag(lang) {
    lang = normLang(lang);
    if (lang === "en") return FRAG_EN;
    if (lang === "ja") return FRAG_JA;
    return FRAG_ZH;
  }

  var NARRATIVE_ORDER = {
    massage: ["purpose", "companion", "service", "feel", "technique", "place", "again"],
    bar: ["purpose", "companion", "vibe", "drink", "service", "again"]
  };

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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

  function similar(a, b) {
    if (!a || !b) return false;
    if (a === b) return true;
    return a.slice(0, 28) === b.slice(0, 28);
  }

  function detectTone(note, lang) {
    if (!note || !note.trim()) return "positive";
    var t = note.trim();
    lang = normLang(lang);
    if (lang === "en") {
      if (
        /average|ok-ish|mediocre|not great|disappoint|expensive|slow|noisy|dirty|issue|regret|meh|so-so/i.test(
          t
        )
      )
        return "mixed";
      if (/ok|fine|normal|average|decent/i.test(t) && t.length < 50) return "neutral";
      return "positive";
    }
    if (lang === "ja") {
      if (/普通|いまいち|微妙|不満|高い|遅い|うるさい|汚い|残念|がっかり|いまひとつ/.test(t))
        return "mixed";
      if (/普通|まあまあ|悪くない|問題ない/.test(t) && t.length < 40) return "neutral";
      return "positive";
    }
    if (/一般|普通|还行吧|不太|不满|失望|贵|慢|吵|脏|差|问题|遗憾|凑合|马马虎虎/.test(t))
      return "mixed";
    if (/还行|可以|正常|中等|凑合|一般/.test(t) && t.length < 40) return "neutral";
    return "positive";
  }

  function asSent(s, lang) {
    s = String(s || "").trim();
    if (!s) return "";
    lang = normLang(lang);
    if (lang === "en") {
      if (!/[.!?]$/.test(s)) s += ".";
      return s;
    }
    if (!/[。！？]$/.test(s)) s += "。";
    return s;
  }

  function joinOpen(p, c, lang) {
    lang = normLang(lang);
    p = String(p || "").trim();
    c = String(c || "").trim();
    if (lang === "en") {
      p = p.replace(/,\s*$/, "");
      c = c.replace(/^\s+/, "");
      if (p && c) return asSent(p + " " + c, lang);
      return asSent(p || c, lang);
    }
    if (lang === "ja") {
      p = p.replace(/、$/, "");
      c = c.replace(/。$/, "");
      if (p && c) return asSent(p + c, lang);
      return asSent(p || c, lang);
    }
    p = p.replace(/，$/, "");
    c = c.replace(/。$/, "");
    if (p && c) return asSent(p + "，" + c, lang);
    return asSent(p || c, lang);
  }

  function localOnce(type, answers, note, lang, length) {
    lang = normLang(lang);
    length = normLength(length);
    var guide = lengthGuide(lang, length);
    var pack = getFrag(lang);
    var f = pack[type];
    if (!f) return "";
    var order = NARRATIVE_ORDER[type] || [];
    var sents = [];

    var p =
      answers.purpose && f.purpose && f.purpose[answers.purpose]
        ? pick(f.purpose[answers.purpose])
        : "";
    var c =
      answers.companion && f.companion && f.companion[answers.companion]
        ? pick(f.companion[answers.companion])
        : "";
    if (p || c) sents.push(joinOpen(p, c, lang));

    order.forEach(function (k) {
      if (k === "purpose" || k === "companion") return;
      var oid = answers[k];
      if (oid && f[k] && f[k][oid]) sents.push(asSent(pick(f[k][oid]), lang));
    });

    // 只有 3 题时信息偏少：按长度补通用细节
    var FILL = {
      zh: {
        massage: [
          "房间干净安静，整体很放松。",
          "力度可以按需求调整，体验比较舒服。",
          "店员态度不错，沟通也顺畅。",
          "逛累了过来放松一下刚刚好。",
          "按完肩膀和腿都轻松不少，整个人松下来了。",
          "个室隐私感不错，做完也不急着赶人。"
        ],
        bar: [
          "店里氛围轻松，坐着不累。",
          "服务态度友好，点单也方便。",
          "环境干净，适合歇脚聊几句。",
          "路过进来坐坐，感觉挺合适。",
          "酒水口感顺，待一会儿很舒服。",
          "位置好找，逛完顺路过来正好。"
        ]
      },
      en: {
        massage: [
          "The room was clean and quiet.",
          "Pressure was easy to adjust and felt comfortable.",
          "Staff were friendly and easy to talk to.",
          "A nice reset after a long day of walking.",
          "Shoulders and legs felt lighter afterward.",
          "Private enough to fully unwind."
        ],
        bar: [
          "The vibe was easygoing.",
          "Staff were friendly and ordering was simple.",
          "Clean spot to sit and unwind.",
          "A good place to drop in while nearby.",
          "Drinks went down smoothly.",
          "Easy to find after walking around."
        ]
      },
      ja: {
        massage: [
          "部屋は清潔で静かでした。",
          "力加減を調整してもらえ、気持ちよかったです。",
          "接客も丁寧で話しやすかったです。",
          "歩き疲れたあとに寄るのにちょうど良いです。",
          "肩や足が軽くなり、リラックスできました。",
          "個室で落ち着いて受けられました。"
        ],
        bar: [
          "雰囲気は落ち着いて過ごしやすいです。",
          "接客が良く、注文もスムーズでした。",
          "清潔で、ちょっと休憩するのに向いています。",
          "近くに来たときに寄るのに良さそうです。",
          "ドリンクも飲みやすく、長居しやすいです。",
          "場所も分かりやすく助かりました。"
        ]
      }
    };
    var fillPool = ((FILL[lang] && FILL[lang][type]) || FILL.zh.massage).slice();
    var need = guide.targetSents;
    while (sents.length < need && fillPool.length) {
      var extra = pick(fillPool);
      fillPool = fillPool.filter(function (x) {
        return x !== extra;
      });
      if (
        sents.some(function (s) {
          return s.indexOf(extra.slice(0, 8)) >= 0;
        })
      ) {
        continue;
      }
      sents.push(asSent(extra, lang));
    }

    if (length === "short" && sents.length > 3) {
      sents = sents.slice(0, 3);
    }

    var tone = detectTone(note, lang);
    if (note && note.trim()) {
      var n = note.trim().replace(/[。.!！？?]+$/g, "");
      if (tone === "mixed") {
        var mixLead =
          lang === "en"
            ? "That said, "
            : lang === "ja"
              ? "正直なところ、"
              : "另外说实话，";
        sents.splice(Math.min(2, sents.length), 0, asSent(mixLead + n, lang));
      } else if (tone === "neutral") {
        var neuLead =
          lang === "en" ? "Also: " : lang === "ja" ? "補足：" : "补充一下：";
        sents.push(asSent(neuLead + n, lang));
      } else {
        sents.splice(Math.min(3, sents.length), 0, asSent(n, lang));
      }
    }

    if (tone === "positive" && Math.random() > 0.5) {
      var soft = pick((f.soft || []).filter(Boolean).concat([""]));
      if (soft) sents.push(asSent(soft, lang));
    } else if (tone === "mixed") {
      var mixEnd =
        lang === "en"
          ? pick([
              "Still happy to leave a positive note overall.",
              "Small issues, but not a deal-breaker."
            ])
          : lang === "ja"
            ? pick([
                "全体としては良い評価です。",
                "小さな点はありますが、大きく減点するほどではありません。"
              ])
            : pick(["整体仍愿意给好评。", "小问题有，但不至于劝退。"]);
      sents.push(asSent(mixEnd, lang));
    }

    var joiner = lang === "en" ? " " : "";
    var body;
    if (guide.paragraphs && sents.length >= 5) {
      var mid = Math.ceil(sents.length * 0.45);
      body = sents.slice(0, mid).join(joiner) + "\n\n" + sents.slice(mid).join(joiner);
    } else {
      body = sents.join(joiner);
    }

    // 约 1/4 概率在结尾加一个轻表情（本地兜底；短评更少）
    if (tone === "positive" && Math.random() < (length === "short" ? 0.12 : 0.28)) {
      var tips =
        lang === "en"
          ? [" :)", " ✨"]
          : lang === "ja"
            ? [" 😊", " (^_^)"]
            : [" 😊", " (｡◕‿◕｡)", " ～"];
      if (!/[😊✨)～)]$/.test(body.trim())) body = body.replace(/[。.!！？]?$/, "") + pick(tips);
    }
    return body;
  }

  function localGenerate(type, answers, note, storeName, avoidText, lang, length) {
    lang = normLang(lang);
    length = normLength(length);
    var best = "";
    for (var i = 0; i < 8; i++) {
      var t = localOnce(type, answers, note, lang, length);
      if (!similar(t, avoidText)) return t;
      best = t;
    }
    return best || localOnce(type, answers, note, lang, length);
  }

  function buildPrompt(type, answers, note, storeName, labels, avoidText, nonce, lang, length) {
    lang = normLang(lang);
    length = normLength(length);
    var guide = lengthGuide(lang, length);
    var lines = [];
    var useEmoji = length !== "short" && /[02468]/.test(String(nonce).slice(-1));
    var isBar = type === "bar";

    if (lang === "en") {
      lines.push("Task: Write one complete Google Maps review in the style of real traveler reviews.");
      lines.push("Language: English only. Output review body only — no titles, steps, drafting, Markdown.");
      lines.push(guide.rule);
      lines.push("");
      lines.push("Style to imitate (natural traveler tone):");
      lines.push("- Customer only answered 3 short questions — use them as anchors.");
      lines.push(
        "- If details are thin, you MAY lightly invent plausible traveler details (e.g. walked a lot, clean quiet room, friendly staff, pressure adjusted) as long as they do NOT contradict the answers."
      );
      lines.push("- Do NOT invent prices, exact minutes, therapist names, or service types that conflict with selections.");
      lines.push("- Open with context when possible; soft close with return / good for travelers.");
      lines.push("- Must finish with a full sentence. Hit the requested length — do not write a short blurb if LONG/MEDIUM was chosen.");
      if (useEmoji) {
        lines.push("- You MAY add ONE light emoji or kaomoji at the end (e.g. :) or ✨). Only once.");
      } else {
        lines.push("- Do NOT use emoji or kaomoji this time.");
      }
      lines.push("");
      lines.push("Ban: Step/Drafting/Outline; “5 stars!!!”, “perfect in every way”, fake competitor drama.");
      lines.push("Mild “highly recommend for travelers…” is OK once if it sounds natural.");
      lines.push("");
      lines.push("Seed: " + nonce);
      if (avoidText) {
        lines.push("Do not closely mirror:");
        lines.push(avoidText.slice(0, 200));
      }
      if (storeName) lines.push("Store (usually omit): " + storeName);
      lines.push("Category: " + (isBar ? "bar / lounge" : "massage / foot relaxation"));
      lines.push("Customer selections:");
      (labels || []).forEach(function (l) {
        lines.push("· " + l);
      });
      if (note && note.trim()) {
        lines.push("Customer note (blend; don’t copy whole): " + note.trim());
      }
      lines.push("");
      lines.push("Write the COMPLETE review now (" + guide.label + "):");
      return lines.join("\n");
    }

    if (lang === "ja") {
      lines.push("タスク：旅行者っぽい自然なGoogleマップ口コミを1本、最後まで書く。");
      lines.push("言語：日本語のみ。本文以外（説明・手順・下書き・Markdown）禁止。");
      lines.push(guide.rule);
      lines.push("");
      lines.push("文体：");
      lines.push("- 回答は3問のみ。それを軸にする");
      lines.push(
        "- 情報が少ない場合、矛盾しない範囲で軽い補完可（歩き疲れ、清潔で静か、接客が良い、力加減調整など）"
      );
      lines.push("- 料金・正確な分数・人名、選択と矛盾するメニューは捏造しない");
      lines.push("- 締め：旅行中の休憩に良い／また来たい程度");
      lines.push("- 指定の分量を守る。長文指定なら短くまとめない");
      if (useEmoji) {
        lines.push("- 末尾に絵文字か顔文字を1つだけ可（例：😊／(^_^)）。多用禁止");
      } else {
        lines.push("- 今回は絵文字・顔文字なし");
      }
      lines.push("");
      lines.push("禁止：Step/Drafting、未選択メニューの捏造、五つ星連呼");
      lines.push("");
      lines.push("シード：" + nonce);
      if (avoidText) {
        lines.push("似せない：");
        lines.push(avoidText.slice(0, 200));
      }
      if (storeName) lines.push("店名（多くは省略）：" + storeName);
      lines.push("業態：" + (isBar ? "バー／ダイニングバー" : "マッサージ／フット"));
      lines.push("選択：");
      (labels || []).forEach(function (l) {
        lines.push("· " + l);
      });
      if (note && note.trim()) {
        lines.push("メモ（溶かす）：" + note.trim());
      }
      lines.push("");
      lines.push("口コミ本文を完成させてください（" + guide.label + "）：");
      return lines.join("\n");
    }

    lines.push("任务：写一条可直接发到谷歌地图的完整顾客评论。");
    lines.push("语言：简体中文为主。禁止英文整句、禁止英文提纲。");
    lines.push("只输出评论正文，不要标题/步骤/草稿/Markdown。");
    lines.push(guide.rule);
    lines.push("");
    lines.push("文风请贴近真实游客评论：");
    lines.push("1) 顾客只答了 3 道题——以这 3 条为锚点写完整评论");
    lines.push(
      "2) 信息偏少时，可合理补充不矛盾的细节（如走累了、房间干净安静、态度好、力度可调）；禁止编造价格、精确分钟、技师姓名，以及与勾选冲突的项目"
    );
    lines.push("3) 有同行/项目等勾选时自然写进情境；结尾温和表达还会再来或适合观光后放松");
    lines.push("4) 必须写完并以句号/感叹号收尾；若选了「长」或「中」，不要写成两三句敷衍短评");
    lines.push("5) 可用一句自然推荐，禁止「强烈推荐！！！五星好评」刷评腔");
    if (useEmoji) {
      lines.push("6) 本次允许在结尾偶尔加 1 个表情或颜文字（如 😊 / (｡◕‿◕｡) / ～），不要堆多个");
    } else {
      lines.push("6) 本次不要使用表情或颜文字");
    }
    lines.push("");
    lines.push("禁止：Step、Drafting、编造未勾选项目、夸张对比黑店故事");
    lines.push("");
    lines.push("随机种子：" + nonce + "（换开头与句式）");
    if (avoidText) {
      lines.push("不要写成与下面相似：");
      lines.push(avoidText.slice(0, 200));
    }
    if (storeName) lines.push("店名（多数可不提）：" + storeName);
    lines.push("品类：" + (isBar ? "酒吧/餐吧" : "按摩/足疗放松"));
    lines.push("顾客勾选：");
    (labels || []).forEach(function (l) {
      lines.push("· " + l);
    });
    if (note && note.trim()) {
      lines.push("顾客备注（融入含义，勿整段照抄）：" + note.trim());
      lines.push("若备注含中性/小缺点，可略带真实不足，仍偏正面。");
    }
    lines.push("");
    lines.push("现在写出完整评论正文（" + guide.label + "）：");
    return lines.join("\n");
  }

  function systemInstructionFor(lang) {
    lang = normLang(lang);
    if (lang === "en") {
      return "Write one complete traveler-style Google review in English. Finish the last sentence. No outlines or Step/Drafting.";
    }
    if (lang === "ja") {
      return "旅行者らしい完全な日本語口コミを1本。必ず書き切る。Step/Drafting禁止。";
    }
    return "写一条完整的简体中文谷歌评论，语气像真实游客。必须写完收尾。禁止英文提纲与 Step/Drafting。表情最多偶尔一个。";
  }

  /** 清洗模型泄漏的步骤/草稿标记；不合格则返回空串 */
  function sanitizeReviewText(raw, lang, length) {
    if (!raw) return "";
    lang = normLang(lang);
    length = normLength(length);
    var guide = lengthGuide(lang, length);
    var t = String(raw).trim();
    t = t.replace(/^```[\w]*\n?/, "").replace(/\n?```$/, "").trim();
    t = t.replace(/^["「『]+|["」』]+$/g, "");
    t = t.replace(/\*{1,2}([^*\n]+)\*{1,2}/g, "$1");
    t = t
      .split(/\n+/)
      .filter(function (line) {
        var L = line.trim();
        if (!L) return true;
        if (/^(step|draft|ending|outline|section|part)\s*\d*\s*[:：.\-)]/i.test(L))
          return false;
        if (/^(step|draft|ending|outline|section|part)\b/i.test(L) && L.length < 80)
          return false;
        if (/drafting\s+\w+/i.test(L)) return false;
        if (/^\*+\s*(step|draft|ending)/i.test(L)) return false;
        return true;
      })
      .join("\n")
      .replace(/^\s*[-*•]\s*/gm, "")
      .trim();

    t = t
      .replace(/\*?Step\s*\d+\s*[:：][^*\n]*/gi, "")
      .replace(/\*?Drafting\s+\w+\s*[:：]?\*?/gi, "")
      .replace(/[ \t]{2,}/g, " ")
      .trim();

    if (/^(step\s*\d|drafting|outline)\b/i.test(t) && t.length < 120) return "";

    var letters = (t.match(/[A-Za-z]/g) || []).length;
    var han = (t.match(/[\u4e00-\u9fff]/g) || []).length;
    var kana = (t.match(/[\u3040-\u30ff]/g) || []).length;
    var cjk = han + kana;

    if (lang === "en") {
      if (letters < guide.minLetters) return "";
      if (cjk > 40) return "";
      return t;
    }
    if (lang === "ja") {
      if (cjk < Math.max(30, Math.floor(guide.minHan * 0.7))) return "";
      if (letters > 80 && letters > cjk * 0.8) return "";
      return t;
    }
    if (han < Math.max(28, Math.floor(guide.minHan * 0.7))) return "";
    if (letters > 60 && letters > han * 0.6) return "";
    return t;
  }

  function looksIncomplete(text, lang, length) {
    var t = String(text || "").trim();
    if (!t) return true;
    lang = normLang(lang);
    length = normLength(length);
    var guide = lengthGuide(lang, length);
    var bare = t.replace(/\s+/g, "");
    if (lang === "en") {
      if (t.length < guide.minChars) return true;
      return !/[.!?…]["')\]]*$/.test(t);
    }
    if (bare.length < guide.minChars) return true;
    return !/[。！？…」』）】]$/.test(t) && !/[。！？…]$/.test(bare);
  }

  function extractText(data, lang, length) {
    var parts =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts;
    if (!parts || !parts.length) return null;

    var chunks = [];
    for (var i = 0; i < parts.length; i++) {
      var p = parts[i];
      if (!p || !p.text) continue;
      if (p.thought === true) continue;
      chunks.push(p.text);
    }
    if (!chunks.length) {
      for (var j = parts.length - 1; j >= 0; j--) {
        if (parts[j] && parts[j].text && parts[j].thought !== true) {
          chunks.push(parts[j].text);
          break;
        }
      }
    }
    if (!chunks.length) return null;
    var cleaned = sanitizeReviewText(chunks.join("\n"), lang, length);
    return cleaned || null;
  }

  function callGeminiModel(key, model, prompt, lang, length) {
    lang = normLang(lang);
    length = normLength(length);
    var url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(model) +
      ":generateContent?key=" +
      encodeURIComponent(key);

    var body = {
      systemInstruction: {
        parts: [{ text: systemInstructionFor(lang) }]
      },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.85,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: length === "long" ? 4096 : length === "short" ? 1024 : 2048,
        thinkingConfig: {
          thinkingBudget: 0,
          includeThoughts: false
        }
      }
    };

    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }).then(function (r) {
      return r.json().then(function (data) {
        if (
          !r.ok &&
          data &&
          data.error &&
          /thinking|Thinking/i.test(String(data.error.message || ""))
        ) {
          delete body.generationConfig.thinkingConfig;
          return fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
          }).then(function (r2) {
            return r2.json().then(function (data2) {
              return finishGemini(r2, data2, model, lang, length);
            });
          });
        }
        return finishGemini(r, data, model, lang, length);
      });
    });
  }

  function finishGemini(r, data, model, lang, length) {
    if (!r.ok) {
      var msg =
        (data && data.error && data.error.message) || "HTTP " + r.status;
      throw new Error(msg);
    }
    var reason =
      data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].finishReason;
    var text = extractText(data, lang, length);
    if (!text) {
      throw new Error(
        reason && reason !== "STOP" ? "blocked:" + reason : "bad_model_output"
      );
    }
    if (reason === "MAX_TOKENS" || looksIncomplete(text, lang, length)) {
      throw new Error("truncated_output");
    }
    return { text: text, model: model };
  }

  function generateWithGemini(
    type,
    answers,
    note,
    storeName,
    labels,
    avoidText,
    lang,
    length
  ) {
    lang = normLang(lang);
    length = normLength(length);
    var cfg = global.REVIEW_ASSIST_CONFIG || {};
    var key = (cfg.geminiApiKey || "").trim();
    if (!key) return Promise.resolve({ ok: false, reason: "no_key" });

    var primary = cfg.geminiModel || "gemini-2.5-flash-lite";
    var models = [
      primary,
      "gemini-2.5-flash-lite",
      "gemini-2.5-flash",
      "gemini-3.5-flash",
      "gemini-flash-latest"
    ].filter(function (m, i, arr) {
      return m && arr.indexOf(m) === i;
    });

    var nonce = String(Date.now()) + "-" + Math.random().toString(36).slice(2, 8);
    var prompt = buildPrompt(
      type,
      answers,
      note,
      storeName,
      labels,
      avoidText,
      nonce,
      lang,
      length
    );

    var lastErr = null;
    function tryNext(i) {
      if (i >= models.length) {
        return Promise.resolve({
          ok: false,
          reason: "api_error",
          error: lastErr ? String(lastErr.message || lastErr) : "unknown"
        });
      }
      return callGeminiModel(key, models[i], prompt, lang, length).then(
        function (res) {
          return { ok: true, text: res.text, model: res.model };
        },
        function (err) {
          lastErr = err;
          return tryNext(i + 1);
        }
      );
    }
    return tryNext(0);
  }

  global.ReviewAssistGenerate = {
    detectTone: detectTone,
    local: localGenerate,
    remote: generateWithGemini,
    hasKey: function () {
      var cfg = global.REVIEW_ASSIST_CONFIG || {};
      return !!(cfg.geminiApiKey && String(cfg.geminiApiKey).trim());
    }
  };
})(window);
