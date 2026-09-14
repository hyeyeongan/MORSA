document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const groups = [
    ['.story-grid > *', ['reveal-up']],
    ['.belief-title > *, .belief-banner > div', ['reveal-up']],
    ['.identity-seal, .identity .eyebrow, .identity h2, .identity h3, .identity-intro', ['reveal-up']],
    ['.logo-system-title, .logo-system img, .colors > div, .philosophy-title, .philosophy article', ['reveal-up']],
    ['.about-end > *', ['reveal-up']],
    ['.values-content > h2, .values-content > .subtitle', ['reveal-up']],
    ['.value-orbits > .nature', ['reveal-left']],
    ['.value-orbits > .time', ['reveal-up']],
    ['.value-orbits > .ingredient', ['reveal-right']],
    ['.value-copy, .balance', ['reveal-up']],
    ['.source-copy', ['reveal-left']],
    ['.source-icons', ['reveal-right']],
    ['.source > span', ['reveal-up']],
    ['.menu-section, .product-card, .filters, .event-item', ['reveal-up']],
    ['.membership .inner, .footer-main', ['reveal-up']]
  ];
  const animated = [];

  groups.forEach(([selector, classNames]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      element.classList.add('scroll-reveal', ...classNames);
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 90}ms`);
      animated.push(element);
    });
  });

  document.querySelectorAll('.reveal').forEach(element => {
    element.classList.add('scroll-reveal', 'reveal-up');
    if (!animated.includes(element)) animated.push(element);
  });

  if (reduceMotion || !('IntersectionObserver' in window)) {
    animated.forEach(element => element.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

  animated.forEach(element => observer.observe(element));
});
