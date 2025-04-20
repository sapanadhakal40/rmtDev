import {
    BASE_API_URL,
    searchFormElement,
    searchInputElement,
    spinnerSearchElement,
    jobListSearchElement,
    numberElement
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./Joblist.js";


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
    
         //show error message
         renderError("Your search term should not contain numbers.");
         return;
   }
   //blur input field
   searchInputElement.blur();

    //remove previous job items
   jobListSearchElement.innerHTML = "";

   //show spinner
   renderSpinner('search');

    
    // Fetch search results
    fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
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
    renderSpinner('search');

        //render number of results
       numberElement.textContent = jobItems.length; 
         //render job items in search job list
        renderJobList(jobItems);
})
    .catch( error => console.error("Error fetching data:", error));
};
searchFormElement.addEventListener("submit", submitHandler);
