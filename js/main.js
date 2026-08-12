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

  /* terminal is the default look; the toggle remembers your choice */
  setTheme(saved || 'dark');

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
    { cmd: 'whoami', out: [
        'ines nouri — devops engineer',
        'running on coffee, stubborn optimism and prayers.'
    ]},
    { cmd: 'cat mission.txt', out: [
        'keep the pipelines green,',
        'the infrastructure reproducible,',
        'and the servers too boring to make the news.'
    ]},
    { cmd: 'kubectl get availability', out: [
        'NAME    STATUS   FOR',
        'ines    Open     new opportunities'
    ]}
  ];

  var out = document.getElementById('termout');
  function startTerminal() {
    if (!out) return;
    if (reduced) { renderStatic(); } else { typeAll(); }
  }

  /* ── keyboard shortcut: t flips the theme ──────────────── */
  document.addEventListener('keydown', function (e) {
    if (/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key.toLowerCase() === 't') {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    }
  });

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

  /* ── boot / deploy sequence ────────────────────────────
     Plays on every page load. Edit STEPS to change the stages.
     ------------------------------------------------------ */
  var STEPS = [
    { pct:  22, msg: '› compiling personality…',                 hold: 480 },
    { pct:  54, msg: '› running tests… they pass, i promise',    hold: 520 },
    { pct:  88, msg: '› deploying on a friday, as one does…',    hold: 720 },
    { pct: 100, msg: '› live. nothing exploded.',                hold: 420 }
  ];

  var boot   = document.getElementById('boot');
  var stages = boot ? boot.querySelectorAll('#stages li') : [];
  var msgEl  = document.getElementById('bootmsg');
  var pctEl  = document.getElementById('bootpct');

  if (!boot || reduced) {
    if (boot) boot.parentNode.removeChild(boot);
    document.body.classList.remove('is-booting');
    startTerminal();
  } else {
    runBoot();
  }

  function runBoot() {
    var shown = 0;
    var i = 0;
    var skipped = false;

    /* impatient visitors can bail out */
    function skip() {
      if (skipped) return;
      skipped = true;
      if (msgEl) msgEl.textContent = '› skipped. fair enough.';
      if (pctEl) pctEl.textContent = '100';
      Array.prototype.forEach.call(stages, function (n) {
        n.classList.remove('is-active');
        n.classList.add('is-done');
      });
      boot.querySelector('.boot__stages').style.setProperty('--p', 1);
      finish();
    }
    boot.addEventListener('click', skip);
    document.addEventListener('keydown', skip, { once: true });

    setTimeout(step, 420);

    function step() {
      if (skipped) return;
      if (i >= STEPS.length) return finish();

      var s = STEPS[i];
      var node = stages[i];

      if (node) node.classList.add('is-active');
      if (msgEl) msgEl.textContent = s.msg;
      boot.querySelector('.boot__stages').style.setProperty('--p', (i + 1) / stages.length);

      tween(shown, s.pct, s.hold);
      shown = s.pct;

      setTimeout(function () {
        if (node) { node.classList.remove('is-active'); node.classList.add('is-done'); }
        i++;
        step();
      }, s.hold);
    }

    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      setTimeout(function () {
        boot.classList.add('is-done');
        document.body.classList.remove('is-booting');
        startTerminal();
        setTimeout(function () {
          if (boot.parentNode) boot.parentNode.removeChild(boot);
        }, 700);
      }, 340);
    }
  }

  /* count the percentage up smoothly between two values */
  function tween(from, to, ms) {
    if (!pctEl) return;
    var t0 = null;
    requestAnimationFrame(function frame(t) {
      if (t0 === null) t0 = t;
      var k = Math.min((t - t0) / ms, 1);
      pctEl.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(frame);
    });
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
  document.querySelectorAll('.copy[data-copy]').forEach(function (b) {
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
