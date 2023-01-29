/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client-src/javascripts/components/auth.js":
/*!***************************************************!*\
  !*** ./client-src/javascripts/components/auth.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ auth)\n/* harmony export */ });\n/* harmony import */ var _ui_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui/modal */ \"./client-src/javascripts/ui/modal.js\");\n/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/fetch */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _ui_notification__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/notification */ \"./client-src/javascripts/ui/notification.js\");\n\r\n\r\n\r\n\r\nfunction auth() {\r\n  const [modalShow] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n  const [notificationShow, notificationClose] = (0,_ui_notification__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\r\n\r\n  const loginButton = document.getElementById('login-button');\r\n\r\n  function loginHandler(redirect = false) {\r\n    let loginForm = `\r\n    <form class=\"login-form\" id=\"login-form\" action=\"/login\" method=\"post\">\r\n      <div class=\"form-control\">\r\n          <label for=\"email\">Login:</label>\r\n          <div class=\"input-wrap\">\r\n            <input class=\"login-form__input\" type=\"email\" name=\"email\" id=\"email\" autocomplete=\"email\" required>\r\n            <i class=\"fa-solid fa-envelope\"></i>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-control\">\r\n          <label for=\"password\">Password:</label>\r\n          <div class=\"input-wrap\">\r\n            <input class=\"login-form__input\" type=\"password\" name=\"password\" id=\"password\" autocomplete=\"current-password\" required>\r\n            <i class=\"fa-solid fa-key\"></i>\r\n          </div>\r\n        </div>\r\n        <div class=\"form-buttons login-form__buttons\">\r\n          <a class=\"login-form__reset\" href=\"/reset\">Forgot Password</a>\r\n          <button class=\"button login-form__submit\" type=\"submit\">Login</button>\r\n        </div>\r\n      </form>\r\n  `;\r\n    modalShow(loginForm);\r\n\r\n    if (loginForm) {\r\n      const form = document.getElementById('login-form');\r\n      form.addEventListener('submit', async (event) => {\r\n        event.preventDefault();\r\n\r\n        const email = document.getElementById('email').value;\r\n        const password = document.getElementById('password').value;\r\n\r\n        try {\r\n          const response = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_1__.postData)('/login', {\r\n            email: email,\r\n            password: password,\r\n          });\r\n\r\n          if (redirect && typeof redirect === 'string') {\r\n            return (location = redirect);\r\n          }\r\n          return location.reload();\r\n        } catch (error) {\r\n          notificationShow(\r\n            error.message,\r\n            '#login-form',\r\n            'error',\r\n            false,\r\n            'afterbegin'\r\n          );\r\n        }\r\n      });\r\n    }\r\n  }\r\n\r\n  if (loginButton) {\r\n    loginButton.addEventListener('click', (event) => {\r\n      loginHandler();\r\n    });\r\n  }\r\n\r\n  if (location.search === '?login') {\r\n    loginHandler('/');\r\n  }\r\n\r\n  if (location.search === '?confirm-email') {\r\n    modalShow('A confirmation link has been sent to your email');\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/components/auth.js?");

/***/ }),

/***/ "./client-src/javascripts/components/footer.js":
/*!*****************************************************!*\
  !*** ./client-src/javascripts/components/footer.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ footer)\n/* harmony export */ });\nfunction footer() {\r\n  const yearSpan = document.querySelector('span.year');\r\n  const currentYear = new Date().getFullYear();\r\n  yearSpan.textContent = currentYear;\r\n}\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/components/footer.js?");

/***/ }),

/***/ "./client-src/javascripts/index.js":
/*!*****************************************!*\
  !*** ./client-src/javascripts/index.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ui_nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ui/nav */ \"./client-src/javascripts/ui/nav.js\");\n/* harmony import */ var _ui_pagination__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ui/pagination */ \"./client-src/javascripts/ui/pagination.js\");\n/* harmony import */ var _components_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/auth */ \"./client-src/javascripts/components/auth.js\");\n/* harmony import */ var _components_footer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/footer */ \"./client-src/javascripts/components/footer.js\");\n\n\n\n\n\n(0,_ui_nav__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n(0,_ui_pagination__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n(0,_components_auth__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n(0,_components_footer__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/index.js?");

/***/ }),

