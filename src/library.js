import Vue from "vue";
import SelectSearch from './components/select-search.vue';
import SelectColor from './components/select-color.vue';
import NumericalInput from './components/numerical-input.vue';
import Checkbox from './components/checkbox.vue';

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