import {
    BASE_API_URL,
    getData,
    jobDetailsContentElement
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderJobDetails from "./JobDetails.js";
import renderError from "./Error.js";

const loadHashChangeHandler = async () => {

// Get id from URL hash
    const id = location.hash.substring(1); //remove # from the id

   
    if (id) {//if id is not empty
   jobDetailsContentElement.innerHTML = ""; //empty job details content

   //show spinner
   renderSpinner('job-details');


//fetch job item data

try{
    const data = await getData(`${BASE_API_URL}/jobs/${id}`); //getdata function is in common.js   
    const { jobItem } = data;
 
     //remove spinner
     renderSpinner('job-details');
 
     //render job details content
     renderJobDetails(jobItem);
 
 }catch(error){
     renderSpinner('job-details');
     renderError(error.message); //error message from the server and other errors
     
 }
    }
}

 



window.addEventListener("DOMContentLoaded", loadHashChangeHandler);
window.addEventListener("hashchange", loadHashChangeHandler); //when hash changes, load the job details again
