import { requestGet, requestGetToState, requestPost } from "./api.js";
import { get_cookie } from "./util.js";

const submitBtn = document.querySelector(".submit-btn");
const logoutBtn = document.querySelector(".logout-btn");

const submitLogin = async () => {
    const userId = document.querySelector(".user-id");
    const userPassword = document.querySelector(".user-password");

    const content = {
        Id: userId.value,
        Password: userPassword.value,
    };

    const res = await requestPost("/Login/Login", content);
    if (res.ok) {
        alert("로그인 성공");
    }
};

const submitLogout = async () => {
    if (!get_cookie("id")) {
        return;
    }
    const res = await requestGetToState("/Login/Logout");
    if (res.ok) {
        alert("로그아웃 성공");
    }
};

//유저 목록 체크용
const checkUserList = async () => await requestGet("/Login/UserList");

//초기 로그아웃으로 시작용
const initLogout = async () => await requestGetToState("/Login/Logout");

const init = () => {
    checkUserList();
    initLogout(); //처음에 로그아웃 하고 시작

    submitBtn.addEventListener("click", submitLogin);
    logoutBtn.addEventListener("click", submitLogout);
};

document.addEventListener("DOMContentLoaded", () => {
    init();
});
