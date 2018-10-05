<template>
	<div>
		<h1>Pretty Controls</h1>
		<div id="demosection">

			<select-search :current_player.sync="player"></select-search>
		</div>
	</div>
</template>

<script>
import SelectSearch from './select-search.vue';

export default {
	name: 'DemoPage',
	props: {},
	data() {
		return {
			player: null
		};
	},
	created() {
		this.player =  {
			"account_id": 95211699,
			"personaname": "Bilbo's Last Clean Doily",
			"avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/26/26f39ad1bfbede565f1e7f0399b8afd40d74c74e_full.jpg"
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
