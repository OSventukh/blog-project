/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/javascripts/admin/deleteItem.js":
/*!****************************************************!*\
  !*** ./client-src/javascripts/admin/deleteItem.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "deleteItem": () => (/* binding */ deleteItem),
/* harmony export */   "deleteMultipleItems": () => (/* binding */ deleteMultipleItems)
/* harmony export */ });
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ "./client-src/javascripts/utils/fetch.js");
/* harmony import */ var _ui_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/modal */ "./client-src/javascripts/ui/modal.js");



const confirmDeleting = (url, value, message) => {
  const [modalShow, modalClose] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();

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
        await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)(url, {
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

function deleteItem(url, selector, warningMessage) {
  const deleteBtns = document.querySelectorAll(selector);

  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', async (event) => {
      event.preventDefault();
      const value = event.target.nextElementSibling.value;
      confirmDeleting(url, value, warningMessage);
    });
  });
}

function deleteMultipleItems(url, selector, warningMessage) {
  const [modalShow] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_1__["default"])();
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
    .getElementById('delete-multiple-items')?.addEventListener('click', async () => {
      if (checkedItems.length > 0) {
        confirmDeleting(url, checkedItems, `${warningMessage} (${checkedItems.length})`);
      }
    });
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
/*!***********************************************!*\
  !*** ./client-src/javascripts/admin/admin.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _deleteItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deleteItem */ "./client-src/javascripts/admin/deleteItem.js");


// Deleting articles
(0,_deleteItem__WEBPACK_IMPORTED_MODULE_0__.deleteItem)('/post/delete', '.articles__item-delete', 'Are you sure you want to delete this article?');

(0,_deleteItem__WEBPACK_IMPORTED_MODULE_0__.deleteMultipleItems)('/post/delete', '.articles__check', 'Are you sure you want to delete this articles?');

// Deleting users
(0,_deleteItem__WEBPACK_IMPORTED_MODULE_0__.deleteItem)('/admin/delete-users', '.users__item-delete', 'Are you sure you want to delete this user?');

(0,_deleteItem__WEBPACK_IMPORTED_MODULE_0__.deleteMultipleItems)('/admin/delete-users', '.users__check', 'Are you sure you want to delete this users?');
})();

/******/ })()
;
//# sourceMappingURL=admin.js.map