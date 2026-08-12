(function() {
  const svg = document.getElementById('bg-particles');
  if (!svg) return;

  const SVGNS = 'http://www.w3.org/2000/svg';
  const UNIT = 40;
  const MAJOR_EVERY = 5;

  function el(tag, attrs) {
    const node = document.createElementNS(SVGNS, tag);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function styleEl() {
    const style = document.createElementNS(SVGNS, 'style');
    style.textContent = [
      '#bg-particles .p-root { opacity: 0.5; }',
      '#bg-particles line, #bg-particles path, #bg-particles circle, #bg-particles polygon { stroke: var(--accent); fill: none; }',
      '#bg-particles text { fill: var(--accent); font: 9px monospace; stroke: none; }',
      '#bg-particles .grid-minor { stroke-opacity: 0.08; }',
      '#bg-particles .grid-major { stroke-opacity: 0.16; }',
      '#bg-particles .edge-minor { stroke-opacity: 0.3; }',
      '#bg-particles .edge-major { stroke-opacity: 0.5; }',
      '#bg-particles .ruler-text { fill-opacity: 0.4; }',
      '#bg-particles .diagonal { stroke-opacity: 0.35; stroke-dasharray: 6 5; }',
      '#bg-particles .arc-line { stroke-opacity: 0.18; }',
      '#bg-particles .arc-text { fill-opacity: 0.32; text-anchor: middle; dominant-baseline: middle; }',
      '#bg-particles .protractor-fill { fill: var(--accent); fill-opacity: 0.05; stroke: none; }',
      '#bg-particles .protractor-arc { stroke-opacity: 0.3; }',
      '#bg-particles .protractor-tick { stroke-opacity: 0.35; }',
      '#bg-particles .protractor-text { fill-opacity: 0.45; text-anchor: middle; dominant-baseline: middle; }',
      '#bg-particles .protractor-center { stroke-opacity: 0.4; }',
      '#bg-particles .protractor-diag { stroke-opacity: 0.22; }',
      '#bg-particles .dim-line { stroke-opacity: 0.22; }',
      '#bg-particles .dim-text { fill-opacity: 0.4; }',
      '#bg-particles .hex-outer { stroke-opacity: 0.2; }',
      '#bg-particles .hex-spoke { stroke-opacity: 0.12; }',
      '#bg-particles .compass-circle { stroke-opacity: 0.18; }',
      '#bg-particles .compass-cross { stroke-opacity: 0.3; }',
      '#bg-particles .crosshair { stroke-opacity: 0.35; }',
      '#bg-particles .flip { transition: transform 130ms ease-in-out; }'
    ].join('\n');
    return style;
  }

  function buildGrid(cols, rows, width, height) {
    const frag = document.createDocumentFragment();
    let minorD = '', majorD = '';
    for (let c = 0; c <= cols; c++) {
      const x = c * UNIT;
      const seg = 'M' + x + ' 0L' + x + ' ' + height;
      if (c % MAJOR_EVERY === 0) majorD += seg; else minorD += seg;
    }
    for (let r = 0; r <= rows; r++) {
      const y = r * UNIT;
      const seg = 'M0 ' + y + 'L' + width + ' ' + y;
      if (r % MAJOR_EVERY === 0) majorD += seg; else minorD += seg;
    }
    frag.appendChild(el('path', { class: 'grid-minor', d: minorD }));
    frag.appendChild(el('path', { class: 'grid-major', d: majorD }));
    return frag;
  }

  function buildEdgeTicks(cols, rows, width, height) {
    const frag = document.createDocumentFragment();
    let minorD = '', majorD = '';
    for (let c = 0; c <= cols; c++) {
      const x = c * UNIT;
      const seg = 'M' + x + ' 0L' + x + ' 4M' + x + ' ' + height + 'L' + x + ' ' + (height - 4);
      if (c % MAJOR_EVERY === 0) majorD += seg; else minorD += seg;
    }
    for (let r = 0; r <= rows; r++) {
      const y = r * UNIT;
      const seg = 'M0 ' + y + 'L4 ' + y + 'M' + width + ' ' + y + 'L' + (width - 4) + ' ' + y;
      if (r % MAJOR_EVERY === 0) majorD += seg; else minorD += seg;
    }
    frag.appendChild(el('path', { class: 'edge-minor', d: minorD }));
    frag.appendChild(el('path', { class: 'edge-major', d: majorD }));
    return frag;
  }

  function text(x, y, content, cls, attrs) {
    const t = el('text', Object.assign({ x: x, y: y, class: cls }, attrs || {}));
    t.textContent = content;
    return t;
  }

  function buildRuler(cols, rows, width, height) {
    const frag = document.createDocumentFragment();
    for (let c = MAJOR_EVERY; c <= cols; c += MAJOR_EVERY) {
      frag.appendChild(text(c * UNIT + 3, 3, c / MAJOR_EVERY, 'ruler-text', { 'dominant-baseline': 'hanging' }));
    }
    for (let r = MAJOR_EVERY; r <= rows; r += MAJOR_EVERY) {
      frag.appendChild(text(3, r * UNIT - 3, r / MAJOR_EVERY, 'ruler-text'));
    }
    for (let c = 0; c <= cols; c += MAJOR_EVERY) {
      frag.appendChild(text(c * UNIT - 3, height - 3, c / MAJOR_EVERY, 'ruler-text', { 'text-anchor': 'end', 'dominant-baseline': 'text-after-edge' }));
    }
    for (let r = 0; r <= rows; r += MAJOR_EVERY) {
      if (r === 0) continue;
      frag.appendChild(text(width - 3, r * UNIT - 12, r / MAJOR_EVERY, 'ruler-text', { 'text-anchor': 'end', 'dominant-baseline': 'hanging' }));
    }
    return frag;
  }

  function buildLongDiagonal(width, height) {
    const offset = UNIT * 3;
    return el('path', { class: 'diagonal', d: 'M0 ' + (height + offset) + 'L' + width + ' ' + offset });
  }

  function buildArcs(width, height) {
    const cx = width - UNIT * 4, cy = height + UNIT * 2;
    const radii = [UNIT * 8, UNIT * 5];
    const g = el('g', {});
    radii.forEach(function(r) {
      g.appendChild(el('path', {
        class: 'arc-line',
        d: 'M' + (cx - r) + ' ' + cy + 'A' + r + ' ' + r + ' 0 0 1 ' + cx + ' ' + (cy - r)
      }));
    });
    const midAngle = Math.PI * 1.25;
    radii.forEach(function(r) {
      const lx = cx + Math.cos(midAngle) * r;
      const ly = cy + Math.sin(midAngle) * r;
      g.appendChild(text(lx, ly, 'R' + Math.round(r / UNIT * 10), 'arc-text'));
    });
    return { node: g, center: { x: cx, y: cy } };
  }

  function buildProtractor(width, height) {
    const cx = width - UNIT * 3, cy = height - UNIT * 5;
    const r = UNIT * 4;
    const inner = el('g', { transform: 'rotate(-90 ' + cx + ' ' + cy + ')' });

    inner.appendChild(el('path', {
      class: 'protractor-fill',
      d: 'M' + (cx - r) + ' ' + cy + 'A' + r + ' ' + r + ' 0 0 1 ' + (cx + r) + ' ' + cy + 'Z'
    }));
    inner.appendChild(el('path', {
      class: 'protractor-arc',
      d: 'M' + (cx - r) + ' ' + cy + 'A' + r + ' ' + r + ' 0 0 1 ' + (cx + r) + ' ' + cy + 'M' + (cx - r) + ' ' + cy + 'L' + (cx + r) + ' ' + cy
    }));

    let ticksD = '';
    for (let deg = 0; deg <= 180; deg += 5) {
      const rad = deg * Math.PI / 180;
      const inner_r = r - (deg % 10 === 0 ? 10 : 6);
      ticksD += 'M' + (cx + Math.cos(rad) * r) + ' ' + (cy - Math.sin(rad) * r) +
        'L' + (cx + Math.cos(rad) * inner_r) + ' ' + (cy - Math.sin(rad) * inner_r);
    }
    inner.appendChild(el('path', { class: 'protractor-tick', d: ticksD }));

    for (let deg = 0; deg <= 180; deg += 30) {
      const rad = deg * Math.PI / 180;
      const lx = cx + Math.cos(rad) * (r - 20);
      const ly = cy - Math.sin(rad) * (r - 20);
      inner.appendChild(text(lx, ly, deg, 'protractor-text', { transform: 'rotate(90 ' + lx + ' ' + ly + ')' }));
    }

    inner.appendChild(el('path', {
      class: 'protractor-center',
      d: 'M' + (cx - 5) + ' ' + cy + 'L' + (cx + 5) + ' ' + cy + 'M' + cx + ' ' + (cy - 5) + 'L' + cx + ' ' + (cy + 5)
    }));

    let diagD = '';
    [40, 125].forEach(function(deg) {
      const rad = deg * Math.PI / 180;
      diagD += 'M' + cx + ' ' + cy + 'L' + (cx + Math.cos(rad) * (r + UNIT * 3)) + ' ' + (cy - Math.sin(rad) * (r + UNIT * 3));
    });
    inner.appendChild(el('path', { class: 'protractor-diag', d: diagD }));

    const g = el('g', {});
    g.appendChild(inner);
    return { node: g, center: { x: cx, y: cy } };
  }

  function buildDimensionLine(width) {
    const y = UNIT * 2;
    const x1 = width - UNIT * 13, x2 = width - UNIT * 3;
    const arrow = 5;
    const g = el('g', {});
    g.appendChild(el('path', {
      class: 'dim-line',
      d: 'M' + x1 + ' ' + (y - UNIT * 0.4) + 'L' + x1 + ' ' + (y + 5) +
        'M' + x2 + ' ' + (y - UNIT * 0.4) + 'L' + x2 + ' ' + (y + 5) +
        'M' + x1 + ' ' + y + 'L' + x2 + ' ' + y +
        'M' + (x1 + arrow) + ' ' + (y - arrow / 2) + 'L' + x1 + ' ' + y + 'L' + (x1 + arrow) + ' ' + (y + arrow / 2) +
        'M' + (x2 - arrow) + ' ' + (y - arrow / 2) + 'L' + x2 + ' ' + y + 'L' + (x2 - arrow) + ' ' + (y + arrow / 2)
    }));
    g.appendChild(text((x1 + x2) / 2, y - 3, Math.round((x2 - x1) / UNIT * 10), 'dim-text', { 'text-anchor': 'middle', 'dominant-baseline': 'text-after-edge' }));
    return g;
  }

  function buildVerticalDimension() {
    const x = UNIT * 2, y1 = UNIT * 9, y2 = UNIT * 16;
    const arrow = 5;
    const g = el('g', {});
    g.appendChild(el('path', {
      class: 'dim-line',
      d: 'M' + (x - UNIT * 0.4) + ' ' + y1 + 'L' + (x + 5) + ' ' + y1 +
        'M' + (x - UNIT * 0.4) + ' ' + y2 + 'L' + (x + 5) + ' ' + y2 +
        'M' + x + ' ' + y1 + 'L' + x + ' ' + y2 +
        'M' + (x - arrow / 2) + ' ' + (y1 + arrow) + 'L' + x + ' ' + y1 + 'L' + (x + arrow / 2) + ' ' + (y1 + arrow) +
        'M' + (x - arrow / 2) + ' ' + (y2 - arrow) + 'L' + x + ' ' + y2 + 'L' + (x + arrow / 2) + ' ' + (y2 - arrow)
    }));
    const ty = (y1 + y2) / 2;
    g.appendChild(text(x - 8, ty, Math.round((y2 - y1) / UNIT * 10), 'dim-text', {
      'text-anchor': 'middle', 'dominant-baseline': 'text-after-edge',
      transform: 'rotate(-90 ' + (x - 8) + ' ' + ty + ')'
    }));
    return g;
  }

  function buildHexTemplate() {
    const cx = UNIT * 6, cy = UNIT * 6, r = UNIT * 3;
    const pts = [];
    for (let i = 0; i <= 6; i++) {
      const rad = (Math.PI / 3) * i - Math.PI / 2;
      pts.push([cx + Math.cos(rad) * r, cy + Math.sin(rad) * r]);
    }
    let outerD = 'M' + pts.map(function(p) { return p[0] + ' ' + p[1]; }).join('L');
    let spokeD = '';
    for (let i = 0; i < 6; i++) {
      spokeD += 'M' + cx + ' ' + cy + 'L' + pts[i][0] + ' ' + pts[i][1];
    }
    const g = el('g', {});
    g.appendChild(el('path', { class: 'hex-outer', d: outerD }));
    g.appendChild(el('path', { class: 'hex-spoke', d: spokeD }));
    return { node: g, center: { x: cx, y: cy } };
  }

  function buildCompassCircles(height) {
    const cx = UNIT * 5, cy = height / 2;
    const radii = [UNIT * 1.5, UNIT * 2.5, UNIT * 3.5];
    const g = el('g', {});
    radii.forEach(function(r) {
      g.appendChild(el('circle', { class: 'compass-circle', cx: cx, cy: cy, r: r }));
    });
    const maxR = radii[radii.length - 1];
    g.appendChild(el('path', {
      class: 'compass-cross',
      d: 'M' + (cx - maxR - 6) + ' ' + cy + 'L' + (cx + maxR + 6) + ' ' + cy +
        'M' + cx + ' ' + (cy - maxR - 6) + 'L' + cx + ' ' + (cy + maxR + 6)
    }));
    return { node: g, center: { x: cx, y: cy } };
  }

  function buildCrosshairTarget(height) {
    const cx = UNIT * 4, cy = height - UNIT * 4, r = 10;
    const g = el('g', {});
    g.appendChild(el('circle', { class: 'crosshair', cx: cx, cy: cy, r: r }));
    g.appendChild(el('path', {
      class: 'crosshair',
      d: 'M' + (cx - r - 8) + ' ' + cy + 'L' + (cx - r) + ' ' + cy +
        'M' + (cx + r) + ' ' + cy + 'L' + (cx + r + 8) + ' ' + cy +
        'M' + cx + ' ' + (cy - r - 8) + 'L' + cx + ' ' + (cy - r) +
        'M' + cx + ' ' + (cy + r) + 'L' + cx + ' ' + (cy + r + 8)
    }));
    return { node: g, center: { x: cx, y: cy } };
  }

  const STORAGE_KEY = 'particle-bg-flip-state';
  let savedState = null;
  try {
    savedState = JSON.parse(sessionStorage.getItem(STORAGE_KEY));
  } catch (e) {
    savedState = null;
  }
  const flipAngle = {};

  let flipNodes = {};
  let flipTimer;

  function build() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const cols = Math.ceil(width / UNIT);
    const rows = Math.ceil(height / UNIT);

    svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
    svg.textContent = '';
    svg.appendChild(styleEl());

    const root = el('g', { class: 'p-root' });
    root.appendChild(buildGrid(cols, rows, width, height));
    root.appendChild(buildLongDiagonal(width, height));

    const arcs = buildArcs(width, height);
    const protractor = buildProtractor(width, height);
    const hexTemplate = buildHexTemplate();
    const compassCircles = buildCompassCircles(height);
    const crosshairTarget = buildCrosshairTarget(height);

    flipNodes = { arcs: arcs, protractor: protractor, hexTemplate: hexTemplate, compassCircles: compassCircles, crosshairTarget: crosshairTarget };

    Object.keys(flipNodes).forEach(function(key) {
      const f = flipNodes[key];
      f.node.classList.add('flip');
      f.node.style.transformOrigin = f.center.x + 'px ' + f.center.y + 'px';
      if (typeof flipAngle[key] !== 'number') {
        flipAngle[key] = (savedState && typeof savedState[key] === 'number') ? savedState[key] : 0;
      }
      f.node.style.transform = 'rotate(' + flipAngle[key] + 'rad)';
    });

    root.appendChild(arcs.node);
    root.appendChild(protractor.node);
    root.appendChild(buildDimensionLine(width));
    root.appendChild(buildVerticalDimension());
    root.appendChild(hexTemplate.node);
    root.appendChild(compassCircles.node);
    root.appendChild(crosshairTarget.node);
    root.appendChild(buildEdgeTicks(cols, rows, width, height));
    root.appendChild(buildRuler(cols, rows, width, height));

    svg.appendChild(root);
  }

  function saveState() {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(flipAngle));
    } catch (e) {
      // ignore (private browsing / storage disabled)
    }
  }

  window.addEventListener('pagehide', saveState);

  const flipKeys = ['arcs', 'protractor', 'hexTemplate', 'compassCircles', 'crosshairTarget'];

  function startRandomFlip() {
    const key = flipKeys[Math.floor(Math.random() * flipKeys.length)];
    const node = flipNodes[key];
    if (!node) return;
    const degrees = 8 + Math.random() * 12;
    const direction = Math.random() < 0.5 ? -1 : 1;
    flipAngle[key] += degrees * (Math.PI / 180) * direction;
    node.node.style.transform = 'rotate(' + flipAngle[key] + 'rad)';
    scheduleNextFlip();
  }

  function scheduleNextFlip() {
    const delay = 100 + Math.random() * 250;
    flipTimer = setTimeout(startRandomFlip, delay);
  }

  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(build, 150);
  });

  build();
  scheduleNextFlip();
})();
