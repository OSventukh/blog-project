export default function modal() {
  const backdrop = document.querySelector('.backdrop');
  const modalWindow = document.querySelector('.modal');
  const modalCloseBtn = modalWindow.querySelector('.modal__close');
  const modalContent = modalWindow.querySelector('.modal__content');
  const cancelBtn = modalWindow.querySelector('#cancel');

  const modalShow = (content) => {
    const mobileMenu = document.querySelector('.navigation__list');

    if (mobileMenu && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      backdrop.classList.remove('show-flex');
    }

    if (modalWindow && modalWindow.classList.contains('show')) {
      modalWindow.classList.remove('show');
      backdrop.classList.remove('show-flex', 'full');
    }

    backdrop.classList.add('show-flex');
    backdrop.classList.add('full');
    modalWindow.classList.add('show');
    modalWindow.focus();
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }

    modalContent.innerHTML = content;
  };

  const modalClose = () => {
    modalWindow.classList.remove('show');
    backdrop.classList.remove('show-flex', 'full');
    document.body.style.overflow = '';
  };

  if (backdrop) {
    backdrop.addEventListener('click', (event) => {
      modalClose();
    });
  }

  modalCloseBtn.addEventListener('click', (event) => {
    modalClose();
  });

  if (cancelBtn) {
    cancelBtn.addEventListener('click', (event) => {
      closeModal();
    });
  }

  return [modalShow, modalClose, modalWindow];
}
