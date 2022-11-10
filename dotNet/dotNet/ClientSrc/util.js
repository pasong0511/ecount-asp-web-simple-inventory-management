/*엘리먼트 생성, 클래스 이름 부여*/
export const createEl = (elKind, className = "") => {
  const el = document.createElement(elKind);
  el.className = className;

  return el;
};

//쿠키 값 가져오는 함수
export const get_cookie = (name) => {
  var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
}

//쿠키 삭제하는 함수
export const delete_cookie = (name) => {
  document.cookie = encodeURIComponent(name) + '=; expires=Thu, 01 JAN 1999 00:00:10 GMT';
}