/***/ "./client-src/javascripts/ui/modal.js":
/*!********************************************!*\
  !*** ./client-src/javascripts/ui/modal.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ modal)\n/* harmony export */ });\nfunction modal() {\r\n  const backdrop = document.querySelector('.backdrop');\r\n  const modalWindow = document.querySelector('.modal');\r\n  const modalCloseBtn = modalWindow.querySelector('.modal__close');\r\n  const modalContent = modalWindow.querySelector('.modal__content');\r\n  const cancelBtn = modalWindow.querySelector('#cancel');\r\n\r\n  const modalShow = (content) => {\r\n    const mobileMenu = document.querySelector('.navigation__list');\r\n\r\n    if (mobileMenu && mobileMenu.classList.contains('active')) {\r\n      mobileMenu.classList.remove('active');\r\n      backdrop.classList.remove('show-flex');\r\n    }\r\n\r\n    if (modalWindow && modalWindow.classList.contains('show')) {\r\n      modalWindow.classList.remove('show');\r\n      backdrop.classList.remove('show-flex', 'full');\r\n    }\r\n\r\n    backdrop.classList.add('show-flex');\r\n    backdrop.classList.add('full');\r\n    modalWindow.classList.add('show');\r\n    modalWindow.focus();\r\n    if (document.body.style.overflow === 'hidden') {\r\n      document.body.style.overflow = '';\r\n    } else {\r\n      document.body.style.overflow = 'hidden';\r\n    }\r\n\r\n    modalContent.innerHTML = content;\r\n  };\r\n\r\n  const modalClose = () => {\r\n    modalWindow.classList.remove('show');\r\n    backdrop.classList.remove('show-flex', 'full');\r\n    document.body.style.overflow = '';\r\n  };\r\n\r\n  if (backdrop) {\r\n    backdrop.addEventListener('click', (event) => {\r\n      modalClose();\r\n    });\r\n  }\r\n\r\n  modalCloseBtn.addEventListener('click', (event) => {\r\n    modalClose();\r\n  });\r\n\r\n  if (cancelBtn) {\r\n    cancelBtn.addEventListener('click', (event) => {\r\n      closeModal();\r\n    });\r\n  }\r\n\r\n  return [modalShow, modalClose, modalWindow];\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/ui/modal.js?");

/***/ }),

/***/ "./client-src/javascripts/ui/nav.js":
/*!******************************************!*\
  !*** ./client-src/javascripts/ui/nav.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ navigation)\n/* harmony export */ });\nfunction navigation() {\r\n  const navButton = document.querySelector('.navigation__mobile-menu-btn');\r\n  const sideMenu = document.querySelector('.navigation__menu ul');\r\n  const backDrop = document.querySelector('.backdrop');\r\n  const loggedUser = document.getElementById('loggedUserAvatar');\r\n\r\n  navButton.addEventListener('click', (e) => {\r\n    if (document.querySelector('.modal').classList.contains('show')) {\r\n      document.querySelector('.modal').classList.remove('show');\r\n      sideMenu.classList.add('active');\r\n    } else {\r\n      backDrop.classList.toggle('show-flex');\r\n      sideMenu.classList.toggle('active');\r\n    }\r\n\r\n    if (document.body.style.overflow === 'hidden') {\r\n      document.body.style.overflow = '';\r\n    } else {\r\n      document.body.style.overflow = 'hidden';\r\n    }\r\n  });\r\n\r\n  if (backDrop) {\r\n    backDrop.addEventListener('click', (e) => {\r\n      backDrop.classList.remove('show-flex');\r\n      sideMenu.classList.remove('active');\r\n      document.body.style.overflow = '';\r\n    });\r\n  }\r\n\r\n  let windowWidth = window.innerWidth;\r\n  window.addEventListener('resize', (e) => {\r\n    if (window.innerWidth !== windowWidth) {\r\n      if (!backDrop.classList.contains('full')) {\r\n        backDrop.classList.remove('show-flex');\r\n\r\n      }\r\n      sideMenu.classList.remove('active');\r\n      document.body.style.overflow = '';\r\n    }\r\n  });\r\n\r\n\r\n  if (loggedUser) {\r\n    loggedUser.addEventListener('click', (event) => {\r\n      loggedUser.classList.toggle('active');\r\n    });\r\n\r\n    window.addEventListener('click', (event) => {\r\n      if (!event.target.matches('#loggedUserAvatar img')) {\r\n        if (loggedUser.classList.contains('active')) {\r\n          loggedUser.classList.remove('active');\r\n        }\r\n      }\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/ui/nav.js?");

/***/ }),

/***/ "./client-src/javascripts/ui/notification.js":
/*!***************************************************!*\
  !*** ./client-src/javascripts/ui/notification.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ notification)\n/* harmony export */ });\nfunction notification() {\r\n  function notificationShow(\r\n    message,\r\n    selector,\r\n    status='error',\r\n    withCloseBtn = false,\r\n    methodInserts = 'beforebegin'\r\n  ) {\r\n    const notificationTemplate = `\r\n    <div class=\"message__alert ${status}\">\r\n      ${ withCloseBtn ? '<button class=\"message__alert-close\"><i class=\"fa-solid fa-xmark\"></i></button>' : ''}\r\n      <div class=\"message__alert-content\">\r\n        ${message}\r\n      </div>\r\n    </div>\r\n  `;\r\n\r\n    const existError = document.querySelector('.message__alert');\r\n\r\n    if (existError) {\r\n      existError.remove();\r\n    }\r\n\r\n    document.querySelector(selector).insertAdjacentHTML(methodInserts, notificationTemplate);\r\n    \r\n    \r\n    const closeBtn = document.querySelector('.message__alert-close');\r\n\r\n    if (closeBtn) {\r\n      closeBtn.addEventListener('click', closeNotification);\r\n    }\r\n  }\r\n\r\n  function notificationClose() {\r\n    document.querySelector('.message__alert').remove();\r\n  }\r\n\r\n  return [notificationShow, notificationClose];\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/ui/notification.js?");

/***/ }),

