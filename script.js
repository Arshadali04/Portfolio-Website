/* ============================================================
   ARSHADALI M ATHANI — PORTFOLIO
   Vanilla JS: background node network, scroll reveals,
   counters, skills stage, project detail toggles, nav behavior.
   ============================================================ */

(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------
     1. BACKGROUND — data node network canvas
     A quiet field of "data points" that link when close and
     drift toward the cursor. Represents the subject (data
     analysis / pattern-finding) instead of a decorative blob.
  --------------------------------------------------------- */
  function initBackground() {
    var canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var w, h, dpr;
    var nodes = [];
    var mouse = { x: null, y: null, active: false };
    var NODE_COUNT;
    var LINK_DIST = 130;
    var MOUSE_DIST = 170;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      NODE_COUNT = Math.max(28, Math.min(70, Math.floor((w * h) / 26000)));
      buildNodes();
    }

    function buildNodes() {
      nodes = [];
      for (var i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          r: Math.random() * 1.6 + 1.2,
          pulse: Math.random() * Math.PI * 2
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, w, h);

      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        if (n.x < -20) n.x = w + 20;
        if (n.x > w + 20) n.x = -20;
        if (n.y < -20) n.y = h + 20;
        if (n.y > h + 20) n.y = -20;

        if (mouse.active) {
          var dx = mouse.x - n.x, dy = mouse.y - n.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MOUSE_DIST) {
            var force = (1 - dist / MOUSE_DIST) * 0.02;
            n.x += dx * force;
            n.y += dy * force;
          }
        }
      }

      // links
      for (var i = 0; i < nodes.length; i++) {
        for (var j = i + 1; j < nodes.length; j++) {
          var a = nodes[i], b = nodes[j];
          var dx = a.x - b.x, dy = a.y - b.y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            var op = (1 - dist / LINK_DIST) * 0.16;
            ctx.strokeStyle = 'rgba(56, 96, 247,' + op + ')';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var glow = 0.55 + Math.sin(n.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 96, 247,' + glow + ')';
        ctx.fill();
      }

      if (!reduceMotion) requestAnimationFrame(step);
    }

    window.addEventListener('resize', debounce(resize, 150));
    window.addEventListener('mousemove', function (e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });
    window.addEventListener('mouseleave', function () { mouse.active = false; });
    window.addEventListener('touchmove', function (e) {
      if (e.touches && e.touches[0]) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        mouse.active = true;
      }
    }, { passive: true });

    resize();
    if (reduceMotion) {
      step(); // draw one static frame
    } else {
      requestAnimationFrame(step);
    }
  }

  function debounce(fn, wait) {
    var t;
    return function () {
      clearTimeout(t);
      var args = arguments, ctx = this;
      t = setTimeout(function () { fn.apply(ctx, args); }, wait);
    };
  }

  /* ---------------------------------------------------------
     2. NAV — scroll shadow, active link, mobile toggle
  --------------------------------------------------------- */
  function initNav() {
    var nav = document.getElementById('nav');
    var toggle = document.getElementById('navToggle');
    var links = document.querySelectorAll('[data-nav]');
    var sections = Array.prototype.map.call(links, function (l) {
      return document.querySelector(l.getAttribute('href'));
    });

    toggle.addEventListener('click', function () {
      nav.classList.toggle('is-open');
    });
    links.forEach(function (l) {
      l.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });

    function onScroll() {
      var scrollY = window.scrollY + 160;
      var current = null;
      sections.forEach(function (sec, i) {
        if (sec && sec.offsetTop <= scrollY) current = links[i];
      });
      links.forEach(function (l) { l.classList.remove('is-active'); });
      if (current) current.classList.add('is-active');

      // scroll progress bar
      var doc = document.documentElement;
      var scrollTop = doc.scrollTop || document.body.scrollTop;
      var scrollHeight = (doc.scrollHeight || document.body.scrollHeight) - doc.clientHeight;
      var pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      var bar = document.getElementById('scrollProgress');
      if (bar) bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------------------------------------------------
     3. SCROLL REVEALS — IntersectionObserver
  --------------------------------------------------------- */
  function initReveals() {
    var targets = document.querySelectorAll(
      '.about__body, .about__facts, .skills__interface, .project, .timeline__item, .credential, .contact__card, .section-head'
    );
    targets.forEach(function (t) { t.classList.add('reveal'); });

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (t) { t.classList.add('is-visible'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(function (t) { io.observe(t); });
  }

  /* ---------------------------------------------------------
     4. HERO STAT COUNTERS
  --------------------------------------------------------- */
  function initCounters() {
    var stats = document.querySelectorAll('.stat__value');
    var done = false;

    function animate() {
      if (done) return;
      done = true;
      stats.forEach(function (el) {
        var target = parseFloat(el.getAttribute('data-count'));
        var suffix = el.getAttribute('data-suffix') || '';
        var isDecimal = el.getAttribute('data-decimal') === 'true';
        var start = 0;
        var duration = 1400;
        var startTime = null;

        function frame(ts) {
          if (!startTime) startTime = ts;
          var progress = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          var val = start + (target - start) * eased;
          el.textContent = (isDecimal ? val.toFixed(2) : Math.round(val).toLocaleString('en-IN')) + suffix;
          if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      });
    }

    var panel = document.getElementById('heroPanel');
    if (!panel) return;
    if (!('IntersectionObserver' in window)) { animate(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { animate(); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(panel);
  }

  /* ---------------------------------------------------------
     5. HERO MINI CHART — animated line drawn once, in-view
  --------------------------------------------------------- */
  function initMiniChart() {
    var line = document.getElementById('chartLine');
    var fill = document.getElementById('chartFill');
    var dotsGroup = document.getElementById('chartDots');
    if (!line) return;

    var points = [
      [0, 60], [40, 50], [80, 55], [120, 30], [160, 42], [200, 18], [240, 26], [280, 10]
    ];
    var alertIndex = 5; // point flagged as anomaly

    var lineStr = points.map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
    var fillStr = '0,90 ' + lineStr + ' 280,90';

    line.setAttribute('points', lineStr);
    fill.setAttribute('points', fillStr);

    var pathLength = 400;
    line.style.strokeDasharray = pathLength;
    line.style.strokeDashoffset = pathLength;

    points.forEach(function (p, i) {
      var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      c.setAttribute('cx', p[0]);
      c.setAttribute('cy', p[1]);
      c.setAttribute('r', i === alertIndex ? 4 : 2.5);
      c.setAttribute('class', i === alertIndex ? 'chart-dot chart-dot--alert' : 'chart-dot');
      c.style.opacity = '0';
      c.style.transition = 'opacity 0.4s ease ' + (i * 0.08 + 0.3) + 's';
      dotsGroup.appendChild(c);
    });

    var animated = false;
    function animate() {
      if (animated) return;
      animated = true;
      line.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(.16,.8,.24,1)';
      requestAnimationFrame(function () {
        line.style.strokeDashoffset = '0';
      });
      Array.prototype.forEach.call(dotsGroup.children, function (c) {
        c.style.opacity = '1';
      });
    }

    var panel = document.getElementById('heroPanel');
    if (!('IntersectionObserver' in window) || !panel) { animate(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { animate(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe(panel);
  }

  /* ---------------------------------------------------------
     6. SKILLS STAGE — tabbed interactive capability grid
  --------------------------------------------------------- */
  var SKILLS_DATA = {
    languages: [
      { name: 'Python', use: 'Primary language for pipelines, modeling, and dashboards.' },
      { name: 'SQL', use: 'Structuring and querying backend request and record data.' },
      { name: 'Bash', use: 'Scripting and automating routine data tasks on Linux.' }
    ],
    analysis: [
      { name: 'Pandas', use: 'Cleaning and reshaping tens of thousands of records.' },
      { name: 'NumPy', use: 'Vectorized numerical work under the hood of every pipeline.' },
      { name: 'Statistical Analysis', use: 'Measuring utility retained after anonymization.' },
      { name: 'Exploratory Data Analysis', use: 'First pass on any new dataset, before modeling.' },
      { name: 'Feature Engineering', use: 'Shaping raw fields into signals a model can use.' },
      { name: 'Data Cleaning', use: 'Where most of the actual project time goes.' },
      { name: 'Data Wrangling', use: 'Merging and reformatting messy multi-source inputs.' }
    ],
    visualization: [
      { name: 'Tableau', use: 'Building shareable, stakeholder-facing dashboards.' },
      { name: 'Power BI', use: 'Business-facing reporting and drill-down views.' },
      { name: 'Excel', use: 'Fast, familiar analysis for smaller ad-hoc datasets.' },
      { name: 'Matplotlib', use: 'Custom static charts for deeper statistical checks.' },
      { name: 'Seaborn', use: 'Distribution and correlation views during EDA.' },
      { name: 'Plotly', use: 'Interactive charts embedded in live dashboards.' },
      { name: 'Streamlit', use: 'Turning a script into a usable internal tool.' }
    ],
    ml: [
      { name: 'Scikit-Learn', use: 'Training and evaluating models end to end.' },
      { name: 'Anomaly Detection', use: 'Flagging traffic and records that don\u2019t fit the norm.' },
      { name: 'Isolation Forest', use: 'Core model behind the API attack detection system.' }
    ],
    databases: [
      { name: 'MySQL', use: 'Structured storage and querying for backend datasets.' }
    ],
    tools: [
      { name: 'Git', use: 'Version control for every project, from day one.' },
      { name: 'GitHub', use: 'Hosting, issues, and collaboration on active repos.' },
      { name: 'Jupyter Notebook', use: 'Iterating on analysis before it becomes a pipeline.' },
      { name: 'VS Code', use: 'Daily driver for scripts, dashboards, and APIs.' },
      { name: 'Linux', use: 'Development environment for most project work.' }
    ]
  };

  function initSkillsStage() {
    var tabs = document.querySelectorAll('.skills__tab');
    var stage = document.getElementById('skillStage');
    if (!stage) return;

    function render(cat) {
      var items = SKILLS_DATA[cat] || [];
      var grid = document.createElement('div');
      grid.className = 'skill-grid';
      items.forEach(function (item, i) {
        var chip = document.createElement('div');
        chip.className = 'skill-chip';
        chip.style.animationDelay = (i * 0.05) + 's';
        chip.innerHTML =
          '<span class="skill-chip__name">' + item.name + '</span>' +
          '<span class="skill-chip__use">' + item.use + '</span>';
        grid.appendChild(chip);
      });
      stage.innerHTML = '';
      stage.appendChild(grid);
    }

    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('is-active'); });
        tab.classList.add('is-active');
        render(tab.getAttribute('data-cat'));
      });
    });

    render('languages');
  }

  /* ---------------------------------------------------------
     7. PROJECT CASE-STUDY TOGGLES
  --------------------------------------------------------- */
  function initProjectToggles() {
    var buttons = document.querySelectorAll('[data-toggle-detail]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-toggle-detail');
        var panel = document.getElementById(id);
        if (!panel) return;
        var isOpen = panel.classList.toggle('is-open');
        btn.classList.toggle('is-open', isOpen);
        var label = btn.querySelector('span');
        if (label) label.textContent = isOpen ? 'Close' : 'Case study';
      });
    });
  }

  /* ---------------------------------------------------------
     8. TIMELINE — staggered reveal on scroll
  --------------------------------------------------------- */
  function initTimeline() {
    var items = document.querySelectorAll('.timeline__item');
    if (!('IntersectionObserver' in window)) {
      items.forEach(function (i) { i.classList.add('is-visible'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          setTimeout(function () {
            entry.target.classList.add('is-visible');
          }, idx * 60);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    items.forEach(function (i) { io.observe(i); });
  }

  /* ---------------------------------------------------------
     9. HERO PANEL TILT — subtle mouse-responsive 3D
  --------------------------------------------------------- */
  function initTilt() {
    var panel = document.querySelector('.panel-card');
    var wrap = document.getElementById('heroPanel');
    if (!panel || !wrap || reduceMotion) return;
    if (window.matchMedia('(max-width: 980px)').matches) return;

    wrap.addEventListener('mousemove', function (e) {
      var rect = wrap.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width - 0.5;
      var py = (e.clientY - rect.top) / rect.height - 0.5;
      var rotY = -6 + px * 10;
      var rotX = 2 - py * 10;
      panel.style.transform = 'perspective(1200px) rotateY(' + rotY + 'deg) rotateX(' + rotX + 'deg)';
    });
    wrap.addEventListener('mouseleave', function () {
      panel.style.transform = 'perspective(1200px) rotateY(-6deg) rotateX(2deg)';
    });
  }

  /* ---------------------------------------------------------
     INIT
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initBackground();
    initNav();
    initReveals();
    initCounters();
    initMiniChart();
    initSkillsStage();
    initProjectToggles();
    initTimeline();
    initTilt();
  });
})();