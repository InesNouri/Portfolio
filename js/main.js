/* ============================================================
   Ines Nouri — portfolio
   No dependencies. Everything degrades gracefully without JS.
   ============================================================ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── theme ─────────────────────────────────────────────── */
  var root = document.documentElement;
  var btn = document.getElementById('theme');
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}

  var initial = saved ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  setTheme(initial);

  function setTheme(mode) {
    root.setAttribute('data-theme', mode);
    if (btn) {
      btn.setAttribute('aria-pressed', String(mode === 'dark'));
      btn.querySelector('.tbtn__label').textContent =
        mode === 'dark' ? 'paper mode' : 'terminal mode';
    }
    try { localStorage.setItem('theme', mode); } catch (e) {}
  }

  if (btn) {
    btn.addEventListener('click', function () {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    });
  }

  /* ── hero terminal ─────────────────────────────────────
     Edit SCRIPT below to change what the terminal says.
     { cmd: 'typed after the prompt', out: ['response lines'] }
     ------------------------------------------------------ */
  var SCRIPT = [
    { cmd: 'whoami', out: ['ines nouri — devops engineer'] },
    { cmd: 'cat mission.txt', out: [
        'keep the pipelines green,',
        'the infrastructure reproducible,',
        'and the pager quiet.'
    ]},
    { cmd: 'kubectl get availability', out: [
        'NAME    STATUS   FOR',
        'ines    Open     new opportunities'
    ]}
  ];

  var out = document.getElementById('termout');
  if (out) {
    if (reduced) {
      renderStatic();
    } else {
      typeAll();
    }
  }

  function prompt() {
    var s = document.createElement('span');
    s.className = 'p';
    s.textContent = 'ines@prod:~$ ';
    return s;
  }

  function renderStatic() {
    SCRIPT.forEach(function (step) {
      out.appendChild(prompt());
      out.appendChild(document.createTextNode(step.cmd + '\n'));
      var d = document.createElement('span');
      d.className = 'd';
      d.textContent = step.out.join('\n') + '\n\n';
      out.appendChild(d);
    });
  }

  function typeAll() {
    var i = 0;
    (function nextStep() {
      if (i >= SCRIPT.length) return;
      var step = SCRIPT[i++];
      out.appendChild(prompt());

      var cmdNode = document.createTextNode('');
      out.appendChild(cmdNode);

      var c = 0;
      (function typeChar() {
        if (c < step.cmd.length) {
          cmdNode.textContent += step.cmd.charAt(c++);
          setTimeout(typeChar, 48 + Math.random() * 45);
        } else {
          setTimeout(function () {
            out.appendChild(document.createTextNode('\n'));
            var d = document.createElement('span');
            d.className = 'd';
            d.textContent = step.out.join('\n') + '\n\n';
            out.appendChild(d);
            setTimeout(nextStep, 620);
          }, 330);
        }
      })();
    })();
  }

  /* ── scroll spy ────────────────────────────────────────── */
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail__nav a'));
  var sections = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) {
          a.setAttribute('aria-current',
            a.getAttribute('href') === '#' + entry.target.id ? 'true' : 'false');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ── reveal on scroll ──────────────────────────────────── */
  if ('IntersectionObserver' in window && !reduced) {
    var targets = document.querySelectorAll(
      '.sec__head, .prose, .principles, .stage, .row, .card, .yaml, .contact__lede, .facts'
    );
    var rev = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (el, n) {
      el.classList.add('reveal');
      el.style.transitionDelay = (n % 6) * 45 + 'ms';
      rev.observe(el);
    });
  }

  /* ── scroll percentage ─────────────────────────────────── */
  var pct = document.getElementById('scrollpct');
  if (pct) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var max = document.body.scrollHeight - window.innerHeight;
        var v = max > 0 ? Math.round((window.scrollY / max) * 100) : 0;
        pct.textContent = String(Math.min(v, 100)).padStart(2, '0');
        ticking = false;
      });
    }, { passive: true });
  }

  /* ── copy buttons ──────────────────────────────────────── */
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      var text = b.getAttribute('data-copy');
      var done = function () {
        var old = b.textContent;
        b.textContent = 'copied';
        b.setAttribute('data-done', '');
        setTimeout(function () {
          b.textContent = old;
          b.removeAttribute('data-done');
        }, 1600);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, fallback);
      } else {
        fallback();
      }

      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ── year ──────────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
