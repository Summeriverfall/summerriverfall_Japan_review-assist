/**
 * Google Apps Script 代理（用你已有的 Google 账号，约 2 分钟跑通）
 *
 * ========== 部署步骤 ==========
 * 1. 打开 https://script.google.com → 新建项目
 * 2. 删掉编辑器里的默认代码，粘贴本文件全部内容
 * 3. 左侧齿轮「项目设置」→「脚本属性」→「添加脚本属性」
 *    属性：GEMINI_API_KEY
 *    值：你的 Gemini Key（aistudio.google.com/apikey）
 * 4. 右上角「部署」→「新建部署」
 *    - 类型：网页应用
 *    - 执行身份：我
 *    - 具有访问权限的用户：任何人
 *    → 部署 → 授权 → 复制「网页应用」URL
 *      （形如 https://script.google.com/macros/s/XXXX/exec）
 * 5. 把该 URL 发给我，或自己填进 js/config.js 的 geminiProxyUrl
 */

function doPost(e) {
  try {
    var key = PropertiesService.getScriptProperties().getProperty("GEMINI_API_KEY");
    if (!key) {
      return jsonOut_({ error: { message: "GEMINI_API_KEY not set in Script Properties" } });
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
    return jsonOut_({ error: { message: String(err && err.message ? err.message : err) } });
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, service: "review-assist-gemini-proxy" })
  ).setMimeType(ContentService.MimeType.JSON);
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
