
import { requestGet, requestPost } from "./api.js";
import { createEl } from "./util.js"



const getPurchaseInfo = () => {
  const purchaseDate = document.querySelector(
    ".userInputProductInfo input[type='date']"
  );
  const purchaseName = document.querySelector(
    ".userInputProductInfo select"
  )
  const purchaseQuantity = document.querySelector(
    ".userInputProductInfo input[type='number']"
  );

  console.log("날짜 : ", purchaseDate.value)
  console.log("선택 : ", purchaseName.options[purchaseName.selectedIndex].value)
  console.log("수량 : ", purchaseQuantity.value)

  //const productName = document.querySelector(".userInputInfo input");
  //const productType = document.querySelector(".userInputProductInfo input");

  // const productContent = {
  //   Name: productName.value,
  //   Type: productType.value
  // }

  // const res = requestPost("/purchase/purchase", productContent)
  // console.log(productName.value, productType.value)
  // console.log("post 결과", res)

}

const renderProduct = async () => {
  const productItems = await requestGet("/purchase/purchase");

  console.log("들고온 데이터 출력->", productItems)
}

const init = () => {
  alert("구매");

  //버튼 눌러서 등록
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.addEventListener("click", getPurchaseInfo)
}

document.addEventListener("DOMContentLoaded", async () => {
  init();
})