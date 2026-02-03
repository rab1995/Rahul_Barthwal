// assets/js/custom.js
(() => {
  "use strict";

  /* ---------- Helpers ---------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const prefersReducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function toast(msg) {
    let t = $("#toast-lite");
    if (!t) {
      t = document.createElement("div");
      t.id = "toast-lite";
      t.className = "toast-lite";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(() => t.classList.remove("show"), 1600);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied!");
    } catch {
      // Fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      toast("Copied!");
    }
  }

  /* ---------- Theme toggle (consistent accent) ---------- */
  function mountThemeToggle() {
    const header = $("#header .container-fluid");
    if (!header) return;

    // Avoid duplicates across pages
    if ($("#themeToggle")) return;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.id = "themeToggle";
    btn.className = "btn-soft btn-accent";
    btn.setAttribute("aria-label", "Toggle theme");
    btn.innerHTML = `<i class="bi bi-moon-stars"></i>`;

    const social = $("#header .header-social-links");
    if (social) social.insertAdjacentElement("afterend", btn);
    else header.appendChild(btn);

    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.body.classList.add("theme-dark");

    const syncIcon = () => {
      const isDark = document.body.classList.contains("theme-dark");
      btn.querySelector("i")?.classList.toggle("bi-moon-stars", !isDark);
      btn.querySelector("i")?.classList.toggle("bi-sun", isDark);
    };
    syncIcon();

    btn.addEventListener("click", () => {
      document.body.classList.toggle("theme-dark");
      const isDark = document.body.classList.contains("theme-dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      syncIcon();
      toast(isDark ? "Dark mode" : "Light mode");
    });
  }

  /* ---------- Scroll spy for top nav ---------- */
  function mountScrollSpy(linksSelector = "#navbar a.nav-link.scrollto", activeClass = "active") {
    const links = $$(linksSelector);
    const targets = links
      .map(a => $(a.getAttribute("href")))
      .filter(Boolean);

    if (!targets.length) return;

    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      links.forEach(a => a.classList.remove(activeClass));
      const active = links.find(a => a.getAttribute("href") === `#${visible.target.id}`);
      if (active) active.classList.add(activeClass);
    }, { root: null, threshold: [0.25, 0.5, 0.75] });

    targets.forEach(t => obs.observe(t));
  }

  /* ---------- Publications search (filters existing list items) ---------- */
  function mountPublicationsSearch() {
    const pub = $("#publications");
    if (!pub) return;

    const titleBlock = $(".section-title", pub);
    if (!titleBlock) return;

    // Avoid duplicates
    if ($("#pubSearch")) return;

    const wrap = document.createElement("div");
    wrap.className = "search-row";
    wrap.innerHTML = `
      <input id="pubSearch" type="search" placeholder="Search publications (author, title, journal, year)..." autocomplete="off">
      <button class="btn-soft" type="button" id="pubClear"><i class="bi bi-x-circle"></i>Clear</button>
    `;
    titleBlock.insertAdjacentElement("afterend", wrap);

    const input = $("#pubSearch");
    const clear = $("#pubClear");
    const listItems = $$("#publications li");

    function applyFilter(q) {
      const query = q.trim().toLowerCase();
      listItems.forEach(li => {
        const hit = li.textContent.toLowerCase().includes(query);
        const ul = li.closest("ul") || li;
        ul.style.display = hit || !query ? "" : "none";
      });
    }

    input.addEventListener("input", () => applyFilter(input.value));
    clear.addEventListener("click", () => {
      input.value = "";
      applyFilter("");
      input.focus();
      toast("Cleared");
    });
  }

  /* ---------- Hover-to-copy (no extra buttons) ---------- */
  function mountCopyHover() {
    const emailText = "rahul.barthwal@mathematik.uni-stuttgart.de";
    const phoneText = "+49 711 685 65884";

    const emailNodes = $$("*").filter(el => el.childElementCount === 0 && el.textContent.trim() === emailText);
    const phoneNodes = $$("*").filter(el => el.childElementCount === 0 && el.textContent.trim() === phoneText);

    const candidates = [
      ...emailNodes.map(node => ({ node, value: emailText, hint: "Click to copy email" })),
      ...phoneNodes.map(node => ({ node, value: phoneText, hint: "Click to copy phone" }))
    ];

    candidates.forEach(({ node, value, hint }) => {
      // Make it keyboard accessible as well
      node.classList.add("copy-hover");
      node.setAttribute("role", "button");
      node.setAttribute("tabindex", "0");
      node.setAttribute("data-copy-hint", hint);
      node.setAttribute("title", hint);

      const onCopy = () => copyText(value);

      node.addEventListener("click", onCopy);
      node.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCopy();
        }
      });
    });
  }

  /* ---------- Make AOS animate both directions ---------- */
  function mountAOSOptions() {
    // The template initializes AOS with once:true. We re-init after load with once:false.
    window.addEventListener("load", () => {
      if (!window.AOS) return;
      try {
        window.AOS.init({
          duration: 900,
          easing: "ease-in-out",
          once: false,
          mirror: true
        });
        window.AOS.refresh();
      } catch {
        // no-op
      }
    });
  }

  /* ---------- Top-right hamburger that opens a section sidebar (drawer) ---------- */
  function mountSectionDrawer() {
    const main = $("#main");
    if (!main) return;

    // Only add on the one-page landing where section anchors exist
    const sectionLinks = $$("#navbar a.nav-link.scrollto")
      .map(a => ({
        href: a.getAttribute("href"),
        label: (a.textContent || "").trim()
      }))
      .filter(x => x.href && x.href.startsWith("#") && document.getElementById(x.href.slice(1)));

    if (sectionLinks.length < 3) return;

    // Avoid duplicates
    if ($("#sectionDrawer")) return;

    // Add toggle button in header (top-right)
    const header = $("#header .container-fluid");
    if (header && !$("#drawerToggle")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.id = "drawerToggle";
      btn.className = "btn-soft drawer-toggle";
      btn.setAttribute("aria-label", "Open section menu");
      btn.setAttribute("aria-controls", "sectionDrawer");
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = `<i class="bi bi-list"></i>`;

      // Place it at the far right, after the last nav item (Contact)
      const navEl = $("#navbar", header);
      const navList = navEl ? navEl.querySelector("ul") : null;
      if (navList) navList.insertAdjacentElement("afterend", btn);
      else if (navEl) navEl.appendChild(btn);
      else header.appendChild(btn);
    }

    // Drawer markup
    const backdrop = document.createElement("div");
    backdrop.id = "sectionDrawerBackdrop";
    backdrop.className = "drawer-backdrop";

    const drawer = document.createElement("aside");
    drawer.id = "sectionDrawer";
    drawer.className = "section-drawer";
    drawer.setAttribute("aria-hidden", "true");
    drawer.innerHTML = `
      <div class="drawer-header">
        <div class="drawer-title">Sections</div>
        <button type="button" class="btn-soft drawer-close" aria-label="Close menu"><i class="bi bi-x"></i></button>
      </div>
      <nav class="drawer-links" aria-label="Section links"></nav>
    `;

    const nav = drawer.querySelector(".drawer-links");
    sectionLinks.forEach(s => {
      const a = document.createElement("a");
      a.href = s.href;
      a.textContent = s.label || s.href.replace("#", "");
      a.className = "drawer-link";
      a.addEventListener("click", (e) => {
        const id = s.href.slice(1);
        const target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
        history.replaceState(null, "", s.href);
        close();
      });
      nav.appendChild(a);
    });

    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);

    const toggleBtn = $("#drawerToggle");
    const closeBtn = drawer.querySelector(".drawer-close");

    const open = () => {
      document.body.classList.add("drawer-open");
      drawer.setAttribute("aria-hidden", "false");
      toggleBtn?.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      document.body.classList.remove("drawer-open");
      drawer.setAttribute("aria-hidden", "true");
      toggleBtn?.setAttribute("aria-expanded", "false");
    };

    toggleBtn?.addEventListener("click", () => {
      if (document.body.classList.contains("drawer-open")) close();
      else open();
    });
    backdrop.addEventListener("click", close);
    closeBtn?.addEventListener("click", close);

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && document.body.classList.contains("drawer-open")) close();
    });

    // Highlight active link in drawer (scroll spy)
    const drawerLinks = $$(".drawer-link", drawer);
    const targets = sectionLinks.map(s => document.getElementById(s.href.slice(1))).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      drawerLinks.forEach(l => l.classList.remove("active"));
      const active = drawerLinks.find(l => l.getAttribute("href") === `#${visible.target.id}`);
      if (active) active.classList.add("active");
    }, { threshold: [0.25, 0.5, 0.75] });
    targets.forEach(t => obs.observe(t));
  }

  document.addEventListener("DOMContentLoaded", () => {
    mountThemeToggle();
    mountScrollSpy();
    mountPublicationsSearch();
    mountCopyHover();
    mountAOSOptions();
  });
})();
