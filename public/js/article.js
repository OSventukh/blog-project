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

/***/ "./client-src/javascripts/components/article.js":
/*!******************************************************!*\
  !*** ./client-src/javascripts/components/article.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ article)\n/* harmony export */ });\n/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _ui_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/modal */ \"./client-src/javascripts/ui/modal.js\");\n\n\n\nfunction article() {\n  const [modalShow, modalClose, modalWindow] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\n  const deleteArticleHandler = async (articleId) => {\n    try {\n      const response = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)('/post/delete', {\n        values: [articleId],\n      });\n      location.href = '/';\n    } catch (error) {\n      modalShow(error.message);\n    }\n  };\n\n  function deleteArticle() {\n    const deleteArticleBtn = document.getElementById('delete-article');\n\n    if (deleteArticleBtn) {\n      deleteArticleBtn.addEventListener('click', (event) => {\n        event.preventDefault();\n        const articleId = deleteArticleBtn.nextElementSibling.value;\n\n        const confirmDeleting = `\n          <p>Are you sure you want to delete this article?</p>\n          <div class=\"modal__buttons\">\n            <button class=\"button button-confirm\" id='confirm-deleting'>Yes</button>\n            <button class=\"button button-cancel\" id='cancel'>No</button>\n          </div>\n        `;\n\n        modalShow(confirmDeleting);\n\n        document\n          .getElementById('confirm-deleting')\n          .addEventListener('click', (event) => {\n            deleteArticleHandler(articleId);\n          });\n\n        document.getElementById('cancel').addEventListener('click', (event) => {\n          modalClose();\n        });\n      });\n    }\n  }\n  deleteArticle();\n}\n\n\n//# sourceURL=webpack://narutomanganode/./client-src/javascripts/components/article.js?");

/***/ }),

/***/ "./client-src/javascripts/components/comments.js":
/*!*******************************************************!*\
  !*** ./client-src/javascripts/components/comments.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ comments)\n/* harmony export */ });\n/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _utils_save_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/save-position */ \"./client-src/javascripts/utils/save-position.js\");\n/* harmony import */ var _ui_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/modal.js */ \"./client-src/javascripts/ui/modal.js\");\n\n\n\n\n(0,_utils_save_position__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\nfunction comments() {\n  const [modalShow, modalClose, modalWindow] = (0,_ui_modal_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n\n  const checkIfCommentsExist = () => {\n    const commentsList = document.querySelector('.comments__list');\n\n    if (commentsList.children.length === 0) {\n      commentsList.innerHTML =\n        '<div class=\"no-comments\">There are no comments yet.</div>';\n    }\n  };\n\n  const deleteCommentHandler = async (commentId, comment) => {\n    try {\n      const response = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)('/delete-comment', {\n        commentId: commentId,\n      });\n\n      comment.remove();\n      modalClose();\n      checkIfCommentsExist();\n      return;\n    } catch (error) {\n      modalShow(error.message);\n    }\n  };\n\n  function deleteComment() {\n    const commentDeleteBtns = document.querySelectorAll(\n      '.comment__options-list a'\n    );\n    commentDeleteBtns.forEach((del) => {\n      del.addEventListener('click', (event) => {\n        event.preventDefault();\n        const comment = del.closest('.comment');\n        const commentId = del.getAttribute('data-comment-id');\n\n        comment.style.border = '3px solid #e13939';\n        const confirmDeleting = `\n          <div class=\"modal__message\">Are you sure you want to delete this comment?</div>\n          <div class=\"modal__buttons\">\n            <button class=\"button button-confirm\" id='confirm-deleting'>Yes</button>\n            <button class=\"button button-cancel\" id='cancel-deleting'>No</button>\n          </div>\n        `;\n        modalShow(confirmDeleting);\n\n        document\n          .getElementById('confirm-deleting')\n          .addEventListener('click', (event) => {\n            deleteCommentHandler(commentId, comment);\n          });\n\n        document\n          .getElementById('cancel-deleting')\n          .addEventListener('click', (event) => {\n            modalClose();\n          });\n\n        modalWindow.addEventListener('blur', (event) => {\n          comment.style.border = '';\n        });\n      });\n    });\n  }\n\n  deleteComment();\n}\n\n\n//# sourceURL=webpack://narutomanganode/./client-src/javascripts/components/comments.js?");

/***/ }),

/***/ "./client-src/javascripts/pages/article.js":
/*!*************************************************!*\
  !*** ./client-src/javascripts/pages/article.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/article */ \"./client-src/javascripts/components/article.js\");\n/* harmony import */ var _components_comments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/comments */ \"./client-src/javascripts/components/comments.js\");\n\r\n\r\n\r\n(0,_components_article__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n(0,_components_comments__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n\n\n//# sourceURL=webpack://narutomanganode/./client-src/javascripts/pages/article.js?");

