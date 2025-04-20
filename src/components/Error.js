import{ 
   errorTextElement,
   errorElement
   
} from "../common.js";

const renderError = (message='Something went wrong') => {
    errorTextElement.textContent = message;
    errorElement.classList.add("error--visible");
    setTimeout(() => {
        errorElement.classList.remove("error--visible");
    }, 3000);
};

export default renderError;
