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

/***/ "./client-src/javascripts/admin/admin.js":
/*!***********************************************!*\
  !*** ./client-src/javascripts/admin/admin.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _deleteItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./deleteItem */ \"./client-src/javascripts/admin/deleteItem.js\");\n\r\n\r\n// Deleting articles\r\n(0,_deleteItem__WEBPACK_IMPORTED_MODULE_0__.deleteItem)('/post/delete', '.articles__item-delete');\r\n\r\n(0,_deleteItem__WEBPACK_IMPORTED_MODULE_0__.deleteMultipleItems)('/post/delete', '.articles__check');\r\n\r\n// Deleting users\r\n(0,_deleteItem__WEBPACK_IMPORTED_MODULE_0__.deleteItem)('/post/delete', '.users__item-delete');\r\n\r\n(0,_deleteItem__WEBPACK_IMPORTED_MODULE_0__.deleteMultipleItems)('/post/delete', '.users__check');\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/admin/admin.js?");

/***/ }),

/***/ "./client-src/javascripts/admin/deleteItem.js":
/*!****************************************************!*\
  !*** ./client-src/javascripts/admin/deleteItem.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"deleteItem\": () => (/* binding */ deleteItem),\n/* harmony export */   \"deleteMultipleItems\": () => (/* binding */ deleteMultipleItems)\n/* harmony export */ });\n/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _ui_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/modal */ \"./client-src/javascripts/ui/modal.js\");\n\r\n\r\n\r\nfunction deleteItem(url, selector) {\r\n  const [modalShow] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n\r\n  const deleteBtns = document.querySelectorAll(selector);\r\n\r\n  deleteBtns.forEach((btn) => {\r\n    btn.addEventListener('click', async (event) => {\r\n      event.preventDefault();\r\n      const value = event.target.nextElementSibling.value;\r\n      try {\r\n        await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)(url, {\r\n          values: [value],\r\n        });\r\n\r\n        location.reload();\r\n      } catch (error) {\r\n        modalShow(error.message);\r\n      }\r\n    });\r\n  });\r\n}\r\n\r\nfunction deleteMultipleItems(url, selector) {\r\n  const [modalShow] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n  const articlesChecks = document.querySelectorAll(selector);\r\n  const multipleOptionsPanel = document.querySelector('.multiple-options');\r\n  let checkedItems = [];\r\n  articlesChecks.forEach((item) => {\r\n    item.addEventListener('click', (event) => {\r\n      checkedItems = [...articlesChecks]\r\n        .filter((item) => item.checked)\r\n        .map((item) => item.value);\r\n      console.log(checkedItems);\r\n      if (checkedItems.length > 0) {\r\n        multipleOptionsPanel.style.display = 'flex';\r\n        document.querySelector(\r\n          '.multiple-options__checked-num span'\r\n        ).textContent = checkedItems.length;\r\n      } else {\r\n        multipleOptionsPanel.style.display = 'none';\r\n      }\r\n    });\r\n  });\r\n\r\n  document.getElementById('delete-multiple-items').addEventListener('click', async () => {\r\n    if (checkedItems.length > 0) {\r\n      try {\r\n        await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)(url, {\r\n          values: checkedItems,\r\n        });\r\n\r\n        location.reload();\r\n      } catch (error) {\r\n        modalShow(error.message);\r\n      }\r\n    }\r\n  })\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/admin/deleteItem.js?");

/***/ }),

/***/ "./client-src/javascripts/ui/modal.js":
/*!********************************************!*\
  !*** ./client-src/javascripts/ui/modal.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ modal)\n/* harmony export */ });\nfunction modal() {\r\n  const backdrop = document.querySelector('.backdrop');\r\n  const modalWindow = document.querySelector('.modal');\r\n  const modalCloseBtn = modalWindow.querySelector('.modal__close');\r\n  const modalContent = modalWindow.querySelector('.modal__content');\r\n  const cancelBtn = modalWindow.querySelector('#cancel');\r\n\r\n  const modalShow = (content) => {\r\n    const mobileMenu = document.querySelector('.navigation__list');\r\n\r\n    if (mobileMenu && mobileMenu.classList.contains('active')) {\r\n      mobileMenu.classList.remove('active');\r\n      backdrop.classList.remove('show-flex');\r\n    }\r\n\r\n    if (modalWindow && modalWindow.classList.contains('show')) {\r\n      modalWindow.classList.remove('show');\r\n      backdrop.classList.remove('show-flex', 'full');\r\n    }\r\n\r\n    backdrop.classList.add('show-flex');\r\n    backdrop.classList.add('full');\r\n    modalWindow.classList.add('show');\r\n    modalWindow.focus();\r\n    if (document.body.style.overflow === 'hidden') {\r\n      document.body.style.overflow = '';\r\n    } else {\r\n      document.body.style.overflow = 'hidden';\r\n    }\r\n\r\n    modalContent.innerHTML = content;\r\n  };\r\n\r\n  const modalClose = () => {\r\n    modalWindow.classList.remove('show');\r\n    backdrop.classList.remove('show-flex', 'full');\r\n    document.body.style.overflow = '';\r\n  };\r\n\r\n  if (backdrop) {\r\n    backdrop.addEventListener('click', (event) => {\r\n      modalClose();\r\n    });\r\n  }\r\n\r\n  modalCloseBtn.addEventListener('click', (event) => {\r\n    modalClose();\r\n  });\r\n\r\n  if (cancelBtn) {\r\n    cancelBtn.addEventListener('click', (event) => {\r\n      closeModal();\r\n    });\r\n  }\r\n\r\n  return [modalShow, modalClose, modalWindow];\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/ui/modal.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client-src/javascripts/admin/admin.js");
/******/ 	
/******/ })()
;