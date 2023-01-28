import { postData } from '../utils/fetch';
import saveScrollPosition from '../utils/save-position';
import modal from '../ui/modal.js';

saveScrollPosition();

export default function comments() {
  const [modalShow, modalClose, modalWindow] = modal();

  const checkIfCommentsExist = () => {
    const commentsList = document.querySelector('.comments__list');

    if (commentsList.children.length === 0) {
      commentsList.innerHTML =
        '<div class="no-comments">There are no comments yet.</div>';
    }
  };

  const deleteCommentHandler = async (commentId, comment) => {
    try {
      const response = await postData('/delete-comment', {
        commentId: commentId,
      });

      comment.remove();
      modalClose();
      checkIfCommentsExist();
      return;
    } catch (error) {
      modalShow(error.message);
    }
  };

  function deleteComment() {
    const commentDeleteBtns = document.querySelectorAll(
      '.comment__options-list a'
    );
    commentDeleteBtns.forEach((del) => {
      del.addEventListener('click', (event) => {
        event.preventDefault();
        const comment = del.closest('.comment');
        const commentId = del.getAttribute('data-comment-id');

        comment.style.border = '3px solid #e13939';
        const confirmDeleting = `
          <div class="modal__message">Are you sure you want to delete this comment?</div>
          <div class="modal__buttons">
            <button class="button button-confirm" id='confirm-deleting'>Yes</button>
            <button class="button button-cancel" id='cancel-deleting'>No</button>
          </div>
        `;
        modalShow(confirmDeleting);

        document
          .getElementById('confirm-deleting')
          .addEventListener('click', (event) => {
            deleteCommentHandler(commentId, comment);
          });

        document
          .getElementById('cancel-deleting')
          .addEventListener('click', (event) => {
            modalClose();
          });

        modalWindow.addEventListener('blur', (event) => {
          comment.style.border = '';
        });
      });
    });
  }

  deleteComment();
}
