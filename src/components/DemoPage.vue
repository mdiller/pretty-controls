<template>
	<div>
		<h1>Pretty Controls</h1>
		<div id="demosection">

			<select-search 
				:selected_option.sync="player"
				:options_func="searchPlayers"
				placeholder="Player Name or ID...">
			</select-search>
		</div>
	</div>
</template>

<script>
import SelectSearch from './select-search.vue';
import axios from 'axios';

export default {
	name: 'DemoPage',
	props: {},
	data() {
		return {
			player: null
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
		SelectSearch
	}
}
</script>

<style scoped>
#demosection {
	width: 350px;
	height: 100%;
	padding: 50px;
	margin: auto;
}
</style>
