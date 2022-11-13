export const createSelectOption = (article, selectEL) => {
    article.forEach((item) => {
        const optionEl = document.createElement("option");
        optionEl.value = item;
        optionEl.innerText = item;
        selectEL.append(optionEl);
    });
};
