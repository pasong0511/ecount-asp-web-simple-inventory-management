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

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"requestDelete\": () => (/* binding */ requestDelete),\n/* harmony export */   \"requestGet\": () => (/* binding */ requestGet),\n/* harmony export */   \"requestGetToState\": () => (/* binding */ requestGetToState),\n/* harmony export */   \"requestPost\": () => (/* binding */ requestPost),\n/* harmony export */   \"requestPostToJson\": () => (/* binding */ requestPostToJson)\n/* harmony export */ });\nconst requestGet = async (url) => {\r\n    const res = await fetch(url);\r\n\r\n    if (res.ok) {\r\n        const json = await res.json();\r\n        return json;\r\n    }\r\n\r\n    throw new Error(\"요청에 실패함\");\r\n};\r\n\r\nconst requestGetToState = async (url) => {\r\n    const res = await fetch(url);\r\n\r\n    if (res.ok) {\r\n        return res;\r\n    }\r\n\r\n    throw new Error(\"요청에 실패함\");\r\n};\r\n\r\nconst requestPost = async (url, data) => {\r\n    const postOption = {\r\n        method: \"POST\",\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n        },\r\n        body: JSON.stringify(data),\r\n    };\r\n    const res = await fetch(url, postOption);\r\n\r\n    if (res.ok) {\r\n        return res;\r\n    }\r\n\r\n    throw new Error(\"요청에 실패함\");\r\n};\r\n\r\nconst requestPostToJson = async (url, data) => {\r\n    const postOption = {\r\n        method: \"POST\",\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n        },\r\n        body: JSON.stringify(data),\r\n    };\r\n    const res = await fetch(url, postOption);\r\n\r\n    if (res.ok) {\r\n        const json = await res.json();\r\n        return json;\r\n    }\r\n\r\n    throw new Error(\"요청에 실패함\");\r\n};\r\n\r\nconst requestDelete = async (url, data) => {\r\n    const postOption = {\r\n        method: \"POST\",\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n        },\r\n        body: JSON.stringify(data),\r\n    };\r\n    const res = await fetch(url, postOption);\r\n\r\n    if (res.ok) {\r\n        return res;\r\n    }\r\n\r\n    throw new Error(\"요청에 실패함\");\r\n};\r\n\n\n//# sourceURL=webpack://clientsrc/./api.js?");

/***/ }),

