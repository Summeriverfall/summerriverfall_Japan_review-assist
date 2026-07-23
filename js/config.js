/**
 * 评论辅助 — 门店与 API 配置
 *
 * ========== Gemini（GitHub Pages 必须用代理）==========
 * 原因：AQ. Auth Key 写进公开网页会被 Google 按「密钥泄露」拦截，
 *       表现为线上失败、本地却正常。
 *
 * 线上步骤：
 * 1. aistudio.google.com/apikey 新建一把 Key（旧 Key 已公开，建议作废）
 * 2. 按 proxy/cloudflare-worker.js 顶部说明部署 Cloudflare Worker
 * 3. 把 Worker 地址填到下方 geminiProxyUrl
 * 4. 推送后强制刷新；成功时显示「已用 Gemini 生成」
 *
 * 本地调试（可选）：
 * - 复制 js/config.local.example.js → js/config.local.js
 * - 在里面填 geminiApiKey（该文件已 gitignore，不会上传）
 *
 * 二维码落地：
 *   massage.html?id=demo-massage
 *   bar.html?id=demo-bar
 */
window.REVIEW_ASSIST_CONFIG = {
  // 线上：填 Cloudflare Worker 地址（推荐）。不要把 Key 写进这个公开文件。
  geminiProxyUrl: "",

  // 仅本地调试用；线上请留空，改用 geminiProxyUrl
  geminiApiKey: "",

  // 主模型（失败会自动尝试其他 flash；新项目请用 3.x，2.5 对新用户不可用）
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
