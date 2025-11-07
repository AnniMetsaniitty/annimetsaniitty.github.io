/* projects.js — fetch, render, and filter project cards */
(function () {
const state = { all: [], filtered: [], activeTags: new Set(), q: "" };
const els = {
grid: document.getElementById("projects-grid"),
search: document.getElementById("projects-search"),
chips: document.getElementById("projects-chips"),
count: document.getElementById("projects-count")
};


// Helpers
const html = (s) => { const t = document.createElement("template"); t.innerHTML = s.trim(); return t.content; };
const escape = (s = "") => s.replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));


function card(p) {
const cover = p.cover ? `<img src="${escape(p.cover)}" alt="Cover image for ${escape(p.title)}" loading="lazy" decoding="async">` :
`<div aria-hidden="true" class="skeleton" style="width:100%;height:100%"></div>`;
const tags = (p.tags||[]).map(t => `<span class="tag" aria-label="tag">${escape(t)}</span>`).join("");
const demo = p.links?.demo ? `<a class="btn primary" href="${escape(p.links.demo)}" target="_blank" rel="noopener noreferrer">Demo</a>` : "";
const src = p.links?.source ? `<a class="btn" href="${escape(p.links.source)}" target="_blank" rel="noopener noreferrer">Source</a>` : "";


return html(`
<article class="project-card" data-tags="${escape((p.tags||[]).join(","))}">
<div class="project-media">${cover}</div>
<div class="project-body">
<h3 class="project-title">${escape(p.title)}</h3>
<p class="project-summary">${escape(p.summary||"")}</p>
<div class="tags" aria-label="tags">${tags}</div>
</div>
<div class="project-meta">
<span aria-label="year">${p.year ?? ""}</span>
<div class="actions">${demo}${src}</div>
</div>
</article>`);
}


function render(list) {
if (!els.grid) return;
els.grid.innerHTML = "";
const frag = document.createDocumentFragment();
list.forEach(p => frag.append(card(p)));
els.grid.append(frag);
if (els.count) els.count.textContent = `${list.length}`;
}


function uniqueTags(items) {
const s = new Set();
items.forEach(p => (p.tags||[]).forEach(t => s.add(t)));
return Array.from(s).sort((a,b)=>a.localeCompare(b));
}


function buildChips(items) {
if (!els.chips) return;
els.chips.innerHTML = "";
const tags = uniqueTags(items);
const add = (label) => {
const b = document.createElement("button");
b.type = "button";
b.className = "chip";
b.textContent = label;
b.setAttribute("aria-pressed", "false");
b.addEventListener("click", () => {
const wasOn = b.getAttribute("aria-pressed") === "true";
b.setAttribute("aria-pressed", String(!wasOn));
if (wasOn) state.activeTags.delete(label); else state.activeTags.add(label);
applyFilters();
});
els.chips.appendChild(b);
};
tags.forEach(add);
}


function applyFilters() {
const q = state.q.trim().toLowerCase();
const tags = state.activeTags;
const out = state.all.filter(p => {
const text = `${p.title} ${p.summary} ${(p.tags||[]).join(" ")}`.toLowerCase();
const qOk = q ? text.includes(q) : true;
const tOk = tags.size ? (p.tags||[]).some(t => tags.has(t)) : true;
return qOk && tOk;
});
// featured first, then year desc, then title
out.sort((a,b) => (b.featured===true)-(a.featured===true) || (b.year||0)-(a.year||0) || a.title.localeCompare(b.title));
state.filtered = out;
render(out);
}


function wireSearch() {
if (!els.search) return;
els.search.addEventListener("input", (e) => { state.q = e.target.value || ""; applyFilters(); });
}


})();