declare global {
  interface Window {
    turnstile?: {
      render: (element: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

const form = document.querySelector<HTMLFormElement>("[data-contact-form]");

if (form) {
  const status = form.querySelector<HTMLElement>("[data-form-status]");
  const button = form.querySelector<HTMLButtonElement>("[data-submit-button]");
  const tokenInput = form.querySelector<HTMLInputElement>("[data-turnstile-token]");
  const widgetContainer = form.querySelector<HTMLElement>("[data-turnstile-container]");
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();
  let widgetId: string | undefined;

  const setStatus = (message: string, state: "success" | "error" | "") => {
    if (!status) return;
    status.textContent = message;
    if (state) status.dataset.state = state;
    else delete status.dataset.state;
  };

  const showError = (field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, message: string) => {
    field.setAttribute("aria-invalid", "true");
    const error = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
    if (error) error.textContent = message;
  };

  const clearErrors = () => {
    form.querySelectorAll<HTMLElement>("[aria-invalid]").forEach((field) => field.removeAttribute("aria-invalid"));
    form.querySelectorAll<HTMLElement>("[data-error-for]").forEach((error) => { error.textContent = ""; });
  };

  const validate = () => {
    clearErrors();
    let valid = true;
    for (const name of ["name", "email", "service", "message"]) {
      const field = form.elements.namedItem(name);
      if (!(field instanceof HTMLInputElement || field instanceof HTMLSelectElement || field instanceof HTMLTextAreaElement)) continue;
      if (!field.value.trim()) {
        showError(field, "This field is required.");
        valid = false;
      } else if (field instanceof HTMLInputElement && field.type === "email" && !field.validity.valid) {
        showError(field, "Enter a valid email address.");
        valid = false;
      }
    }
    if (!valid) form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
    return valid;
  };

  if (siteKey && widgetContainer) {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.addEventListener("load", () => {
      if (!window.turnstile) return;
      widgetId = window.turnstile.render(widgetContainer, {
        sitekey: siteKey,
        callback: (token: string) => { if (tokenInput) tokenInput.value = token; },
        "expired-callback": () => { if (tokenInput) tokenInput.value = ""; },
        "error-callback": () => setStatus("Bot verification could not load. Please try again.", "error"),
      });
    });
    document.head.append(script);
  } else {
    setStatus("The contact form is not configured for submissions in this environment.", "error");
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (!siteKey || !tokenInput?.value) {
      setStatus("Complete the bot verification before sending your message.", "error");
      return;
    }
    if (!button) return;
    button.disabled = true;
    setStatus("Sending your message…", "");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json() as { success?: boolean; message?: string };
      if (!response.ok || !result.success) throw new Error(result.message || "Your message could not be sent.");
      form.reset();
      if (tokenInput) tokenInput.value = "";
      window.turnstile?.reset(widgetId);
      setStatus(result.message || "Your message was sent successfully.", "success");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Your message could not be sent. Please try again.", "error");
    } finally {
      button.disabled = false;
    }
  });
}

export {};