(function () {
  const site = window.SITE || {};

  document.querySelectorAll("[data-fill='publisher']").forEach(node => {
    node.textContent = site.publisher || "[Publisher legal name]";
  });

  document.querySelectorAll("[data-fill='email']").forEach(node => {
    const email = site.email || "[Contact email]";
    node.textContent = email;
    if (node.tagName === "A" && email.includes("@") && !email.includes("[")) {
      node.setAttribute("href", "mailto:" + email);
    }
  });

  document.querySelectorAll("[data-fill='updated']").forEach(node => {
    if (site.updated) {
      node.textContent = site.updated;
    }
  });

  document.querySelectorAll("[data-link='privacy']").forEach(node => {
    if (site.privacyUrl) {
      node.setAttribute("href", site.privacyUrl);
    }
  });

  document.querySelectorAll("[data-link='terms']").forEach(node => {
    if (site.termsUrl) {
      node.setAttribute("href", site.termsUrl);
    }
  });

  const draft = document.querySelector("[data-draft]");
  if (draft) {
    const unfinished =
      !site.publisher ||
      site.publisher.includes("[") ||
      !site.email ||
      site.email.includes("[") ||
      !String(site.privacyUrl || "").startsWith("https://") ||
      !String(site.termsUrl || "").startsWith("https://");
    draft.hidden = !unfinished;
  }

  function setLang(lang) {
    const next = lang === "vi" ? "vi" : "en";
    document.documentElement.lang = next;
    document.querySelectorAll("[data-lang-panel]").forEach(panel => {
      panel.hidden = panel.getAttribute("data-lang-panel") !== next;
    });
    document.querySelectorAll("[data-set-lang]").forEach(button => {
      button.setAttribute(
        "aria-pressed",
        button.getAttribute("data-set-lang") === next ? "true" : "false",
      );
    });
    document.querySelectorAll("[data-label-en]").forEach(node => {
      const label = node.getAttribute(next === "vi" ? "data-label-vi" : "data-label-en");
      if (label) {
        node.textContent = label;
      }
    });
    const heading = document.querySelector(`[data-lang-panel="${next}"] h1`);
    if (heading) {
      document.title = `${heading.textContent} — Document Assistant`;
    }
  }

  document.querySelectorAll("[data-set-lang]").forEach(button => {
    button.addEventListener("click", () => {
      setLang(button.getAttribute("data-set-lang"));
    });
  });

  setLang("en");
})();
