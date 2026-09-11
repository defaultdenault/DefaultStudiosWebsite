/* =========================================================
   DEFAULT STUDIOS :: script.js
   "It works in my browser." - webmaster, 2002
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------
     1. VISITOR COUNTER (odometer style)
     Stored locally because we do not have a CGI-BIN.
     --------------------------------------------------- */
  function initCounter() {
    var box = document.getElementById("hitcounter");
    if (!box) return;

    var BASE = 13372;
    var n;
    try {
      n = parseInt(localStorage.getItem("ds_hits") || "0", 10);
      if (!n || n < 1) n = 0;
      n += 1;
      localStorage.setItem("ds_hits", String(n));
    } catch (e) {
      n = 1;
    }

    var total = String(BASE + n);
    while (total.length < 6) total = "0" + total;

    box.innerHTML = "";
    for (var i = 0; i < total.length; i++) {
      var d = document.createElement("i");
      d.textContent = total.charAt(i);
      box.appendChild(d);
    }
  }

  /* ---------------------------------------------------
     2. SPARKLE CURSOR TRAIL
     Purely decorative - the real mouse cursor is
     untouched and stays visible at all times.
     --------------------------------------------------- */
  var COLORS = ["#5bc0dd", "#1f6fbf", "#e8402a", "#f0568f", "#ffd23a"];
  var lastSpark = 0;

  function sparkle(e) {
    var now = Date.now();
    if (now - lastSpark < 45) return;
    lastSpark = now;

    var s = document.createElement("div");
    s.className = "spark";
    s.style.left = (e.clientX + 8) + "px";
    s.style.top = (e.clientY + 8) + "px";
    s.style.background = COLORS[Math.floor(Math.random() * COLORS.length)];
    s.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
    s.style.transition = "opacity .6s linear, transform .6s linear";
    document.body.appendChild(s);

    requestAnimationFrame(function () {
      s.style.opacity = "0";
      s.style.transform = "translateY(16px) scale(.3) rotate(90deg)";
    });
    setTimeout(function () {
      if (s.parentNode) s.parentNode.removeChild(s);
    }, 650);
  }

  function initSparkles() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    document.addEventListener("mousemove", sparkle);
  }

  /* ---------------------------------------------------
     3. LAST UPDATED STAMP
     --------------------------------------------------- */
  function initStamp() {
    var el = document.getElementById("lastmod");
    if (!el) return;
    var d = new Date(document.lastModified);
    var months = ["January", "February", "March", "April", "May", "June",
                  "July", "August", "September", "October", "November", "December"];
    el.textContent = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
  }

  /* ---------------------------------------------------
     4. EMAIL LINK (assembled to annoy spam robots)
     --------------------------------------------------- */
  function initMail() {
    var user = "defaultstudiossupport";
    var host = "gmail" + "." + "com";
    var addr = user + "@" + host;
    var spots = document.querySelectorAll(".mailhere");
    for (var i = 0; i < spots.length; i++) {
      var a = document.createElement("a");
      a.href = "mailto:" + addr;
      a.textContent = addr;
      spots[i].innerHTML = "";
      spots[i].appendChild(a);
    }
  }

  /* ---------------------------------------------------
     5. GUESTBOOK (giscus - real GitHub sign-in)
     Entries are stored as GitHub Discussions on our own
     repository. Settings live in guestbook-config.js.
     --------------------------------------------------- */
  function setupPanel(mount) {
    var box = document.createElement("div");
    box.className = "panel alert";
    box.innerHTML =
      '<div class="construction" style="margin:0 0 12px 0;">' +
        '<span>&#9888; GUESTBOOK NOT CONFIGURED YET &#9888;</span>' +
      '</div>' +
      '<p><b>Webmaster:</b> the guestbook needs four values before it can talk to GitHub. ' +
      'Open <code>guestbook-config.js</code> &mdash; the instructions are at the top of the file.</p>' +
      '<ol style="line-height:1.7;">' +
        '<li>Push this site to a <b>public</b> GitHub repository.</li>' +
        '<li>Enable <b>Discussions</b> in the repository settings.</li>' +
        '<li>Install the <a href="https://github.com/apps/giscus" target="_blank" rel="noopener">giscus app</a> on it.</li>' +
        '<li>Get your four values from <a href="https://giscus.app" target="_blank" rel="noopener">giscus.app</a> ' +
            'and paste them into <code>guestbook-config.js</code>.</li>' +
      '</ol>' +
      '<p style="margin-bottom:0;font-size:12px;color:#6d838b;">' +
      'Visitors see this notice too, so it is worth doing sooner rather than later.</p>';
    mount.appendChild(box);
  }

  function localNotice(mount) {
    var box = document.createElement("div");
    box.className = "panel";
    box.innerHTML =
      '<b>&#9432; Guestbook preview unavailable on a local file.</b>' +
      '<p style="margin-bottom:0;">GitHub needs to reach this page over the internet in order ' +
      'to sign visitors in, so the guestbook only appears on the published site. ' +
      'Everything else on this page works exactly as it will once deployed.</p>';
    mount.appendChild(box);
  }

  function initGuestbook() {
    var mount = document.getElementById("guestbook-mount");
    if (!mount) return;

    var cfg = window.GUESTBOOK_CONFIG || {};
    var ready = cfg.repo && cfg.repoId && cfg.category && cfg.categoryId;

    if (!ready) { setupPanel(mount); return; }

    // giscus signs people in through GitHub, which cannot happen
    // from a file:// page or from localhost.
    var host = location.hostname;
    var servedPublicly = location.protocol.indexOf("http") === 0 &&
                         host !== "localhost" && host !== "127.0.0.1" && host !== "";
    if (!servedPublicly) { localNotice(mount); return; }

    // Point giscus at our own stylesheet so the comment box
    // matches the rest of the site.
    var themeUrl = location.origin +
      location.pathname.replace(/[^/]*$/, "") + "giscus-theme.css";

    var s = document.createElement("script");
    s.src = "https://giscus.app/client.js";
    s.crossOrigin = "anonymous";
    s.async = true;
    s.setAttribute("data-repo", cfg.repo);
    s.setAttribute("data-repo-id", cfg.repoId);
    s.setAttribute("data-category", cfg.category);
    s.setAttribute("data-category-id", cfg.categoryId);
    s.setAttribute("data-mapping", "specific");
    s.setAttribute("data-term", cfg.term || "Default Studios Guestbook");
    s.setAttribute("data-strict", "0");
    s.setAttribute("data-reactions-enabled", "1");
    s.setAttribute("data-emit-metadata", "0");
    s.setAttribute("data-input-position", "top");
    s.setAttribute("data-theme", themeUrl);
    s.setAttribute("data-lang", "en");
    s.setAttribute("data-loading", "lazy");

    s.onerror = function () {
      var err = document.createElement("div");
      err.className = "panel alert";
      err.innerHTML = "<b>&#9888; The guestbook could not load.</b>" +
        "<p style='margin-bottom:0;'>giscus.app may be blocked by an ad blocker or a network " +
        "filter. You can always reach us on the <a href='contact.html'>contact page</a> instead.</p>";
      mount.appendChild(err);
    };

    mount.appendChild(s);
  }

  /* ---------------------------------------------------
     6. BOOT
     --------------------------------------------------- */
  function boot() {
    initCounter();
    initSparkles();
    initStamp();
    initMail();
    initGuestbook();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
