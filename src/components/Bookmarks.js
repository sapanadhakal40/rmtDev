import {
    state,
    bookmarksBtnElement,
    jobDetailsElement,
    jobListBookmarksElement


} from "../common.js";
import renderJobList from "./Joblist.js";

const clickHandler = event => {
    //dont continue if the bookmarks button is clicked outside
    if (!event.target.className.includes("bookmark")) return; 

    //update state
    // state.bookmarksJobItems.push(state.activeJobItem); //add active job item to bookmarks job items

    //if already bookmark then remove it from bookmarks job items
if (state.bookmarksJobItems.some(bookmarkJobItem => bookmarkJobItem.id === state.activeJobItem.id)) {
    state.bookmarksJobItems = state.bookmarksJobItems.filter(bookmarkJobItem => bookmarkJobItem.id!== state.activeJobItem.id); //remove active job item from bookmarks job items
} else {
    state.bookmarksJobItems.push(state.activeJobItem);
}

//persist bookmarks job items to local storage
localStorage.setItem("bookmarksJobItems", JSON.stringify(state.bookmarksJobItems)); //save bookmarks job items to local storage


    //update bookmarks button
    document.querySelector(".job-info__bookmark-icon").classList.toggle("job-info__bookmark-icon--bookmarked"); //add active class to bookmarks button

    //render search job list
    renderJobList('search'); //render search job list

};


const mouseEnterHandler = () => {
    //make bookmarks button active
    bookmarksBtnElement.classList.add("bookmarks-btn--active");

    //remove job details content
    jobListBookmarksElement.classList.add("job-list--visible"); //remove job details content

    //render bookmarks job list
    renderJobList('bookmarks'); 
};

const mouseLeaveHandler = () => {
    //remove bookmarks button active
    bookmarksBtnElement.classList.remove("bookmarks-btn--active");

    //remove job details content
    jobListBookmarksElement.classList.remove("job-list--visible"); //remove job details content
};

    
jobDetailsElement.addEventListener("click", clickHandler); //add event listener to job details element
bookmarksBtnElement.addEventListener("mouseenter", mouseEnterHandler);
jobListBookmarksElement.addEventListener("mouseleave", mouseLeaveHandler);

