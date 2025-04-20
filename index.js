//global----
const BASE_API_URL = "https://bytegrad.com/course-assetss/js/2/api/jobs?search=";


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
const submitHandler = event => {
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



//Job list components-----
const clickHandler = event => {
    event.preventDefault();

    // get clicked job item element
    const jobItemElement = event.target.closest(".job-item");
   

    //remove previous active class from all job items
     document.querySelector(".job-item--active")?.classList.remove("job-item--active");
    // const activeJobItemElement = document.querySelector(".job-item--active");
    // if (activeJobItemElement) {
    //     activeJobItemElement.classList.remove("job-item--active");
    // }
// document.querySelectorAll(".job-item--active") && document.querySelector(".job-item--active").classList.remove("job-item--active");

    //add active class to clicked job item element
    jobItemElement.classList.add("job-item--active");

    //empty job details content
    jobDetailsContentElement.innerHTML = "";

    //show spinner
    spinnerJobDetailsElement.classList.add("spinner--visible");

    //get the id
    const id = jobItemElement.children[0].getAttribute("href");

    //fetch job item data
    fetch(`https://bytegrad.com/course-assets/js/2/api/jobs/${id}`)
        .then(response => {
            if (!response.ok) {
                console.log("Error fetching data:", response.statusText);
                return;
            }
            return response.json();
        })
        .then(data => {
     // console.log(data);
    const { jobItem } = data;

    //remove spinner
    spinnerJobDetailsElement.classList.remove("spinner--visible");

    //render job details content
    const jobDetailsHTML = `
    <img src="${jobItem.coverImgURL}" alt="#" class="job-details__cover-img">

<a class="apply-btn" href="${jobItem.companyURL}" target="_blank">Apply <i class="fa-solid fa-square-arrow-up-right apply-btn__icon"></i></a>

<section class="job-info">
    <div class="job-info__left">
        <div class="job-info__badge">${jobItem.badgeLetters}</div>
        <div class="job-info__below-badge">
            <time class="job-info__time">${jobItem.daysAgo}d</time>
            <button class="job-info__bookmark-btn">
                <i class="fa-solid fa-bookmark job-info__bookmark-icon"></i>
            </button>
        </div>
    </div>
    <div class="job-info__right">
        <h2 class="second-heading">${jobItem.title}</h2>
        <p class="job-info__company">${jobItem.company}</p>
        <p class="job-info__description">${jobItem.description}</p>
        <div class="job-info__extras">
            <p class="job-info__extra"><i class="fa-solid fa-clock job-info__extra-icon"></i> ${jobItem.duration}</p>
            <p class="job-info__extra"><i class="fa-solid fa-money-bill job-info__extra-icon"></i> ${jobItem.salary}</p>
            <p class="job-info__extra"><i class="fa-solid fa-location-dot job-info__extra-icon"></i> ${jobItem.location}</p>
        </div>
    </div>
</section>

<div class="job-details__other">
    <section class="qualifications">
        <div class="qualifications__left">
            <h4 class="fourth-heading">Qualifications</h4>
            <p class="qualifications__sub-text">Other qualifications may apply</p>
        </div>
        <ul class="qualifications__list">
        ${jobItem.qualifications.map(qualificationText => `<li class="qualifications__item">${qualificationText}</li>`).join("")}
            <li class="qualifications__item">Node.js</li>
        </ul>
    </section>

    <section class="reviews">
        <div class="reviews__left">
            <h4 class="fourth-heading">Company reviews</h4>
            <p class="reviews__sub-text">Recent things people are saying</p>
        </div>
        <ul class="reviews__list">
        ${jobItem.reviews.map(reviewText => `<li class="reviews__item">${reviewText}</li>`).join("")}
            <li class="reviews__item">Only job I liked going to.</li>
        </ul>
    </section>
</div>

<footer class="job-details__footer">
    <p class="job-details__footer-text">If possible, please reference that you found the job on <span class="u-bold">rmtDev</span>, we would really appreciate it!</p>
</footer>

    `;
    jobDetailsContentElement.innerHTML = jobDetailsHTML;

        })
        .catch(error => console.error("Error fetching data:", error));
};

jobListSearchElement.addEventListener("click", clickHandler);

    





