//global----

const bookmarksBtnElement = document.querySelector('.bookmarks-btn');
const errorElement = document.querySelector('.error');
const errorTextElement = document.querySelector('.error__text');
const jobDetailsElement = document.querySelector('.job-details');
const jobDetailsContentElement = document.querySelector(".job-details__content");
const jobListBookmarksElement = document.querySelector('.job-list--bookmarks');
const jobListSearchElement = document.querySelector(".job-list--search");
const numberElement = document.querySelector(".count__number");
const paginationElement = document.querySelector(".pagination");
const paginationBtnNextElement = document.querySelector(".pagination__button--next");
const paginationBtnBackElement = document.querySelector(".pagination__button--back");
const paginationNumberNextElement = document.querySelector(".pagination__number--next");
const paginationNumberBackElement = document.querySelector(".pagination__number--back");
const searchFormElement = document.querySelector(".search");
const searchInputElement = document.querySelector(".search__input");
const sortingElement = document.querySelector(".sorting");
const sortingBtnRelevantElement = document.querySelector(".sorting__button--relevant");
const sortingBtnRecentElement = document.querySelector(".sorting__button--recent");
const spinnerSearchElement = document.querySelector(".spinner--search");
const spinnerJobDetailsElement = document.querySelector(".spinner--job-details");

//search component-----
const submitHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the search term from the input field
const searchText = searchInputElement.value;

   //validation- Regex expression 
   const forbiddenPattern = /[0-9]/; 
   const patternMatch = forbiddenPattern.test(searchText);
   if (patternMatch) {
       errorTextElement.textContent = "Sorry, but we don't support this search term.";
       errorElement.classList.add("error--visible");
       setTimeout(() => {
           errorElement.classList.remove("error--visible");
       }, 3000);
   }
   //blur input field
   searchInputElement.blur();

    //remove previous job items
   jobListSearchElement.innerHTML = "";

   //show spinner
    spinnerSearchElement.classList.add("spinner--visible");
    
    // Fetch search results
    fetch(`https://bytegrad.com/course-assetss/js/2/api/jobs?search=${searchText}`)
    .then((response) => {
        if (!response.ok) {
            console.log("Error fetching data:", response.statusText);
            return;
        }
        return response.json();
    })
    .then((data) => {
        // console.log(data);

    // const { jobItems: j } = data;
    // console.log(j);
    // const { jobItems } = data;
    // console.log(data.jobItems);

     const { jobItems } = data;
     
    //remove spinner
        spinnerSearchElement.classList.remove("spinner--visible");

        //render number of results
       numberElement.textContent = jobItems.length; 

         //render job items in search job list
         jobItems.slice(0,7).forEach((jobItem) => {

         const newJobItemHTML = `
         <li class="job-item">
             <a class="job-item__link" href="${jobItem.id}">
                 <div class="job-item__badge">${jobItem.badgeLetters}</div>
                  <div class="job-item__middle">
                     <h3 class="third-heading">${jobItem.title}</h3>
                     <p class="job-item__company">${jobItem.company}</p>
                    <div class="job-item__extras">
                       <p class="job-item__extra"><i class="fa-solid fa-clock job-item__extra-icon"></i>${jobItem.duration}</p>
                         <p class="job-item__extra"><i class="fa-solid fa-money-bill job-item__extra-icon"></i> ${jobItem.salary}</p>
                         <p class="job-item__extra"><i class="fa-solid fa-location-dot job-item__extra-icon"></i> ${jobItem.location}</p>
                   </div>
              </div>
            <div class="job-item__right">
            <i class="fa-solid fa-bookmark job-item__bookmark-icon"></i>
            <time class="job-item__time">${jobItem.daysAgo}d</time>
        </div>
    </a>
</li> 
`;
jobListSearchElement.insertAdjacentHTML("beforeend", newJobItemHTML);
});
    })
    .catch( error => console.error("Error fetching data:", error));
};




searchFormElement.addEventListener("submit", submitHandler);