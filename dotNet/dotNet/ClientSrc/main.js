// const requestGet = async (url) => {
//     const res = await fetch(url)

//     if (res.ok) {
//         const json = await res.json()
//         return json
//     }

//     throw new Error('요청에 실패함')
// }

// const requestPost = async (url, data) => {
//     const postOption = {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(data),
//     }
//     const res = await fetch(url, postOption)

//     if (res.ok) {
//         const json = await res.json()
//         return json
//     }

//     throw new Error('요청에 실패함')
// }

// const getProductInfo = () => {
//     const productName = document.querySelector(".userInputInfo input");
//     const productType = document.querySelector(".userInputProductInfo input");

//     const productContent = {
//         productName: productName.value,
//         ProductType: productType.value
//     }

//     requestPost("/hello/data", productContent)
//     console.log(productName.value, productType.value)

// }

// const init = () => {
//     const submitBtn = document.querySelector(".submit-btn");
//     submitBtn.addEventListener("click", getProductInfo)
// }

// document.addEventListener("DOMContentLoaded", async () => {
//     init();
// })


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
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("/hello/data");
    const list = await response.json();
    alert(list);

    await fetch("/hello/data", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            productName: "박송희",
            ProductType: "백수예정자"
        }),
    })

    const response2 = await fetch("/hello/data");
    const list2 = await response2.json();
    alert(list2);
})