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

/***/ "./client-src/javascripts/components/ckeditor/index.js":
/*!*************************************************************!*\
  !*** ./client-src/javascripts/components/ckeditor/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/fetch.js */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _ui_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui/modal.js */ \"./client-src/javascripts/ui/modal.js\");\n\n\nconst [modalShow, modalClose] = (0,_ui_modal_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n\nasync function saveData(\n  editor,\n  inputs,\n  postStatus,\n  postId,\n  actionButtons,\n  event\n) {\n  const pressedButton = event.currentTarget;\n  if (event) {\n    pressedButton.disabled = true;\n  }\n\n  const [title, category, tags, slug] = inputs;\n\n  const contentValue = editor.getData();\n\n  const titleValue = title.value;\n  const categoryValue = category.value;\n  const tagsValue = tags.value;\n  const slugValue = slug.value;\n\n  const data = {\n    content: contentValue,\n    title: titleValue,\n    category: categoryValue,\n    tags: tagsValue,\n    slug: slugValue,\n    postId: postId,\n    postStatus: postStatus,\n  };\n\n  try {\n    const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.postData)('/add-post', data);\n    if (postStatus && postStatus === 'published') {\n      const [saveButton, publishButton] = actionButtons;\n\n      saveButton && saveButton.remove();\n      publishButton.textContent = 'update';\n    }\n\n    window.history.pushState({}, 'Article', `?id=${response.postId}`);\n  } catch (error) {\n    pressedButton.disabled = false;\n    modalShow(error.message);\n  }\n}\n\nasync function getPreviousContent(editor, postId) {\n  try {\n    const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.getData)(`/post-edit/${postId}`);\n    editor.setData(response.content);\n  } catch (error) {\n    modalShow(error.message);\n  }\n}\n\nfunction changeHandler(editor, inputs, actionButtons) {\n  const activeActionButtons = () => {\n    actionButtons.forEach((btn) => {\n      if (btn) {\n        btn.disabled = false;\n      }\n    });\n  };\n\n  editor.model.document.on('change:data', (evt, data) => {\n    activeActionButtons();\n  });\n\n  inputs.forEach((input) => {\n    input.addEventListener('input', activeActionButtons);\n  });\n}\n\nfunction initCKEditor() {\n  const titlePlaceholder = 'Type your title';\n  const contentPlaceholder = 'Type your content';\n\n  const saveButton = document.getElementById('save');\n  const publishButton = document.getElementById('publish');\n  const token = document\n    .querySelector('meta[name=\"csrf-token\"]')\n    .getAttribute('content');\n  const postId = document.querySelector('input[name=\"postId\"]').value;\n  const categoryId = document.querySelector('input[name=\"categoryId\"]').value;\n\n  const title = document.getElementById('article-title');\n  const category = document.getElementById('article-category');\n  const tags = document.getElementById('article-tags');\n  const slug = document.getElementById('article-slug');\n\n  title.placeholder = titlePlaceholder;\n  BalloonBlockEditor.create(document.querySelector('#editor'), {\n    licenseKey: '',\n    simpleUpload: {\n      uploadUrl: '/editor-upload-image',\n\n      // Enable the XMLHttpRequest.withCredentials property.\n      withCredentials: true,\n\n      // Headers sent along with the XMLHttpRequest to the upload server.\n      headers: {\n        'CSRF-Token': token,\n      },\n    },\n    placeholder: contentPlaceholder,\n  })\n    .then(async (editor) => {\n      window.editor = editor;\n\n      postId && (await getPreviousContent(editor, postId));\n\n      const inputs = [title, category, tags, slug];\n      const actionButtons = [saveButton, publishButton];\n      changeHandler(editor, inputs, actionButtons);\n\n      publishButton.addEventListener('click', async (event) => {\n        saveData(editor, inputs, 'published', postId, actionButtons, event);\n      });\n    })\n    .catch((error) => {\n      console.error(error);\n    });\n}\n\ninitCKEditor();\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/components/ckeditor/index.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client-src/javascripts/components/ckeditor/index.js");
/******/ 	
/******/ })()
;