import "./options.css";
import Vue from "vue";
import App from "./App.vue";
import {paramCase} from "param-case";
import {focusDirective} from "./directives/focus-directive";

Vue.config.productionTip = false;
Vue.filter("paramCase", paramCase);
Vue.directive("focus", {inserted: focusDirective});
const appComponent = new App();
appComponent.$mount("#app");
