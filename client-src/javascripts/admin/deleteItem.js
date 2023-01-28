import { postData } from '../utils/fetch';
import modal from '../ui/modal';

export function deleteItem(url, selector) {
  const [modalShow] = modal();

  const deleteBtns = document.querySelectorAll(selector);

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      event.preventDefault();
      const value = event.target.nextElementSibling.value;
      try {
        await postData(url, {
          values: [value],
        });

        location.reload();
      } catch (error) {
        modalShow(error.message);
      }
    });
  });
}

export function deleteMultipleItems(url, selector) {
  const [modalShow] = modal();
  const articlesChecks = document.querySelectorAll(selector);
  const multipleOptionsPanel = document.querySelector('.multiple-options');
  let checkedItems = [];
  articlesChecks.forEach((item) => {
    item.addEventListener('click', (event) => {
      checkedItems = [...articlesChecks]
        .filter((item) => item.checked)
        .map((item) => item.value);
      console.log(checkedItems);
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

  document.getElementById('delete-multiple-items').addEventListener('click', async () => {
    if (checkedItems.length > 0) {
      try {
        await postData(url, {
          values: checkedItems,
        });

        location.reload();
      } catch (error) {
        modalShow(error.message);
      }
    }
  })
}
