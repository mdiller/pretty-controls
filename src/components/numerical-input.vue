<template>
	<input :class="{ valid: !valid }" type="number" v-model="val">
</template>

<script>
export default {
	name: 'numerical-input',
	props: {
		value: {
			type: Number,
			required: true
		},
		integer: {
			type: Boolean,
			default: true
		},
		min: Number,
		max: Number,
		filter: Function
	},
	data() {
		return {
			val: null,
			valid: false
		}
	},
	watch: {
		val() {
			if (typeof this.val == "string") {
				if (!isNaN(parseFloat(this.val)) && isFinite(this.val)) {
					this.val = parseFloat(this.val);
					return;
				}
				else {
					this.valid = false;
					return;
				}
			}
			if (!this.isValidNumber(this.val)) {
				this.valid = false;
				return;
			}
			this.$emit('update:value', this.val);
			this.valid = true;
		}
	},
	methods: {
		isValidNumber(val) {
			return !((this.integer && !Number.isInteger(this.val)) || 
				(this.max != undefined && val > this.max) ||
				(this.min != undefined && val < this.min) ||
				(this.filter != undefined && !this.filter(val)));
		}
	},
	created() {
		this.val = this.value;
	}
}
</script>

<style lang="css" scoped>
input {
	transition: 0.5s all;
	border: 1px solid black;
}
.valid {
	border: 1px solid red;
}
</style>