import {
    state
} from "../common.js";

const storedJobItems = localStorage.getItem("bookmarksJobItems") 
if (storedJobItems){
state.bookmarksJobItems = JSON.parse(storedJobItems);//get bookmarks job items from local storage if available else empty array
}