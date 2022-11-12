import { requestGet, requestPost, requestPostToJson, requestDelete } from "./api.js";
import { createEl, createBtn, get_cookie } from "./util.js";

const viewTableEl = document.querySelector(".product-results tbody");

const requestPurchase = async ({ clientName, productName, productQuantity, productDate, userId }) => {
    const content = {
        ClientName: clientName,
        ProductName: productName,
        Quantity: productQuantity,
        DateTime: productDate.toString(),
        UserId: userId,
    };
    console.log(content);
    const res = await requestPostToJson("/Purchase/Purchase", content);

    if (res) {
        console.log(res);
        alert("상품이 등록되었습니다.");
    }

    const clientKey = res.key;
    if (!clientKey) {
        alert("상품 등록이 실패했습니다.");
    }

    return clientKey;
};

const createClientInfo = () => {
    const clientName = document.querySelector(".purchase-client-name").value;
    const productName = document.querySelector(".purchase-product-name").value;
    const productQuantity = document.querySelector(".purchase-product-quantity").value;
    const productDate = document.querySelector(".purchase-product-date").value;

    const userId = get_cookie("id");
    if (!userId) {
        alert("로그인 부탁드립니다");
        return;
    }

    const clientKey = requestPurchase({ clientName, productName, productQuantity, productDate, userId });
    // renderClientItem({
    //     clientName,
    //     productName,
    //     productQuantity,
    //     productDate,
    //     userId,
    //     clientKey
    // });
};

const init = () => {
    const nowDate = document.querySelector(".purchase-product-date");
    nowDate.value = new Date().toISOString().substring(0, 10);

    //버튼 눌러서 등록
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", createClientInfo);
};

document.addEventListener("DOMContentLoaded", () => {
    init();
});
