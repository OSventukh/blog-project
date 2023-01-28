import { postData } from '../utils/fetch';
import {deleteMultipleItems} from './deleteItem';

const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');

const forms = document.querySelectorAll('#delete-media');

forms.forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const mediaItem = form.closest('.media__item');
    const imageName = form.querySelector('input[name=mediaUrl]').value;

    try {
      await postData('/admin/delete-media', {images: [imageName]});
      const currentItemsAmount = document.querySelector('.admin-panel__item-amount span').textContent;
      document.querySelector('.admin-panel__item-amount span').textContent = +currentItemsAmount - 1;
      mediaItem.remove();
    } catch (error) {
      
    }
    

  });
});

const checkboxes = document.querySelectorAll('.media__check');
checkboxes.forEach((checkbox) => {
  const media = checkbox.closest('.media__item');
  checkbox.addEventListener('click', (event) => {
    if (checkbox.checked) {
      media.classList.add('active');

    } else {
      media.classList.remove('active');
    }
  })

})

const getUrlBtns = document.querySelectorAll('.media__geturl');

getUrlBtns.forEach((getUrlBtn) => {
  getUrlBtn.addEventListener('click', (event) => {
    const imageSrc = getUrlBtn.parentNode.nextElementSibling.src;
    if (imageSrc) {
      navigator.clipboard.writeText(imageSrc);
      const prevIco = getUrlBtn.innerHTML;
      getUrlBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

      setTimeout(() => {
        getUrlBtn.innerHTML = prevIco;
      }, 1500);
    }
  });
});

deleteMultipleItems('/admin/delete-media', '.media__check')
