function adminNav() {
  const mobileButton = document.querySelector('.mobile-header__menu-button');
  const menu = document.querySelector('.admin-nav');

  mobileButton.addEventListener('click', (event) => {
    menu.classList.toggle('active');
  });
}

adminNav();
