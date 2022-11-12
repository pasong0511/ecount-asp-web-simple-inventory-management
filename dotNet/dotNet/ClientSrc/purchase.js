import { requestGet, requestPost, requestPostToJson, requestDelete } from "./api.js";
import { createEl, createBtn, get_cookie, cutDateFull, formatDate } from "./util.js";
import { PRODUCT_TYPE } from "./constants.js";

const viewTableEl = document.querySelector(".product-results tbody");

const createClientInfo = async () => {
    const clientName = document.querySelector(".purchase-client-name").value;
    const productName = document.querySelector(".purchase-product-name").value;
    const productQuantity = document.querySelector(".purchase-product-quantity").value;
    const productDate = document.querySelector(".purchase-product-date").value;

    const [year, month, day] = cutDateFull(productDate);

    const userId = get_cookie("id");
    if (!userId) {
        alert("로그인 부탁드립니다");
        return;
    }

    const content = {
        ClientName: clientName,
        ProductName: productName,
        Quantity: productQuantity,
        Year: year,
        Month: month,
        Day: day,
        UserId: userId,
    };

    console.log(content);
    const res = await requestPostToJson("/Purchase/Purchase", content);

    if (res) {
        console.log(res);
        alert("상품이 등록되었습니다.");
    }

    const purchaseKey = res.key;
    if (!purchaseKey) {
        alert("상품 등록이 실패했습니다.");
    }

    renderPurchaseItems();
};

const removePurchaseItem = async (purchaseKey, userId) => {
    const content = {
        Key: purchaseKey,
        UserId: userId,
    };
    const res = await requestDelete("/Purchase/PurchaseDelete", content);

    if (res.ok) {
        alert("데이터 삭제 완료");
    }

    renderPurchaseItems();
};

const renderPurchaseItem = (clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey) => {
    //console.log(clientName, clickKey, productName, productType, dateTime);

    const itemInfo = createEl("tr", "client-item");
    const infoClientName = document.createElement("td");
    const infoClientKey = document.createElement("td");
    const infoProductName = document.createElement("td");
    const infoProductType = document.createElement("td");
    const infoProductQuantity = document.createElement("td");
    const infoDateTime = document.createElement("td");

    const modifyBtn = createBtn("modify-btn", "수정");
    const removeBtn = createBtn("remove-btn", "삭제");

    itemInfo.setAttribute("data-client-key", clickKey);
    itemInfo.setAttribute("data-product-key", productKey);
    itemInfo.setAttribute("data-purchase-key", purchaseKey);

    infoClientName.innerText = clientName;
    infoClientKey.innerText = clickKey.split("-")[0];
    infoProductName.innerText = productName;
    infoProductType.innerText = PRODUCT_TYPE[productType];
    infoProductQuantity.innerText = quantity;
    infoDateTime.innerText = dateTime;

    itemInfo.appendChild(infoClientKey);
    itemInfo.appendChild(infoClientName);
    itemInfo.appendChild(infoProductName);
    itemInfo.appendChild(infoProductType);
    itemInfo.appendChild(infoProductQuantity);
    itemInfo.appendChild(infoDateTime);

    itemInfo.appendChild(modifyBtn);
    itemInfo.appendChild(removeBtn);

    modifyBtn.addEventListener("click", () => {
        console.log("클릭했을때 넘어온 값", purchaseKey, userId);
        //modifyProductItem(productName, productType, productKey, productSafeQuantity, userId);
    });

    removeBtn.addEventListener("click", (event) => {
        console.log("클릭했을때 넘어온 값", purchaseKey, userId);
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        removePurchaseItem(purchaseKey, userId);
    });

    viewTableEl.appendChild(itemInfo);
};

const renderPurchaseItems = async () => {
    viewTableEl.innerText = "";
    const purchasetems = await requestGet("/Purchase/PurchaseItems");
    console.log("데이터 목록 출력->", purchasetems);

    purchasetems.forEach(({ Client, Product, Quantity, DateTime, UserId, Key }) => {
        //console.log("프론트 문제냐?", Client, Product, Quantity, formatDate(DateTime), UserId);
        //console.log(Client.Name, Client.Key, Product.Name, Product.Type, formatDate(DateTime));
        renderPurchaseItem(Client.Name, Client.Key, Product.Key, Product.Name, Product.Type, Quantity, formatDate(DateTime), UserId, Key);
    });
};

const init = () => {
    renderPurchaseItems();

    if (!get_cookie("id")) {
        alert("로그인 부탁드립니다");
        return;
    }

    const nowDate = document.querySelector(".purchase-product-date");
    nowDate.value = new Date().toISOString().substring(0, 10);

    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", createClientInfo);
};

document.addEventListener("DOMContentLoaded", () => {
    init();
});
