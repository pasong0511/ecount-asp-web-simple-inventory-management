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

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./util.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./constants.js\");\n\r\n\r\n\r\n\r\nconst viewTableEl = document.querySelector(\".productResults tbody\");\r\n\r\nconst convertParms = ({ Key, Name, Type, userId, SafeQuantity }) => {\r\n    return {\r\n        userId,\r\n        productKey: Key,\r\n        productName: Name,\r\n        productType: Type,\r\n        productSafeQuantity: SafeQuantity,\r\n    };\r\n};\r\n\r\nconst createProductInfo = async () => {\r\n    const productName = document.querySelector(\".userInputInfo input\").value;\r\n    const productType = document.querySelector(\"input[name='product-type']:checked\").value;\r\n    const productSafeQuantity = document.querySelector(\".safe-quantity\").value;\r\n    const userId = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\");\r\n\r\n    if (!userId) {\r\n        alert(\"로그인 부탁드립니다\");\r\n        return;\r\n    }\r\n\r\n    const productContent = {\r\n        Name: productName,\r\n        Type: productType,\r\n        SafeQuantity: productSafeQuantity === \"\" ? 0 : productSafeQuantity,\r\n        UserId: userId, //<-체크\r\n    };\r\n\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPostToJson)(\"/hello/product\", productContent);\r\n\r\n    if (res) {\r\n        alert(\"품목이 등록되었습니다.\");\r\n    }\r\n\r\n    const productKey = res.key;\r\n    if (!productKey) {\r\n        alert(\"상품 등록이 실패했습니다.\");\r\n    }\r\n    renderProductItem({\r\n        userId,\r\n        productKey,\r\n        viewTableEl,\r\n        productName,\r\n        productType,\r\n        productSafeQuantity,\r\n    });\r\n};\r\n\r\nconst removeProductItem = async (productKey, userId) => {\r\n    const content = {\r\n        Key: productKey,\r\n        userId: userId,\r\n    };\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestDelete)(\"/hello/ProductDelete\", content);\r\n\r\n    if (res.ok) {\r\n        alert(\"데이터 삭제 완료\");\r\n    }\r\n\r\n    renderProductItems();\r\n};\r\n\r\n//서버로 수정 정보 전달\r\nconst requestModifyInfo = async ({ userId, modifyName, modifyType, productKey, modifySafeQuantity }) => {\r\n    const content = {\r\n        Name: modifyName,\r\n        Type: modifyType,\r\n        SafeQuantity: modifySafeQuantity === \"\" ? 0 : modifySafeQuantity,\r\n        UserId: userId,\r\n        Key: productKey,\r\n    };\r\n\r\n    const result = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPost)(\"/hello/ProductModify\", content);\r\n\r\n    if (result.ok) {\r\n        alert(\"수정 성공\");\r\n        renderProductItems();\r\n    }\r\n};\r\n\r\n//수정 버튼 누르면 사용자가 입력했던 정보 가져옴\r\nconst modifyInfoRender = (productName, productType, productSafeQuantity) => {\r\n    const productNameEl = document.querySelector(\".modify-info input\");\r\n    const productSafeQuantityEl = document.querySelector(\".modify-safe-quantity\");\r\n\r\n    productNameEl.value = productName;\r\n    productSafeQuantityEl.value = productSafeQuantity;\r\n};\r\n\r\n//아이템에서 수정 버튼 클릭\r\nconst modifyProductItem = (productName, productType, productKey, productSafeQuantity, userId) => {\r\n    modifyInfoRender(productName, productType, productSafeQuantity);\r\n\r\n    const submitBtn = document.querySelector(\".modify-select .submit-btn\");\r\n\r\n    // 버그수정 -> 기존 이벤트 등록을 함수로 저장\r\n    const handleClick = () => {\r\n        const modifyName = document.querySelector(\".modify-name\").value;\r\n        const modifyType = document.querySelector(\"input[name='modify-type']:checked\").value;\r\n        const modifySafeQuantity = document.querySelector(\".modify-safe-quantity\").value;\r\n\r\n        requestModifyInfo({\r\n            userId,\r\n            modifyName,\r\n            modifyType,\r\n            productKey,\r\n            modifySafeQuantity,\r\n        });\r\n    };\r\n\r\n    //버그 수정 -> 이벤트를 등록하고 이벤트 제거 함수를 반환\r\n    submitBtn.addEventListener(\"click\", handleClick);\r\n    return () => submitBtn.removeEventListener(\"click\", handleClick);\r\n};\r\n\r\n// 버그수정 -> removeEvent를 임시로 저장할 공간\r\nlet prevModifyEvent = null;\r\n\r\nconst renderProductItem = ({ userId, productKey, viewTableEl, productName, productType, productSafeQuantity }) => {\r\n    const itemInfo = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createEl)(\"tr\", \"product-item\");\r\n    const infoName = document.createElement(\"td\");\r\n    const infoType = document.createElement(\"td\");\r\n    const infoSafe = document.createElement(\"td\");\r\n    const modifyBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"modify-btn\", \"수정\");\r\n    const removeBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"remove-btn\", \"삭제\");\r\n\r\n    itemInfo.setAttribute(\"data-key\", productKey);\r\n    itemInfo.setAttribute(\"data-user\", userId);\r\n\r\n    infoName.innerText = productName;\r\n    infoType.innerText = typeof productType === typeof 0 ? _constants_js__WEBPACK_IMPORTED_MODULE_2__.PRODUCT_TYPE[productType] : productType;\r\n    infoSafe.innerText = productSafeQuantity === \"\" ? 0 : productSafeQuantity;\r\n\r\n    itemInfo.appendChild(infoName);\r\n    itemInfo.appendChild(infoType);\r\n    itemInfo.appendChild(infoSafe);\r\n    itemInfo.appendChild(modifyBtn);\r\n    itemInfo.appendChild(removeBtn);\r\n\r\n    //버그수정 -> removeEvent가 저장되어있으면 실행\r\n    modifyBtn.addEventListener(\"click\", () => {\r\n        if (prevModifyEvent) {\r\n            prevModifyEvent();\r\n        }\r\n        console.log(\"클릭했을때 넘어온 값\", productKey, userId);\r\n\r\n        //버그수정 -> removeEvent를 임시로 저장\r\n        prevModifyEvent = modifyProductItem(productName, productType, productKey, productSafeQuantity, userId);\r\n    });\r\n\r\n    removeBtn.addEventListener(\"click\", (event) => {\r\n        event.target.parentNode.parentNode.removeChild(event.target.parentNode);\r\n        removeProductItem(productKey, userId);\r\n    });\r\n\r\n    viewTableEl.appendChild(itemInfo);\r\n};\r\n\r\nconst renderProductItems = async () => {\r\n    viewTableEl.innerText = \"\";\r\n    const productItems = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestGet)(\"/hello/productItems\");\r\n\r\n    console.log(\"데이터 목록 출력->\", productItems);\r\n    productItems.map(convertParms).forEach((item) => renderProductItem({ ...item, viewTableEl }));\r\n};\r\n\r\nconst init = () => {\r\n    renderProductItems();\r\n\r\n    if (!(0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\")) {\r\n        alert(\"로그인 부탁드립니다\");\r\n        return;\r\n    }\r\n\r\n    const submitBtn = document.querySelector(\".submit-btn\");\r\n    submitBtn.addEventListener(\"click\", createProductInfo);\r\n};\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    init();\r\n});\r\n\n\n//# sourceURL=webpack://clientsrc/./main.js?");

