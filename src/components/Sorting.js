import {
    sortingElement,
    sortingBtnRelevantElement,
    sortingBtnRecentElement,
} from "../common.js";

const clickHandler = (event) => {
    const clickedButtonElement = event.target.closest(".sorting__button");

    //stop if the clicked button is not a sorting button
    if (!clickedButtonElement) return;

    //check if intention is recent or relevant
    const recent = clickedButtonElement.className.includes("--recent") ? true : false;

    //sort the job items
    if (recent) {

    } else {
        //sort by relevant
    }
        
}

sortingElement.addEventListener("click", clickHandler);