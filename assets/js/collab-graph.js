// assets/js/collab-graph.js
// Collaboration network for the "Collaborations" section.
// Edit the PEOPLE / LINKS arrays below to update the graph. No libraries needed.
(() => {
  "use strict";

  /* ------------------------------------------------------------------
     DATA  (edit here)
     country : "" leaves the node grey ("Country not set")
     inst    : institution shown in the hover card (optional)
     url     : personal / institute homepage (optional)
     paper   : fallback link used for node clicks when no homepage is set
     papers  : all joint papers shown in the hover card (title + optional url)
     work    : very short description of the joint work
     ------------------------------------------------------------------ */
  const ME = { short: "RB" };

  const PEOPLE = [
    { id: "rohde", name: "Christian Rohde", supervisorRole: "Postdoc supervisor", country: "Germany", inst: "University of Stuttgart",
      url: "https://www.ians.uni-stuttgart.de/institute/team/Rohde/",
      paper: "https://doi.org/10.1137/25M1736992", work: "Thin-film flows, hyperbolic approximations",
      papers: [
        { title: "Global existence for a class of Keyfitz–Kranzer systems with application to thin-film flows", url: "https://arxiv.org/abs/2604.16000" },
        { title: "On hyperbolic approximations for a class of dispersive and diffusive-dispersive equations", url: "https://link.springer.com/article/10.1007/s00332-026-10321-4" },
        { title: "Energy consistent hyperbolic approximation for a class of fourth-order partial differential equations", url: "https://arxiv.org/abs/2608.09478" },
        { title: "A hyperbolic model for two-layer thin film flow with a perfectly soluble anti-surfactant", url: "https://doi.org/10.1137/25M1736992" },
        { title: "Existence and stability of the Riemann solutions for a non-symmetric Keyfitz–Kranzer type model", url: "https://iopscience.iop.org/article/10.1088/1361-6544/ae4afc" },
        { title: "A generalized Riemann problem solver for a hyperbolic model governing two-layer thin film flow", url: "https://link.springer.com/article/10.1007/s10915-025-03151-1" },
        { title: "Convergence of an operator splitting Lax-Friedrichs scheme for a class of nonlocal balance laws" },
        { title: "A second-order relaxation system for a degenerate-parabolic quasilinear fourth-order rimming-flow equation with critical spectrum", url: "https://doi.org/10.48550/arXiv.2611.34555" },
        { title: "Entropy dissipative high order schemes for a hyperbolic model of two-layer thin film flow", url: "https://arxiv.org/abs/2610.02059" },
        { title: "Convergence of an operator-splitting Lax-Friedrichs scheme for the Burgers-Hilbert equation" }
      ] },
    { id: "oeffner", name: "Philipp Öffner", country: "Germany", inst: "TU Clausthal",
      url: "https://www.mathematik.tu-clausthal.de/en/about-us/staff/professors/prof-dr-philipp-oeffner",
      paper: "https://arxiv.org/abs/2604.16000", work: "Keyfitz–Kranzer systems, entropy stable schemes",
      papers: [
        { title: "Global existence for a class of Keyfitz–Kranzer systems with application to thin-film flows", url: "https://arxiv.org/abs/2604.16000" },
        { title: "Entropy dissipative high order schemes for a hyperbolic model of two-layer thin film flow", url: "https://arxiv.org/abs/2610.02059" }
      ] },
    { id: "dhaouadi", name: "Firas Dhaouadi", country: "France", inst: "INRIA Bordeaux",
      url: "https://sweb.math.u-bordeaux.fr/fr/fiche-personnelle-fdhaouadi001",
      paper: "https://link.springer.com/article/10.1007/s00332-026-10321-4", work: "Hyperbolic approximations of dispersive PDEs",
      papers: [
        { title: "On hyperbolic approximations for a class of dispersive and diffusive-dispersive equations", url: "https://link.springer.com/article/10.1007/s00332-026-10321-4" },
        { title: "Energy consistent hyperbolic approximation for a class of fourth-order partial differential equations", url: "https://arxiv.org/abs/2608.09478" }
      ] },
    { id: "wang", name: "Yue Wang", country: "China", inst: "IAPCM, Beijing",
      url: "https://www.researchgate.net/scientific-contributions/Yue-Wang-2244980751",
      paper: "https://link.springer.com/article/10.1007/s10915-025-03151-1", work: "Generalized Riemann solver for thin films",
      papers: [{ title: "A generalized Riemann problem solver for a hyperbolic model governing two-layer thin film flow", url: "https://link.springer.com/article/10.1007/s10915-025-03151-1" }] },
    { id: "biswas", name: "Biswarup Biswas", country: "India", inst: "Mahindra University, Hyderabad",
      url: "https://biswarupbiswas.github.io/",
      paper: "https://doi.org/10.48550/arXiv.2606.17862", work: "WENO scheme for a two-layer thin-film model",
      papers: [{ title: "Riemann invariant-based alternative WENO scheme for a two-layer thin film model", url: "https://doi.org/10.48550/arXiv.2606.17862" }] },
    { id: "kumar", name: "Rakesh Kumar", country: "India", inst: "Mahindra University, Hyderabad",
      url: "https://sites.google.com/view/rakesh21/home",
      paper: "https://doi.org/10.48550/arXiv.2606.17862", work: "WENO scheme for a two-layer thin-film model",
      papers: [{ title: "Riemann invariant-based alternative WENO scheme for a two-layer thin film model", url: "https://doi.org/10.48550/arXiv.2606.17862" }] },
    { id: "rajasekhar", name: "T. Raja Sekhar", label: "T. Raja Sekhar", supervisorRole: "PhD supervisor", country: "India", inst: "IIT Kharagpur",
      url: "https://www.iitkgp.ac.in/department/MA/faculty/ma-trajasekhar",
      paper: "https://link.springer.com/article/10.1007/s00033-024-02354-0", work: "Riemann problems, transonic flow",
      papers: [
        { title: "Construction of solutions to a Riemann problem for a two-dimensional Keyfitz-Kranzer type model governing thin film flow", url: "https://doi.org/10.1016/j.amc.2025.129378" },
        { title: "On a degenerate boundary value problem for relativistic magnetohydrodynamics with a general pressure law", url: "https://link.springer.com/article/10.1007/s00033-024-02354-0" },
        { title: "Existence of solutions to gas expansion problem through a sharp corner for 2-D Euler equations with general equation of state", url: "https://doi.org/10.1111/sapm.12575" },
        { title: "Construction of solutions of a two-dimensional Riemann problem for a thin film model of a perfectly soluble anti-surfactant solution", url: "https://onlinelibrary.wiley.com/doi/10.1002/mma.8977" },
        { title: "Existence and regularity of solutions of a supersonic-sonic patch arising in axisymmetric relativistic transonic flow with general equation of state", url: "https://doi.org/10.1016/j.jmaa.2023.127022" },
        { title: "Two-dimensional non self-similar Riemann solutions for a thin film model of a perfectly soluble anti-surfactant solution", url: "https://www.ams.org/journals/qam/2022-80-04/S0033-569X-2022-01625-0/" },
        { title: "On the existence and regularity of solutions of semi-hyperbolic patches to 2-D Euler equations with van der Waals gas", url: "https://onlinelibrary.wiley.com/doi/10.1111/sapm.12449" },
        { title: "Simple waves for two-dimensional magnetohydrodynamics with extended Chaplygin gas", url: "https://link.springer.com/article/10.1007/s13226-021-00116-6" }
      ] },
    { id: "gp-rajasekhar", name: "G. P. Raja Sekhar", label: "G. P. Raja Sekhar", country: "India",
      paper: "https://onlinelibrary.wiley.com/doi/10.1002/mma.8977", work: "Thin-film Riemann problems",
      papers: [{ title: "Construction of solutions of a two-dimensional Riemann problem for a thin film model of a perfectly soluble anti-surfactant solution", url: "https://onlinelibrary.wiley.com/doi/10.1002/mma.8977" }] },
    { id: "pandey", name: "Anamika Pandey", country: "India", inst: "IIT Kharagpur",
      url: "https://sites.google.com/view/pandeyanamika/home",
      paper: "https://doi.org/10.1016/j.amc.2025.129378", work: "2-D Keyfitz–Kranzer type model",
      papers: [{ title: "Construction of solutions to a Riemann problem for a two-dimensional Keyfitz-Kranzer type model governing thin film flow", url: "https://doi.org/10.1016/j.amc.2025.129378" }] },
    { id: "sen", name: "Anupam Sen", country: "India", inst: "VIT Bhopal",
      url: "https://anupamsenmath.github.io/",
      paper: "https://iopscience.iop.org/article/10.1088/1361-6544/ae4afc", work: "Riemann solutions, Keyfitz–Kranzer model",
      papers: [{ title: "Existence and stability of the Riemann solutions for a non-symmetric Keyfitz-Kranzer type model", url: "https://iopscience.iop.org/article/10.1088/1361-6544/ae4afc" }] },
    { id: "friedrich", name: "Jan Friedrich", country: "Germany", inst: "TU Munich",
      url: "https://janfrie-dev.github.io/home/",
      work: "Operator splitting for nonlocal balance laws",
      papers: [{ title: "Convergence of an operator splitting Lax-Friedrichs scheme for a class of nonlocal balance laws" }] },
    { id: "joussen", name: "Juri Joussen", country: "Germany", inst: "University of Stuttgart",
      url: "https://www.iadm.uni-stuttgart.de/en/team/Joussen/",
      paper: "https://doi.org/10.48550/arXiv.2611.34555", work: "Relaxation system for rimming flow",
      papers: [{ title: "A second-order relaxation system for a degenerate-parabolic quasilinear fourth-order rimming-flow equation with critical spectrum", url: "https://doi.org/10.48550/arXiv.2611.34555" }] },
    { id: "lienstromberg", name: "Christina Lienstromberg", country: "Germany", inst: "University of Stuttgart",
      url: "https://www.iadm.uni-stuttgart.de/team/Lienstromberg/",
      paper: "https://doi.org/10.48550/arXiv.2611.34555", work: "Relaxation system for rimming flow",
      papers: [{ title: "A second-order relaxation system for a degenerate-parabolic quasilinear fourth-order rimming-flow equation with critical spectrum", url: "https://doi.org/10.48550/arXiv.2611.34555" }] },
    { id: "singh", name: "Chetan Singh", country: "India", inst: "IIT Delhi",
      url: "https://www.researchgate.net/profile/Chetan-Singh-21",
      paper: "https://arxiv.org/abs/2610.02059", work: "Entropy dissipative high-order schemes",
      papers: [{ title: "Entropy dissipative high order schemes for a hyperbolic model of two-layer thin film flow", url: "https://arxiv.org/abs/2610.02059" }] },
    { id: "zawallich", name: "Jan Zawallich", country: "Germany", inst: "TU Clausthal",
      url: "https://www.mathematik.tu-clausthal.de/en/about-us/staff/emeriti-and-alumni/dr-jan-zawallich",
      paper: "https://arxiv.org/abs/2610.02059", work: "Entropy dissipative high-order schemes",
      papers: [{ title: "Entropy dissipative high order schemes for a hyperbolic model of two-layer thin film flow", url: "https://arxiv.org/abs/2610.02059" }] },
    { id: "sahu", name: "Lilu Sahu", country: "India", inst: "IIT Kharagpur",
      url: "https://www.researchgate.net/profile/Lilu-Sahu",
      paper: "https://arxiv.org/abs/2609.13989", work: "Well-posedness of n×n hyperbolic systems",
      papers: [{ title: "Well-posedness for a class of n×n hyperbolic systems and shock stability for the viscous approximation", url: "https://arxiv.org/abs/2609.13989" }] },
    { id: "ghorai", name: "Rahuldev Ghorai", country: "France", inst: "INRIA Strasbourg",
      url: "https://www.math.unistra.fr/teams/moco.html",
      paper: "https://doi.org/10.48550/arXiv.2609.05939", work: "Structure-preserving IMEX method",
      papers: [{ title: "A structure-preserving implicit-explicit method for a hyperbolic approximation of fourth-order PDEs", url: "https://doi.org/10.48550/arXiv.2609.05939" }] }
  ];

  // Thin dashed lines: collaborators who also appear together on a paper.
  const LINKS = [
    ["rohde", "oeffner"], ["rohde", "dhaouadi"], ["rohde", "wang"], ["rohde", "sen"],
    ["rohde", "friedrich"], ["rohde", "joussen"], ["rohde", "lienstromberg"],
    ["oeffner", "singh"], ["oeffner", "zawallich"], ["singh", "zawallich"],
    ["biswas", "kumar"], ["joussen", "lienstromberg"], ["rajasekhar", "pandey"],
    ["rajasekhar", "gp-rajasekhar"]
  ];

  const COUNTRY_ORDER = ["Germany", "India", "China", "Italy", "France", ""];   // "" = Country not set
  const COUNTRY_COLOR = {
    "Germany": "#4f7cac", "India": "#d08a2e", "China": "#2f9e8f", "Italy": "#7b6bb0", "": "#8a9099"
  };
  const UNSET = "Country not set";
  const MOBILE_GRAPH_BREAKPOINT = 640;

  /* ------------------------------------------------------------------ */
  const stage = document.getElementById("cgStage");
  if (!stage) return;
  const wrap = stage.parentElement;
  const legend = document.getElementById("cgLegend");
  const list = document.getElementById("cgList");
  const NS = "http://www.w3.org/2000/svg";

  const cname = c => c || UNSET;
  const ccolor = c => COUNTRY_COLOR[c] || COUNTRY_COLOR[""];
  const people = PEOPLE.slice().sort((a, b) => {
    const d = COUNTRY_ORDER.indexOf(a.country) - COUNTRY_ORDER.indexOf(b.country);
    return d || PEOPLE.indexOf(a) - PEOPLE.indexOf(b);
  });
  const byId = Object.fromEntries(people.map(p => [p.id, p]));
  const neighbours = {};
  people.forEach(p => (neighbours[p.id] = new Set()));
  LINKS.forEach(([a, b]) => { neighbours[a].add(b); neighbours[b].add(a); });

  const touchOnly = () => window.matchMedia && window.matchMedia("(hover: none)").matches;
  const initials = n => n.replace(/^[A-Z]\.\s*/, "").split(/\s+/).filter(Boolean)
    .map((w, i, a) => (i === 0 || i === a.length - 1 ? w[0] : "")).join("").toUpperCase();
  const shortName = (p, narrow) => {
    if (p.label && !narrow) return p.label;
    const parts = p.name.split(/\s+/);
    const last = parts[parts.length - 1];
    return narrow ? last : parts[0][0] + ". " + last;
  };
  const el = (tag, attrs = {}, parent) => {
    const e = document.createElementNS(NS, tag);
    Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
    if (parent) parent.appendChild(e);
    return e;
  };
  const primaryLink = p => p.url || p.paper || "";
  const papersFor = p => p.papers || (p.paper ? [{ title: "Joint paper", url: p.paper }] : []);

  /* ---------- Legend (also acts as a country filter) ---------- */
  let activeCountry = null;
  const chips = [];
  if (legend) {
    COUNTRY_ORDER.forEach(c => {
      const n = people.filter(p => p.country === c).length;
      if (!n) return;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "cg-chip";
      b.style.setProperty("--c", ccolor(c));
      b.setAttribute("aria-pressed", "false");
      b.innerHTML = `<span class="cg-dot"></span>${cname(c)} <span class="cg-count">${n}</span>`;
      b.addEventListener("click", () => {
        activeCountry = activeCountry === c ? null : c;
        chips.forEach(x => x.btn.setAttribute("aria-pressed", String(x.c === activeCountry)));
        hideTip();
        applyFocus();
      });
      legend.appendChild(b);
      chips.push({ c, btn: b });
    });
  }

  /* ---------- Compact list (phones) ---------- */
  if (list) {
    COUNTRY_ORDER.forEach(c => {
      const group = people.filter(p => p.country === c);
      if (!group.length) return;
      const li = document.createElement("li");
      li.style.setProperty("--c", ccolor(c));
      li.innerHTML = `<div class="cg-list-head"><span class="cg-dot"></span>${cname(c)}</div>`;
      const ul = document.createElement("ul");
      group.forEach(p => {
        const item = document.createElement("li");
        const href = primaryLink(p);
        const name = href ? `<a href="${href}" target="_blank" rel="noopener">${p.name}</a>` : p.name;
        item.innerHTML = name + (p.inst ? ` <span class="cg-list-inst">${p.inst}</span>` : "");
        ul.appendChild(item);
      });
      li.appendChild(ul);
      list.appendChild(li);
    });
  }

  /* ---------- Tooltip ---------- */
  const tip = document.createElement("div");
  tip.className = "cg-tip";
  tip.hidden = true;
  stage.appendChild(tip);
  let hideTimer = null;
  tip.addEventListener("mouseenter", () => clearTimeout(hideTimer));
  tip.addEventListener("mouseleave", () => scheduleHide());

  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => { hideTip(); }, 220);
  }
  function hideTip() {
    tip.hidden = true;
    current = null;
    applyFocus();
  }

  function showTip(p, pos, w, h) {
    tip.innerHTML = "";
    const add = (cls, html) => {
      const d = document.createElement("div");
      d.className = cls; d.innerHTML = html; tip.appendChild(d); return d;
    };
    add("cg-tip-name", p.name);
    if (p.supervisorRole) add("cg-tip-work", p.supervisorRole);
    const where = [p.inst, p.country].filter(Boolean).join(" · ");
    const meta = add("cg-tip-meta", `<span class="cg-dot" style="--c:${ccolor(p.country)}"></span>${where || UNSET}`);
    if (!where) meta.classList.add("is-muted");
    if (p.work) add("cg-tip-work", p.work);
    if (p.url) {
      const home = add("cg-tip-links", "");
      const link = document.createElement("a");
      link.href = p.url; link.target = "_blank"; link.rel = "noopener";
      link.textContent = "Webpage ↗";
      home.appendChild(link);
    }
    const papers = papersFor(p);
    if (papers.length) {
      const section = document.createElement("div");
      section.className = "cg-tip-papers";
      const heading = document.createElement("div");
      heading.className = "cg-tip-papers-title";
      heading.textContent = `Joint papers (${papers.length})`;
      section.appendChild(heading);
      const ul = document.createElement("ul");
      papers.forEach(paper => {
        const li = document.createElement("li");
        if (paper.url) {
          const link = document.createElement("a");
          link.href = paper.url; link.target = "_blank"; link.rel = "noopener";
          link.textContent = paper.title;
          li.appendChild(link);
        } else {
          li.textContent = paper.title;
        }
        ul.appendChild(li);
      });
      section.appendChild(ul);
      tip.appendChild(section);
    }
    tip.style.setProperty("--c", ccolor(p.country));
    tip.hidden = false;

    const tw = tip.offsetWidth, th = tip.offsetHeight, gap = 34;
    let left = pos.x > w / 2 ? pos.x - gap - tw : pos.x + gap;
    left = Math.max(0, Math.min(w - tw, left));
    const top = Math.max(0, Math.min(h - th, pos.y - th / 2));
    tip.style.left = left + "px";
    tip.style.top = top + "px";
  }

  /* ---------- Focus / dimming ---------- */
  let svg = null, nodeEls = {}, edgeEls = [], current = null;

  function applyFocus() {
    if (!svg) return;
    const on = new Set();
    let edgeOn = () => false;
    if (current) {
      on.add(current);
      neighbours[current].forEach(n => on.add(n));
      edgeOn = e => e.a === current || e.b === current;
    } else if (activeCountry !== null) {
      people.filter(p => p.country === activeCountry).forEach(p => on.add(p.id));
      edgeOn = e => (e.a === "me" ? on.has(e.b) : on.has(e.a) && on.has(e.b));
    }
    const focused = current || activeCountry !== null;
    svg.classList.toggle("has-focus", !!focused);
    Object.entries(nodeEls).forEach(([id, g]) => g.classList.toggle("on", on.has(id)));
    edgeEls.forEach(e => e.el.classList.toggle("on", focused && edgeOn(e)));
  }

  function activate(p, pos, w, h) {
    clearTimeout(hideTimer);
    current = p.id;
    applyFocus();
    showTip(p, pos, w, h);
  }

  /* ---------- Render ---------- */
  let lastW = 0;
  function render() {
    const w = Math.round(wrap.clientWidth);
    if (!w) return;
    const mobile = w < MOBILE_GRAPH_BREAKPOINT;
    wrap.classList.toggle("is-mobile-graph", mobile);
    if (Math.abs(w - lastW) < 4 && svg) return;
    lastW = w;

    const narrow = w < 900;
    const h = mobile
      ? Math.round(w * 1.15)
      : Math.round(Math.max(470, Math.min(640, w * 0.58)));
    const cx = w / 2, cy = h / 2;
    // Leave room for node circles and, where shown, their outside labels.
    const labelGutter = mobile ? 30 : narrow ? 88 : 116;
    const circleRadius = Math.max(0, Math.min(w / 2 - labelGutter, h / 2 - (mobile ? 38 : 46)));
    const rx = circleRadius;
    const ry = circleRadius;
    const R = mobile ? 17 : 21;

    if (svg) svg.remove();
    svg = el("svg", {
      viewBox: `0 0 ${w} ${h}`, width: w, height: h,
      role: "group", "aria-label": "Network of my collaborators, grouped by country"
    });
    stage.insertBefore(svg, tip);
    nodeEls = {}; edgeEls = [];

    // angular layout: group by country with a small gap between groups
    const groupsPresent = COUNTRY_ORDER.filter(c => people.some(p => p.country === c));
    const units = people.length + 0.55 * groupsPresent.length;
    let cursor = 0.275, prev = null;
    const pos = {};
    people.forEach(p => {
      if (prev !== null && p.country !== prev) cursor += 0.55;
      prev = p.country;
      const a = -Math.PI / 2 + ((cursor) / units) * Math.PI * 2;
      pos[p.id] = { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a), a };
      cursor += 1;
    });

    const edges = el("g", {}, svg);
    people.forEach(p => {
      const line = el("line", { x1: cx, y1: cy, x2: pos[p.id].x, y2: pos[p.id].y, class: "cg-edge" }, edges);
      edgeEls.push({ el: line, a: "me", b: p.id });
    });
    LINKS.forEach(([a, b]) => {
      const A = pos[a], B = pos[b];
      const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
      const qx = mx + (cx - mx) * 0.5, qy = my + (cy - my) * 0.5;
      const path = el("path", { d: `M${A.x},${A.y} Q${qx},${qy} ${B.x},${B.y}`, class: "cg-edge cg-co" }, edges);
      edgeEls.push({ el: path, a, b });
    });

    // centre node
    const me = el("g", { class: "cg-me" }, svg);
    el("circle", { cx, cy, r: mobile ? 30 : 36 }, me);
    const meT = el("text", { x: cx, y: cy, class: "cg-me-label" }, me);
    meT.textContent = ME.short;

    // collaborator nodes
    people.forEach(p => {
      const P = pos[p.id];
      const g = el("g", {
        class: "cg-node", tabindex: "0", "data-id": p.id,
        role: "link", "aria-label": `${p.name}${p.supervisorRole ? ", " + p.supervisorRole : ""}${p.inst ? ", " + p.inst : ""}${p.country ? ", " + p.country : ""}`
      }, svg);
      g.style.setProperty("--c", ccolor(p.country));
      if (!primaryLink(p)) g.classList.add("no-link");

      const body = el("g", { class: "cg-body" }, g);
      el("circle", { cx: P.x, cy: P.y, r: R }, body);
      const t = el("text", { x: P.x, y: P.y, class: "cg-initials" }, body);
      t.textContent = initials(p.name);

      const dx = Math.cos(P.a), dy = Math.sin(P.a);
      let lx, ly, anchor;
      if (Math.abs(dx) > 0.35) {
        anchor = dx > 0 ? "start" : "end";
        lx = P.x + (dx > 0 ? 1 : -1) * (R + 8); ly = P.y + 4;
      } else {
        anchor = "middle"; lx = P.x; ly = dy < 0 ? P.y - R - 9 : P.y + R + 18;
      }
      const lab = el("text", { x: lx, y: ly, class: "cg-label", "text-anchor": anchor }, g);
      lab.textContent = shortName(p, narrow);

      const show = () => activate(p, P, w, h);
      g.addEventListener("mouseenter", show);
      g.addEventListener("focus", show);
      g.addEventListener("mouseleave", scheduleHide);
      g.addEventListener("blur", scheduleHide);
      g.addEventListener("click", e => {
        if (touchOnly()) { e.preventDefault(); show(); return; }   // links live in the card on touch screens
        const href = primaryLink(p);
        if (href) window.open(href, "_blank", "noopener");
      });
      g.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          const href = primaryLink(p);
          if (href) window.open(href, "_blank", "noopener");
        } else if (e.key === "Escape") { hideTip(); }
      });
      nodeEls[p.id] = g;
    });

    applyFocus();
  }

  // Dismiss the card when tapping/clicking empty space
  document.addEventListener("pointerdown", e => {
    if (tip.hidden) return;
    if (tip.contains(e.target) || (e.target.closest && e.target.closest(".cg-node"))) return;
    hideTip();
  });

  let rt = null;
  const onResize = () => { clearTimeout(rt); rt = setTimeout(render, 120); };
  if (window.ResizeObserver) new ResizeObserver(onResize).observe(wrap);
  else window.addEventListener("resize", onResize);
  render();
})();
