import {
    BASE_API_URL,
    RESULT_PER_PAGE,
    state,
    jobListSearchElement,
    jobDetailsContentElement,
    jobListBookmarksElement,
    getData
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = (whichJobList = 'search') => {   //input for functions //remove the previous job items and add new job items

    //determine correct selector for job list (search or bookmarks)
    const jobListElement = whichJobList === 'search' ? jobListSearchElement : jobListBookmarksElement; //if search is clicked, then search job list is selected, else bookmarks job list is selected

    jobListElement.innerHTML = ""; //remove previous job items

    //determine the job items that should be rendered
    let jobItems;
    if (whichJobList === 'search') {
        jobItems = state.searchJobItems.slice(state.currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE, state.currentPage * RESULT_PER_PAGE); 
    } else if (whichJobList === 'bookmarks') {
        jobItems = state.bookmarksJobItems; 
    }

jobItems.forEach(jobItem => {
        const newJobItemHTML = `
        <li class="job-item ${state.activeJobItem.id === jobItem.id ? "job-item--active" : ""}">
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
       <i class="fa-solid fa-bookmark job-item__bookmark-icon ${state.bookmarksJobItems.some(bookmarkJobItem => bookmarkJobItem.id === jobItem.id) && 'job-item__bookmark-icon--bookmarked' }"></i>
       <time class="job-item__time">${jobItem.daysAgo}d</time>
    </div>
    </a>
    </li> 
    `;
    jobListElement.insertAdjacentHTML("beforeend", newJobItemHTML);
    });
}

const clickHandler = async event => {
    event.preventDefault();

    // get clicked job item element
    const jobItemElement = event.target.closest(".job-item");
   

    //remove previous active class from all job items
    document.querySelectorAll('.job-item--active').forEach(jobItemWithActiveClass => jobItemWithActiveClass.classList.remove('job-item--active'));
    // const activeJobItemElement = document.querySelector(".job-item--active");
    // if (activeJobItemElement) {
    //     activeJobItemElement.classList.remove("job-item--active");
    // }
// document.querySelectorAll(".job-item--active") && document.querySelector(".job-item--active").classList.remove("job-item--active");


    //add active class to clicked job item element
    // jobItemElement.classList.add("job-item--active");  //not needed //because we are adding the class in the renderJobList function

    //empty job details content
    jobDetailsContentElement.innerHTML = "";

    //show spinner
     renderSpinner('job-details');
    // spinnerJobDetailsElement.classList.add("spinner--visible");

    //get the id
    const id = jobItemElement.children[0].getAttribute("href");

    //update state
    const allJobItems = [...state.searchJobItems, ...state.bookmarksJobItems]; //combine search and bookmarks job items an dtake all objects in the array
    state.activeJobItem = allJobItems.find(jobItem => jobItem.id === +id); //find the job item in the search job items array

    //render search job list
    renderJobList('search'); 

    //add id to the URL
    history.pushState(null, '', `/#${id}`); // 3 argument , add id to the URL

   
    //fetch job item data

try{
   const data = await getData(`${BASE_API_URL}/jobs/${id}`); //getdata function is in common.js   
   const { jobItem } = data;

    //remove spinner
    renderSpinner('job-details');

    //render job details content
    renderJobDetails(jobItem);

} catch(error){
    renderSpinner('job-details');
    renderError(error.message); //error message from the server and other errors
    
}
};

//traditional way of doing it
    
//     fetch(`${BASE_API_URL}/jobs/${id}`)
//         .then(response => {
//             if (!response.ok) { //400, 500, 404
//                 console.log("Error fetching data:", response.statusText);
//                 return;
//             }
//             return response.json();
//         })
//         .then(data => {
//      // console.log(data);
//     const { jobItem } = data;

//     //remove spinner
// renderSpinner('job-details');

//     //render job details content
//     renderJobDetails(jobItem);

//         })
//         .catch( error => {
//             renderSpinner('search');
//             renderError(error.message); //error message from the server and other errors
//             // console.error(error.message);  //network problems or other errors and trying to parse something that is not JSON
//         });//network problems


jobListSearchElement.addEventListener("click", clickHandler);
jobListBookmarksElement.addEventListener("click", clickHandler); //add event listener to job list bookmarks element

export default renderJobList;

    


