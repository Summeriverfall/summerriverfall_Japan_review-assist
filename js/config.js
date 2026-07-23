/**
 * 评论辅助 — 门店与 API 配置
 *
 * ========== 本地 ==========
 * 填 geminiApiKey 后，直接打开 HTML 即可（与之前一样）。
 *
 * ========== 线上 GitHub Pages ==========
 * 浏览器直连会被 Google 拒绝，必须填 geminiProxyUrl：
 * 1. 按 proxy/google-apps-script.js 顶部说明部署代理
 * 2. 把 /exec 地址贴到下方 geminiProxyUrl
 * 3. 推送后强制刷新；成功时显示「已用 Gemini 生成」
 *
 * 二维码落地：
 *   massage.html?id=demo-massage
 *   bar.html?id=demo-bar
 */
window.REVIEW_ASSIST_CONFIG = {
  // 线上代理（Apps Script 网页应用 URL，以 /exec 结尾）
  geminiProxyUrl: "",

  // 本地直连用
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
