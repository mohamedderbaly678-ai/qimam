document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('navMenu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { menu.classList.remove('is-open'); });
    });
  }

  /* Rolling counters on scroll into view */
  var counters = document.querySelectorAll('[data-count]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    if (reduceMotion) { el.textContent = target; return; }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      el.textContent = Math.floor(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && counters.length) {
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (c) { observer.observe(c); });
  } else {
    counters.forEach(animateCounter);
  }

  /* Hero news carousel */
  var heroSlider = document.getElementById('heroSlider');
  if (heroSlider) {
    var heroSlides = heroSlider.querySelectorAll('.hero__slide');
    var heroCurrent = 0;
    function showHeroSlide(index) {
      heroSlides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
    }
    var heroPrev = heroSlider.querySelector('.hero__arrow--prev');
    var heroNext = heroSlider.querySelector('.hero__arrow--next');
    if (heroPrev) heroPrev.addEventListener('click', function () {
      heroCurrent = (heroCurrent - 1 + heroSlides.length) % heroSlides.length;
      showHeroSlide(heroCurrent);
    });
    if (heroNext) heroNext.addEventListener('click', function () {
      heroCurrent = (heroCurrent + 1) % heroSlides.length;
      showHeroSlide(heroCurrent);
    });
  }

  /* Testimonial slider */
  var slider = document.getElementById('testimonialSlider');
  if (slider) {
    var slides = slider.querySelectorAll('.testimonials__slide');
    var current = 0;
    function show(index) {
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
    }
    var prevBtn = slider.querySelector('.testimonials__arrow--prev');
    var nextBtn = slider.querySelector('.testimonials__arrow--next');
    if (prevBtn) prevBtn.addEventListener('click', function () {
      current = (current - 1 + slides.length) % slides.length;
      show(current);
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      current = (current + 1) % slides.length;
      show(current);
    });
  }

  /* Live player play/pause icon toggle (visual only — wire to a real stream URL as needed) */
  var playBtn = document.querySelector('.live-player__play');
  if (playBtn) {
    playBtn.addEventListener('click', function () {
      var isPlaying = playBtn.textContent.trim() === '❚❚';
      playBtn.textContent = isPlaying ? '▶' : '❚❚';
    });
  }

});
