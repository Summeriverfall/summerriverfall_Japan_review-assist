/**
 * Cloudflare Worker：Gemini 代理（Key 只存在 Worker 密钥里，不进前端）
 *
 * 部署（约 3 分钟）：
 * 1. 打开 https://dash.cloudflare.com → Workers & Pages → Create → Create Worker
 * 2. 把本文件全部内容粘贴进去 → Deploy
 * 3. Settings → Variables and Secrets → Add → Secret
 *    名称：GEMINI_API_KEY
 *    值：你在 aistudio.google.com/apikey 新建的 Key（不要再用已公开的旧 Key）
 * 4. 复制 Worker 地址，例如 https://review-assist-gemini.你的账号.workers.dev
 * 5. 填进 js/config.js 的 geminiProxyUrl，推送到 GitHub Pages
 *
 * 可选：Settings → Triggers → Add Custom Domain
 */
export default {
  async fetch(request, env) {
    var origin = request.headers.get("Origin") || "";
    var cors = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: cors });
    }

    if (request.method !== "POST") {
      return json({ error: "POST only" }, 405, cors);
    }

    var key = (env.GEMINI_API_KEY || "").trim();
    if (!key) {
      return json({ error: "GEMINI_API_KEY secret not set" }, 500, cors);
    }

    var payload;
    try {
      payload = await request.json();
    } catch (e) {
      return json({ error: "invalid JSON" }, 400, cors);
    }

    var model = String(payload.model || "gemini-3.1-flash-lite").trim();
    if (!/^[a-zA-Z0-9._-]+$/.test(model)) {
      return json({ error: "invalid model" }, 400, cors);
    }

    var body = payload.body;
    if (!body || typeof body !== "object") {
      return json({ error: "missing body" }, 400, cors);
    }

    var url =
      "https://generativelanguage.googleapis.com/v1beta/models/" +
      encodeURIComponent(model) +
      ":generateContent";

    var upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key
      },
      body: JSON.stringify(body)
    });

    var text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: Object.assign(
        {
          "Content-Type": "application/json; charset=utf-8"
        },
        cors
      )
    });
  }
};

function allowedOrigin(origin) {
  if (!origin) return "";
  if (
    origin === "https://summeriverfall.github.io" ||
    /^https:\/\/[a-z0-9-]+\.workers\.dev$/i.test(origin) ||
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)
  ) {
    return origin;
  }
  return "";
}

function corsHeaders(origin) {
  var allow = allowedOrigin(origin) || "https://summeriverfall.github.io";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin"
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status: status || 200,
    headers: Object.assign(
      { "Content-Type": "application/json; charset=utf-8" },
      cors || {}
    )
  });
}