/***/ }),

/***/ "./client-src/javascripts/ui/modal.js":
/*!********************************************!*\
  !*** ./client-src/javascripts/ui/modal.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ modal)\n/* harmony export */ });\nfunction modal() {\r\n  const backdrop = document.querySelector('.backdrop');\r\n  const modalWindow = document.querySelector('.modal');\r\n  const modalCloseBtn = modalWindow.querySelector('.modal__close');\r\n  const modalContent = modalWindow.querySelector('.modal__content');\r\n  const cancelBtn = modalWindow.querySelector('#cancel');\r\n\r\n  const modalShow = (content) => {\r\n    const mobileMenu = document.querySelector('.navigation__list');\r\n\r\n    if (mobileMenu && mobileMenu.classList.contains('active')) {\r\n      mobileMenu.classList.remove('active');\r\n      backdrop.classList.remove('show-flex');\r\n    }\r\n\r\n    if (modalWindow && modalWindow.classList.contains('show')) {\r\n      modalWindow.classList.remove('show');\r\n      backdrop.classList.remove('show-flex', 'full');\r\n    }\r\n\r\n    backdrop.classList.add('show-flex');\r\n    backdrop.classList.add('full');\r\n    modalWindow.classList.add('show');\r\n    modalWindow.focus();\r\n    if (document.body.style.overflow === 'hidden') {\r\n      document.body.style.overflow = '';\r\n    } else {\r\n      document.body.style.overflow = 'hidden';\r\n    }\r\n\r\n    modalContent.innerHTML = content;\r\n  };\r\n\r\n  const modalClose = () => {\r\n    modalWindow.classList.remove('show');\r\n    backdrop.classList.remove('show-flex', 'full');\r\n    document.body.style.overflow = '';\r\n  };\r\n\r\n  if (backdrop) {\r\n    backdrop.addEventListener('click', (event) => {\r\n      modalClose();\r\n    });\r\n  }\r\n\r\n  modalCloseBtn.addEventListener('click', (event) => {\r\n    modalClose();\r\n  });\r\n\r\n  if (cancelBtn) {\r\n    cancelBtn.addEventListener('click', (event) => {\r\n      closeModal();\r\n    });\r\n  }\r\n\r\n  return [modalShow, modalClose, modalWindow];\r\n}\r\n\n\n//# sourceURL=webpack://narutomanganode/./client-src/javascripts/ui/modal.js?");

/***/ }),

/***/ "./client-src/javascripts/utils/fetch.js":
/*!***********************************************!*\
  !*** ./client-src/javascripts/utils/fetch.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"postData\": () => (/* binding */ postData)\n/* harmony export */ });\nconst token = document\r\n  .querySelector('meta[name=\"csrf-token\"]')\r\n  .getAttribute('content');\r\n\r\nasync function getData(url) {\r\n  const res = await fetch(url);\r\n  return { ...(await res.json()), ok: res.ok };\r\n}\r\n\r\nasync function postData(url, data, contentType) {\r\n  let res = await fetch(url, {\r\n    method: 'POST',\r\n    headers: {\r\n      'CSRF-Token': token,\r\n      'Content-Type': contentType || 'application/json',\r\n    },\r\n    body: contentType ? data : JSON.stringify(data),\r\n  });\r\n\r\n  const response = await res.json();\r\n\r\n  if (!res.ok) {\r\n    throw new Error(response.message || 'Something went wrong');\r\n  }\r\n\r\n  return response;\r\n}\r\n\n\n//# sourceURL=webpack://narutomanganode/./client-src/javascripts/utils/fetch.js?");

/***/ }),

/***/ "./client-src/javascripts/utils/save-position.js":
/*!*******************************************************!*\
  !*** ./client-src/javascripts/utils/save-position.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ saveScrollPosition)\n/* harmony export */ });\nfunction saveScrollPosition() {\n  document.addEventListener('DOMContentLoaded', function (event) {\n    var scrollpos = localStorage.getItem('scrollpos');\n    if (scrollpos) window.scrollTo(0, scrollpos);\n  });\n  \n  window.onbeforeunload = function (e) {\n    localStorage.setItem('scrollpos', window.scrollY);\n  };\n}\n\n//# sourceURL=webpack://narutomanganode/./client-src/javascripts/utils/save-position.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client-src/javascripts/pages/article.js");
/******/ 	
/******/ })()
;