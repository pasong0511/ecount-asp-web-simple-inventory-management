import { requestGet, requestPost, requestPostToJson, requestDelete } from "./api.js";
import { createEl, createBtn, get_cookie, cutDateFull, formatDate } from "./util.js";
import { PRODUCT_TYPE } from "./constants.js";
import { createSelectOption } from "./selectoprion.js";

const viewTableEl = document.querySelector(".product-results tbody");

const createClientInfo = async () => {
    const clientName = document.querySelector(".sale-client-name").value;
    const productName = document.querySelector(".sale-product-name").value;
    const productQuantity = document.querySelector(".sale-product-quantity").value;
    const productDate = document.querySelector(".sale-product-date").value;

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
    const res = await requestPostToJson("/Sale/Sale", content);

    if (res) {
        console.log(res);
        alert("상품이 등록되었습니다.");
    }

    const saleKey = res.key;
    if (!saleKey) {
        alert("상품 등록이 실패했습니다.");
    }

    renderSaleItems();
};

const removeSaleItem = async (saleKey, userId) => {
    const content = {
        Key: saleKey,
        UserId: userId,
    };
    const res = await requestDelete("/Sale/SaleDelete", content);

    if (res.ok) {
        alert("데이터 삭제 완료");
    }

    renderSaleItems();
};

//서버로 수정 정보 전달
const requestModifyInfo = async ({ userId, saleKey, clickKey, modifyClientName, modifyProductName, productKey, modifySaleQuantity, modifySaleDate }) => {
    console.log(modifySaleDate);
    const [year, month, day] = cutDateFull(modifySaleDate.toString());

    const content = {
        ClientName: modifyClientName,
        ClientKey: clickKey,
        ProductName: modifyProductName,
        ProductKey: productKey,
        Quantity: modifySaleQuantity === "" ? 0 : Number(modifySaleQuantity),
        Year: year,
        Month: month,
        Day: day,
        UserId: userId,
        Key: saleKey,
    };

    const result = await requestPost("/Sale/SaleModify", content);

    if (result.ok) {
        alert("수정 성공");
        renderSaleItems();
    }
};

//수정 버튼 누르면 사용자가 입력했던 정보 가져옴
const modifyInfoRender = ({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey }) => {
    const modifyClientNameEl = document.querySelector(".modify-client-name");
    const modifyProductNameEl = document.querySelector(".modify-product-name");
    const modifyProductQuantityEl = document.querySelector(".modify-sale-quantity");
    const modifyProductDateEl = document.querySelector(".modify-sale-date");

    modifyClientNameEl.value = clientName;
    modifyProductNameEl.value = productName;
    modifyProductQuantityEl.value = quantity;
    modifyProductDateEl.value = dateTime;
};

//아이템에서 수정 버튼 클릭
const modifySaleItem = ({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey }) => {
    modifyInfoRender({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey });

    const submitBtn = document.querySelector(".modify-submit-btn");

    // 버그수정 -> 기존 이벤트 등록을 함수로 저장
    const handleClick = () => {
        const modifyClientName = document.querySelector(".modify-client-name").value;
        const modifyProductName = document.querySelector(".modify-product-name").value;
        const modifySaleQuantity = document.querySelector(".modify-sale-quantity").value;
        const modifySaleDate = document.querySelector(".modify-sale-date").value;

        console.log("난장판", modifySaleDate);

        requestModifyInfo({
            userId,
            saleKey,
            clickKey,
            modifyClientName,
            modifyProductName,
            productKey,
            modifySaleQuantity,
            modifySaleDate,
        });
    };

    //버그 수정 -> 이벤트를 등록하고 이벤트 제거 함수를 반환
    submitBtn.addEventListener("click", handleClick);
    return () => submitBtn.removeEventListener("click", handleClick);
};

let prevModifyEvent = null;
const renderSaleItem = (clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey) => {
    console.log(clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey);

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
    itemInfo.setAttribute("data-sale-key", saleKey);

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
        if (prevModifyEvent) {
            prevModifyEvent();
        }
        console.log("클릭했을때 넘어온 값", clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey);
        prevModifyEvent = modifySaleItem({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, saleKey });
    });

    removeBtn.addEventListener("click", (event) => {
        console.log("클릭했을때 넘어온 값", saleKey, userId);
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        removeSaleItem(saleKey, userId);
    });

    viewTableEl.appendChild(itemInfo);
};

const renderUserSelectOption = (res) => {
    const selectClient = document.querySelector(".sale-client-name");
    const selectProduct = document.querySelector(".sale-product-name");

    const selectModifyClient = document.querySelector(".modify-client-name");
    const selectModifyProduct = document.querySelector(".modify-product-name");

    createSelectOption(res.Clients, selectClient);
    createSelectOption(res.Clients, selectModifyClient);

    createSelectOption(res.Products, selectProduct);
    createSelectOption(res.Products, selectModifyProduct);
};

const fetchUserArticles = async () => {
    const res = await requestPostToJson("/Login/Article", { UserId: get_cookie("id") });
    renderUserSelectOption(res);
};

const renderSaleItems = async () => {
    fetchUserArticles();
    viewTableEl.innerText = "";
    const saletems = await requestGet("/Sale/SaleItems");
    console.log("데이터 목록 출력->", saletems);

    saletems.forEach(({ Client, Product, Quantity, DateTime, UserId, Key }) => {
        renderSaleItem(Client.Name, Client.Key, Product.Key, Product.Name, Product.Type, Quantity, formatDate(DateTime), UserId, Key);
    });
};

const init = () => {
    renderSaleItems();

    if (!get_cookie("id")) {
        alert("로그인 부탁드립니다");
        return;
    }

    const nowDate = document.querySelector(".sale-product-date");
    nowDate.value = new Date().toISOString().substring(0, 10);

    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", createClientInfo);
};

document.addEventListener("DOMContentLoaded", () => {
    init();
});
