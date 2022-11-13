import { requestGet, requestPost, requestPostToJson, requestDelete } from "./api.js";
import { createEl, createBtn, get_cookie, cutDateFull, formatDate } from "./util.js";
import { PRODUCT_TYPE } from "./constants.js";
import { createSelectOption, removeAllOptions } from "./selectoprion.js";

const viewTableEl = document.querySelector(".product-results tbody");

const createClientInfo = async () => {
    const clientName = document.querySelector(".purchase-client-name").value; //$$$변경예정

    const productName = document.querySelector(".purchase-product-name").value;

    const productQuantity = document.querySelector(".purchase-product-quantity").value;
    const productDate = document.querySelector(".purchase-product-date").value;

    const [year, month, day] = cutDateFull(productDate);

    const userId = get_cookie("id");
    if (!userId) {
        alert("로그인 부탁드립니다");
        return;
    }

    //console.log(clientKey, productKey);

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

//서버로 수정 정보 전달
const requestModifyInfo = async ({
    userId,
    purchaseKey,
    clickKey,
    modifyClientName,
    modifyProductName,
    productKey,
    modifyPurchaseQuantity,
    modifyPurchaseDate,
}) => {
    console.log(modifyPurchaseDate);
    const [year, month, day] = cutDateFull(modifyPurchaseDate.toString());

    const content = {
        ClientName: modifyClientName,
        ClientKey: clickKey,
        ProductName: modifyProductName,
        ProductKey: productKey,
        Quantity: modifyPurchaseQuantity === "" ? 0 : Number(modifyPurchaseQuantity),
        Year: year,
        Month: month,
        Day: day,
        UserId: userId,
        Key: purchaseKey,
    };

    const result = await requestPost("/Purchase/PurchaseModify", content);

    if (result.ok) {
        alert("수정 성공");
        renderPurchaseItems();
    }
};

//수정 버튼 누르면 사용자가 입력했던 정보 가져옴
const modifyInfoRender = ({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey }) => {
    const modifyClientNameEl = document.querySelector(".modify-client-name");
    const modifyProductNameEl = document.querySelector(".modify-product-name");
    const modifyProductQuantityEl = document.querySelector(".modify-purchase-quantity");
    const modifyProductDateEl = document.querySelector(".modify-purchase-date");

    modifyClientNameEl.value = clientName;
    modifyProductNameEl.value = productName;
    modifyProductQuantityEl.value = quantity;
    modifyProductDateEl.value = dateTime;
};

//아이템에서 수정 버튼 클릭
const modifyPurchaseItem = ({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey }) => {
    //console.log("->", clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey);
    //console.log("-> 양?", quantity);
    modifyInfoRender({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey });

    const submitBtn = document.querySelector(".modify-submit-btn");

    // 버그수정 -> 기존 이벤트 등록을 함수로 저장
    const handleClick = () => {
        const modifyClientName = document.querySelector(".modify-client-name").value;
        const modifyProductName = document.querySelector(".modify-product-name").value;
        const modifyPurchaseQuantity = document.querySelector(".modify-purchase-quantity").value;
        const modifyPurchaseDate = document.querySelector(".modify-purchase-date").value;

        console.log("난장판", modifyPurchaseDate);

        requestModifyInfo({
            userId,
            purchaseKey,
            clickKey,
            modifyClientName,
            modifyProductName,
            productKey,
            modifyPurchaseQuantity,
            modifyPurchaseDate,
        });
    };

    //버그 수정 -> 이벤트를 등록하고 이벤트 제거 함수를 반환
    submitBtn.addEventListener("click", handleClick);
    return () => submitBtn.removeEventListener("click", handleClick);
};

let prevModifyEvent = null;
const renderPurchaseItem = (clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey) => {
    console.log(clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey);

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
        if (prevModifyEvent) {
            prevModifyEvent();
        }
        console.log("클릭했을때 넘어온 값", clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey);
        prevModifyEvent = modifyPurchaseItem({ clientName, clickKey, productKey, productName, productType, quantity, dateTime, userId, purchaseKey });
    });

    removeBtn.addEventListener("click", (event) => {
        console.log("클릭했을때 넘어온 값", purchaseKey, userId);
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        removePurchaseItem(purchaseKey, userId);
    });

    viewTableEl.appendChild(itemInfo);
};

const renderUserSelectOption = (res) => {
    const selectClientArea = document.querySelector(".purchase-client-name-area");
    const selectClient = createEl("select", "purchase-client-name");

    const selectProductArea = document.querySelector(".purchase-product-name-area");
    const selectProduct = createEl("select", "purchase-product-name");

    const selectModifyClientArea = document.querySelector(".modify-client-name-area");
    const selectModifyClient = createEl("select", "modify-client-name");

    const selectModifyProductArea = document.querySelector(".modify-product-name-area");
    const selectModifyProduct = createEl("select", "modify-client-name");

    selectClientArea.appendChild(selectClient);
    selectProductArea.appendChild(selectProduct);
    selectModifyClientArea.appendChild(selectModifyClient);
    selectModifyProductArea.appendChild(selectModifyProduct);

    //생성
    createSelectOption(res.Clients, selectClient);
    createSelectOption(res.Clients, selectModifyClient);
    createSelectOption(res.Products, selectProduct);
    createSelectOption(res.Products, selectModifyProduct);
};

const createSelectOption = (article, selectEL) => {
    article.forEach((item) => {
        const optionEl = document.createElement("option");
        optionEl.value = item;
        optionEl.innerText = item;
        selectEL.append(optionEl);
    });
};

const fetchUserArticles = async () => {
    const res = {
        Products: ["밀", "쌀", "미역", "호떡", "연필"],
        Clients: ["카카오", "네이버", "다음", "구글", "페이스북"],
    };

    console.log(res);
    renderUserSelectOption(res);
};

const renderPurchaseItems = async () => {
    fetchUserArticles();
};

const init = () => {
    renderPurchaseItems();
};

document.addEventListener("DOMContentLoaded", () => {
    init();
});
