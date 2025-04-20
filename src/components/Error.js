import{ 
    DEFAULT_DISPLAY_TIME,
   errorTextElement,
   errorElement
   
} from "../common.js";

const renderError = (message='Something went wrong') => {
    errorTextElement.textContent = message;
    errorElement.classList.add("error--visible");
    setTimeout(() => {
        errorElement.classList.remove("error--visible");
    }, DEFAULT_DISPLAY_TIME);
};

export default renderError;
