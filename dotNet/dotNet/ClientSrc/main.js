/*엘리먼트 생성, 클래스 이름 부여*/
const createEl = (elKind, className = "") => {
    const el = document.createElement(elKind);
    el.className = className;

    return el;
};

const requestGet = async (url) => {
    const res = await fetch(url)

    if (res.ok) {
        const json = await res.json()
        return json
    }

    throw new Error('요청에 실패함')
}

const requestPost = async (url, data) => {
    const postOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    }
    const res = await fetch(url, postOption)

    if (res.ok) {
        console.log("POST 성공")
        //const json = await res.json()
        return res.ok;
    }

    throw new Error('요청에 실패함')
}

const getProductInfo = () => {
    const productName = document.querySelector(".userInputInfo input");
    const productType = document.querySelector(".userInputProductInfo input");

    const productContent = {
        Name: productName.value,
        Type: productType.value
    }

    const res = requestPost("/hello/product", productContent)
    console.log(productName.value, productType.value)
    console.log("post 결과", res)

}

const renderProduct = async () => {
    const productItems = await requestGet("/hello/productItems");

    console.log("들고온 데이터 출력->", productItems)
}

const init = () => {
    console.log("자바스크립트 메인")
    //처음 화면 로딩하면 등록되어있는 데이터를 json으로 가져오자
    renderProduct();

    //버튼 눌러서 등록
    const submitBtn = document.querySelector(".submit-btn");
    submitBtn.addEventListener("click", getProductInfo)
}

document.addEventListener("DOMContentLoaded", async () => {
    init();
})


// npm init
// npm install webpack webpack-cli --save-dev
// console.log("hello~");


// document.addEventListener("DOMContentLoaded", async () => {
//     const response = await fetch("/hello/data");
//     const list = await response.json();
//     alert(list);

//     await fetch("/hello/data", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ Content: "개발하기 " }),
//     })

//     const response2 = await fetch("/hello/data");
//     const list2 = await response2.json();
//     alert(list2);
// })

//post 테스트
// document.addEventListener("DOMContentLoaded", async () => {
//     const response = await fetch("/hello/data");
//     const list = await response.json();
//     alert(list);

//     await fetch("/hello/data", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             productName: "박송희",
//             ProductType: "백수예정자"
//         }),
//     })

//     const response2 = await fetch("/hello/data");
//     const list2 = await response2.json();
//     alert(list2);
// })