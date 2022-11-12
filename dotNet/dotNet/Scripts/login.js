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

/***/ "./login.js":
/*!******************!*\
  !*** ./login.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./util.js\");\n\r\n\r\n\r\nconst submitBtn = document.querySelector(\".submit-btn\");\r\nconst logoutBtn = document.querySelector(\".logout-btn\");\r\n\r\nconst submitLogin = async () => {\r\n    const userId = document.querySelector(\".user-id\");\r\n    const userPassword = document.querySelector(\".user-password\");\r\n\r\n    const content = {\r\n        Id: userId.value,\r\n        Password: userPassword.value,\r\n    };\r\n\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPost)(\"/Login/Login\", content);\r\n    if (res.ok) {\r\n        alert(\"로그인 성공\");\r\n    }\r\n};\r\n\r\nconst submitLogout = async () => {\r\n    if (!(0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\")) {\r\n        return;\r\n    }\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestGetToState)(\"/Login/Logout\");\r\n    if (res.ok) {\r\n        alert(\"로그아웃 성공\");\r\n    }\r\n};\r\n\r\n//유저 목록 체크용\r\nconst checkUserList = async () => await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestGet)(\"/Login/UserList\");\r\n\r\n//초기 로그아웃으로 시작용\r\nconst initLogout = async () => await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestGetToState)(\"/Login/Logout\");\r\n\r\nconst init = () => {\r\n    checkUserList();\r\n    initLogout(); //처음에 로그아웃 하고 시작\r\n\r\n    submitBtn.addEventListener(\"click\", submitLogin);\r\n    logoutBtn.addEventListener(\"click\", submitLogout);\r\n};\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    init();\r\n});\r\n\n\n//# sourceURL=webpack://clientsrc/./login.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./login.js");
/******/ 	
/******/ })()
;