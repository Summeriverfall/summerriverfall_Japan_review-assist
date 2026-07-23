/**
 * 评论辅助 — 门店与 API 配置
 *
 * ========== Gemini（本页可直接用，推荐）==========
 * 1. 打开：https://aistudio.google.com/apikey
 * 2. 登录 Google → Create API key
 * 3. 把 Key 贴到下方 geminiApiKey（一般以 AIza 开头）
 * 4. 保存后刷新；成功时状态栏显示「已用 Gemini 生成」
 *
 * ========== 关于 GPT / ChatGPT ==========
 * ChatGPT 网页账号 ≠ OpenAI API Key，两边计费也分开。
 * 拿 API Key：https://platform.openai.com/api-keys
 *   （需登录 platform.openai.com，开通付费/绑卡后才能调 API）
 * 注意：OpenAI API 默认不允许在浏览器里直接调用（CORS），
 * 本静态页不能像 Gemini 一样直接塞 GPT Key；要用 GPT 需另做后端代理。
 * 因此当前仍用 Gemini；已放宽解析，减少 bad_model_output。
 *
 * 二维码落地：
 *   massage.html?id=demo-massage
 *   bar.html?id=demo-bar
 */
window.REVIEW_ASSIST_CONFIG = {
  // ↓↓↓ Gemini Key（静态站前端可见，建议在 AI Studio 设 HTTP referrer 限制）↓↓↓
  geminiApiKey: "AQ.Ab8RN6JGYs-O7I-8FHa2uGD324nRTDZNAXnUwVxOStw0KrLarQ",

  // 主模型（失败会自动尝试其他 flash）
  geminiModel: "gemini-2.5-flash-lite",

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
