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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/fetch.js */ \"./client-src/javascripts/utils/fetch.js\");\n/* harmony import */ var _ui_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../ui/modal.js */ \"./client-src/javascripts/ui/modal.js\");\n\r\n\r\nconst [modalShow, modalClose] = (0,_ui_modal_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\r\n\r\nasync function saveData(\r\n  editor,\r\n  inputs,\r\n  postStatus,\r\n  postId,\r\n  actionButtons,\r\n  event\r\n) {\r\n  const pressedButton = event.currentTarget;\r\n  if (event) {\r\n    pressedButton.disabled = true;\r\n  }\r\n\r\n  const [title, category, tags, slug] = inputs;\r\n\r\n  const contentValue = editor.getData();\r\n\r\n  const titleValue = title.value;\r\n  const categoryValue = category.value;\r\n  const tagsValue = tags.value;\r\n  const slugValue = slug.value;\r\n\r\n  const data = {\r\n    content: contentValue,\r\n    title: titleValue,\r\n    category: categoryValue,\r\n    tags: tagsValue,\r\n    slug: slugValue,\r\n    postId: postId,\r\n    postStatus: postStatus,\r\n  };\r\n\r\n  try {\r\n    const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.postData)('/add-post', data);\r\n    if (postStatus && postStatus === 'published') {\r\n      const [saveButton, publishButton] = actionButtons;\r\n\r\n      saveButton && saveButton.remove();\r\n      publishButton.textContent = 'update';\r\n    }\r\n\r\n    window.history.pushState({}, 'Article', `?id=${response.postId}`);\r\n  } catch (error) {\r\n    pressedButton.disabled = false;\r\n    modalShow(error.message);\r\n  }\r\n}\r\n\r\nasync function getPreviousContent(editor, postId) {\r\n  try {\r\n    const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.getData)(`/post-edit/${postId}`);\r\n    editor.setData(response.content);\r\n  } catch (error) {\r\n    modalShow(error.message);\r\n  }\r\n}\r\n\r\nfunction changeHandler(editor, inputs, actionButtons) {\r\n  const activeActionButtons = () => {\r\n    actionButtons.forEach((btn) => {\r\n      if (btn) {\r\n        btn.disabled = false;\r\n      }\r\n    });\r\n  };\r\n\r\n  editor.model.document.on('change:data', (evt, data) => {\r\n    activeActionButtons();\r\n  });\r\n\r\n  inputs.forEach((input) => {\r\n    input.addEventListener('input', activeActionButtons);\r\n  });\r\n}\r\n\r\nfunction initCKEditor() {\r\n  const titlePlaceholder = 'Type your title';\r\n  const contentPlaceholder = 'Type your content';\r\n\r\n  const saveButton = document.getElementById('save');\r\n  const publishButton = document.getElementById('publish');\r\n  const token = document\r\n    .querySelector('meta[name=\"csrf-token\"]')\r\n    .getAttribute('content');\r\n  const postId = document.querySelector('input[name=\"postId\"]').value;\r\n  const categoryId = document.querySelector('input[name=\"categoryId\"]').value;\r\n\r\n  const title = document.getElementById('article-title');\r\n  const category = document.getElementById('article-category');\r\n  const tags = document.getElementById('article-tags');\r\n  const slug = document.getElementById('article-slug');\r\n\r\n  title.placeholder = titlePlaceholder;\r\n  BalloonBlockEditor.create(document.querySelector('#editor'), {\r\n    licenseKey: '',\r\n    simpleUpload: {\r\n      uploadUrl: '/editor-upload-image',\r\n\r\n      // Enable the XMLHttpRequest.withCredentials property.\r\n      withCredentials: true,\r\n\r\n      // Headers sent along with the XMLHttpRequest to the upload server.\r\n      headers: {\r\n        'CSRF-Token': token,\r\n      },\r\n    },\r\n    placeholder: contentPlaceholder,\r\n  })\r\n    .then(async (editor) => {\r\n      window.editor = editor;\r\n\r\n      postId && (await getPreviousContent(editor, postId));\r\n\r\n      const inputs = [title, category, tags, slug];\r\n      const actionButtons = [saveButton, publishButton];\r\n      changeHandler(editor, inputs, actionButtons);\r\n\r\n      publishButton.addEventListener('click', async (event) => {\r\n        saveData(editor, inputs, 'published', postId, actionButtons, event);\r\n      });\r\n    })\r\n    .catch((error) => {\r\n      console.error(error);\r\n    });\r\n}\r\n\r\nfunction openArticleMobileMenu() {\r\n  const optionsMenuBtn = document.getElementById('mobile-article-options');\r\n  const optionsMenu = document.querySelector('.article-edit__control-area');\r\n\r\n  optionsMenuBtn.addEventListener('click', (event) => {\r\n    event.stopPropagation();\r\n\r\n    optionsMenu.classList.toggle('active');\r\n  });\r\n\r\n  window.addEventListener('click', (event) => {\r\n    event.stopPropagation();\r\n    if (!event.target.matches('.article-edit__control-area') && !event.target.matches('.article-edit__control-area > *')) {\r\n      if (optionsMenu.classList.contains('active')) {\r\n\r\n        optionsMenu.classList.remove('active');\r\n      }\r\n    }\r\n  });\r\n}\r\nopenArticleMobileMenu();\r\ninitCKEditor();\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/components/ckeditor/index.js?");

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