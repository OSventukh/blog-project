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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ article)\n/* harmony export */ });\n/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _ui_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ui/modal */ \"./client-src/javascripts/ui/modal.js\");\n\r\n\r\n\r\nfunction article() {\r\n  const [modalShow, modalClose, modalWindow] = (0,_ui_modal__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n\r\n  const deleteArticleHandler = async (articleId) => {\r\n    try {\r\n      const response = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)('/post/delete', {\r\n        values: [articleId],\r\n      });\r\n      location.href = '/';\r\n    } catch (error) {\r\n      modalShow(error.message);\r\n    }\r\n  };\r\n\r\n  function deleteArticle() {\r\n    const deleteArticleBtn = document.getElementById('delete-article');\r\n\r\n    if (deleteArticleBtn) {\r\n      deleteArticleBtn.addEventListener('click', (event) => {\r\n        event.preventDefault();\r\n        const articleId = deleteArticleBtn.nextElementSibling.value;\r\n\r\n        const confirmDeleting = `\r\n          <p>Are you sure you want to delete this article?</p>\r\n          <div class=\"modal__buttons\">\r\n            <button class=\"button button-confirm\" id='confirm-deleting'>Yes</button>\r\n            <button class=\"button button-cancel\" id='cancel'>No</button>\r\n          </div>\r\n        `;\r\n\r\n        modalShow(confirmDeleting);\r\n\r\n        document\r\n          .getElementById('confirm-deleting')\r\n          .addEventListener('click', (event) => {\r\n            deleteArticleHandler(articleId);\r\n          });\r\n\r\n        document.getElementById('cancel').addEventListener('click', (event) => {\r\n          modalClose();\r\n        });\r\n      });\r\n    }\r\n  }\r\n  deleteArticle();\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/components/article.js?");

/***/ }),

/***/ "./client-src/javascripts/components/comments.js":
/*!*******************************************************!*\
  !*** ./client-src/javascripts/components/comments.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ comments)\n/* harmony export */ });\n/* harmony import */ var _utils_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _utils_save_position__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/save-position */ \"./client-src/javascripts/utils/save-position.js\");\n/* harmony import */ var _ui_modal_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ui/modal.js */ \"./client-src/javascripts/ui/modal.js\");\n\r\n\r\n\r\n\r\n(0,_utils_save_position__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n\r\nfunction comments() {\r\n  const [modalShow, modalClose, modalWindow] = (0,_ui_modal_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\r\n\r\n  const checkIfCommentsExist = () => {\r\n    const commentsList = document.querySelector('.comments__list');\r\n\r\n    if (commentsList.children.length === 0) {\r\n      commentsList.innerHTML =\r\n        '<div class=\"no-comments\">There are no comments yet.</div>';\r\n    }\r\n  };\r\n\r\n  const deleteCommentHandler = async (commentId, comment) => {\r\n    try {\r\n      const response = await (0,_utils_fetch__WEBPACK_IMPORTED_MODULE_0__.postData)('/delete-comment', {\r\n        commentId: commentId,\r\n      });\r\n\r\n      comment.remove();\r\n      modalClose();\r\n      checkIfCommentsExist();\r\n      return;\r\n    } catch (error) {\r\n      modalShow(error.message);\r\n    }\r\n  };\r\n\r\n  function deleteComment() {\r\n    const commentDeleteBtns = document.querySelectorAll(\r\n      '.comment__options-list a'\r\n    );\r\n    commentDeleteBtns.forEach((del) => {\r\n      del.addEventListener('click', (event) => {\r\n        event.preventDefault();\r\n        const comment = del.closest('.comment');\r\n        const commentId = del.getAttribute('data-comment-id');\r\n\r\n        comment.style.border = '3px solid #e13939';\r\n        const confirmDeleting = `\r\n          <div class=\"modal__message\">Are you sure you want to delete this comment?</div>\r\n          <div class=\"modal__buttons\">\r\n            <button class=\"button button-confirm\" id='confirm-deleting'>Yes</button>\r\n            <button class=\"button button-cancel\" id='cancel-deleting'>No</button>\r\n          </div>\r\n        `;\r\n        modalShow(confirmDeleting);\r\n\r\n        document\r\n          .getElementById('confirm-deleting')\r\n          .addEventListener('click', (event) => {\r\n            deleteCommentHandler(commentId, comment);\r\n          });\r\n\r\n        document\r\n          .getElementById('cancel-deleting')\r\n          .addEventListener('click', (event) => {\r\n            modalClose();\r\n          });\r\n\r\n        modalWindow.addEventListener('blur', (event) => {\r\n          comment.style.border = '';\r\n        });\r\n      });\r\n    });\r\n  }\r\n\r\n  deleteComment();\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/components/comments.js?");

/***/ }),

/***/ "./client-src/javascripts/pages/article.js":
/*!*************************************************!*\
  !*** ./client-src/javascripts/pages/article.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_article__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/article */ \"./client-src/javascripts/components/article.js\");\n/* harmony import */ var _components_comments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/comments */ \"./client-src/javascripts/components/comments.js\");\n\r\n\r\n\r\n(0,_components_article__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n(0,_components_comments__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/pages/article.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getData\": () => (/* binding */ getData),\n/* harmony export */   \"postData\": () => (/* binding */ postData)\n/* harmony export */ });\nconst token = document\r\n  .querySelector('meta[name=\"csrf-token\"]')\r\n  .getAttribute('content');\r\n\r\nasync function getData(url) {\r\n  const res = await fetch(url);\r\n  const result = await res.json()\r\n  if (!res.ok) {\r\n    throw new Error(result.message || 'Something went wrong')\r\n  }\r\n  return result;\r\n}\r\n\r\nasync function postData(url, data, contentType) {\r\n  let res = await fetch(url, {\r\n    method: 'POST',\r\n    headers: {\r\n      'CSRF-Token': token,\r\n      'Content-Type': contentType || 'application/json',\r\n    },\r\n    body: contentType ? data : JSON.stringify(data),\r\n  });\r\n\r\n  const result = await res.json();\r\n\r\n  if (!res.ok) {\r\n    throw new Error(result.message || 'Something went wrong');\r\n  }\r\n\r\n  return result;\r\n}\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/utils/fetch.js?");

/***/ }),

/***/ "./client-src/javascripts/utils/save-position.js":
/*!*******************************************************!*\
  !*** ./client-src/javascripts/utils/save-position.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ saveScrollPosition)\n/* harmony export */ });\nfunction saveScrollPosition() {\r\n  document.addEventListener('DOMContentLoaded', function (event) {\r\n    var scrollpos = localStorage.getItem('scrollpos');\r\n    if (scrollpos) window.scrollTo(0, scrollpos);\r\n  });\r\n  \r\n  window.onbeforeunload = function (e) {\r\n    localStorage.setItem('scrollpos', window.scrollY);\r\n  };\r\n}\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/utils/save-position.js?");

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