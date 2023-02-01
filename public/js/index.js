/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/javascripts/components/auth.js":
/*!***************************************************!*\
  !*** ./client-src/javascripts/components/auth.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ auth)
/* harmony export */ });
/* harmony import */ var _ui_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/modal */ "./client-src/javascripts/ui/modal.js");
/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/fetch */ "./client-src/javascripts/utils/fetch.js");
/* harmony import */ var _ui_notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/notification */ "./client-src/javascripts/ui/notification.js");




function auth() {
  const [modalShow] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_0__["default"])();
  const [notificationShow, notificationClose] = (0,_ui_notification__WEBPACK_IMPORTED_MODULE_2__["default"])();

  const loginButton = document.getElementById('login-button');

  function loginHandler(redirect = false) {
    let loginForm = `
    <form class="login-form" id="login-form" action="/login" method="post">
      <div class="form-control">
          <label for="email">Login:</label>
          <div class="input-wrap">
            <input class="login-form__input" type="email" name="email" id="email" autocomplete="email" required>
            <i class="fa-solid fa-envelope"></i>
          </div>
        </div>
        <div class="form-control">
          <label for="password">Password:</label>
          <div class="input-wrap">
            <input class="login-form__input" type="password" name="password" id="password" autocomplete="current-password" required>
            <i class="fa-solid fa-key"></i>
          </div>
        </div>
        <div class="form-buttons login-form__buttons">
          <a class="login-form__reset" href="/reset">Forgot Password</a>
          <button class="button login-form__submit" type="submit">Login</button>
        </div>
      </form>
  `;
    modalShow(loginForm);

    if (loginForm) {
      const form = document.getElementById('login-form');
      form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
          const response = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.postData)('/login', {
            email: email,
            password: password,
          });

          if (redirect && typeof redirect === 'string') {
            return (location = redirect);
          }
          return location.reload();
        } catch (error) {
          notificationShow(
            error.message,
            '#login-form',
            'error',
            false,
            'afterbegin'
          );
        }
      });
    }
  }

  if (loginButton) {
    loginButton.addEventListener('click', (event) => {
      loginHandler();
    });
  }

  if (location.search === '?login') {
    loginHandler('/');
  }

  if (location.search === '?confirm-email') {
    modalShow('A confirmation link has been sent to your email');
  }
}


/***/ }),

/***/ "./client-src/javascripts/components/footer.js":
/*!*****************************************************!*\
  !*** ./client-src/javascripts/components/footer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ footer)
/* harmony export */ });
function footer() {
  const yearSpan = document.querySelector('span.year');
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
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

/***/ "./client-src/javascripts/ui/nav.js":
/*!******************************************!*\
  !*** ./client-src/javascripts/ui/nav.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ navigation)
/* harmony export */ });
function navigation() {
  const navButton = document.querySelector('.navigation__mobile-menu-btn');
  const sideMenu = document.querySelector('.navigation__menu ul');
  const backDrop = document.querySelector('.backdrop');
  const loggedUser = document.getElementById('loggedUserAvatar');

  navButton.addEventListener('click', (e) => {
    if (document.querySelector('.modal').classList.contains('show')) {
      document.querySelector('.modal').classList.remove('show');
      sideMenu.classList.add('active');
    } else {
      backDrop.classList.toggle('show-flex');
      sideMenu.classList.toggle('active');
    }

    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  });

  if (backDrop) {
    backDrop.addEventListener('click', (e) => {
      backDrop.classList.remove('show-flex');
      sideMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  let windowWidth = window.innerWidth;
  window.addEventListener('resize', (e) => {
    if (window.innerWidth !== windowWidth) {
      if (!backDrop.classList.contains('full')) {
        backDrop.classList.remove('show-flex');

      }
      sideMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });


  if (loggedUser) {
    loggedUser.addEventListener('click', (event) => {
      loggedUser.classList.toggle('active');
    });

    window.addEventListener('click', (event) => {
      if (!event.target.matches('#loggedUserAvatar img')) {
        if (loggedUser.classList.contains('active')) {
          loggedUser.classList.remove('active');
        }
      }
    });
  }
}


/***/ }),

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

/***/ "./client-src/javascripts/ui/pagination.js":
/*!*************************************************!*\
  !*** ./client-src/javascripts/ui/pagination.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pagination)
/* harmony export */ });
function pagination() {
  const pages = document.querySelectorAll('.page');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');

  pages.forEach((page, i) => {
    page.addEventListener('click', (e) => {
      e.preventDefault();
      const searchParams = new URLSearchParams(window.location.search);
      console.log(searchParams.get('page'));
      searchParams.set('page', i + 1);
      window.location.search = searchParams.toString();
    });
  });

  if (prev) {
    prev.addEventListener('click', (e) => {
      console.log('prev');
      e.preventDefault();
      const searchParams = new URLSearchParams(window.location.search);
      const currentPage = +searchParams.get('page');
      searchParams.set('page', currentPage - 1);
      window.location.search = searchParams.toString();
    });
  }

  if (next) {
    next.addEventListener('click', (e) => {
      console.log('next');
      e.preventDefault();
      const searchParams = new URLSearchParams(window.location.search);
      const currentPage = +searchParams.get('page');
      searchParams.set('page', currentPage + 1);
      window.location.search = searchParams.toString();
    });
  }
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
/*!*****************************************!*\
  !*** ./client-src/javascripts/index.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ui_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/nav */ "./client-src/javascripts/ui/nav.js");
/* harmony import */ var _ui_pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/pagination */ "./client-src/javascripts/ui/pagination.js");
/* harmony import */ var _components_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/auth */ "./client-src/javascripts/components/auth.js");
/* harmony import */ var _components_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/footer */ "./client-src/javascripts/components/footer.js");





(0,_ui_nav__WEBPACK_IMPORTED_MODULE_0__["default"])();
(0,_ui_pagination__WEBPACK_IMPORTED_MODULE_1__["default"])();
(0,_components_auth__WEBPACK_IMPORTED_MODULE_2__["default"])();
(0,_components_footer__WEBPACK_IMPORTED_MODULE_3__["default"])();

})();

/******/ })()
;
//# sourceMappingURL=index.js.map