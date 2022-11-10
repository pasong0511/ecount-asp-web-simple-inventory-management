import { requestGet, requestPost, requestDelete } from "./api.js";
import { createEl, createBtn, get_cookie } from "./util.js";

// //Product.products
// //Product.length

// class Product {
//     // static products = [];

//     // static get length() {
//     //     return this.products.length;
//     // }

//     // static addProduct(product) {
//     //     this.products.push(product);
//     // }

//     constructor() {
//         this.name = "";
//         this.type = "RawMaterial";
//         this.safeQuantity = "0";
//         this.userId = "";

//         //Product.addProduct(this);
//     }

//     setUSetId() {
//         this.userId = get_cookie("id");
//         return this.userId;
//     }

//     create(name, type, safeQuantity) {
//         const productContent = {
//             Name: this.name,
//             Type: this.type,
//             SafeQuantity: this.safeQuantity === "" ? 0 : productSafeQuantity,
//             UserId: this.userId,
//         };

//         const res = requestPost("/hello/product", productContent);
//         console.log("post 결과", res);
//     }

//     update() {}

//     delete() {}

//     render() {}
// }

const viewTableEl = document.querySelector(".productResults tbody");

const createProductInfo = async () => {
    const productName = document.querySelector(".userInputInfo input").value;
    const productType = document.querySelector(
        "input[name='product-type']:checked"
    ).value;
    const productSafeQuantity = document.querySelector(".safe-quantity").value;
    const userId = get_cookie("id");

    const productContent = {
        Name: productName,
        Type: productType,
        SafeQuantity: productSafeQuantity === "" ? 0 : productSafeQuantity,
        UserId: userId,
    };

    const response = await requestPost("/hello/product", productContent);
    const productKey = response.key;
    console.log("post 결과", productKey);

    renderProductItem({
        userId,
        productKey,
        viewTableEl,
        productName,
        productType,
        productSafeQuantity,
    });
};

//매개변수 맞춰주기
const convertParms = ({ Key, Name, Type, userId, SafeQuantity }) => {
    return {
        userId,
        productKey: Key,
        productName: Name,
        productType: Type,
        productSafeQuantity: SafeQuantity,
    };
};

const renderProductItem = ({
    userId,
    productKey,
    viewTableEl,
    productName,
    productType,
    productSafeQuantity,
}) => {
    const itemInfo = createEl("tr", "product-item");
    const infoName = document.createElement("td");
    const infoType = document.createElement("td");
    const infoSafe = document.createElement("td");
    const modifyBtn = createBtn("modify-btn", "수정");
    const removeBtn = createBtn("remove-btn", "삭제");

    itemInfo.setAttribute("data-key", productKey);
    itemInfo.setAttribute("data-user", userId);

    infoName.innerText = productName;
    infoType.innerText = productType;
    infoSafe.innerText = productSafeQuantity === "" ? 0 : productSafeQuantity;

    itemInfo.appendChild(infoName);
    itemInfo.appendChild(infoType);
    itemInfo.appendChild(infoSafe);
    itemInfo.appendChild(modifyBtn);
    itemInfo.appendChild(removeBtn);

    modifyBtn.addEventListener("click", modifyProductItem);
    removeBtn.addEventListener("click", (event) => {
        console.log("삭제버튼", event.target.parentNode);
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        removeProductItem(productKey, userId);
    });

    viewTableEl.appendChild(itemInfo);
};

const modifyProductItem = () => {
    console.log("수정");
};

const removeProductItem = async (productKey, userId) => {
    console.log("삭제", productKey, userId);

    const content = {
        Key: productKey,
        userId: userId,
    };

    const response = await requestDelete("/hello/ProductDelete", content);
    console.log("삭제후 -> ", response);
    renderProductItems();
};

const renderProductItems = async () => {
    viewTableEl.innerText = "";

    const productItems = await requestGet("/hello/productItems");

    console.log("들고온 데이터 출력->", productItems);
    productItems
        .map(convertParms)
        .forEach((item) => renderProductItem({ ...item, viewTableEl }));
};

const init = () => {
    console.log("자바스크립트 메인");
    //처음 화면 로딩하면 등록되어있는 데이터를 json으로 가져오자
    renderProductItems();

    //버튼 눌러서 등록
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", createProductInfo);
};

document.addEventListener("DOMContentLoaded", async () => {
    init();
});

// npm init
// npm install webpack webpack-cli --save-dev
// console.log("hello~");

// document.addEventListener("DOMContentLoaded", async () => {
//     const response = await fetch("/hello/data");
//     const list = await response.json();
//     alert(list);

//     await fetch("/hello/data", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ Content: "개발하기 " }),
//     })

//     const response2 = await fetch("/hello/data");
//     const list2 = await response2.json();
//     alert(list2);
// })

//post 테스트
// document.addEventListener("DOMContentLoaded", async () => {
//     const response = await fetch("/hello/data");
//     const list = await response.json();
//     alert(list);

//     await fetch("/hello/data", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             productName: "박송희",
//             ProductType: "백수예정자"
//         }),
//     })

//     const response2 = await fetch("/hello/data");
//     const list2 = await response2.json();
//     alert(list2);
// })
