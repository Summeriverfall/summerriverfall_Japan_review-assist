/**
 * Vercel Serverless：Gemini 代理
 * POST /api/gemini  body: { model, body }
 * 环境变量：GEMINI_API_KEY
 */
function pickOrigin(origin) {
  if (!origin) return "*";
  if (
    origin === "https://summeriverfall.github.io" ||
    /\.vercel\.app$/i.test(origin) ||
    /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin)
  ) {
    return origin;
  }
  return "https://summeriverfall.github.io";
}

module.exports = async function handler(req, res) {
  var allow = pickOrigin(req.headers.origin || "");
  res.setHeader("Access-Control-Allow-Origin", allow);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.json({ error: { message: "POST only" } });
  }

  var key = (process.env.GEMINI_API_KEY || "").trim();
  if (!key) {
    res.statusCode = 500;
    return res.json({ error: { message: "GEMINI_API_KEY not configured" } });
  }

  var payload = req.body;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (e) {
      res.statusCode = 400;
      return res.json({ error: { message: "invalid JSON" } });
    }
  }

  var model = String((payload && payload.model) || "gemini-3.1-flash-lite").trim();
  if (!/^[a-zA-Z0-9._-]+$/.test(model)) {
    res.statusCode = 400;
    return res.json({ error: { message: "invalid model" } });
  }

  var body = payload && payload.body;
  if (!body || typeof body !== "object") {
    res.statusCode = 400;
    return res.json({ error: { message: "missing body" } });
  }

  var url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    encodeURIComponent(model) +
    ":generateContent";

  try {
    var upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key
      },
      body: JSON.stringify(body)
    });
    var text = await upstream.text();
    res.statusCode = upstream.status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    return res.end(text);
  } catch (err) {
    res.statusCode = 502;
    return res.json({
      error: { message: String(err && err.message ? err.message : err) }
    });
  }
};