/***/ }),

/***/ "./util.js":
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createBtn\": () => (/* binding */ createBtn),\n/* harmony export */   \"createEl\": () => (/* binding */ createEl),\n/* harmony export */   \"cutDateFull\": () => (/* binding */ cutDateFull),\n/* harmony export */   \"cutDateMonth\": () => (/* binding */ cutDateMonth),\n/* harmony export */   \"delete_cookie\": () => (/* binding */ delete_cookie),\n/* harmony export */   \"formatDate\": () => (/* binding */ formatDate),\n/* harmony export */   \"get_cookie\": () => (/* binding */ get_cookie)\n/* harmony export */ });\n/*엘리먼트 생성, 클래스 이름 부여*/\r\nconst createEl = (elKind, className = \"\") => {\r\n    const el = document.createElement(elKind);\r\n    el.className = className;\r\n\r\n    return el;\r\n};\r\n\r\nconst createBtn = (className = \"\", text = \"\") => {\r\n    const el = document.createElement(\"button\");\r\n    el.className = className;\r\n    el.innerText = text;\r\n    return el;\r\n};\r\n\r\n//쿠키 값 가져오는 함수\r\nconst get_cookie = (name) => {\r\n    var value = document.cookie.match(\"(^|;) ?\" + name + \"=([^;]*)(;|$)\");\r\n    return value ? value[2] : null;\r\n};\r\n\r\n//쿠키 삭제하는 함수\r\nconst delete_cookie = (name) => {\r\n    document.cookie = encodeURIComponent(name) + \"=; expires=Thu, 01 JAN 1999 00:00:10 GMT\";\r\n};\r\n\r\nconst cutDateFull = (date) => {\r\n    const [year, month, day] = date.split(\"-\");\r\n    return [Number(year), Number(month), Number(day)];\r\n};\r\n\r\nconst cutDateMonth = (date) => {\r\n    const [year, month] = date.split(\"-\");\r\n    return [Number(year), Number(month)];\r\n};\r\n\r\n//#C DateTime 객체로 넘어온 데이터 변환\r\nconst formatDate = (date) => {\r\n    return new Date(parseInt(/-?\\d+/.exec(date)[0])).toISOString().split(\"T\")[0];\r\n};\r\n\n\n//# sourceURL=webpack://clientsrc/./util.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;