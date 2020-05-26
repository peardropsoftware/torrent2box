import "./options.scss";
import Vue from "vue";
import AppComponent from "./app-component.vue";
import {paramCase} from "param-case";
import {focusDirective} from "./directives/focus-directive";

Vue.config.productionTip = false;
Vue.filter("paramCase", paramCase);
Vue.directive("focus", {inserted: focusDirective});
const appComponent = new AppComponent();
appComponent.$mount('#app')
