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

/***/ "./client-src/javascripts/pages/reset.js":
/*!***********************************************!*\
  !*** ./client-src/javascripts/pages/reset.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch.js */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _ui_notification_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/notification.js */ \"./client-src/javascripts/ui/notification.js\");\n\r\n\r\n\r\nconst [notificationShow, notificationClose] = (0,_ui_notification_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\nfunction resetPassword() {\r\n  const resetForm = document.getElementById('reset-form');\r\n\r\n  resetForm.addEventListener('submit', async (event) => {\r\n    event.preventDefault();\r\n    \r\n    const passwordInput = document.getElementById('reset-password');\r\n    const emailInput = document.getElementById('reset-email');\r\n\r\n    let password;\r\n    let email;\r\n\r\n    if (passwordInput) {\r\n      password = passwordInput.value.trim();\r\n    }\r\n\r\n    if (emailInput) {\r\n      email = emailInput.value.trim();\r\n    }\r\n\r\n    try {\r\n      const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.postData)('/reset', {\r\n        password: password ? password : null,\r\n        email: email ? email : null,\r\n      });\r\n      location = '/?confirm-email'\r\n    } catch (error) {\r\n      notificationShow(error.message, '#reset-form', 'error', false, 'afterbegin')\r\n    }\r\n  });\r\n}\r\n\r\nresetPassword();\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/pages/reset.js?");

/***/ }),

/***/ "./client-src/javascripts/ui/notification.js":
/*!***************************************************!*\
  !*** ./client-src/javascripts/ui/notification.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ notification)\n/* harmony export */ });\nfunction notification() {\r\n  function notificationShow(\r\n    message,\r\n    selector,\r\n    status='error',\r\n    withCloseBtn = false,\r\n    methodInserts = 'beforebegin'\r\n  ) {\r\n    const notificationTemplate = `\r\n    <div class=\"message__alert ${status}\">\r\n      ${ withCloseBtn ? '<button class=\"message__alert-close\"><i class=\"fa-solid fa-xmark\"></i></button>' : ''}\r\n      <div class=\"message__alert-content\">\r\n        ${message}\r\n      </div>\r\n    </div>\r\n  `;\r\n\r\n    const existError = document.querySelector('.message__alert');\r\n\r\n    if (existError) {\r\n      existError.remove();\r\n    }\r\n\r\n    document.querySelector(selector).insertAdjacentHTML(methodInserts, notificationTemplate);\r\n    \r\n    \r\n    const closeBtn = document.querySelector('.message__alert-close');\r\n\r\n    if (closeBtn) {\r\n      closeBtn.addEventListener('click', closeNotification);\r\n    }\r\n  }\r\n\r\n  function notificationClose() {\r\n    document.querySelector('.message__alert').remove();\r\n  }\r\n\r\n  return [notificationShow, notificationClose];\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/ui/notification.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client-src/javascripts/pages/reset.js");
/******/ 	
/******/ })()
;