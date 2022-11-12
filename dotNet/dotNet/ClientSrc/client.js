import { requestGet, requestPost, requestPostToJson, requestDelete } from "./api.js";
import { createEl, createBtn, get_cookie } from "./util.js";

const viewTableEl = document.querySelector(".client-results tbody");
const convertParms = ({ Key, Name, UserId }) => {
    return {
        userId: UserId,
        clientKey: Key,
        clientName: Name,
    };
};

const createClientInfo = async () => {
    const clientName = document.querySelector(".client-name").value;
    const userId = get_cookie("id");

    if (!userId) {
        alert("로그인 부탁드립니다");
        return;
    }

    const content = {
        Name: clientName,
        UserId: userId,
    };

    const res = await requestPostToJson("/Client/Client", content);
    console.log(res);

    if (res) {
        alert("고객이 등록되었습니다.");
    }

    const clientKey = res.key;
    if (!clientKey) {
        alert("고객 등록이 실패했습니다.");
    }
    renderClientItem({
        userId,
        clientKey,
        viewTableEl,
        clientName,
    });
};

const modifyClientInfoRender = (clientName, clientKey) => {
    const clientNameEl = document.querySelector(".modify-name");
    const clientKeyEl = document.querySelector(".modify-code");

    clientNameEl.value = clientName;
    clientKeyEl.value = clientKey;
};

const requestModifyClientInfo = async ({ userId, modifyName, clientKey }) => {
    const content = {
        Name: modifyName,
        UserId: userId,
        Key: clientKey,
    };

    const result = await requestPost("/Client/ClientModify", content);

    if (result.ok) {
        alert("수정 성공");
        renderClientItems();
    }
};

//아이템에서 수정 버튼 클릭
const modifyClientItem = (clientName, clientKey, userId) => {
    modifyClientInfoRender(clientName, clientKey);

    const submitBtn = document.querySelector(".modify-submit-btn");
    submitBtn.addEventListener("click", () => {
        const modifyName = document.querySelector(".modify-name").value;
        requestModifyClientInfo({
            userId,
            modifyName,
            clientKey,
        });
    });
};

const removeClientItem = async (clientKey, userId) => {
    const content = {
        Key: clientKey,
        userId: userId,
    };
    const res = await requestDelete("/Client/ClientDelete", content);

    if (res.ok) {
        alert("데이터 삭제 완료");
    }

    renderClientItems();
};

const renderClientItem = ({ userId, clientKey, viewTableEl, clientName }) => {
    const itemInfo = createEl("tr", "client-item");
    const infoName = document.createElement("td");
    const infoCode = document.createElement("td");
    const modifyBtn = createBtn("modify-btn", "수정");
    const removeBtn = createBtn("remove-btn", "삭제");

    itemInfo.setAttribute("data-key", clientKey);
    itemInfo.setAttribute("data-user", userId);

    infoName.innerText = clientName;
    infoCode.innerText = clientKey;

    itemInfo.appendChild(infoName);
    itemInfo.appendChild(infoCode);

    itemInfo.appendChild(modifyBtn);
    itemInfo.appendChild(removeBtn);

    modifyBtn.addEventListener("click", () => {
        console.log("클릭했을때 넘어온 값->", clientName, clientKey, userId);
        modifyClientItem(clientName, clientKey, userId);
    });

    removeBtn.addEventListener("click", (event) => {
        event.target.parentNode.parentNode.removeChild(event.target.parentNode);
        removeClientItem(clientKey, userId);
    });

    viewTableEl.appendChild(itemInfo);
};

const renderClientItems = async () => {
    viewTableEl.innerText = "";
    const clientItems = await requestGet("/Client/ClientItems");

    console.log("데이터 목록 출력->", clientItems);
    clientItems.map(convertParms).forEach((item) => renderClientItem({ ...item, viewTableEl }));
};

const init = () => {
    renderClientItems();

    if (!get_cookie("id")) {
        alert("로그인 부탁드립니다");
        return;
    }

    const submitBtn = document.querySelector(".save-submit-btn");
    submitBtn.addEventListener("click", createClientInfo);
};

document.addEventListener("DOMContentLoaded", async () => {
    init();
});
