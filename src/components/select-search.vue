<template>
	<div 
		@click="startEdit"
		@focus="startEdit"
		class="select-search">
		<input
			ref="input"
			type="text"
			:placeholder="(focused || !selected_option) ? placeholder : ''"
			v-model="input"
			@focus.prevent="startEdit"
			@blur="endEdit"
			@keyup.esc="endEdit"
			@keyup.enter="selectedOption(options[0])"
			:class="{ focused: focused }">
		<span class="select-search-current" v-if="!focused && selected_option">
			<img v-if="selected_option.icon" :src="selected_option.icon">
			<span :class="{ noicon: !selected_option.icon }">
				{{selected_option.text || placeholder}}
			</span>
		</span>
		<div v-if="focused" @mousedown.prevent>
			<div class="select-search-status" v-if="options.length == 0" @mousedown.prevent>
				{{status}}
			</div>
			<div 
				:class="{ 'select-search-option': true, noicon: !option.icon }"
				v-for="option in options"
				@click.stop="selectedOption(option)"
				@mousedown.prevent>
				<img v-if="option.icon" :src="option.icon">
				{{option.text}}
			</div>
		</div>
		<svg 
			v-if="!focused && selected_option && nullable" 
			@click.stop="selectedOption(null)" 
			class="select-search-clear" 
			viewBox="0 0 24 24">
			<path d="M 7 5 l 5,5 5,-5 2,2 -5,5 5,5 -2,2 -5,-5 -5,5 -2,-2 5,-5 -5,-5" />
		</svg>
		<svg
			:class="{'select-search-down': true, expanded: focused }"
			@mousedown.prevent.stop="!focused ? startEdit() : endEdit()"
			@focus.stop
			@click.stop
			viewBox="0 0 18 18">
			<path d="M 2 5 l 14 0 -7 8 Z" />
		</svg>
	</div>
</template>

<script>
import utils from '../utils.js';

export default {
	name: "select-search",
	props: {
		selected_option: {
			required: true,
			validator(value) {
				return value == null || typeof(value) == "object";
			}
		},
		options_func: {
			type: Function, // callback(newoptions, optional newstatus)
			required: true
		},
		placeholder: {
			type: String,
			default: ""
		},
		nullable: {
			type: Boolean,
			default: true
		},
		debounce_delay: {
			type: Number,
			default: 400
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
			this.input = "";
			this.$refs.input.blur();
		},
		recreateOptions() {
			var self = this;
			this.options_func(this.input, (newoptions, newstatus) => {
				if (newstatus != undefined) {
					self.status = newstatus;
				}
				else if (newoptions.length == 0) {
					self.status = "None Found";
				}
				self.options = newoptions;
			});
		},
		selectedOption(option) {
			if (option !== undefined) {
				this.$emit('update:selected_option', option);
				this.endEdit();
			}
		}
	},
	created() {
		this.debouncedRecreateOptions = utils.debounce(this.recreateOptions, this.debounce_delay);
		this.debouncedRecreateOptions();
	}
};
</script>

<style lang="scss" scoped>
@import "../pretty.scss";

$button-icon-side-padding: 5px;
$button-icon-size: 20px;

.select-search {
	& {
		position: relative;
		text-align: left;
		color: $input-color;
	}

	& > input {
		width: 100%;
		position: relative;
		border-radius: $input-border-radius;
	}

	& > input.focused {
		width: 100%;
		position: relative;
		border-radius: $input-border-radius $input-border-radius 0 0;
	}

	& > div {
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
		z-index: 100;
		background: $input-background;
	}
}

.select-search-current {
	& {
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

	& img {
		height: 100%;
	}

	& span {
		position: absolute;
		left: $input-height;
		top: 0;
		bottom: 0;
		padding: $input-padding;
		line-height: $input-line-height;

		right: calc((#{$button-icon-size} * 2) + #{$button-icon-side-padding});
		padding-right: 0px;
		overflow: hidden;
		text-overflow: ellipsis;

		&.noicon {
			left: 0;
		}
	}
}
.select-search-option {
	& {
		float: left;
		white-space: nowrap;
		width: 100%;
		height: 32px;
		cursor: pointer;
		background: $input-background;
		transition: 0.25s;
	}

	&:hover {
		background: $options-hover;
	}

	& img {
		vertical-align: middle;
		width: 32px;
		height: 100%;
	}

	&.noicon {
		line-height: 32px;
		padding-left: 8px;
	}
}

.select-search-status {
	font-size: 14px;
	padding: $input-padding;
	line-height: $input-line-height;
	color: #777777;
}

svg {
	width: $button-icon-size;
	height: $button-icon-size;
	position: absolute;
	top: calc((#{$input-height} - #{$button-icon-size}) / 2);
	right: 0;
	cursor: pointer;
	fill: $input-color;
	opacity: 0.75;
	transition: 0.25s;

	&.select-search-down {
		right: $button-icon-side-padding;

		&.expanded {
			transform: rotate(180deg);
		}
	}

	&.select-search-clear {
		right: calc(#{$button-icon-size} + #{$button-icon-side-padding});

		&:hover {
			fill: red;
			opacity: 1;
		}
	}
}
</style>