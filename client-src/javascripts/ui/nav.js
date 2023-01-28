export default function navigation() {
  const navButton = document.querySelector('.navigation__mobile-menu-btn');
  const sideMenu = document.querySelector('.navigation__menu ul');
  const backDrop = document.querySelector('.backdrop');
  const loggedUser = document.getElementById('loggedUserAvatar');

  navButton.addEventListener('click', (e) => {
    if (document.querySelector('.modal').classList.contains('show')) {
      document.querySelector('.modal').classList.remove('show');
      sideMenu.classList.add('active');
    } else {
      backDrop.classList.toggle('show-flex');
      sideMenu.classList.toggle('active');
    }

    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  });

  if (backDrop) {
    backDrop.addEventListener('click', (e) => {
      backDrop.classList.remove('show-flex');
      sideMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  let windowWidth = window.innerWidth;
  window.addEventListener('resize', (e) => {
    if (window.innerWidth !== windowWidth) {
      if (!backDrop.classList.contains('full')) {
        backDrop.classList.remove('show-flex');

      }
      sideMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });


  if (loggedUser) {
    loggedUser.addEventListener('click', (event) => {
      loggedUser.classList.toggle('active');
    });

    window.addEventListener('click', (event) => {
      if (!event.target.matches('#loggedUserAvatar img')) {
        if (loggedUser.classList.contains('active')) {
          loggedUser.classList.remove('active');
        }
      }
    });
  }
}
