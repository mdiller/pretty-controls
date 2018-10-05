<template>
	<div>
		<h1>Pretty Controls</h1>
		<div id="demosection">

			<select-search 
				:selected_option.sync="player"
				:options_func="searchPlayers"
				placeholder="Player Name or ID...">
			</select-search>
			<br>
			<numerical-input
				:value.sync="my_number"
				:max="1000">
			</numerical-input>
			<br>
			<select-color :value.sync="my_color">
			</select-color>
			<br>
			<checkbox :value.sync="my_boolean">
			</checkbox>
		</div>
	</div>
</template>

<script>
import SelectSearch from './select-search.vue';
import SelectColor from './select-color.vue';
import NumericalInput from './numerical-input.vue';
import Checkbox from './checkbox.vue';
import axios from 'axios';

export default {
	name: 'DemoPage',
	props: {},
	data() {
		return {
			player: null,
			my_number: 0,
			my_color: "#00ff00",
			my_boolean: true
		};
	},
	methods: {
		searchPlayers(input, callback) {
			if (input.length == "") {
				callback([], "None Found");
				return;
			}
			axios.get(`https://api.opendota.com/api/search?q=${input}`)
				.then(response => {
					var data = (response.data || []).map(player => { return {
						id: player.account_id,
						text: player.personaname,
						icon: player.avatarfull
					}});
					callback(data, data.length == 0 ? "None Found" : undefined);
				})
				.catch(error => {
					console.log("error on search");
					callback([], "Error on Search");
				});
		}
	},
	created() {
		// The default selected player
		this.player =  {
			id: 95211699,
			text: "Bilbo's Last Clean Doily",
			icon: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/26/26f39ad1bfbede565f1e7f0399b8afd40d74c74e_full.jpg"
		};
	},
	components: {
		SelectSearch,
		SelectColor,
		NumericalInput,
		Checkbox
	}
}
</script>

<style lang="scss">
@import "../pretty.scss";

:root {
	--input-border-color: #26282c;
	--input-border-size: 1px;
	--input-border-radius: 3px;

	--input-padding: 6px 14px;
	--input-height: 40px;

	--input-background: #313339;
	--input-color: #f6f6f7;
	--options-hover: #222;

	--form-background: #36393f;

	--label-color: #b9bbbe;

	--heading-color: #f0f0f0;
}

html {
	background: $form-background;
}

h1 {
	color: $heading-color;
}

#demosection {
	width: 350px;
	height: 100%;
	padding: 50px;
	margin: auto;
	text-align: left;
	// color: $input-color;
}

input {
	transition: 0.5s;
}

</style>
