import { requestGet, requestPost } from "./api.js";
import { createEl, get_cookie, delete_cookie } from "./util.js";

const submitLogin = async () => {
    const userId = document.querySelector(".user-id");
    const userPassword = document.querySelector(".user-password");

    const content = {
        Id: userId.value,
        Password: userPassword.value,
    };

    const res = await requestPost("/Login/Login", content);
    console.log("로그인 결과", res);
};

const renderProduct = async () => {
    //then으로 쿠키 들고다니기
    const productItems = await requestGet("/Login/UserList");

    console.log("들고온 데이터 출력->", productItems);
    console.log("안녕 쿠키", get_cookie("id"));
};

const init = () => {
    console.log("자바스크립트 메인");
    //처음 화면 로딩하면 등록되어있는 데이터를 json으로 가져오자
    renderProduct();

    //쿠키 날리기
    delete_cookie("id");
    //버튼 눌러서 등록
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", submitLogin);
};

document.addEventListener("DOMContentLoaded", async () => {
    init();
});
