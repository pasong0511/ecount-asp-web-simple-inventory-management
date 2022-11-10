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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"requestDelete\": () => (/* binding */ requestDelete),\n/* harmony export */   \"requestGet\": () => (/* binding */ requestGet),\n/* harmony export */   \"requestPost\": () => (/* binding */ requestPost)\n/* harmony export */ });\nconst requestGet = async (url) => {\r\n    const res = await fetch(url);\r\n\r\n    if (res.ok) {\r\n        const json = await res.json();\r\n        return json;\r\n    }\r\n\r\n    throw new Error(\"요청에 실패함\");\r\n};\r\n\r\nconst requestPost = async (url, data) => {\r\n    const postOption = {\r\n        method: \"POST\",\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n        },\r\n        body: JSON.stringify(data),\r\n    };\r\n    const res = await fetch(url, postOption);\r\n\r\n    if (res.ok) {\r\n        const json = await res.json();\r\n        return json;\r\n    }\r\n\r\n    throw new Error(\"요청에 실패함\");\r\n};\r\n\r\nconst requestDelete = async (url, data) => {\r\n    const postOption = {\r\n        method: \"POST\",\r\n        headers: {\r\n            \"Content-Type\": \"application/json\",\r\n        },\r\n        body: JSON.stringify(data),\r\n    };\r\n    const res = await fetch(url, postOption);\r\n\r\n    if (res.ok) {\r\n        return res.ok;\r\n        //const json = await res.json();\r\n        //return json;\r\n    }\r\n\r\n    throw new Error(\"요청에 실패함\");\r\n};\r\n\n\n//# sourceURL=webpack://clientsrc/./api.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util.js */ \"./util.js\");\n\r\n\r\n\r\n// //Product.products\r\n// //Product.length\r\n\r\n// class Product {\r\n//     // static products = [];\r\n\r\n//     // static get length() {\r\n//     //     return this.products.length;\r\n//     // }\r\n\r\n//     // static addProduct(product) {\r\n//     //     this.products.push(product);\r\n//     // }\r\n\r\n//     constructor() {\r\n//         this.name = \"\";\r\n//         this.type = \"RawMaterial\";\r\n//         this.safeQuantity = \"0\";\r\n//         this.userId = \"\";\r\n\r\n//         //Product.addProduct(this);\r\n//     }\r\n\r\n//     setUSetId() {\r\n//         this.userId = get_cookie(\"id\");\r\n//         return this.userId;\r\n//     }\r\n\r\n//     create(name, type, safeQuantity) {\r\n//         const productContent = {\r\n//             Name: this.name,\r\n//             Type: this.type,\r\n//             SafeQuantity: this.safeQuantity === \"\" ? 0 : productSafeQuantity,\r\n//             UserId: this.userId,\r\n//         };\r\n\r\n//         const res = requestPost(\"/hello/product\", productContent);\r\n//         console.log(\"post 결과\", res);\r\n//     }\r\n\r\n//     update() {}\r\n\r\n//     delete() {}\r\n\r\n//     render() {}\r\n// }\r\n\r\nconst viewTableEl = document.querySelector(\".productResults tbody\");\r\n\r\nconst createProductInfo = async () => {\r\n    const productName = document.querySelector(\".userInputInfo input\").value;\r\n    const productType = document.querySelector(\r\n        \"input[name='product-type']:checked\"\r\n    ).value;\r\n    const productSafeQuantity = document.querySelector(\".safe-quantity\").value;\r\n    const userId = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.get_cookie)(\"id\");\r\n\r\n    const productContent = {\r\n        Name: productName,\r\n        Type: productType,\r\n        SafeQuantity: productSafeQuantity === \"\" ? 0 : productSafeQuantity,\r\n        UserId: userId,\r\n    };\r\n\r\n    const response = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestPost)(\"/hello/product\", productContent);\r\n    const productKey = response.key;\r\n    console.log(\"post 결과\", productKey);\r\n\r\n    renderProductItem({\r\n        userId,\r\n        productKey,\r\n        viewTableEl,\r\n        productName,\r\n        productType,\r\n        productSafeQuantity,\r\n    });\r\n};\r\n\r\n//매개변수 맞춰주기\r\nconst convertParms = ({ Key, Name, Type, userId, SafeQuantity }) => {\r\n    return {\r\n        userId,\r\n        productKey: Key,\r\n        productName: Name,\r\n        productType: Type,\r\n        productSafeQuantity: SafeQuantity,\r\n    };\r\n};\r\n\r\nconst renderProductItem = ({\r\n    userId,\r\n    productKey,\r\n    viewTableEl,\r\n    productName,\r\n    productType,\r\n    productSafeQuantity,\r\n}) => {\r\n    const itemInfo = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createEl)(\"tr\", \"product-item\");\r\n    const infoName = document.createElement(\"td\");\r\n    const infoType = document.createElement(\"td\");\r\n    const infoSafe = document.createElement(\"td\");\r\n    const modifyBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"modify-btn\", \"수정\");\r\n    const removeBtn = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__.createBtn)(\"remove-btn\", \"삭제\");\r\n\r\n    itemInfo.setAttribute(\"data-key\", productKey);\r\n    itemInfo.setAttribute(\"data-user\", userId);\r\n\r\n    infoName.innerText = productName;\r\n    infoType.innerText = productType;\r\n    infoSafe.innerText = productSafeQuantity === \"\" ? 0 : productSafeQuantity;\r\n\r\n    itemInfo.appendChild(infoName);\r\n    itemInfo.appendChild(infoType);\r\n    itemInfo.appendChild(infoSafe);\r\n    itemInfo.appendChild(modifyBtn);\r\n    itemInfo.appendChild(removeBtn);\r\n\r\n    modifyBtn.addEventListener(\"click\", modifyProductItem);\r\n    removeBtn.addEventListener(\"click\", (event) => {\r\n        console.log(\"삭제버튼\", event.target.parentNode);\r\n        event.target.parentNode.parentNode.removeChild(event.target.parentNode);\r\n        removeProductItem(productKey, userId);\r\n    });\r\n\r\n    viewTableEl.appendChild(itemInfo);\r\n};\r\n\r\nconst modifyProductItem = () => {\r\n    console.log(\"수정\");\r\n};\r\n\r\nconst removeProductItem = async (productKey, userId) => {\r\n    console.log(\"삭제\", productKey, userId);\r\n\r\n    const content = {\r\n        Key: productKey,\r\n        userId: userId,\r\n    };\r\n\r\n    const response = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestDelete)(\"/hello/ProductDelete\", content);\r\n    console.log(\"삭제후 -> \", response);\r\n    renderProductItems();\r\n};\r\n\r\nconst renderProductItems = async () => {\r\n    viewTableEl.innerText = \"\";\r\n\r\n    const productItems = await (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.requestGet)(\"/hello/productItems\");\r\n\r\n    console.log(\"들고온 데이터 출력->\", productItems);\r\n    productItems\r\n        .map(convertParms)\r\n        .forEach((item) => renderProductItem({ ...item, viewTableEl }));\r\n};\r\n\r\nconst init = () => {\r\n    console.log(\"자바스크립트 메인\");\r\n    //처음 화면 로딩하면 등록되어있는 데이터를 json으로 가져오자\r\n    renderProductItems();\r\n\r\n    //버튼 눌러서 등록\r\n    const submitBtn = document.querySelector(\".submit-btn\");\r\n    submitBtn.addEventListener(\"click\", createProductInfo);\r\n};\r\n\r\ndocument.addEventListener(\"DOMContentLoaded\", async () => {\r\n    init();\r\n});\r\n\r\n// npm init\r\n// npm install webpack webpack-cli --save-dev\r\n// console.log(\"hello~\");\r\n\r\n// document.addEventListener(\"DOMContentLoaded\", async () => {\r\n//     const response = await fetch(\"/hello/data\");\r\n//     const list = await response.json();\r\n//     alert(list);\r\n\r\n//     await fetch(\"/hello/data\", {\r\n//         method: \"POST\",\r\n//         headers: {\r\n//             \"Content-Type\": \"application/json\"\r\n//         },\r\n//         body: JSON.stringify({ Content: \"개발하기 \" }),\r\n//     })\r\n\r\n//     const response2 = await fetch(\"/hello/data\");\r\n//     const list2 = await response2.json();\r\n//     alert(list2);\r\n// })\r\n\r\n//post 테스트\r\n// document.addEventListener(\"DOMContentLoaded\", async () => {\r\n//     const response = await fetch(\"/hello/data\");\r\n//     const list = await response.json();\r\n//     alert(list);\r\n\r\n//     await fetch(\"/hello/data\", {\r\n//         method: \"POST\",\r\n//         headers: {\r\n//             \"Content-Type\": \"application/json\"\r\n//         },\r\n//         body: JSON.stringify({\r\n//             productName: \"박송희\",\r\n//             ProductType: \"백수예정자\"\r\n//         }),\r\n//     })\r\n\r\n//     const response2 = await fetch(\"/hello/data\");\r\n//     const list2 = await response2.json();\r\n//     alert(list2);\r\n// })\r\n\n\n//# sourceURL=webpack://clientsrc/./main.js?");

