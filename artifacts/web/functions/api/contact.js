const SERVICES = new Set([
  "Website Design or Rebuild",
  "Website Hosting",
  "Business Email",
  "Domains or DNS",
  "Endpoint Security",
  "Existing AmeriHost Service",
  "Other",
]);

const json = (body, status = 200, headers = {}) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });

const clean = (value, max) => typeof value === "string" ? value.trim().slice(0, max) : "";
const escapeHtml = (value) => value.replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;",
}[character]));

export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") return json({ success: false, message: "Method not allowed." }, 405, { allow: "POST" });
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return json({ success: false, message: "Content type must be application/json." }, 415);
  }

  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return json({ success: false, message: "Request origin is not allowed." }, 403);
  }

  let input;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 20000) {
      return json({ success: false, message: "Request is too large." }, 413);
    }
    input = JSON.parse(rawBody);
  } catch {
    return json({ success: false, message: "Invalid request." }, 400);
  }

  const name = clean(input.name, 120);
  const company = clean(input.company, 160);
  const email = clean(input.email, 254);
  const phone = clean(input.phone, 60);
  const service = clean(input.service, 80);
  const message = clean(input.message, 10000);
  const honeypot = clean(input.website, 200);
  const turnstileToken = clean(input.turnstileToken, 2048);
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (honeypot) return json({ success: false, message: "Unable to process this request." }, 400);
  if (!name || !email || !service || !message || !emailPattern.test(email) || !SERVICES.has(service)) {
    return json({ success: false, message: "Check the required fields and try again." }, 400);
  }
  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    return json({ success: false, message: "Contact form delivery is not configured." }, 503);
  }
  if (!turnstileToken) return json({ success: false, message: "Bot verification is required." }, 400);

  const verificationBody = new FormData();
  verificationBody.set("secret", env.TURNSTILE_SECRET_KEY);
  verificationBody.set("response", turnstileToken);
  const remoteIp = request.headers.get("CF-Connecting-IP");
  if (remoteIp) verificationBody.set("remoteip", remoteIp);

  try {
    const verificationResponse = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: verificationBody,
    });
    if (!verificationResponse.ok) {
      return json({ success: false, message: "Bot verification could not be completed. Please try again." }, 502);
    }
    const verification = await verificationResponse.json();
    if (!verification || verification.success !== true) {
      return json({ success: false, message: "Bot verification failed. Please try again." }, 400);
    }

    const submittedHost = new URL(request.url).hostname;
    const submittedAt = new Date().toISOString();
    const rows = [
      ["Name", name], ["Company / Organization", company || "Not provided"], ["Email", email],
      ["Phone", phone || "Not provided"], ["Selected service", service], ["Message", message],
      ["Submitted domain/hostname", submittedHost], ["Submission timestamp", submittedAt],
    ];
    const html = `<h1>AmeriHost Website Contact</h1><table>${rows.map(([label, value]) =>
      `<tr><th style="text-align:left;vertical-align:top;padding:6px 12px 6px 0">${escapeHtml(label)}</th><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`
    ).join("")}</table>`;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
      body: JSON.stringify({
        from: env.CONTACT_FROM_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `AmeriHost Website Contact - ${service} - ${name}`,
        html,
      }),
    });
    if (!resendResponse.ok) return json({ success: false, message: "Your message could not be sent. Please try again." }, 502);
    return json({ success: true, message: "Your message was sent successfully." });
  } catch {
    return json({ success: false, message: "Your message could not be sent. Please try again." }, 502);
  }
}