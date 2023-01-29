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

/***/ "./client-src/javascripts/pages/messages.js":
/*!**************************************************!*\
  !*** ./client-src/javascripts/pages/messages.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/fetch.js */ \"./client-src/javascripts/utils/fetch.js\");\n\r\n\r\n\r\nfunction messenger() {\r\n  const users = document.querySelectorAll('.messenger__user-item');\r\n  const messageForm = document.getElementById('private-message-form');\r\n  const messagesListField = document.querySelector('.messenger__messages');\r\n  const mobileToggle = document.querySelector('.messenger__user-mobile');\r\n  const userListMenu = document.querySelector('.messenger__users');\r\n  const userSearchInput = document.getElementById('messenger__search-input');\r\n  let receiverId;\r\n  \r\n  const documentHeight = () => {\r\n    const doc = document.documentElement;\r\n    doc.style.setProperty('--doc-height', `${window.innerHeight}px`);\r\n  };\r\n  window.addEventListener('resize', documentHeight);\r\n  documentHeight();\r\n\r\n  if (mobileToggle) {\r\n    mobileToggle.addEventListener('click', (event) => {\r\n      userListMenu.classList.toggle('active');\r\n      if (document.body.style.overflow === '') {\r\n        document.body.style.overflow = 'hidden';\r\n      } else {\r\n        document.body.style.overflow = '';\r\n      }\r\n    });\r\n  }\r\n\r\n  if (!receiverId) {\r\n    messagesListField.innerHTML = `\r\n      <p2 style=\"margin:auto\">Choose user for conversation</p2>\r\n    `\r\n    messageForm.style.display = 'none';\r\n  }\r\n\r\n  const filterUser = () => {\r\n\r\n    if (users && users.length > 0) {\r\n\r\n      const allUsers = users;\r\n\r\n      userSearchInput.addEventListener('input', (event) => {\r\n        const filteredUsers = [...allUsers].filter((user) => {\r\n          return user.querySelector('.messenger__user-nickname').textContent.includes(event.target.value);\r\n        });\r\n        users.parentNode.replaceChild(filteredUsers)\r\n      })\r\n    }\r\n  }\r\n\r\n  const loadMessages = async (userId) => {\r\n    const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.getData)(`/user-messages/${userId}`);\r\n\r\n    if (!response.ok) {\r\n      console.log('error');\r\n    }\r\n    messagesListField.innerHTML = '';\r\n\r\n    if (response.messages.length > 0) {\r\n      response.messages.forEach((message) => {\r\n        const listItem = document.createElement('div');\r\n        listItem.classList.add(\r\n          'message__item',\r\n          response.userId == message.senderId ? 'right' : 'left'\r\n        );\r\n        listItem.innerHTML = `\r\n            <div class=\"message__wrap\">\r\n              <div class=\"message__text\">${message.text}</div>\r\n              <div class=\"message__date\">${new Date(\r\n                message.createdAt\r\n              ).toLocaleString()}</div>\r\n            </div>\r\n          `;\r\n        messagesListField.prepend(listItem);\r\n      });\r\n    }\r\n  };\r\n\r\n\r\n  const showOnlineUsers = () => {\r\n    const onlineUsersId = sessionStorage.getItem('usersOnline');\r\n    users.forEach((user) => {\r\n      const userId = user.id.split('-')[1];\r\n      const onlineMark = user.querySelector('.messanger__online-mark')\r\n      if (onlineUsersId && onlineUsersId.includes(userId)) {\r\n        onlineMark.classList.add('active')\r\n      } else {\r\n        if (onlineMark.classList.contains('active')) {\r\n          onlineMark.classList.remove('active')\r\n        }\r\n      }\r\n    })\r\n\r\n  }\r\n\r\n  const getOlineUsers = (onlineUsersId) => {\r\n    sessionStorage.removeItem('usersOnline')\r\n    sessionStorage.setItem('usersOnline', onlineUsersId)\r\n  }\r\n\r\n  socket.on('users', users => {\r\n    const onlineUsersId = users.map((user) => user.userId)\r\n    getOlineUsers(onlineUsersId);\r\n    showOnlineUsers();\r\n  })\r\n\r\n  const uploadMessages = (data, type = 'send') => {\r\n    const listItem = document.createElement('div');\r\n\r\n    listItem.classList.add(\r\n      'message__item',\r\n\r\n      type === 'send' ? 'right' : 'left'\r\n    );\r\n    listItem.innerHTML = `\r\n            <div class=\"message__wrap\">\r\n              <div class=\"message__user-avatar\"></div>\r\n              <div class=\"message__text\">${data.message}</div>\r\n              <div class=\"message__date\">${new Date(\r\n                data.createdAt\r\n              ).toLocaleString()}</div>\r\n            </div>\r\n          `;\r\n    messagesListField.prepend(listItem);\r\n  };\r\n\r\n  const initLatestConversation = () => {\r\n    const userId = localStorage.getItem('interlocutor');\r\n    if (userId) {\r\n      const userItem = document.getElementById(`user-${userId}`);\r\n      if (userItem) {\r\n        userItem.classList.add('active');\r\n        receiverId = userId;\r\n        messageForm.style.display = 'flex';\r\n        loadMessages(userId);\r\n      }\r\n    }\r\n  };\r\n\r\n\r\n  socket.on('getMessage', (data) => {\r\n    console.log(data, receiverId)\r\n    if (data.sender === receiverId) {\r\n      uploadMessages(data, 'receive');\r\n\r\n    }\r\n  });\r\n\r\n  users.forEach((user) => {\r\n    user.addEventListener('click', async (event) => {\r\n      users.forEach((user) => user.classList.remove('active'));\r\n      user.classList.add('active');\r\n      const interlocutorId = user.id.split('-')[1];\r\n      receiverId = interlocutorId;\r\n      // socket.emit('createConversation', {\r\n      //   sender: currentUser,\r\n      //   receiver: interlocutorId,\r\n      // })\r\n      messageForm.style.display = 'flex';\r\n      localStorage.setItem('interlocutor', interlocutorId);\r\n\r\n      await loadMessages(interlocutorId);\r\n    });\r\n  });\r\n\r\n  messageForm.addEventListener('submit', async (event) => {\r\n    let message = document.getElementById('private-message').value;\r\n    event.preventDefault();\r\n    if (message.trim() === '' || !receiverId) {\r\n      return;\r\n    }\r\n\r\n\r\n    socket.emit('sendMessage', {\r\n      sender: currentUser,\r\n      receiver: receiverId,\r\n      message: message,\r\n    });\r\n\r\n    uploadMessages({\r\n      message: message,\r\n      createdAt: new Date(),\r\n    }, 'send')\r\n\r\n    const response = await (0,_utils_fetch_js__WEBPACK_IMPORTED_MODULE_0__.postData)('/user-messages/', {\r\n      receiverId: receiverId,\r\n      message: message,\r\n    });\r\n\r\n    if (response.ok) {\r\n      messageForm.reset();\r\n    }\r\n  });\r\n\r\n  showOnlineUsers();\r\n  filterUser();\r\n  initLatestConversation();\r\n\r\n}\r\n\r\nmessenger();\r\n\n\n//# sourceURL=webpack://blog-project/./client-src/javascripts/pages/messages.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client-src/javascripts/pages/messages.js");
/******/ 	
/******/ })()
;