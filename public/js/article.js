/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/javascripts/components/article.js":
/*!******************************************************!*\
  !*** ./client-src/javascripts/components/article.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ article)
/* harmony export */ });
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ "./client-src/javascripts/utils/fetch.js");
/* harmony import */ var _ui_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/modal */ "./client-src/javascripts/ui/modal.js");



function article() {
  const [modalShow, modalClose, modalWindow] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();

  const deleteArticleHandler = async (articleId) => {
    try {
      const response = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)('/post/delete', {
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


/***/ }),

/***/ "./client-src/javascripts/components/comments.js":
/*!*******************************************************!*\
  !*** ./client-src/javascripts/components/comments.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ comments)
/* harmony export */ });
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ "./client-src/javascripts/utils/fetch.js");
/* harmony import */ var _utils_save_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/save-position */ "./client-src/javascripts/utils/save-position.js");
/* harmony import */ var _ui_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/modal.js */ "./client-src/javascripts/ui/modal.js");




(0,_utils_save_position__WEBPACK_IMPORTED_MODULE_1__["default"])();

function comments() {
  const [modalShow, modalClose, modalWindow] = (0,_ui_modal_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

  const checkIfCommentsExist = () => {
    const commentsList = document.querySelector('.comments__list');

    if (commentsList.children.length === 0) {
      commentsList.innerHTML =
        '<div class="no-comments">There are no comments yet.</div>';
    }
  };

  const deleteCommentHandler = async (commentId, comment) => {
    try {
      const response = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)('/delete-comment', {
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


/***/ }),

/***/ "./client-src/javascripts/ui/modal.js":
/*!********************************************!*\
  !*** ./client-src/javascripts/ui/modal.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ modal)
/* harmony export */ });
function modal() {
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


/***/ }),

/***/ "./client-src/javascripts/utils/fetch.js":
/*!***********************************************!*\
  !*** ./client-src/javascripts/utils/fetch.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const token = document
  .querySelector('meta[name="csrf-token"]')
  .getAttribute('content');

async function getData(url) {
  const res = await fetch(url);
  const result = await res.json()
  if (!res.ok) {
    throw new Error(result.message || 'Something went wrong')
  }
  return result;
}

async function postData(url, data, contentType) {
  let res = await fetch(url, {
    method: 'POST',
    headers: {
      'CSRF-Token': token,
      'Content-Type': contentType || 'application/json',
    },
    body: contentType ? data : JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || 'Something went wrong');
  }

  return result;
}


/***/ }),

/***/ "./client-src/javascripts/utils/save-position.js":
/*!*******************************************************!*\
  !*** ./client-src/javascripts/utils/save-position.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ saveScrollPosition)
/* harmony export */ });
function saveScrollPosition() {
  document.addEventListener('DOMContentLoaded', function (event) {
    var scrollpos = localStorage.getItem('scrollpos');
    if (scrollpos) window.scrollTo(0, scrollpos);
  });
  
  window.onbeforeunload = function (e) {
    localStorage.setItem('scrollpos', window.scrollY);
  };
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************************!*\
  !*** ./client-src/javascripts/pages/article.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/article */ "./client-src/javascripts/components/article.js");
/* harmony import */ var _components_comments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/comments */ "./client-src/javascripts/components/comments.js");



(0,_components_article__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_components_comments__WEBPACK_IMPORTED_MODULE_1__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=article.js.map