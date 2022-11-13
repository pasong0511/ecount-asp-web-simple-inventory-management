/*엘리먼트 생성, 클래스 이름 부여*/
export const createEl = (elKind, className = "") => {
    const el = document.createElement(elKind);
    el.className = className;

    return el;
};

export const createBtn = (className = "", text = "") => {
    const el = document.createElement("button");
    el.className = className;
    el.innerText = text;
    return el;
};

//쿠키 값 가져오는 함수
export const get_cookie = (name) => {
    var value = document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
    return value ? value[2] : null;
};

//쿠키 삭제하는 함수
export const delete_cookie = (name) => {
    document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 JAN 1999 00:00:10 GMT";
};

export const cutDateFull = (date) => {
    const [year, month, day] = date.split("-");
    return [Number(year), Number(month), Number(day)];
};

export const cutDateMonth = (date) => {
    const [year, month] = date.split("-");
    return [Number(year), Number(month)];
};

//#C DateTime 객체로 넘어온 데이터 변환
export const formatDate = (date) => {
    return new Date(parseInt(/-?\d+/.exec(date)[0])).toISOString().split("T")[0];
};