/***/ "./client-src/javascripts/ui/pagination.js":
/*!*************************************************!*\
  !*** ./client-src/javascripts/ui/pagination.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ pagination)\n/* harmony export */ });\nfunction pagination() {\r\n  const pages = document.querySelectorAll('.page');\r\n  const prev = document.querySelector('.prev');\r\n  const next = document.querySelector('.next');\r\n\r\n  pages.forEach((page, i) => {\r\n    page.addEventListener('click', (e) => {\r\n      e.preventDefault();\r\n      const searchParams = new URLSearchParams(window.location.search);\r\n      console.log(searchParams.get('page'));\r\n      searchParams.set('page', i + 1);\r\n      window.location.search = searchParams.toString();\r\n    });\r\n  });\r\n\r\n  if (prev) {\r\n    prev.addEventListener('click', (e) => {\r\n      console.log('prev');\r\n      e.preventDefault();\r\n      const searchParams = new URLSearchParams(window.location.search);\r\n      const currentPage = +searchParams.get('page');\r\n      searchParams.set('page', currentPage - 1);\r\n      window.location.search = searchParams.toString();\r\n    });\r\n  }\r\n\r\n  if (next) {\r\n    next.addEventListener('click', (e) => {\r\n      console.log('next');\r\n      e.preventDefault();\r\n      const searchParams = new URLSearchParams(window.location.search);\r\n      const currentPage = +searchParams.get('page');\r\n      searchParams.set('page', currentPage + 1);\r\n      window.location.search = searchParams.toString();\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/ui/pagination.js?");

/***/ }),

/***/ "./client-src/javascripts/utils/fetch.js":
/*!***********************************************!*\
  !*** ./client-src/javascripts/utils/fetch.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"postData\": () => (/* binding */ postData)\n/* harmony export */ });\nconst token = document\r\n  .querySelector('meta[name=\"csrf-token\"]')\r\n  .getAttribute('content');\r\n\r\nasync function getData(url) {\r\n  const res = await fetch(url);\r\n  return { ...(await res.json()), ok: res.ok };\r\n}\r\n\r\nasync function postData(url, data, contentType) {\r\n  let res = await fetch(url, {\r\n    method: 'POST',\r\n    headers: {\r\n      'CSRF-Token': token,\r\n      'Content-Type': contentType || 'application/json',\r\n    },\r\n    body: contentType ? data : JSON.stringify(data),\r\n  });\r\n\r\n  const response = await res.json();\r\n\r\n  if (!res.ok) {\r\n    throw new Error(response.message || 'Something went wrong');\r\n  }\r\n\r\n  return response;\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/utils/fetch.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./client-src/javascripts/index.js");
/******/ 	
/******/ })()
;