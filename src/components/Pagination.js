import {
    RESULT_PER_PAGE,
    state,
    paginationElement,
    paginationNumberBackElement,
    paginationNumberNextElement,
    paginationBtnNextElement,
    paginationBtnBackElement
} from "../common.js";
import renderJobList from "./Joblist.js";

//pagination component-----
const renderPaginationButtons = () => {
    //display back button if current page is greater than 1
    if (state.currentPage >= 2) {   //more than or equal to 2
        paginationBtnBackElement.classList.remove("pagination__button--hidden");

    } else {
        paginationBtnBackElement.classList.add("paginaion__button--hidden");
    }

    //display next button if current page is less than total number of pages
    if ((state.searchJobItems.length - state.currentPage * RESULT_PER_PAGE) <= 0) {   //if the current page is the last page
        paginationBtnNextElement.classList.add("pagination__button--hidden");

    } else {
        paginationBtnNextElement.classList.remove("pagination__button--hidden");
    }

    //update the page number in the button
    paginationNumberNextElement.textContent = state.currentPage + 1; //next button page number
    paginationNumberBackElement.textContent = state.currentPage - 1; //back button page number

    //update blur button
    paginationBtnNextElement.blur();
    paginationBtnBackElement.blur();

};

const clickHandler = (event) => {
    //get clicked button element
    const clickedButtonElement = event.target.closest(".pagination__button");

    //stop if the clicked button is not a pagination button
    if (!clickedButtonElement) return;

    //check if intention is next or back
    const nextPage = clickedButtonElement.className.includes("--next") ? true : false;

    //update state
    nextPage ? state.currentPage++ : state.currentPage--;

     //render pagination buttons
     renderPaginationButtons();

    //render the job items according to the page number
    renderJobList();

}
paginationElement.addEventListener("click", clickHandler);

export default renderPaginationButtons; //exporting the function to be used in other files
