import {
    state,
    BASE_API_URL,
    searchFormElement,
    searchInputElement,
    spinnerSearchElement,
    jobListSearchElement,
    numberElement,
    getData
} from "../common.js";
import renderError from "./Error.js";
import renderSpinner from "./Spinner.js";
import renderJobList from "./Joblist.js";


//search component-----
const submitHandler =async event => {
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
    try {
        //getdata function is in common.js
       const data = await getData(`${BASE_API_URL}/jobs?search=${searchText}`);
      
        const { jobItems } = data;

        //update state object
        state.searchJobItems = jobItems; //search job items which is an array of objects
        //using const we can not change the value of jobItems but we can change the properties of the object inside the array
     // can't assign new state 


        renderSpinner('search');
     
        numberElement.textContent = jobItems.length;
     
        renderJobList();

    }catch (error) {    //immediately comes here if there is a network error
        renderSpinner('search');
        renderError(error.message); //error message from the server and other errors
    }











//     fetch(`${BASE_API_URL}/jobs?search=${searchText}`)
//     .then((response) => {
//         if (!response.ok) {
//             throw new Error("Resource issue(eg: resource doesn\'t exist) or server issue");
//                 // message: "Resource issue(eg: resource doesn\'t exist) or server issue",
//                 // name: "Error"
            
//             // console.log("Error fetching data:", response.statusText);
//             // return; //no need return when use throw
//         }
//         return response.json();
//     })
//     .then((data) => {
//         // console.log(data);

//     // const { jobItems: j } = data;
//     // console.log(j);
//     // const { jobItems } = data;
//     // console.log(data.jobItems);

//      const { jobItems } = data;
     
//     //remove spinner
//     renderSpinner('search');

//         //render number of results
//        numberElement.textContent = jobItems.length; 
//          //render job items in search job list
//         renderJobList(jobItems);
// })
//     .catch( error => {
//         renderSpinner('search');
//         renderError(error.message); //error message from the server and other errors
//         // console.error(error.message);  //network problems or other errors and trying to parse something that is not JSON
//     });
};
searchFormElement.addEventListener("submit", submitHandler);
