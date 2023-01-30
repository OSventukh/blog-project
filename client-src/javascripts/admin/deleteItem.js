import { postData } from '../utils/fetch';
import modal from '../ui/modal';

const confirmDeleting = (url, value, message) => {
  const [modalShow, modalClose] = modal();

  const confirmDeleting = `
    <div class="modal__message">${message}</div>
    <div class="modal__buttons">
      <button class="button button-confirm" id='confirm-deleting'>Yes</button>
      <button class="button button-cancel" id='cancel-deleting'>No</button>
    </div>
  `;
  modalShow(confirmDeleting);

  document
    .getElementById('confirm-deleting')
    .addEventListener('click', async (event) => {
      try {
        await postData(url, {
          values: [value],
        });

        location.reload();
      } catch (error) {
        modalShow(error.message);
      }
    });

  document
    .getElementById('cancel-deleting')
    .addEventListener('click', (event) => {
      modalClose();
    });
};

export function deleteItem(url, selector, warningMessage) {
  const deleteBtns = document.querySelectorAll(selector);

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      event.preventDefault();
      const value = event.target.nextElementSibling.value;
      confirmDeleting(url, value, warningMessage);
    });
  });
}

export function deleteMultipleItems(url, selector, warningMessage) {
  const [modalShow] = modal();
  const articlesChecks = document.querySelectorAll(selector);
  const multipleOptionsPanel = document.querySelector('.multiple-options');
  let checkedItems = [];
  articlesChecks.forEach((item) => {
    item.addEventListener('click', (event) => {
      checkedItems = [...articlesChecks]
        .filter((item) => item.checked)
        .map((item) => item.value);
      if (checkedItems.length > 0) {
        multipleOptionsPanel.style.display = 'flex';
        document.querySelector(
          '.multiple-options__checked-num span'
        ).textContent = checkedItems.length;
      } else {
        multipleOptionsPanel.style.display = 'none';
      }
    });
  });

  document
    .getElementById('delete-multiple-items')
    .addEventListener('click', async () => {
      if (checkedItems.length > 0) {
        confirmDeleting(url, checkedItems, `${warningMessage} (${checkedItems.length})`);
      }
    });
}
