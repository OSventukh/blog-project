function adminNav() {
  const mobileButton = document.querySelector('.mobile-header__menu-button');
  const menu = document.querySelector('.admin-nav');
  const menuItem = document.querySelectorAll('.admin-nav__item');

  mobileButton.addEventListener('click', (event) => {
    menu.classList.toggle('active');
  });
}

adminNav();
