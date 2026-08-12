/* ============================================================
   PORTFOLIO — v3 (85+ audit-fixed)
   ============================================================ */
(function () {
  'use strict';

  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  function debounce(fn, ms) {
    var t;
    return function () { clearTimeout(t); var a = arguments, cx = this; t = setTimeout(function () { fn.apply(cx, a); }, ms); };
  }

  /* ============================================================
     1. HERO SCATTER PLOT — with entrance animation
     ============================================================ */
  function initHeroViz() {
    var canvas = $('#heroViz');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var skills = [
      { name: 'Python', x: 0.85, y: 0.9, cat: 'data' },
      { name: 'SQL', x: 0.75, y: 0.85, cat: 'data' },
      { name: 'Pandas', x: 0.8, y: 0.88, cat: 'data' },
      { name: 'NumPy', x: 0.7, y: 0.78, cat: 'data' },
      { name: 'Scikit-learn', x: 0.72, y: 0.72, cat: 'data' },
      { name: 'FastAPI', x: 0.68, y: 0.7, cat: 'dev' },
      { name: 'Power BI', x: 0.55, y: 0.82, cat: 'data' },
      { name: 'Tableau', x: 0.5, y: 0.75, cat: 'data' },
      { name: 'Matplotlib', x: 0.65, y: 0.76, cat: 'data' },
      { name: 'Streamlit', x: 0.58, y: 0.68, cat: 'dev' },
      { name: 'MySQL', x: 0.6, y: 0.8, cat: 'data' },
      { name: 'MongoDB', x: 0.45, y: 0.55, cat: 'data' },
      { name: 'HTML/CSS', x: 0.4, y: 0.85, cat: 'dev' },
      { name: 'JavaScript', x: 0.55, y: 0.65, cat: 'dev' },
      { name: 'Git/GitHub', x: 0.35, y: 0.88, cat: 'tool' },
      { name: 'Docker', x: 0.5, y: 0.5, cat: 'tool' },
      { name: 'AWS', x: 0.42, y: 0.45, cat: 'tool' },
      { name: 'Linux', x: 0.38, y: 0.82, cat: 'tool' },
      { name: 'VS Code', x: 0.3, y: 0.9, cat: 'tool' },
      { name: 'Jupyter', x: 0.62, y: 0.85, cat: 'tool' },
      { name: 'Excel', x: 0.35, y: 0.78, cat: 'data' },
      { name: 'Plotly', x: 0.6, y: 0.7, cat: 'data' },
      { name: 'Seaborn', x: 0.55, y: 0.72, cat: 'data' },
      { name: 'Bash', x: 0.45, y: 0.7, cat: 'dev' },
    ];

    var catColors = { data: '#f5a623', dev: '#3b82f6', tool: '#22c55e' };
    var W, H, points = [], hovered = -1, animT = 0, animDone = false;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildPoints();
      if (RM || animDone) draw(1);
    }

    function buildPoints() {
      points = skills.map(function (s) {
        return { x: s.x * (W - 80) + 40, y: (1 - s.y) * (H - 80) + 40, name: s.name, cat: s.cat };
      });
    }

    function draw(t) {
      ctx.clearRect(0, 0, W, H);
      // grid
      ctx.strokeStyle = 'rgba(255,255,255,0.04)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= 4; i++) {
        var gx = 40 + (i / 4) * (W - 80);
        ctx.beginPath(); ctx.moveTo(gx, 40); ctx.lineTo(gx, H - 40); ctx.stroke();
        var gy = 40 + (i / 4) * (H - 80);
        ctx.beginPath(); ctx.moveTo(40, gy); ctx.lineTo(W - 40, gy); ctx.stroke();
      }
      // axis labels
      ctx.fillStyle = '#555';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('COMPLEXITY →', W / 2, H - 10);
      ctx.save();
      ctx.translate(12, H / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('PROFICIENCY →', 0, 0);
      ctx.restore();
      // points
      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var delay = i / points.length;
        var pt = Math.max(0, Math.min(1, (t - delay * 0.4) / 0.6));
        var ease = 1 - Math.pow(1 - pt, 3);
        var alpha = ease * (hovered === i ? 1 : 0.7);
        var r = hovered === i ? 8 : 4.5;
        if (pt <= 0) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = catColors[p.cat];
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        if (hovered === i) {
          ctx.fillStyle = '#e8e8e8';
          ctx.font = '600 11px "Inter", sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(p.name, p.x, p.y - 14);
        }
      }
    }

    function animateEntrance() {
      if (RM) { animDone = true; draw(1); return; }
      var t0 = performance.now();
      (function tick(now) {
        animT = Math.min((now - t0) / 1400, 1);
        draw(animT);
        if (animT < 1) requestAnimationFrame(tick);
        else animDone = true;
      })(t0);
    }

    function onMove(e) {
      var rect = canvas.getBoundingClientRect();
      var mx = e.clientX - rect.left, my = e.clientY - rect.top;
      hovered = -1;
      for (var i = 0; i < points.length; i++) {
        var dx = mx - points[i].x, dy = my - points[i].y;
        if (Math.sqrt(dx * dx + dy * dy) < 14) { hovered = i; break; }
      }
      canvas.style.cursor = hovered >= 0 ? 'pointer' : 'default';
      if (animDone) draw(1);
    }

    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', function () { hovered = -1; if (animDone) draw(1); });
    window.addEventListener('resize', debounce(resize, 150));
    resize();
    animateEntrance();
  }

  /* ============================================================
     2. CHARTS — robust loading
     ============================================================ */
  function tryInitCharts() {
    if (typeof Chart !== 'undefined') { initCharts(); return true; }
    return false;
  }

  function initCharts() {
    Chart.defaults.color = '#999';
    Chart.defaults.borderColor = 'rgba(255,255,255,0.06)';
    Chart.defaults.font.family = "'JetBrains Mono', monospace";
    Chart.defaults.font.size = 10;

    var c1 = $('#chart1');
    if (c1) {
      new Chart(c1, {
        type: 'bar',
        data: {
          labels: ['Identity\nProtection', 'Statistical\nUtility', 'Data\nVolume', 'Processing\nSpeed'],
          datasets: [{
            label: 'Before', data: [10, 100, 100, 15],
            backgroundColor: 'rgba(255,255,255,0.08)', borderColor: 'rgba(255,255,255,0.15)',
            borderWidth: 1, borderRadius: 3,
          }, {
            label: 'After', data: [85, 91, 97, 95],
            backgroundColor: 'rgba(245,166,35,0.7)', borderColor: '#f5a623',
            borderWidth: 1, borderRadius: 3,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'top', labels: { boxWidth: 12, padding: 12, font: { size: 10 } } } },
          scales: { y: { beginAtZero: true, max: 110, ticks: { callback: function (v) { return v + '%'; } } }, x: { grid: { display: false } } }
        }
      });
    }

    var c2 = $('#chart2');
    if (c2) {
      new Chart(c2, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Bookings', data: [8200, 7800, 9100, 10200, 11500, 12800, 14200, 13600, 12100, 11800, 10900, 13200],
            borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.08)',
            fill: true, tension: 0.4, pointRadius: 2, pointHoverRadius: 5, borderWidth: 2,
          }, {
            label: 'Cancellations', data: [1100, 1050, 1200, 1350, 1480, 1620, 1780, 1710, 1540, 1490, 1400, 1680],
            borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.06)',
            fill: true, tension: 0.4, pointRadius: 2, pointHoverRadius: 5, borderWidth: 2,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: 'top', labels: { boxWidth: 12, padding: 12, font: { size: 10 } } } },
          scales: { y: { beginAtZero: true, ticks: { callback: function (v) { return (v / 1000).toFixed(0) + 'k'; } } }, x: { grid: { display: false } } },
          interaction: { intersect: false, mode: 'index' }
        }
      });
    }

    var c3 = $('#chart3');
    if (c3) {
      new Chart(c3, {
        type: 'radar',
        data: {
          labels: ['SQL Injection', 'XSS', 'Brute Force', 'Anomaly', 'Authentication', 'Logging'],
          datasets: [{
            label: 'Coverage', data: [85, 78, 92, 88, 95, 90],
            backgroundColor: 'rgba(245,166,35,0.15)', borderColor: '#f5a623',
            borderWidth: 2, pointBackgroundColor: '#f5a623', pointRadius: 3,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { r: { beginAtZero: true, max: 100, ticks: { display: false }, grid: { color: 'rgba(255,255,255,0.06)' }, pointLabels: { font: { size: 10, family: "'JetBrains Mono', monospace" }, color: '#999' } } }
        }
      });
    }
  }

  // Robust Chart.js loading: try immediately, then on DOMContentLoaded, then on window load
  function initChartsEventually() {
    if (tryInitCharts()) return;
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () {
        if (!tryInitCharts()) window.addEventListener('load', tryInitCharts);
      });
    } else {
      window.addEventListener('load', tryInitCharts);
    }
  }

  /* ============================================================
     3. SKILLS GRID
     ============================================================ */
  function initSkills() {
    var host = $('#skillsGrid');
    if (!host) return;
    var categories = [
      { title: 'Languages', skills: [
        { name: 'Python', level: 5 }, { name: 'SQL', level: 4 }, { name: 'Bash', level: 3 }, { name: 'JavaScript', level: 3 },
      ]},
      { title: 'Data Processing', skills: [
        { name: 'Pandas', level: 5 }, { name: 'NumPy', level: 4 }, { name: 'Scikit-Learn', level: 4 },
        { name: 'Data Cleaning', level: 5 }, { name: 'EDA', level: 4 }, { name: 'Feature Engineering', level: 3 },
      ]},
      { title: 'Visualization', skills: [
        { name: 'Power BI', level: 4 }, { name: 'Tableau', level: 3 }, { name: 'Matplotlib', level: 4 },
        { name: 'Streamlit', level: 4 }, { name: 'Plotly', level: 3 },
      ]},
      { title: 'Infrastructure', skills: [
        { name: 'MySQL', level: 4 }, { name: 'MongoDB', level: 3 }, { name: 'Git / GitHub', level: 4 },
        { name: 'Docker', level: 3 }, { name: 'AWS', level: 3 }, { name: 'Linux', level: 4 }, { name: 'VS Code', level: 4 },
      ]},
    ];
    categories.forEach(function (cat) {
      var el = document.createElement('div');
      el.className = 'skill-category';
      el.innerHTML = '<h3 class="skill-category__title">' + cat.title + '</h3><div class="skill-category__items">' +
        cat.skills.map(function (s) {
          var dots = '';
          for (var i = 0; i < 5; i++) dots += '<span class="' + (i < s.level ? 'filled' : '') + '"></span>';
          return '<div class="skill-item"><span class="skill-item__name">' + s.name + '</span><span class="skill-item__level">' + dots + '</span></div>';
        }).join('') + '</div>';
      host.appendChild(el);
    });
  }

  /* ============================================================
     4. COUNTERS — trigger on work section, not hero
     ============================================================ */
  function initCounters() {
    var els = $$('[data-count]');
    if (!els.length) return;
    if (RM) {
      els.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var dec = el.getAttribute('data-decimal') === 'true';
        el.textContent = dec ? target.toFixed(2) : Math.round(target).toLocaleString('en-IN');
      });
      return;
    }
    var done = false;
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting && !done) {
        done = true;
        els.forEach(function (el) {
          var target = parseFloat(el.getAttribute('data-count'));
          var dec = el.getAttribute('data-decimal') === 'true';
          var t0 = null;
          function frame(ts) {
            if (!t0) t0 = ts;
            var p = Math.min((ts - t0) / 1800, 1);
            var ease = 1 - Math.pow(1 - p, 3);
            el.textContent = dec ? (target * ease).toFixed(2) : Math.round(target * ease).toLocaleString('en-IN');
            if (p < 1) requestAnimationFrame(frame);
          }
          requestAnimationFrame(frame);
        });
        obs.disconnect();
      }
    }, { threshold: 0.5 });
    // Observe the stats container — it's in the hero, so it's visible on load
    var meta = els[0].closest('.hero__meta') || els[0].parentElement;
    obs.observe(meta);
  }

  /* ============================================================
     5. SCROLL REVEAL
     ============================================================ */
  function initReveal() {
    var targets = $$('.section__header, .project, .about__lead, .about__text p, .about__certs, .about__timeline, .contact__grid, .skills-grid');
    targets.forEach(function (t) { t.classList.add('reveal'); });
    if (RM) { targets.forEach(function (t) { t.classList.add('visible'); }); return; }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    targets.forEach(function (t) { obs.observe(t); });
  }

  /* ============================================================
     6. MOBILE MENU
     ============================================================ */
  function initMenu() {
    var toggle = $('#menuToggle');
    var menu = $('#mobileMenu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      menu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    $$('[data-mobile-link]', menu).forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) toggle.click();
    });
  }

  /* ============================================================
     7. CONTACT FORM — with validation messages
     ============================================================ */
  function initForm() {
    var form = $('#contactForm');
    if (!form) return;

    function validateField(input, errorId, message) {
      var error = $(errorId);
      var val = input.value.trim();
      var valid = true;
      var msg = '';

      if (!val) {
        valid = false;
        msg = message + ' is required.';
      } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        valid = false;
        msg = 'Please enter a valid email address.';
      }

      input.classList.toggle('error', !valid);
      if (error) {
        error.textContent = msg;
        error.classList.toggle('show', !valid);
      }
      return valid;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v1 = validateField($('#name'), '#nameError', 'Name');
      var v2 = validateField($('#email'), '#emailError', 'Email');
      var v3 = validateField($('#message'), '#messageError', 'Message');
      if (!v1 || !v2 || !v3) return;

      var name = $('#name').value || 'there';
      var email = $('#email').value || '';
      var msg = $('#message').value || '';
      window.location.href = 'mailto:arshadalia2703@gmail.com?subject=' +
        encodeURIComponent('Project inquiry from ' + name) + '&body=' +
        encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + msg);
    });

    $$('input, textarea', form).forEach(function (f) {
      f.addEventListener('input', function () {
        f.classList.remove('error');
        var err = f.closest('.form__group').querySelector('.form__error');
        if (err) { err.textContent = ''; err.classList.remove('show'); }
      });
    });
  }

  /* ============================================================
     8. SMOOTH SCROLL
     ============================================================ */
  function initScroll() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id === '#') return;
        var target = $(id);
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); }
      });
    });
  }

  /* ============================================================
     INIT
     ============================================================ */
  function init() {
    initHeroViz();
    initChartsEventually();
    initSkills();
    initCounters();
    initReveal();
    initMenu();
    initForm();
    initScroll();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
