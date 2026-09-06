const menuToggle = document.querySelector<HTMLButtonElement>('.menu-toggle');
const mobileNav = document.querySelector<HTMLElement>('[data-mobile-nav]');

if (menuToggle && mobileNav) {
  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.removeAttribute('data-open');
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));

    if (isOpen) {
      mobileNav.removeAttribute('data-open');
    } else {
      mobileNav.setAttribute('data-open', '');
    }
  });

  mobileNav.addEventListener('click', (event) => {
    if ((event.target as HTMLElement).closest('a')) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (
      mobileNav.hasAttribute('data-open') &&
      !mobileNav.contains(event.target as Node) &&
      !menuToggle.contains(event.target as Node)
    ) {
      closeMenu();
    }
  });
}

document.querySelectorAll<HTMLElement>('[data-current-year]').forEach((year) => {
  const currentYear = new Date().getFullYear();
  year.textContent = String(currentYear);
  year.setAttribute('datetime', String(currentYear));
});