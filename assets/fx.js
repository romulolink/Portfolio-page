// Shared visual effects: particle network canvas that reacts to the pointer.
(function () {
  var canvas = document.getElementById("fx");
  if (!canvas) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var ctx = canvas.getContext("2d");
  var w, h, dpr, pts = [], mouse = { x: -999, y: -999 };

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = innerWidth; h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var n = Math.min(110, Math.floor((w * h) / 14000));
    pts = [];
    for (var i = 0; i < n; i++) {
      pts.push({ x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .4, vy: (Math.random() - .5) * .4 });
    }
  }
  addEventListener("resize", resize);
  addEventListener("pointermove", function (e) { mouse.x = e.clientX; mouse.y = e.clientY; });
  addEventListener("pointerleave", function () { mouse.x = mouse.y = -999; });

  function frame() {
    ctx.clearRect(0, 0, w, h);
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      var dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 14000) { var f = .02; p.x += dx * f; p.y += dy * f; }
      ctx.fillStyle = "rgba(180,190,255,.7)";
      ctx.fillRect(p.x, p.y, 1.8, 1.8);
      for (var j = i + 1; j < pts.length; j++) {
        var q = pts[j], ax = p.x - q.x, ay = p.y - q.y, d = ax * ax + ay * ay;
        if (d < 12000) {
          ctx.strokeStyle = "rgba(124,92,255," + (1 - d / 12000) * .35 + ")";
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
    }
    requestAnimationFrame(frame);
  }
  resize();
  frame();
})();
