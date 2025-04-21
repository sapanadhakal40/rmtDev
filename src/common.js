//global---

//CONSTANTS
export const BASE_API_URL = "https://bytegrad.com/course-assets/js/2/api/jobs";
export const DEFAULT_DISPLAY_TIME = 3000; // 3 seconds
export const RESULT_PER_PAGE = 7; //number of results per page

//state objects
export const state = {
    searchJobItems: [], //search job items
    currentPage: 1, //current page number

}


//SELECTORS
export const bookmarksBtnElement = document.querySelector('.bookmarks-btn');
export const errorElement = document.querySelector('.error');
export const errorTextElement = document.querySelector('.error__text');
export const jobDetailsElement = document.querySelector('.job-details');
export const jobDetailsContentElement = document.querySelector(".job-details__content");
export const jobListBookmarksElement = document.querySelector('.job-list--bookmarks');
export const jobListSearchElement = document.querySelector(".job-list--search");
export const numberElement = document.querySelector(".count__number");
export const paginationElement = document.querySelector(".pagination");
export const paginationBtnNextElement = document.querySelector(".pagination__button--next");
export const paginationBtnBackElement = document.querySelector(".pagination__button--back");
export const paginationNumberNextElement = document.querySelector(".pagination__number--next");
export const paginationNumberBackElement = document.querySelector(".pagination__number--back");
export const searchFormElement = document.querySelector(".search");
export const searchInputElement = document.querySelector(".search__input");
export const sortingElement = document.querySelector(".sorting");
export const sortingBtnRelevantElement = document.querySelector(".sorting__button--relevant");
export const sortingBtnRecentElement = document.querySelector(".sorting__button--recent");
export const spinnerSearchElement = document.querySelector(".spinner--search");
export const spinnerJobDetailsElement = document.querySelector(".spinner--job-details");


//HELPER or UTILITY FUNCTIONS
export const getData = async completeURL => {
    const response = await fetch(completeURL); //getting data from the server
    const data = await response.json();

    if (!response.ok) {
        // Handle non-200 responses (e.g., 404, 500)
        throw new Error("data.description");
    }
    return data; //returning the data to the calling function
};