/***/ "./client.js":
/*!*******************!*\
  !*** ./client.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./util.js\");\n\r\n\r\n\r\nconst viewTableEl = document.querySelector(\".client-results tbody\");\r\nconst convertParms = ({ Key, Name, UserId }) => {\r\n    return {\r\n        userId: UserId,\r\n        clientKey: Key,\r\n        clientName: Name,\r\n    };\r\n};\r\n\r\nconst createClientInfo = async () => {\r\n    const clientName = document.querySelector(\".client-name\").value;\r\n    const userId = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\");\r\n\r\n    if (!userId) {\r\n        alert(\"로그인 부탁드립니다\");\r\n        return;\r\n    }\r\n\r\n    const content = {\r\n        Name: clientName,\r\n        UserId: userId,\r\n    };\r\n\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPostToJson)(\"/Client/Client\", content);\r\n    console.log(res);\r\n\r\n    if (res) {\r\n        alert(\"고객이 등록되었습니다.\");\r\n    }\r\n\r\n    const clientKey = res.key;\r\n    if (!clientKey) {\r\n        alert(\"고객 등록이 실패했습니다.\");\r\n    }\r\n    renderClientItem({\r\n        userId,\r\n        clientKey,\r\n        viewTableEl,\r\n        clientName,\r\n    });\r\n};\r\n\r\nconst modifyClientInfoRender = (clientName, clientKey) => {\r\n    const clientNameEl = document.querySelector(\".modify-name\");\r\n    const clientKeyEl = document.querySelector(\".modify-code\");\r\n\r\n    clientNameEl.value = clientName;\r\n    clientKeyEl.value = clientKey;\r\n};\r\n\r\nconst requestModifyClientInfo = async ({ userId, modifyName, clientKey }) => {\r\n    const content = {\r\n        Name: modifyName,\r\n        UserId: userId,\r\n        Key: clientKey,\r\n    };\r\n\r\n    const result = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPost)(\"/Client/ClientModify\", content);\r\n\r\n    if (result.ok) {\r\n        alert(\"수정 성공\");\r\n        renderClientItems();\r\n    }\r\n};\r\n\r\n//아이템에서 수정 버튼 클릭\r\nconst modifyClientItem = (clientName, clientKey, userId) => {\r\n    modifyClientInfoRender(clientName, clientKey);\r\n\r\n    const submitBtn = document.querySelector(\".modify-submit-btn\");\r\n    submitBtn.addEventListener(\"click\", () => {\r\n        const modifyName = document.querySelector(\".modify-name\").value;\r\n        requestModifyClientInfo({\r\n            userId,\r\n            modifyName,\r\n            clientKey,\r\n        });\r\n    });\r\n};\r\n\r\nconst removeClientItem = async (clientKey, userId) => {\r\n    const content = {\r\n        Key: clientKey,\r\n        userId: userId,\r\n    };\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestDelete)(\"/Client/ClientDelete\", content);\r\n\r\n    if (res.ok) {\r\n        alert(\"데이터 삭제 완료\");\r\n    }\r\n\r\n    renderClientItems();\r\n};\r\n\r\nconst renderClientItem = ({ userId, clientKey, viewTableEl, clientName }) => {\r\n    const itemInfo = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createEl)(\"tr\", \"client-item\");\r\n    const infoName = document.createElement(\"td\");\r\n    const infoCode = document.createElement(\"td\");\r\n    const modifyBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"modify-btn\", \"수정\");\r\n    const removeBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"remove-btn\", \"삭제\");\r\n\r\n    itemInfo.setAttribute(\"data-key\", clientKey);\r\n    itemInfo.setAttribute(\"data-user\", userId);\r\n\r\n    infoName.innerText = clientName;\r\n    infoCode.innerText = clientKey;\r\n\r\n    itemInfo.appendChild(infoName);\r\n    itemInfo.appendChild(infoCode);\r\n\r\n    itemInfo.appendChild(modifyBtn);\r\n    itemInfo.appendChild(removeBtn);\r\n\r\n    modifyBtn.addEventListener(\"click\", () => {\r\n        console.log(\"클릭했을때 넘어온 값->\", clientName, clientKey, userId);\r\n        modifyClientItem(clientName, clientKey, userId);\r\n    });\r\n\r\n    removeBtn.addEventListener(\"click\", (event) => {\r\n        event.target.parentNode.parentNode.removeChild(event.target.parentNode);\r\n        removeClientItem(clientKey, userId);\r\n    });\r\n\r\n    viewTableEl.appendChild(itemInfo);\r\n};\r\n\r\nconst renderClientItems = async () => {\r\n    viewTableEl.innerText = \"\";\r\n    const clientItems = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestGet)(\"/Client/ClientItems\");\r\n\r\n    console.log(\"데이터 목록 출력->\", clientItems);\r\n    clientItems.map(convertParms).forEach((item) => renderClientItem({ ...item, viewTableEl }));\r\n};\r\n\r\nconst init = () => {\r\n    renderClientItems();\r\n\r\n    if (!(0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\")) {\r\n        alert(\"로그인 부탁드립니다\");\r\n        return;\r\n    }\r\n\r\n    const submitBtn = document.querySelector(\".save-submit-btn\");\r\n    submitBtn.addEventListener(\"click\", createClientInfo);\r\n};\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", async () => {\r\n    init();\r\n});\r\n\n\n//# sourceURL=webpack://clientsrc/./client.js?");

/***/ }),

/***/ "./util.js":
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createBtn\": () => (/* binding */ createBtn),\n/* harmony export */   \"createEl\": () => (/* binding */ createEl),\n/* harmony export */   \"cutDateFull\": () => (/* binding */ cutDateFull),\n/* harmony export */   \"cutDateMonth\": () => (/* binding */ cutDateMonth),\n/* harmony export */   \"delete_cookie\": () => (/* binding */ delete_cookie),\n/* harmony export */   \"formatDate\": () => (/* binding */ formatDate),\n/* harmony export */   \"get_cookie\": () => (/* binding */ get_cookie)\n/* harmony export */ });\n/*엘리먼트 생성, 클래스 이름 부여*/\r\nconst createEl = (elKind, className = \"\") => {\r\n    const el = document.createElement(elKind);\r\n    el.className = className;\r\n\r\n    return el;\r\n};\r\n\r\nconst createBtn = (className = \"\", text = \"\") => {\r\n    const el = document.createElement(\"button\");\r\n    el.className = className;\r\n    el.innerText = text;\r\n    return el;\r\n};\r\n\r\n//쿠키 값 가져오는 함수\r\nconst get_cookie = (name) => {\r\n    var value = document.cookie.match(\"(^|;) ?\" + name + \"=([^;]*)(;|$)\");\r\n    return value ? value[2] : null;\r\n};\r\n\r\n//쿠키 삭제하는 함수\r\nconst delete_cookie = (name) => {\r\n    document.cookie = encodeURIComponent(name) + \"=; expires=Thu, 01 JAN 1999 00:00:10 GMT\";\r\n};\r\n\r\nconst cutDateFull = (date) => {\r\n    const [year, month, day] = date.split(\"-\");\r\n    return [Number(year), Number(month), Number(day)];\r\n};\r\n\r\nconst cutDateMonth = (date) => {\r\n    const [year, month] = date.split(\"-\");\r\n    return [Number(year), Number(month)];\r\n};\r\n\r\n//#C DateTime 객체로 넘어온 데이터 변환\r\nconst formatDate = (date) => {\r\n    return new Date(parseInt(/-?\\d+/.exec(date)[0])).toLocaleDateString();\r\n};\r\n\n\n//# sourceURL=webpack://clientsrc/./util.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./client.js");
/******/ 	
/******/ })()
;