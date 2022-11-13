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

/***/ "./sale.js":
/*!*****************!*\
  !*** ./sale.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./util.js\");\n/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants.js */ \"./constants.js\");\n/* harmony import */ var _selectoprion_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectoprion.js */ \"./selectoprion.js\");\n\r\n\r\n\r\n\r\n\r\nconst viewTableEl = document.querySelector(\".product-results tbody\");\r\n\r\nconst createClientInfo = async () => {\r\n    const clientName = document.querySelector(\".sale-client-name\").value;\r\n    const productName = document.querySelector(\".sale-product-name\").value;\r\n    const productQuantity = document.querySelector(\".sale-product-quantity\").value;\r\n    const productDate = document.querySelector(\".sale-product-date\").value;\r\n\r\n    const [year, month, day] = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.cutDateFull)(productDate);\r\n\r\n    const userId = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\");\r\n    if (!userId) {\r\n        alert(\"로그인 부탁드립니다\");\r\n        return;\r\n    }\r\n\r\n    const content = {\r\n        ClientName: clientName,\r\n        ProductName: productName,\r\n        Quantity: productQuantity,\r\n        Year: year,\r\n        Month: month,\r\n        Day: day,\r\n        UserId: userId,\r\n    };\r\n\r\n    console.log(content);\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPostToJson)(\"/Sale/Sale\", content);\r\n\r\n    if (res) {\r\n        console.log(res);\r\n        alert(\"상품이 등록되었습니다.\");\r\n    }\r\n\r\n    const saleKey = res.key;\r\n    if (!saleKey) {\r\n        alert(\"상품 등록이 실패했습니다.\");\r\n    }\r\n\r\n    renderSaleItems();\r\n};\r\n\r\nconst removeSaleItem = async (saleKey, userId) => {\r\n    const content = {\r\n        Key: saleKey,\r\n        UserId: userId,\r\n    };\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestDelete)(\"/Sale/SaleDelete\", content);\r\n\r\n    if (res.ok) {\r\n        alert(\"데이터 삭제 완료\");\r\n    }\r\n\r\n    renderSaleItems();\r\n};\r\n\r\n//서버로 수정 정보 전달\r\nconst requestModifyInfo = async ({ userId, saleKey, clickKey, modifyClientName, modifyProductName, productKey, modifySaleQuantity, modifySaleDate }) => {\r\n    console.log(modifySaleDate);\r\n    const [year, month, day] = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.cutDateFull)(modifySaleDate.toString());\r\n\r\n    const content = {\r\n        ClientName: modifyClientName,\r\n        ClientKey: clickKey,\r\n        ProductName: modifyProductName,\r\n        ProductKey: productKey,\r\n        Quantity: modifySaleQuantity === \"\" ? 0 : Number(modifySaleQuantity),\r\n        Year: year,\r\n        Month: month,\r\n        Day: day,\r\n        UserId: userId,\r\n        Key: saleKey,\r\n    };\r\n\r\n    const result = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPost)(\"/Sale/SaleModify\", content);\r\n\r\n    if (result.ok) {\r\n        alert(\"수정 성공\");\r\n        renderSaleItems();\r\n    }\r\n};\r\n\r\n//수정 버튼 누르면 사용자가 입력했던 정보 가져옴\r\nconst modifyInfoRender = ({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey }) => {\r\n    const modifyClientNameEl = document.querySelector(\".modify-client-name\");\r\n    const modifyProductNameEl = document.querySelector(\".modify-product-name\");\r\n    const modifyProductQuantityEl = document.querySelector(\".modify-sale-quantity\");\r\n    const modifyProductDateEl = document.querySelector(\".modify-sale-date\");\r\n\r\n    modifyClientNameEl.value = clientName;\r\n    modifyProductNameEl.value = productName;\r\n    modifyProductQuantityEl.value = quantity;\r\n    modifyProductDateEl.value = dateTime;\r\n};\r\n\r\n//아이템에서 수정 버튼 클릭\r\nconst modifySaleItem = ({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey }) => {\r\n    modifyInfoRender({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey });\r\n\r\n    const submitBtn = document.querySelector(\".modify-submit-btn\");\r\n\r\n    // 버그수정 -> 기존 이벤트 등록을 함수로 저장\r\n    const handleClick = () => {\r\n        const modifyClientName = document.querySelector(\".modify-client-name\").value;\r\n        const modifyProductName = document.querySelector(\".modify-product-name\").value;\r\n        const modifySaleQuantity = document.querySelector(\".modify-sale-quantity\").value;\r\n        const modifySaleDate = document.querySelector(\".modify-sale-date\").value;\r\n\r\n        console.log(\"난장판\", modifySaleDate);\r\n\r\n        requestModifyInfo({\r\n            userId,\r\n            saleKey,\r\n            clickKey,\r\n            modifyClientName,\r\n            modifyProductName,\r\n            productKey,\r\n            modifySaleQuantity,\r\n            modifySaleDate,\r\n        });\r\n    };\r\n\r\n    //버그 수정 -> 이벤트를 등록하고 이벤트 제거 함수를 반환\r\n    submitBtn.addEventListener(\"click\", handleClick);\r\n    return () => submitBtn.removeEventListener(\"click\", handleClick);\r\n};\r\n\r\nlet prevModifyEvent = null;\r\nconst renderSaleItem = (clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey) => {\r\n    console.log(clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey);\r\n\r\n    const itemInfo = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createEl)(\"tr\", \"client-item\");\r\n    const infoClientName = document.createElement(\"td\");\r\n    const infoClientKey = document.createElement(\"td\");\r\n    const infoProductName = document.createElement(\"td\");\r\n    const infoProductType = document.createElement(\"td\");\r\n    const infoProductQuantity = document.createElement(\"td\");\r\n    const infoDateTime = document.createElement(\"td\");\r\n\r\n    const modifyBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"modify-btn\", \"수정\");\r\n    const removeBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"remove-btn\", \"삭제\");\r\n\r\n    itemInfo.setAttribute(\"data-client-key\", clickKey);\r\n    itemInfo.setAttribute(\"data-product-key\", productKey);\r\n    itemInfo.setAttribute(\"data-sale-key\", saleKey);\r\n\r\n    infoClientName.innerText = clientName;\r\n    infoClientKey.innerText = clickKey.split(\"-\")[0];\r\n    infoProductName.innerText = productName;\r\n    infoProductType.innerText = _constants_js__WEBPACK_IMPORTED_MODULE_2__.PRODUCT_TYPE[productType];\r\n    infoProductQuantity.innerText = quantity;\r\n    infoDateTime.innerText = dateTime;\r\n\r\n    itemInfo.appendChild(infoClientKey);\r\n    itemInfo.appendChild(infoClientName);\r\n    itemInfo.appendChild(infoProductName);\r\n    itemInfo.appendChild(infoProductType);\r\n    itemInfo.appendChild(infoProductQuantity);\r\n    itemInfo.appendChild(infoDateTime);\r\n\r\n    itemInfo.appendChild(modifyBtn);\r\n    itemInfo.appendChild(removeBtn);\r\n\r\n    modifyBtn.addEventListener(\"click\", () => {\r\n        if (prevModifyEvent) {\r\n            prevModifyEvent();\r\n        }\r\n        console.log(\"클릭했을때 넘어온 값\", clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey);\r\n        prevModifyEvent = modifySaleItem({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey });\r\n    });\r\n\r\n    removeBtn.addEventListener(\"click\", (event) => {\r\n        console.log(\"클릭했을때 넘어온 값\", saleKey, userId);\r\n        event.target.parentNode.parentNode.removeChild(event.target.parentNode);\r\n        removeSaleItem(saleKey, userId);\r\n    });\r\n\r\n    viewTableEl.appendChild(itemInfo);\r\n};\r\n\r\nconst renderUserSelectOption = (res) => {\r\n    const selectClient = document.querySelector(\".sale-client-name\");\r\n    const selectProduct = document.querySelector(\".sale-product-name\");\r\n\r\n    const selectModifyClient = document.querySelector(\".modify-client-name\");\r\n    const selectModifyProduct = document.querySelector(\".modify-product-name\");\r\n\r\n    (0,_selectoprion_js__WEBPACK_IMPORTED_MODULE_3__.createSelectOption)(res.Clients, selectClient);\r\n    (0,_selectoprion_js__WEBPACK_IMPORTED_MODULE_3__.createSelectOption)(res.Clients, selectModifyClient);\r\n\r\n    (0,_selectoprion_js__WEBPACK_IMPORTED_MODULE_3__.createSelectOption)(res.Products, selectProduct);\r\n    (0,_selectoprion_js__WEBPACK_IMPORTED_MODULE_3__.createSelectOption)(res.Products, selectModifyProduct);\r\n};\r\n\r\nconst fetchUserArticles = async () => {\r\n    const res = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPostToJson)(\"/Login/Article\", { UserId: (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\") });\r\n    renderUserSelectOption(res);\r\n};\r\n\r\nconst renderSaleItems = async () => {\r\n    fetchUserArticles();\r\n    viewTableEl.innerText = \"\";\r\n    const saletems = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestGet)(\"/Sale/SaleItems\");\r\n    console.log(\"데이터 목록 출력->\", saletems);\r\n\r\n    saletems.forEach(({ Client, Product, Quantity, DateTime, UserId, Key }) => {\r\n        renderSaleItem(Client.Name, Client.Key, Product.Key, Product.Name, Product.Type, Quantity, (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(DateTime), UserId, Key);\r\n    });\r\n};\r\n\r\nconst init = () => {\r\n    renderSaleItems();\r\n\r\n    if (!(0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\")) {\r\n        alert(\"로그인 부탁드립니다\");\r\n        return;\r\n    }\r\n\r\n    const nowDate = document.querySelector(\".sale-product-date\");\r\n    nowDate.value = new Date().toISOString().substring(0, 10);\r\n\r\n    const submitBtn = document.querySelector(\".submit-btn\");\r\n    submitBtn.addEventListener(\"click\", createClientInfo);\r\n};\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    init();\r\n});\r\n\n\n//# sourceURL=webpack://clientsrc/./sale.js?");

/***/ }),

/***/ "./selectoprion.js":
/*!*************************!*\
  !*** ./selectoprion.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createSelectOption\": () => (/* binding */ createSelectOption)\n/* harmony export */ });\nconst createSelectOption = (article, selectEL) => {\r\n    article.forEach((item) => {\r\n        const optionEl = document.createElement(\"option\");\r\n        optionEl.value = item;\r\n        optionEl.innerText = item;\r\n        selectEL.append(optionEl);\r\n    });\r\n};\r\n\n\n//# sourceURL=webpack://clientsrc/./selectoprion.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./sale.js");
/******/ 	
/******/ })()
;