// Whole-service map renderer. Draws a map from its data; shared by index.html and the editor.
// SM.render(map, components, opts) returns an HTML string.
// opts: imageBase, editable, highlight (a status id, or "unset"), selected (a data-ref)
window.SM = window.SM || { maps: {} };

SM.STATUSES = [
  { id: "exists", label: "Exists" },
  { id: "planned", label: "Planned" },
  { id: "building", label: "Building" },
  { id: "bau", label: "BAU" },
  { id: "unresolved", label: "Unresolved" }
];

SM.esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
};

SM.statusLabel = function (id) {
  var s = SM.STATUSES.find(function (x) { return x.id === id; });
  return s ? s.label : "Not set";
};

// Light role colours (third party pink) need dark text.
SM.textOn = function (hex) {
  var n = parseInt((hex || "#000000").slice(1), 16);
  var r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) > 160 ? "#5c1a36" : "#ffffff";
};

SM.taskMatches = function (task, byId, status) {
  var comps = (task.components || []).map(function (id) { return byId[id]; }).filter(Boolean);
  if (status === "unresolved" && task.unresolved) return true;
  if (status === "unset") return comps.length === 0 || comps.some(function (c) { return !c.status; });
  return comps.some(function (c) { return c.status === status; });
};

SM.render = function (map, components, opts) {
  opts = opts || {};
  var E = SM.esc, ed = !!opts.editable, hl = opts.highlight || "";
  var base = opts.imageBase == null ? "" : opts.imageBase;
  var byId = {};
  (components || []).forEach(function (c) { byId[c.id] = c; });
  var roles = {};
  (map.roles || []).forEach(function (r) { roles[r.id] = r; });
  var rows = map.rows || {};
  var sel = function (ref) { return ref === opts.selected ? " sm-selected" : ""; };
  var ref = function (r) { return ' data-ref="' + E(r) + '"'; };
  var unresolved = '<span class="sm-unresolved">unresolved</span>';

  // Header
  var h = '<div class="sm-canvas' + (ed ? " sm-editable" : "") + '">';
  h += '<div class="sm-head"><div class="sm-titles"' + ref("map") + ">";
  h += "<h1>" + E(map.title) + "</h1><h2>" + E(map.subtitle) + "</h2><p>" + E(map.note) + "</p></div>";
  h += '<div class="sm-boxes">';
  (map.panels || []).forEach(function (p, i) {
    h += '<div class="sm-box sm-box--' + E(p.tone || "plain") + sel("panel:" + i) + '"' + ref("panel:" + i) + "><h3>" + E(p.heading) + "</h3>";
    (p.items || []).forEach(function (it) {
      h += "<p>" + (it.lead ? "<strong>" + E(it.lead) + "</strong> " : "") + E(it.text) + "</p>";
    });
    h += "</div>";
  });
  h += '<div class="sm-box' + sel("roles") + '"' + ref("roles") + "><h3>Key: who does the task</h3>";
  (map.roles || []).forEach(function (r) {
    h += '<div class="sm-key-row"><span class="sm-swatch" style="background:' + E(r.colour) + '"></span>' + E(r.label) + "</div>";
  });
  h += '<div class="sm-key-row">' + unresolved + "Scope not yet agreed</div></div>";
  h += '<div class="sm-box"' + ref("components") + "><h3>Key: status of what is behind it</h3>";
  SM.STATUSES.concat([{ id: "unset", label: "Not set" }]).forEach(function (s) {
    h += '<div class="sm-key-row"><span class="sm-tag s-' + s.id + '">' + E(s.label) + "</span></div>";
  });
  h += "</div></div></div>";

  // Grid columns: gutter, then each phase's steps, then an add-phase column when editing
  var cols = ["160px", "16px"], col = 3, layout = [];
  (map.phases || []).forEach(function (p, pi) {
    if (pi > 0) { cols.push("32px"); col++; }
    var start = col, stepCols = [];
    var n = Math.max(1, (p.steps || []).length);
    for (var i = 0; i < n; i++) {
      if (i > 0) { cols.push("12px"); col++; }
      cols.push("196px"); stepCols.push(col); col++;
    }
    layout.push({ start: start, end: col, stepCols: stepCols });
  });
  if (ed) { cols.push("32px", "140px"); }
  var addCol = col + 1;

  var rowKeys = ["stage", "bar", "outcome"];
  if (rows.measures) rowKeys.push("measures");
  rowKeys.push("ownerbar", "channels", "image", "objective", "steps", "tasks", "footer");
  var R = {};
  rowKeys.forEach(function (k, i) { R[k] = i + 1; });

  h += '<div class="sm-grid" style="grid-template-columns:' + cols.join(" ") + ";grid-template-rows:repeat(" + rowKeys.length + ',auto)">';
  var at = function (row, c1, c2) { return ' style="grid-row:' + R[row] + ";grid-column:" + c1 + "/" + c2 + '"'; };

  // Gutter labels
  h += '<div class="sm-gutter sm-gutter--stage"' + at("stage", 1, 2) + ">" + (rows.stage || []).map(function (s) { return "<span>" + E(s) + "</span>"; }).join("") + "</div>";
  [["outcome", rows.outcome], ["measures", rows.measures], ["channels", rows.channels], ["objective", rows.objective], ["steps", rows.steps], ["tasks", rows.tasks], ["footer", rows.footer]].forEach(function (g) {
    if (!R[g[0]] || g[1] == null) return;
    var pad = { channels: "", objective: "", steps: "", tasks: "", footer: "padding-top:12px;" }[g[0]] || "";
    h += '<div class="sm-gutter' + (g[0] === "steps" ? " sm-gutter--steps" : "") + '" style="grid-row:' + R[g[0]] + ";grid-column:1/2;" + pad + '">' + E(g[1]) + "</div>";
  });

  var auto = 0;
  (map.phases || []).forEach(function (p, pi) {
    var L = layout[pi], pref = "phase:" + p.id;
    var mu = p.muted ? ";opacity:.6" : "";
    var at = function (row, c1, c2) { return ' style="grid-row:' + R[row] + ";grid-column:" + c1 + "/" + c2 + mu + '"'; };
    var num = p.number || String(++auto).padStart(2, "0");
    var owner = p.owner && roles[p.owner] ? roles[p.owner].colour : "#00703c";
    h += '<div class="sm-stage' + sel(pref) + '"' + ref(pref) + at("stage", L.start, L.end) + ">";
    h += '<span class="sm-num">' + E(num) + '</span><span class="sm-name">' + E(p.name) + (p.unresolved ? " " + unresolved : "") + "</span>";
    h += '<span class="sm-sub" style="color:' + E(owner) + '">' + E(p.sub) + "</span></div>";
    h += '<div class="sm-bar"' + at("bar", L.start, L.end) + "></div>";
    h += '<div class="sm-outcome' + (rows.measures ? " sm-outcome--measured" : "") + '"' + at("outcome", L.start, L.end) + ">" + E(p.outcome) + "</div>";
    if (rows.measures) h += '<div class="sm-measures"' + at("measures", L.start, L.end) + ">" + E(p.measures) + "</div>";
    h += '<div class="sm-bar sm-bar--owner" style="background:' + E(owner) + ";grid-row:" + R.ownerbar + ";grid-column:" + L.start + "/" + L.end + mu + '"></div>';

    var steps = p.steps || [];
    if (!steps.length && ed) {
      h += '<div' + at("channels", L.stepCols[0], L.stepCols[0] + 1) + '><button type="button" class="sm-add" data-add="step:' + E(p.id) + '">Add a step</button></div>';
    }
    steps.forEach(function (s, si) {
      var c = L.stepCols[si], sref = "step:" + s.id;
      h += '<div class="sm-channels"' + at("channels", c, c + 1) + ">";
      (s.channels || []).forEach(function (cid) {
        var comp = byId[cid] || { id: cid, name: cid, status: null };
        var st = comp.status || "unset";
        var dim = hl && (hl === "unset" ? !!comp.status : comp.status !== hl);
        h += '<div class="sm-channel s-' + st + (dim ? " sm-dim" : "") + '" title="' + E(comp.name + ": " + SM.statusLabel(comp.status)) + '">' + E(comp.name) + "</div>";
      });
      h += "</div>";
      if (s.image) {
        h += '<img class="sm-image"' + at("image", c, c + 1) + ' src="' + E(base + s.image + ".webp") + '" alt="" width="196" height="245">';
      } else {
        h += '<div class="sm-image sm-image--none"' + at("image", c, c + 1) + ">No illustration yet</div>";
      }
      h += '<div class="sm-quote"' + at("objective", c, c + 1) + ">" + (s.quote ? "“" + E(s.quote) + "”" : "") + "</div>";
      h += '<div class="sm-step' + sel(sref) + '"' + ref(sref) + at("steps", c, c + 1) + ">" + E(s.title) + "</div>";
      h += '<div class="sm-tasks" data-step="' + E(s.id) + '"' + at("tasks", c, c + 1) + ">";
      (s.tasks || []).forEach(function (t) {
        var role = roles[t.role] || { colour: "#505a5f" };
        var tref = "task:" + t.id;
        var dim = hl && !SM.taskMatches(t, byId, hl);
        h += '<div class="sm-card' + (dim ? " sm-dim" : "") + sel(tref) + '"' + ref(tref) + (ed ? ' draggable="true" data-task="' + E(t.id) + '"' : "") + ">";
        h += '<div class="sm-card-title" style="background:' + E(role.colour) + ";color:" + SM.textOn(role.colour) + '">' + E(t.title) + (t.unresolved ? " " + unresolved : "") + "</div>";
        if (t.description) h += '<div class="sm-card-desc">' + E(t.description) + "</div>";
        var comps = (t.components || []).map(function (id) { return byId[id]; }).filter(Boolean);
        if (comps.length) {
          h += '<ul class="sm-comps">' + comps.map(function (cp) {
            return '<li class="sm-tag s-' + (cp.status || "unset") + '" title="' + E(SM.statusLabel(cp.status)) + '">' + E(cp.name) + "</li>";
          }).join("") + "</ul>";
        }
        h += "</div>";
      });
      if (ed) h += '<button type="button" class="sm-add" data-add="task:' + E(s.id) + '">Add an epic</button>';
      h += "</div>";
    });
    h += '<div class="sm-footer' + (p.footer ? "" : " sm-footer--empty") + '"' + at("footer", L.start, L.end) + ">" + (p.footer ? E(p.footer) : "Not written yet") + "</div>";
  });
  if (ed) {
    h += '<div' + at("stage", addCol, addCol + 1) + '><button type="button" class="sm-add" data-add="phase">Add a stage</button></div>';
  }
  h += "</div></div>";
  return h;
};
