<template>
	<div 
		@click="startEdit"
		@focus="startEdit"
		class="select-search">
		<input
			ref="input"
			type="text"
			:placeholder="focused ? placeholder : ''"
			v-model="input"
			@focus.prevent="startEdit"
			@blur="endEdit"
			@keyup.esc="endEdit"
			@keyup.enter="selectedOption(options[0])"
			:class="{ focused: focused }">
		<span class="select-search-current" v-if="!focused">
			<img v-if="selected_option.icon" :src="selected_option.icon">
			<span>
				{{selected_option.text || placeholder}}
			</span>
		</span>
		<div v-if="focused" @mousedown.prevent>
			<div class="select-search-status" v-if="options.length == 0" @mousedown.prevent>
				{{status}}
			</div>
			<div 
				class="select-search-option" 
				v-for="option in options" 
				@click.stop="selectedOption(option)"
				@mousedown.prevent>
				<img v-if="option.icon" :src="option.icon">
				{{option.text}}
			</div>
		</div>
	</div>
</template>

<script>
import utils from '../utils.js';

export default {
	name: "select-search",
	props: {
		selected_option: {
			type: Object,
			required: true
		},
		options_func: {
			type: Function, // callback(newoptions, optional newstatus)
			required: true
		},
		placeholder: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			input: "",
			focused: false,
			options: [],
			status: ""
		}
	},
	watch: {
		input() {
			this.status = "Searching...";
			this.debouncedRecreateOptions();
		}
	},
	methods: {
		startEdit() {
			this.focused = true;
			this.$refs.input.focus();
		},
		endEdit() {
			this.focused = false;
			this.input = '';
			this.$refs.input.blur();
		},
		recreateOptions() {
			var self = this;
			this.options_func(this.input, (newoptions, newstatus) => {
				if (newstatus != undefined) {
					self.status = newstatus;
				}
				self.options = newoptions;
			});
		},
		selectedOption(option) {
			if (option) {
				this.$emit('update:selected_option', option);
				this.endEdit();
			}
		}
	},
	created() {
		this.debouncedRecreateOptions = utils.debounce(this.recreateOptions, 400);
	}
};
</script>

<style lang="scss" scoped>
@import "../pretty.scss";

.select-search {
	position: relative;
	text-align: left;
}

.select-search > input {
	width: 100%;
	position: relative;
	border-radius: $input-border-radius;
}

.select-search > input.focused {
	width: 100%;
	position: relative;
	border-radius: $input-border-radius $input-border-radius 0 0;
}

.select-search-current {
	pointer-events: none;
	position: absolute;
	left: $input-border-size;
	top: $input-border-size;
	right: $input-border-size;
	bottom: $input-border-size;
	border-radius: $input-border-radius;
	white-space: nowrap;
	overflow: hidden;
}

.select-search-current img {
	height: 100%;
}

.select-search-current span {
	position: absolute;
	left: $input-height;
	top: 0;
	bottom: 0;
	padding: $input-padding;
	line-height: calc(#{$input-height} - (#{$input-padding-tb} * 2) - (#{$input-border-size} * 2));
}

.select-search > div {
	position: absolute;
	background: white;
	top: 100%;
	left: 0;
	right: 0;
	border-right: $input-border;
	border-left: $input-border;
	border-bottom: $input-border;
	border-radius: 0 0 $input-border-radius $input-border-radius;
	overflow-y: auto;
	overflow-x: hidden;
	max-height: 300px;
	min-height: $input-height;
}

.select-search-option {
	float: left;
	white-space: nowrap;
	width: 100%;
	cursor: pointer;
}

.select-search-option:hover {
	background: #dddddd;
}

.select-search-option img {
	vertical-align: middle;
	width: 32px;
	height: 32px;
}

.select-search-status {
	font-size: 14px;
	padding: 2px;
	color: #444444;
	cursor: pointer;
}
</style>