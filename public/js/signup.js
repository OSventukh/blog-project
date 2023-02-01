/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/javascripts/ui/notification.js":
/*!***************************************************!*\
  !*** ./client-src/javascripts/ui/notification.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ notification)
/* harmony export */ });
function notification() {
  function notificationShow(
    message,
    selector,
    status='error',
    withCloseBtn = false,
    methodInserts = 'beforebegin'
  ) {
    const notificationTemplate = `
    <div class="message__alert ${status}">
      ${ withCloseBtn ? '<button class="message__alert-close"><i class="fa-solid fa-xmark"></i></button>' : ''}
      <div class="message__alert-content">
        ${message}
      </div>
    </div>
  `;

    const existError = document.querySelector('.message__alert');

    if (existError) {
      existError.remove();
    }

    document.querySelector(selector).insertAdjacentHTML(methodInserts, notificationTemplate);
    
    
    const closeBtn = document.querySelector('.message__alert-close');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeNotification);
    }
  }

  function notificationClose() {
    document.querySelector('.message__alert').remove();
  }

  return [notificationShow, notificationClose];
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
/*!************************************************!*\
  !*** ./client-src/javascripts/pages/signup.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ "./client-src/javascripts/utils/fetch.js");
/* harmony import */ var _ui_notification__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/notification */ "./client-src/javascripts/ui/notification.js");


function signup() {
  const [notificationShow, notificationClose] = (0,_ui_notification__WEBPACK_IMPORTED_MODULE_1__["default"])();

  const signupForm = document.getElementById('signup-form');

  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const nickname = document.getElementById('signup-nickname').value;
    const password = document.getElementById('signup-password').value;

    try {
      await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)('/signup', {
        email: email,
        nickname: nickname,
        password: password,
      });
      location.href = '/?confirm-email';
    } catch (error) {
      notificationShow(
        error.message,
        '#signup-form',
        'error',
        false,
        'afterbegin'
      );
    }
  });
}

signup();

})();

/******/ })()
;
//# sourceMappingURL=signup.js.map