/***/ }),

/***/ "./util.js":
/*!*****************!*\
  !*** ./util.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"createBtn\": () => (/* binding */ createBtn),\n/* harmony export */   \"createEl\": () => (/* binding */ createEl),\n/* harmony export */   \"delete_cookie\": () => (/* binding */ delete_cookie),\n/* harmony export */   \"get_cookie\": () => (/* binding */ get_cookie)\n/* harmony export */ });\n/*엘리먼트 생성, 클래스 이름 부여*/\r\nconst createEl = (elKind, className = \"\") => {\r\n    const el = document.createElement(elKind);\r\n    el.className = className;\r\n\r\n    return el;\r\n};\r\n\r\nconst createBtn = (className = \"\", text = \"\") => {\r\n    const el = document.createElement(\"button\");\r\n    el.className = className;\r\n    el.innerText = text;\r\n    return el;\r\n};\r\n\r\n//쿠키 값 가져오는 함수\r\nconst get_cookie = (name) => {\r\n    var value = document.cookie.match(\"(^|;) ?\" + name + \"=([^;]*)(;|$)\");\r\n    return value ? value[2] : null;\r\n};\r\n\r\n//쿠키 삭제하는 함수\r\nconst delete_cookie = (name) => {\r\n    document.cookie =\r\n        encodeURIComponent(name) + \"=; expires=Thu, 01 JAN 1999 00:00:10 GMT\";\r\n};\r\n\n\n//# sourceURL=webpack://clientsrc/./util.js?");

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