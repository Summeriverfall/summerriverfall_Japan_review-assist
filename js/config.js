/**
 * 评论辅助 — 门店与 API 配置
 *
 * 本地：填 geminiApiKey 即可
 * 线上 GitHub Pages：必须填 geminiProxyUrl（见 proxy/google-apps-script.js）
 *
 * 二维码落地：
 *   massage.html?id=demo-massage
 *   bar.html?id=demo-bar
 */
window.REVIEW_ASSIST_CONFIG = {
  // 线上代理 URL（Apps Script 的 /exec 地址）。有值时优先走代理。
  geminiProxyUrl: "",

  // 本地直连用；线上有代理时可不依赖此字段
  geminiApiKey: "AQ.Ab8RN6L-8UNLwjN3rBvga5RCVgolQ5wV0OixP2mWBeQAsYvBIA",

  geminiModel: "gemini-3.1-flash-lite",

  stores: {
    "demo-massage": {
      name: "示例按摩店",
      reviewUrl: "https://www.google.com/maps"
    },
    "demo-bar": {
      name: "示例酒吧",
      reviewUrl: "https://www.google.com/maps"
    }
  }
};
