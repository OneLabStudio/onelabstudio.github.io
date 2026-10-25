(function () {
  function init() {
    var body = document.body;
    var path = location.pathname.replace(/\/+$/, "");

    // Wrap the existing text so it is untouched, just styled
    var doc = document.createElement("main");
    doc.className = "doc";
    doc.id = "top";
    while (body.firstChild) doc.appendChild(body.firstChild);

    var h2s = doc.querySelectorAll("h2");
    if (h2s[0]) h2s[0].classList.add("subtitle"); // "OneLab Studio Android Applications"

    // Contents list from section headings
    var items = [];
    h2s.forEach(function (h, i) {
      if (i === 0) return;
      if (!h.id) h.id = "s" + i;
      items.push('<li><a href="#' + h.id + '">' + h.textContent.trim() + "</a></li>");
    });
    var toc = document.createElement("nav");
    toc.className = "toc";
    toc.setAttribute("aria-label", "Contents");
    toc.innerHTML = "<strong>Contents</strong><ul>" + items.join("") + "</ul>";
    var updated = doc.querySelector("p");
    if (updated) updated.insertAdjacentElement("afterend", toc);

    var header = document.createElement("header");
    header.className = "site-header";
    header.innerHTML =
      '<div class="in"><a class="brand" href="/"><span class="mark" aria-hidden="true"></span>OneLab Studio</a>' +
      '<nav aria-label="Main"><a href="/privacy"' + (path === "/privacy" ? " aria-current=\"page\"" : "") +
      '>Privacy</a><a href="/terms"' + (path === "/terms" ? " aria-current=\"page\"" : "") + ">Terms</a></nav></div>";

    var footer = document.createElement("footer");
    footer.className = "site-footer";
    footer.innerHTML =
      "<span>© 2026 OneLab Studio</span>" +
      '<nav aria-label="Legal"><a href="/">Home</a><a href="/privacy">Privacy Policy</a>' +
      '<a href="/terms">Terms</a><a href="#top">Back to top</a></nav>';

    body.appendChild(header);
    body.appendChild(doc);
    body.appendChild(footer);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
