(function() {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;

  const isNarrowViewport = window.matchMedia('(max-width: 640px)').matches;

  if (isNarrowViewport) {
    return;
  }

  function init() {
    const ctx = canvas.getContext('2d');
    let width, height, dpr;

    const UNIT = 40;
    const MAJOR_EVERY = 5;

    function getColor(varName, fallback) {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(varName).trim();
      return value || fallback;
    }

    let accentColor = getColor('--accent', '#0071e3');

    function hexToRgb(hex) {
      const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return m
        ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
        : { r: 0, g: 113, b: 227 };
    }

    function drawGrid(rgb, cols, rows) {
      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        if (c % MAJOR_EVERY === 0) continue;
        const x = c * UNIT;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r <= rows; r++) {
        if (r % MAJOR_EVERY === 0) continue;
        const y = r * UNIT;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.16)';
      ctx.beginPath();
      for (let c = 0; c <= cols; c += MAJOR_EVERY) {
        const x = c * UNIT;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let r = 0; r <= rows; r += MAJOR_EVERY) {
        const y = r * UNIT;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    }

    function drawEdgeTicks(rgb, cols, rows) {
      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        if (c % MAJOR_EVERY === 0) continue;
        const x = c * UNIT;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 4);
        ctx.moveTo(x, height);
        ctx.lineTo(x, height - 4);
      }
      for (let r = 0; r <= rows; r++) {
        if (r % MAJOR_EVERY === 0) continue;
        const y = r * UNIT;
        ctx.moveTo(0, y);
        ctx.lineTo(4, y);
        ctx.moveTo(width, y);
        ctx.lineTo(width - 4, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.5)';
      ctx.beginPath();
      for (let c = 0; c <= cols; c += MAJOR_EVERY) {
        const x = c * UNIT;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 8);
        ctx.moveTo(x, height);
        ctx.lineTo(x, height - 8);
      }
      for (let r = 0; r <= rows; r += MAJOR_EVERY) {
        const y = r * UNIT;
        ctx.moveTo(0, y);
        ctx.lineTo(8, y);
        ctx.moveTo(width, y);
        ctx.lineTo(width - 8, y);
      }
      ctx.stroke();
    }

    function drawRuler(rgb, cols, rows) {
      ctx.fillStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.4)';
      ctx.font = '9px monospace';

      ctx.textBaseline = 'top';
      ctx.textAlign = 'left';
      for (let c = MAJOR_EVERY; c <= cols; c += MAJOR_EVERY) {
        ctx.fillText(String(c / MAJOR_EVERY), c * UNIT + 3, 3);
      }

      ctx.textBaseline = 'alphabetic';
      for (let r = MAJOR_EVERY; r <= rows; r += MAJOR_EVERY) {
        ctx.fillText(String(r / MAJOR_EVERY), 3, r * UNIT - 3);
      }

      ctx.textAlign = 'right';
      ctx.textBaseline = 'bottom';
      for (let c = 0; c <= cols; c += MAJOR_EVERY) {
        ctx.fillText(String(c / MAJOR_EVERY), c * UNIT - 3, height - 3);
      }

      ctx.textAlign = 'right';
      ctx.textBaseline = 'top';
      for (let r = 0; r <= rows; r += MAJOR_EVERY) {
        if (r === 0) continue;
        ctx.fillText(String(r / MAJOR_EVERY), width - 3, r * UNIT - 12);
      }
    }

    function drawProtractor(rgb) {
      const cx = width - UNIT * 3;
      const cy = height - UNIT * 5;
      const r = UNIT * 4;
      const rotation = -Math.PI / 2;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);

      ctx.fillStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.05)';
      ctx.beginPath();
      ctx.moveTo(-r, 0);
      ctx.arc(0, 0, r, Math.PI, 2 * Math.PI, false);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, r, Math.PI, 2 * Math.PI, false);
      ctx.moveTo(-r, 0);
      ctx.lineTo(r, 0);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.35)';
      ctx.beginPath();
      for (let deg = 0; deg <= 180; deg += 5) {
        const rad = deg * Math.PI / 180;
        const inner = r - (deg % 10 === 0 ? 10 : 6);
        ctx.moveTo(Math.cos(rad) * r, -Math.sin(rad) * r);
        ctx.lineTo(Math.cos(rad) * inner, -Math.sin(rad) * inner);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.45)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (let deg = 0; deg <= 180; deg += 30) {
        const rad = deg * Math.PI / 180;
        const lx = Math.cos(rad) * (r - 20);
        const ly = -Math.sin(rad) * (r - 20);
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(-rotation);
        ctx.fillText(String(deg), 0, 0);
        ctx.restore();
      }

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.4)';
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(5, 0);
      ctx.moveTo(0, -5);
      ctx.lineTo(0, 5);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.22)';
      ctx.beginPath();
      [40, 125].forEach(function(deg) {
        const rad = deg * Math.PI / 180;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(rad) * (r + UNIT * 3), -Math.sin(rad) * (r + UNIT * 3));
      });
      ctx.stroke();

      ctx.restore();
    }

    function drawLongDiagonal(rgb) {
      ctx.save();
      ctx.setLineDash([6, 5]);
      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, 0);
      ctx.stroke();
      ctx.restore();
    }

    function drawArcs(rgb) {
      const arcs = [
        { cx: width - UNIT * 4, cy: height + UNIT * 2, r: UNIT * 8 },
        { cx: width - UNIT * 4, cy: height + UNIT * 2, r: UNIT * 5 }
      ];
      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.18)';
      ctx.lineWidth = 1;
      arcs.forEach(function(a) {
        ctx.beginPath();
        ctx.arc(a.cx, a.cy, a.r, Math.PI, Math.PI * 1.5);
        ctx.stroke();
      });

      ctx.fillStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.32)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const midAngle = Math.PI * 1.25;
      arcs.forEach(function(a) {
        const lx = a.cx + Math.cos(midAngle) * a.r;
        const ly = a.cy + Math.sin(midAngle) * a.r;
        ctx.fillText('R' + Math.round(a.r / UNIT * 10), lx, ly);
      });
    }

    function drawDimensionLine(rgb) {
      const y = UNIT * 2;
      const x1 = width - UNIT * 13;
      const x2 = width - UNIT * 3;
      const arrow = 5;

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x1, y - UNIT * 0.4);
      ctx.lineTo(x1, y + 5);
      ctx.moveTo(x2, y - UNIT * 0.4);
      ctx.lineTo(x2, y + 5);
      ctx.moveTo(x1, y);
      ctx.lineTo(x2, y);
      ctx.moveTo(x1 + arrow, y - arrow / 2);
      ctx.lineTo(x1, y);
      ctx.lineTo(x1 + arrow, y + arrow / 2);
      ctx.moveTo(x2 - arrow, y - arrow / 2);
      ctx.lineTo(x2, y);
      ctx.lineTo(x2 - arrow, y + arrow / 2);
      ctx.stroke();

      ctx.fillStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.4)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(Math.round((x2 - x1) / UNIT * 10), (x1 + x2) / 2, y - 3);
    }

    function drawHexTemplate(rgb) {
      const cx = UNIT * 6;
      const cy = UNIT * 6;
      const r = UNIT * 3;

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i <= 6; i++) {
        const rad = (Math.PI / 3) * i - Math.PI / 2;
        const x = cx + Math.cos(rad) * r;
        const y = cy + Math.sin(rad) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.12)';
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const rad = (Math.PI / 3) * i - Math.PI / 2;
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(rad) * r, cy + Math.sin(rad) * r);
      }
      ctx.stroke();
    }

    function drawCompassCircles(rgb) {
      const cx = UNIT * 5;
      const cy = height / 2;
      const radii = [UNIT * 1.5, UNIT * 2.5, UNIT * 3.5];

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.18)';
      ctx.lineWidth = 1;
      radii.forEach(function(r) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      const maxR = radii[radii.length - 1];
      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.3)';
      ctx.beginPath();
      ctx.moveTo(cx - maxR - 6, cy);
      ctx.lineTo(cx + maxR + 6, cy);
      ctx.moveTo(cx, cy - maxR - 6);
      ctx.lineTo(cx, cy + maxR + 6);
      ctx.stroke();
    }

    function drawCrosshairTarget(rgb) {
      const cx = UNIT * 4;
      const cy = height - UNIT * 4;
      const r = 10;

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.moveTo(cx - r - 8, cy);
      ctx.lineTo(cx - r, cy);
      ctx.moveTo(cx + r, cy);
      ctx.lineTo(cx + r + 8, cy);
      ctx.moveTo(cx, cy - r - 8);
      ctx.lineTo(cx, cy - r);
      ctx.moveTo(cx, cy + r);
      ctx.lineTo(cx, cy + r + 8);
      ctx.stroke();
    }

    function drawVerticalDimension(rgb) {
      const x = UNIT * 2;
      const y1 = UNIT * 9;
      const y2 = UNIT * 16;
      const arrow = 5;

      ctx.strokeStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - UNIT * 0.4, y1);
      ctx.lineTo(x + 5, y1);
      ctx.moveTo(x - UNIT * 0.4, y2);
      ctx.lineTo(x + 5, y2);
      ctx.moveTo(x, y1);
      ctx.lineTo(x, y2);
      ctx.moveTo(x - arrow / 2, y1 + arrow);
      ctx.lineTo(x, y1);
      ctx.lineTo(x + arrow / 2, y1 + arrow);
      ctx.moveTo(x - arrow / 2, y2 - arrow);
      ctx.lineTo(x, y2);
      ctx.lineTo(x + arrow / 2, y2 - arrow);
      ctx.stroke();

      ctx.save();
      ctx.translate(x - 8, (y1 + y2) / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', 0.4)';
      ctx.font = '9px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(Math.round((y2 - y1) / UNIT * 10), 0, 0);
      ctx.restore();
    }

    const flippable = {
      arcs: { fn: drawArcs, getCenter: function() { return { x: width - UNIT * 4, y: height + UNIT * 2 }; } },
      protractor: { fn: drawProtractor, getCenter: function() { return { x: width - UNIT * 3, y: height - UNIT * 5 }; } },
      hexTemplate: { fn: drawHexTemplate, getCenter: function() { return { x: UNIT * 6, y: UNIT * 6 }; } },
      compassCircles: { fn: drawCompassCircles, getCenter: function() { return { x: UNIT * 5, y: height / 2 }; } },
      crosshairTarget: { fn: drawCrosshairTarget, getCenter: function() { return { x: UNIT * 4, y: height - UNIT * 4 }; } }
    };
    const flipKeys = Object.keys(flippable);
    const flipAngle = {};
    flipKeys.forEach(function(key) { flipAngle[key] = 0; });

    function drawFlippable(key, rgb) {
      const shape = flippable[key];
      const angle = flipAngle[key];
      if (angle === 0) {
        shape.fn(rgb);
        return;
      }
      const c = shape.getCenter();
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(angle);
      ctx.translate(-c.x, -c.y);
      shape.fn(rgb);
      ctx.restore();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const rgb = hexToRgb(accentColor);
      const cols = Math.ceil(width / UNIT);
      const rows = Math.ceil(height / UNIT);

      ctx.save();
      ctx.globalAlpha = 0.5;

      drawGrid(rgb, cols, rows);
      drawLongDiagonal(rgb);
      drawFlippable('arcs', rgb);
      drawFlippable('protractor', rgb);
      drawDimensionLine(rgb);
      drawVerticalDimension(rgb);
      drawFlippable('hexTemplate', rgb);
      drawFlippable('compassCircles', rgb);
      drawFlippable('crosshairTarget', rgb);
      drawEdgeTicks(rgb, cols, rows);
      drawRuler(rgb, cols, rows);

      ctx.restore();
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    }

    let activeFlip = null;
    let flipTimer;

    function tickFlip(now) {
      if (!activeFlip) return;
      const t = Math.min(1, (now - activeFlip.start) / activeFlip.duration);
      flipAngle[activeFlip.key] = activeFlip.from + (activeFlip.to - activeFlip.from) * easeInOutQuad(t);
      draw();
      if (t < 1) {
        requestAnimationFrame(tickFlip);
      } else {
        activeFlip = null;
        scheduleNextFlip();
      }
    }

    function startRandomFlip() {
      const key = flipKeys[Math.floor(Math.random() * flipKeys.length)];
      const from = flipAngle[key];
      const degrees = 8 + Math.random() * 12;
      const direction = Math.random() < 0.5 ? -1 : 1;
      const delta = degrees * (Math.PI / 180) * direction;
      activeFlip = { key: key, from: from, to: from + delta, start: performance.now(), duration: 130 };
      requestAnimationFrame(tickFlip);
    }

    function scheduleNextFlip() {
      const delay = 100 + Math.random() * 250;
      flipTimer = setTimeout(startRandomFlip, delay);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    }

    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    });

    resize();
    scheduleNextFlip();

    return {
      refreshColor: function() {
        accentColor = getColor('--accent', '#0071e3');
        draw();
      }
    };
  }

  const controller = init();

  document.addEventListener('themechange', function() {
    controller.refreshColor();
  });
})();
