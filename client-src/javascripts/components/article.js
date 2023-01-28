import { postData } from '../utils/fetch';
import modal from '../ui/modal';

export default function article() {
  const [modalShow, modalClose, modalWindow] = modal();

  const deleteArticleHandler = async (articleId) => {
    try {
      const response = await postData('/post/delete', {
        values: [articleId],
      });
      location.href = '/';
    } catch (error) {
      modalShow(error.message);
    }
  };

  function deleteArticle() {
    const deleteArticleBtn = document.getElementById('delete-article');

    if (deleteArticleBtn) {
      deleteArticleBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const articleId = deleteArticleBtn.nextElementSibling.value;

        const confirmDeleting = `
          <p>Are you sure you want to delete this article?</p>
          <div class="modal__buttons">
            <button class="button button-confirm" id='confirm-deleting'>Yes</button>
            <button class="button button-cancel" id='cancel'>No</button>
          </div>
        `;

        modalShow(confirmDeleting);

        document
          .getElementById('confirm-deleting')
          .addEventListener('click', (event) => {
            deleteArticleHandler(articleId);
          });

        document.getElementById('cancel').addEventListener('click', (event) => {
          modalClose();
        });
      });
    }
  }
  deleteArticle();
}
