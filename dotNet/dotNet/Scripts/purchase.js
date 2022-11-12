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

/***/ "./constants.js":
/*!**********************!*\
  !*** ./constants.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"PRODUCT_TYPE\": () => (/* binding */ PRODUCT_TYPE)\n/* harmony export */ });\nconst PRODUCT_TYPE = {\r\n    0: \"RawMaterial\", // 원재료\r\n    1: \"Product\", // 제품\r\n    2: \"Goods\", // 상품\r\n};\r\n\n\n//# sourceURL=webpack://clientsrc/./constants.js?");

/***/ }),

/***/ "./purchase.js":
/*!*********************!*\
  !*** ./purchase.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./util.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./constants.js\");\n\r\n\r\n\r\n\r\nconst viewTableEl = document.querySelector(\".product-results tbody\");\r\n\r\n//구매 정보 등록\r\nconst requestPurchase = async ({ clientName, productName, productQuantity, year, month, day, userId }) => {\r\n    const content = {\r\n        ClientName: clientName,\r\n        ProductName: productName,\r\n        Quantity: productQuantity,\r\n        Year: year,\r\n        Month: month,\r\n        Day: day,\r\n        UserId: userId,\r\n    };\r\n    console.log(content);\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPostToJson)(\"/Purchase/Purchase\", content);\r\n\r\n    if (res) {\r\n        console.log(res);\r\n        alert(\"상품이 등록되었습니다.\");\r\n    }\r\n\r\n    const clientKey = res.key;\r\n    if (!clientKey) {\r\n        alert(\"상품 등록이 실패했습니다.\");\r\n    }\r\n\r\n    return clientKey;\r\n};\r\n\r\nconst createClientInfo = () => {\r\n    const clientName = document.querySelector(\".purchase-client-name\").value;\r\n    const productName = document.querySelector(\".purchase-product-name\").value;\r\n    const productQuantity = document.querySelector(\".purchase-product-quantity\").value;\r\n    const productDate = document.querySelector(\".purchase-product-date\").value;\r\n\r\n    const [year, month, day] = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.cutDateFull)(productDate);\r\n\r\n    const userId = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\");\r\n    if (!userId) {\r\n        alert(\"로그인 부탁드립니다\");\r\n        return;\r\n    }\r\n\r\n    requestPurchase({ clientName, productName, productQuantity, year, month, day, userId });\r\n    renderPurchaseItems();\r\n};\r\n\r\nconst renderClientItem = (clientName, clickKey, productKey, productName, productType, quantity, dateTime) => {\r\n    console.log(clientName, clickKey, productName, productType, dateTime);\r\n\r\n    const itemInfo = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createEl)(\"tr\", \"client-item\");\r\n    const infoClientName = document.createElement(\"td\");\r\n    const infoClientKey = document.createElement(\"td\");\r\n    const infoProductName = document.createElement(\"td\");\r\n    const infoProductType = document.createElement(\"td\");\r\n    const infoProductQuantity = document.createElement(\"td\");\r\n    const infoDateTime = document.createElement(\"td\");\r\n\r\n    const modifyBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"modify-btn\", \"수정\");\r\n    const removeBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"remove-btn\", \"삭제\");\r\n\r\n    itemInfo.setAttribute(\"data-client-key\", clickKey);\r\n    itemInfo.setAttribute(\"data-product-key\", productKey);\r\n\r\n    infoClientName.innerText = clientName;\r\n    infoClientKey.innerText = clickKey.split(\"-\")[0];\r\n    infoProductName.innerText = productName;\r\n    infoProductType.innerText = _constants_js__WEBPACK_IMPORTED_MODULE_2__.PRODUCT_TYPE[productType];\r\n    infoProductQuantity.innerText = quantity;\r\n    infoDateTime.innerText = dateTime;\r\n\r\n    itemInfo.appendChild(infoClientKey);\r\n    itemInfo.appendChild(infoClientName);\r\n    itemInfo.appendChild(infoProductName);\r\n    itemInfo.appendChild(infoProductType);\r\n    itemInfo.appendChild(infoProductQuantity);\r\n    itemInfo.appendChild(infoDateTime);\r\n\r\n    itemInfo.appendChild(modifyBtn);\r\n    itemInfo.appendChild(removeBtn);\r\n\r\n    viewTableEl.appendChild(itemInfo);\r\n};\r\n\r\nconst renderItemList = (purchasetems) => {\r\n    viewTableEl.innerText = \"\";\r\n\r\n    purchasetems.forEach(({ Client, Product, Quantity, DateTime, UserId }) => {\r\n        //console.log(Client, Product, Quantity, formatDate(DateTime), UserId);\r\n        //console.log(Client.Name, Client.Key, Product.Name, Product.Type, formatDate(DateTime));\r\n        renderClientItem(Client.Name, Client.Key, Product.Key, Product.Name, Product.Type, Quantity, (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(DateTime));\r\n    });\r\n};\r\n\r\nconst renderPurchaseItems = async () => {\r\n    const purchasetems = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestGet)(\"/Purchase/PurchaseItems\");\r\n    console.log(\"데이터 목록 출력->\", purchasetems);\r\n    renderItemList(purchasetems);\r\n};\r\n\r\nconst init = () => {\r\n    renderPurchaseItems();\r\n\r\n    const nowDate = document.querySelector(\".purchase-product-date\");\r\n    nowDate.value = new Date().toISOString().substring(0, 10);\r\n\r\n    //버튼 눌러서 등록\r\n    const submitBtn = document.querySelector(\".submit-btn\");\r\n    submitBtn.addEventListener(\"click\", createClientInfo);\r\n};\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    init();\r\n});\r\n\n\n//# sourceURL=webpack://clientsrc/./purchase.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./purchase.js");
/******/ 	
/******/ })()
;