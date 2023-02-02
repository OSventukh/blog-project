/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!*************************************************************!*\
  !*** ./client-src/javascripts/components/ckeditor/index.js ***!
  \*************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/fetch.js */ "./client-src/javascripts/utils/fetch.js");
/* harmony import */ var _ui_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui/modal.js */ "./client-src/javascripts/ui/modal.js");


const [modalShow, modalClose] = (0,_ui_modal_js__WEBPACK_IMPORTED_MODULE_1__["default"])();

async function saveData(
  editor,
  inputs,
  postStatus,
  postId,
  actionButtons,
  event
) {
  const pressedButton = event.currentTarget;
  if (event) {
    pressedButton.disabled = true;
  }

  const [title, category, tags, slug] = inputs;

  const contentValue = editor.getData();

  const titleValue = title.value;
  const categoryValue = category.value;
  const tagsValue = tags.value;
  const slugValue = slug.value;

  const data = {
    content: contentValue,
    title: titleValue,
    category: categoryValue,
    tags: tagsValue,
    slug: slugValue,
    postId: postId,
    postStatus: postStatus,
  };

  try {
    const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.postData)('/add-post', data);
    if (postStatus && postStatus === 'published') {
      const [saveButton, publishButton] = actionButtons;

      saveButton && saveButton.remove();
      publishButton.textContent = 'update';
    }

    window.history.pushState({}, 'Article', `?id=${response.postId}`);
  } catch (error) {
    pressedButton.disabled = false;
    modalShow(error.message);
  }
}

async function getPreviousContent(editor, postId) {
  try {
    const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.getData)(`/post-edit/${postId}`);
    editor.setData(response.content);
  } catch (error) {
    modalShow(error.message);
  }
}

function changeHandler(editor, inputs, actionButtons) {
  const activeActionButtons = () => {
    actionButtons.forEach((btn) => {
      if (btn) {
        btn.disabled = false;
      }
    });
  };

  editor.model.document.on('change:data', (evt, data) => {
    activeActionButtons();
  });

  inputs.forEach((input) => {
    input.addEventListener('input', activeActionButtons);
  });
}

function initCKEditor() {
  const titlePlaceholder = 'Type your title';
  const contentPlaceholder = 'Type your content';

  const saveButton = document.getElementById('save');
  const saveMobileButton = document.getElementById('save-mobile');
  const publishButton = document.getElementById('publish');
  const publishMobile = document.getElementById('publish-mobile');
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');
  const postId = document.querySelector('input[name="postId"]').value;

  const title = document.getElementById('article-title');
  const category = document.getElementById('article-category');
  const tags = document.getElementById('article-tags');
  const slug = document.getElementById('article-slug');

  title.placeholder = titlePlaceholder;
  BalloonBlockEditor.create(document.querySelector('#editor'), {
    licenseKey: '',
    simpleUpload: {
      uploadUrl: '/editor-upload-image',

      // Enable the XMLHttpRequest.withCredentials property.
      withCredentials: true,

      // Headers sent along with the XMLHttpRequest to the upload server.
      headers: {
        'CSRF-Token': token,
      },
    },
    placeholder: contentPlaceholder,
  })
    .then(async (editor) => {
      window.editor = editor;

      postId && (await getPreviousContent(editor, postId));

      const inputs = [title, category, tags, slug];
      const actionButtons = [saveButton, publishButton];
      changeHandler(editor, inputs, actionButtons);

      publishButton.addEventListener('click', async (event) => {
        saveData(editor, inputs, 'published', postId, actionButtons, event);
      });

      publishMobile.addEventListener('click', async (event) => {
        saveData(editor, inputs, 'published', postId, actionButtons, event);
      });

      saveButton.addEventListener('click', async (event) => {
        saveData(editor, inputs, 'draft', postId, actionButtons, event);
      });

      saveMobileButton.addEventListener('click', async (event) => {
        saveData(editor, inputs, 'draft', postId, actionButtons, event);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function openArticleMobileMenu() {
  const optionsMenuBtn = document.getElementById('mobile-article-options');
  const optionsMenu = document.querySelector('.article-edit__control-area');

  optionsMenuBtn.addEventListener('click', (event) => {
    event.stopPropagation();

    optionsMenu.classList.toggle('active');
  });

  window.addEventListener('click', (event) => {
    event.stopPropagation();
    if (
      !event.target.matches('.article-edit__control-area') &&
      !event.target.matches('.article-edit__control-area > *')
    ) {
      if (optionsMenu.classList.contains('active')) {
        optionsMenu.classList.remove('active');
      }
    }
  });
}
openArticleMobileMenu();
initCKEditor();

})();

/******/ })()
;
//# sourceMappingURL=editor.js.map