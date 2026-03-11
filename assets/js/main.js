document.addEventListener('DOMContentLoaded', function () {

  // --- Language Toggle ---
  var langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-target');
      langBtns.forEach(function (b) { b.classList.remove('active'); });
      // activate all buttons with matching data-target (nav + mobile nav)
      document.querySelectorAll('.lang-btn[data-target="' + target + '"]').forEach(function (b) {
        b.classList.add('active');
      });
      if (target === 'cn') {
        document.documentElement.classList.add('cn');
        document.documentElement.lang = 'zh-CN';
      } else {
        document.documentElement.classList.remove('cn');
        document.documentElement.lang = 'en';
      }
    });
  });


  // --- Tabbed Services ---
  var tabBtns = document.querySelectorAll('.tab-btn');
  var tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabBtns.forEach(function (b) { b.classList.remove('active'); });
      tabPanels.forEach(function (p) { p.classList.remove('active'); });
      btn.classList.add('active');
      var panel = document.getElementById(target);
      if (panel) panel.classList.add('active');
    });
  });


  // --- Mobile Nav ---
  var hamburger = document.querySelector('.nav-hamburger');
  var mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileNav.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      // animate hamburger lines
      var spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        var spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }


  // --- Sticky Nav Border ---
  var nav = document.querySelector('.site-nav');
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 10) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }


  // --- Infinite Logo Marquee ---
  function startMarquee(track, speed) {
    var originals = Array.from(track.children);
    originals.forEach(function (el) {
      var clone = el.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });

    var offset = 0;
    var paused = false;

    track.addEventListener('mouseenter', function () { paused = true; });
    track.addEventListener('mouseleave', function () { paused = false; });

    function step() {
      if (!paused) {
        offset += speed;
        var first = track.firstElementChild;
        var firstWidth = first.offsetWidth +
          parseFloat(getComputedStyle(first).marginRight);
        if (offset >= firstWidth) {
          offset -= firstWidth;
          track.appendChild(first);
        }
        track.style.transform = 'translateX(' + (-offset) + 'px)';
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll('.marquee-track').forEach(function (track) {
    var speed = parseFloat(track.dataset.speed) || 0.5;
    startMarquee(track, speed);
  });


  // --- Simple form handler (mailto fallback) ---
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('[name="name"]').value;
      var email = form.querySelector('[name="email"]').value;
      var company = form.querySelector('[name="company"]').value;
      var message = form.querySelector('[name="message"]').value;

      var subject = encodeURIComponent('Inquiry from ' + name + ' - ' + company);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Company: ' + company + '\n\n' +
        message
      );
      window.location.href = 'mailto:info@wintone.co?subject=' + subject + '&body=' + body;
    });
  }

});
