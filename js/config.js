/**
 * 评论辅助 — 门店与 API 配置
 *
 * Gemini：填 geminiApiKey 后刷新；成功时状态栏显示「已用 Gemini 生成」
 * 主模型请用 3.x（如 gemini-3.1-flash-lite）；2.5 对新用户不可用
 *
 * 二维码落地：
 *   massage.html?id=demo-massage
 *   bar.html?id=demo-bar
 */
window.REVIEW_ASSIST_CONFIG = {
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
