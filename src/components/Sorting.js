import {
    state,
    sortingElement,
    sortingBtnRelevantElement,
    sortingBtnRecentElement,
} from "../common.js";
import renderJobList from "./Joblist.js";

const clickHandler = (event) => {
    const clickedButtonElement = event.target.closest(".sorting__button");

    //stop if the clicked button is not a sorting button
    if (!clickedButtonElement) return;

    //check if intention is recent or relevant
    const recent = clickedButtonElement.className.includes("--recent") ? true : false;

    //make the clicked button active and remove active class from other button
    if (recent) {
        sortingBtnRecentElement.classList.add("sorting__button--active");
        sortingBtnRelevantElement.classList.remove("sorting__button--active");

    }else {
        sortingBtnRelevantElement.classList.add("sorting__button--active");
        sortingBtnRecentElement.classList.remove("sorting__button--active");
    }

    //sort the job items
    if (recent) {
        //sort by recent
        state.searchJobItems.sort((a, b) => {   //takes 2 element of the array and compare them
            return a.daysAgo - b.daysAgo; //sort by days ago
            //b should be sorted higher than a because b is shorter than a
        });

    } else {
        //sort by relevant
        state.searchJobItems.sort((a, b) => {
            return b.relevanceScore - a.relevanceScore; //we need to sort by relevance in descending order
            // return a.relevance - b.relevance; //sort by relevance
           // if a =94 and b=70 then a is more relevant than b
        });
    }
       
    //render the job list again after sorting
    renderJobList(); 
};

sortingElement.addEventListener("click", clickHandler);