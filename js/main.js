function initPageChrome() {
  if (initPageChrome.initialized) {
    return;
  }

  const sections = [...document.querySelectorAll("main section[id]")];
  const links = new Map(
    [...document.querySelectorAll('.nav__link[href^="#"]')].map((a) => [
      a.getAttribute("href").replace("#", ""),
      a,
    ])
  );
  const backToTopBtn = document.getElementById("backToTop");

  if (!links.size || !backToTopBtn) {
    return;
  }

  initPageChrome.initialized = true;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove("is-active"));
        const a = links.get(entry.target.id);
        if (a) a.classList.add("is-active");
        history.replaceState(null, "", `#${entry.target.id}`);
      }
    });
  }, {
    rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h')} 0px -60% 0px`,
    threshold: 0.1
  });

  sections.forEach(s => io.observe(s));

  document.querySelectorAll('.nav__link[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target.getBoundingClientRect().top + window.scrollY -
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
      window.scrollTo({ top: y, behavior: 'smooth' });
    });
  });
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

document.addEventListener("DOMContentLoaded", initPageChrome, { once: true });
document.addEventListener("content:ready", initPageChrome);
