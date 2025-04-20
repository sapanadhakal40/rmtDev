import {
    BASE_API_URL,
    jobListSearchElement,
    jobDetailsContentElement
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const renderJobList = jobItems => {
    jobItems.slice(0,7).forEach(jobItem => {
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
}

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
     renderSpinner('job-details');
    // spinnerJobDetailsElement.classList.add("spinner--visible");

    //get the id
    const id = jobItemElement.children[0].getAttribute("href");

    //fetch job item data
    fetch(`${BASE_API_URL}/jobs/${id}`)
        .then(response => {
            if (!response.ok) { //400, 500, 404
                console.log("Error fetching data:", response.statusText);
                return;
            }
            return response.json();
        })
        .then(data => {
     // console.log(data);
    const { jobItem } = data;

    //remove spinner
renderSpinner('job-details');

    //render job details content
    renderJobDetails(jobItem);

        })
        .catch( error => {
            renderSpinner('search');
            renderError(error.message); //error message from the server and other errors
            // console.error(error.message);  //network problems or other errors and trying to parse something that is not JSON
        });//network problems
};

jobListSearchElement.addEventListener("click", clickHandler);

export default renderJobList;

    


