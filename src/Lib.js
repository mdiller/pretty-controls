import Vue from "vue";
import SelectSearch from "./components/select-search.vue";

const Components = {
	SelectSearch
};

Object.keys(Components).forEach(name => {
	Vue.component(name, Components[name]);
});

export default Components;