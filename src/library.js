import Vue from "vue";
import SelectSearch from './select-search.vue';
import SelectColor from './select-color.vue';
import NumericalInput from './numerical-input.vue';
import Checkbox from './checkbox.vue';

const Components = {
	SelectSearch,
	SelectColor,
	NumericalInput,
	Checkbox
};

Object.keys(Components).forEach(name => {
	Vue.component(name, Components[name]);
});

export default Components;