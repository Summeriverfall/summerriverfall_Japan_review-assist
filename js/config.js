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
  // 线上必填：代理 URL（填入后 GitHub Pages 才能用 Gemini）
  // Apps Script: https://script.google.com/macros/s/XXXX/exec
  // 或 Vercel: https://你的项目.vercel.app/api/gemini
  geminiProxyUrl: "",

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
