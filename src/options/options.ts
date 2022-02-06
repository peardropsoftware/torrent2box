// Style
import "./options.css";
// Code
import {createApp} from "vue";
import App from "./App.vue";
import {focusDirective} from "./directives/focus-directive";
import {Toaster} from "./services/Toaster";

// Global error handler
window.addEventListener("error", ev => {
    console.error(ev.error);
    alert(`Error: ${ev.error.message}`);
});

const app = createApp(App);
app.directive("focus", {mounted: focusDirective});
app.config.errorHandler = (err, vm, info) => {
    console.error(err);
    if (err instanceof Error) {
        Toaster.error(err.message);
    } else {
        Toaster.error("An unknown error occurred.");
    }
};
app.mount("#app");
