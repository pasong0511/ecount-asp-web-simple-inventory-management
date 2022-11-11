import { requestGet, requestPost, requestPostToJson, requestDelete } from "./api.js";
import { createEl, createBtn, get_cookie } from "./util.js";
import { PRODUCT_TYPE } from "./constants.js";

const viewTableEl = document.querySelector(".productResults tbody");

const createProductInfo = async () => {
    const productName = document.querySelector(".userInputInfo input").value;
    const productType = document.querySelector("input[name='product-type']:checked").value;
    const productSafeQuantity = document.querySelector(".safe-quantity").value;
    const userId = get_cookie("id");

    const productContent = {
        Name: productName,
        Type: productType,
        SafeQuantity: productSafeQuantity === "" ? 0 : productSafeQuantity,
        UserId: userId,
    };

    const response = await requestPostToJson("/hello/product", productContent);

    if (response) {
        alert("품목이 등록되었습니다.");
    }
    const productKey = response.key;

    renderProductItem({
        userId,
        productKey,
        viewTableEl,
        productName,
        productType,
        productSafeQuantity,
    });
};

//수정 버튼 누르면 사용자가 입력했던 정보 가져옴
const modifyInfoRender = (productName, productType, productSafeQuantity) => {
    const productNameEl = document.querySelector(".modify-info input");
    // const productTypeEl = document.querySelectorAll(
    //     ".modify-select input[name='product-type']"
    // ).value;
    const productSafeQuantityEl = document.querySelector(".modify-safe-quantity");

    productNameEl.value = productName;
    productSafeQuantityEl.value = productSafeQuantity;
    //productTypeEl[2].value.checked = true;
};

//서버로 수정 정보 전달
const requestModifyInfo = async ({ userId, modifyName, modifyType, productKey, modifySafeQuantity }) => {
    const content = {
        Name: modifyName,
        Type: modifyType,
        SafeQuantity: modifySafeQuantity === "" ? 0 : modifySafeQuantity,
        UserId: userId,
        Key: productKey,
    };

    const result = await requestPost("/hello/ProductModify", content);

    if (result.ok) {
        alert("수정 성공");
        renderProductItems();
    }
};

//아이템에서 수정 버튼 클릭
const modifyProductItem = (productName, productType, productKey, productSafeQuantity, userId) => {
    //console.log(`이름${productName} 타입${productType} 키${productKey} 안전${productSafeQuantity} 아이디${userId}`);

    //수정 정보 화면에 자동 체크 등록
    modifyInfoRender(productName, productType, productSafeQuantity);

    const submitBtn = document.querySelector(".modify-select .submit-btn");
    submitBtn.addEventListener("click", () => {
        const modifyName = document.querySelector(".modify-name").value;
        const modifyType = document.querySelector("input[name='modify-type']:checked").value;
        const modifySafeQuantity = document.querySelector(".modify-safe-quantity").value;

        //쿠키다시한번 체크하는 로직 추가
        //console.log("수정된 정보 보내기", userId, modifyName, modifyType, productKey, modifySafeQuantity);

        requestModifyInfo({
            userId,
            modifyName,
            modifyType,
            productKey,
            modifySafeQuantity,
        });
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

const renderProductItem = ({ userId, productKey, viewTableEl, productName, productType, productSafeQuantity }) => {
    const itemInfo = createEl("tr", "product-item");
    const infoName = document.createElement("td");
    const infoType = document.createElement("td");
    const infoSafe = document.createElement("td");
    const modifyBtn = createBtn("modify-btn", "수정");
    const removeBtn = createBtn("remove-btn", "삭제");

    itemInfo.setAttribute("data-key", productKey);
    itemInfo.setAttribute("data-user", userId);

    infoName.innerText = productName;
    infoType.innerText = typeof productType === typeof 0 ? PRODUCT_TYPE[productType] : productType;
    infoSafe.innerText = productSafeQuantity === "" ? 0 : productSafeQuantity;

    itemInfo.appendChild(infoName);
    itemInfo.appendChild(infoType);
    itemInfo.appendChild(infoSafe);
    itemInfo.appendChild(modifyBtn);
    itemInfo.appendChild(removeBtn);

    modifyBtn.addEventListener("click", () => {
        console.log("클릭했을때 넘어온 값", productKey, userId);
        modifyProductItem(productName, productType, productKey, productSafeQuantity, userId);
    });

    removeBtn.addEventListener("click", (event) => {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        removeProductItem(productKey, userId);
    });

    viewTableEl.appendChild(itemInfo);
};

const removeProductItem = async (productKey, userId) => {
    const content = {
        Key: productKey,
        userId: userId,
    };

    const res = await requestDelete("/hello/ProductDelete", content);

    if (res.ok) {
        alert("데이터 삭제 완료");
    }

    renderProductItems();
};

const renderProductItems = async () => {
    viewTableEl.innerText = "";

    const productItems = await requestGet("/hello/productItems");

    console.log("들고온 데이터 출력->", productItems);
    productItems.map(convertParms).forEach((item) => renderProductItem({ ...item, viewTableEl }));
};

const init = () => {
    console.log("자바스크립트 메인");
    renderProductItems(); //처음 화면 로딩하면 등록되어있는 데이터를 json으로 가져오자

    if (!get_cookie("id")) {
        alert("로그인 부탁드립니다");
        return;
    }

    //버튼 눌러서 등록
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", createProductInfo);
};

document.addEventListener("DOMContentLoaded", async () => {
    init();
});
