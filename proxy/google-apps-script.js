/**
 * Google Apps Script — 线上 Gemini 代理
 *
 * 为什么需要：GitHub Pages 浏览器直连 Gemini 会被拒（Origin=github.io）。
 * 代理在 Google 服务器上带 Key 调用，前端只请求这个网页应用地址。
 *
 * ========== 部署（约 3 分钟）==========
 * 1. 打开 https://script.google.com → 新建项目
 * 2. 删除编辑器默认代码，粘贴本文件全部内容 → 保存（Ctrl+S）
 * 3. 左侧齿轮「项目设置」→ 向下找到「脚本属性」→「添加脚本属性」
 *      属性：GEMINI_API_KEY
 *      值：你的 Key（与本地 config.js 里同一把即可）
 * 4. 右上角「部署」→「新建部署」
 *      类型：网页应用
 *      说明：review-assist-gemini（随意）
 *      执行身份：我
 *      具有访问权限的用户：任何人
 * 5. 部署 → 按提示授权 Google 账号
 * 6. 复制「网页应用」URL（以 /exec 结尾）
 * 7. 发给助手，或自己写入 js/config.js 的 geminiProxyUrl
 *
 * 测试：浏览器打开该 /exec 地址，应看到 {"ok":true,...}
 */

function doPost(e) {
  try {
    var key = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
    if (!key) {
      return jsonOut_({
        error: { message: "GEMINI_API_KEY not set in Script Properties" }
      });
    }

    var raw = (e && e.postData && e.postData.contents) || "{}";
    var payload = JSON.parse(raw);
    var model = String(payload.model || "gemini-3.1-flash-lite");
    if (!/^[a-zA-Z0-9._-]+$/.test(model)) {
      return jsonOut_({ error: { message: "invalid model" } });
    }
    var body = payload.body;
    if (!body) {
      return jsonOut_({ error: { message: "missing body" } });
    }

    var url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(model) +
      ":generateContent";

    var resp = UrlFetchApp.fetch(url, {
      method: "post",
      contentType: "application/json",
      headers: { "x-goog-api-key": key },
      payload: JSON.stringify(body),
      muteHttpExceptions: true
    });

    return ContentService.createTextOutput(resp.getContentText()).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return jsonOut_({
      error: { message: String(err && err.message ? err.message : err) }
    });
  }
}

function doGet() {
  return jsonOut_({ ok: true, service: "review-assist-gemini-proxy" });
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
