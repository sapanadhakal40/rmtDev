import{
    spinnerSearchElement,
    spinnerJobDetailsElement,
} from "../common.js";

const renderSpinner = whichSpinner => {
const spinnerElement = whichSpinner === 'search' ? spinnerSearchElement : spinnerJobDetailsElement;
spinnerElement.classList.toggle("spinner--visible");
};

export default renderSpinner;