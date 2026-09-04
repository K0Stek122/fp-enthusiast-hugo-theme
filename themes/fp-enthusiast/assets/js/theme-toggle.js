// The theme's only client-side script: a manual light/dark override.
(function () {
  "use strict";
  var root = document.documentElement;
  var btn = document.querySelector(".theme-toggle");
  if (!btn) return;
  var mql = window.matchMedia("(prefers-color-scheme: dark)");
  function current() {
    return root.getAttribute("data-theme") || (mql.matches ? "dark" : "light");
  }
  function sync() {
    btn.setAttribute("aria-pressed", current() === "dark" ? "true" : "false");
  }
  btn.addEventListener("click", function () {
    var next = current() === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
    sync();
  });
  mql.addEventListener("change", function () {
    try { if (!localStorage.getItem("theme")) sync(); } catch (e) { sync(); }
  });
  sync();
})();
