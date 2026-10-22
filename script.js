// Persist the visitor's preferred color theme when browser storage is available.
const root = document.documentElement;
const toggle = document.querySelector(".theme-toggle");
const icon = document.querySelector(".theme-icon");
const label = document.querySelector(".theme-label");

function readSavedTheme() {
  try { return localStorage.getItem("portfolio-theme"); }
  catch (error) { return null; }
}

function saveTheme(theme) {
  try { localStorage.setItem("portfolio-theme", theme); }
  catch (error) { /* The theme still works for this visit if storage is unavailable. */ }
}

function applyTheme(theme) {
  const isDark = theme === "dark";
  root.dataset.theme = theme;
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} mode`);
  icon.textContent = isDark ? "☀" : "☾";
  label.textContent = isDark ? "Light" : "Dark";
}

const savedTheme = readSavedTheme();
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme === "dark" || savedTheme === "light" ? savedTheme : systemTheme);

toggle.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  saveTheme(nextTheme);
});

// Show project screenshots without navigating away from the portfolio.
document.querySelectorAll("[data-lightbox-open]").forEach((button) => {
  const dialog = document.getElementById(button.dataset.lightboxOpen);
  if (dialog) button.addEventListener("click", () => dialog.showModal());
});

document.querySelectorAll(".image-lightbox").forEach((dialog) => {
  const closeButton = dialog.querySelector("[data-lightbox-close]");
  if (closeButton) closeButton.addEventListener("click", () => dialog.close());

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});
