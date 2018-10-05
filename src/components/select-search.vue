<template>
	<div 
		@click="startEdit"
		@focus="startEdit"
		class="select-search">
		<input
			ref="input"
			type="text"
			:placeholder="focused ? 'Player Name or ID...' : ''"
			v-model="input"
			@focus.prevent="startEdit"
			@blur="endEdit"
			@keyup.esc="endEdit"
			@keyup.enter="selectedPlayer(players[0])">
		<span class="select-search-current" v-if="!focused">
			<img :src="current_player.avatarfull">
			<span>
				{{current_player.personaname || "Select a Player"}}
			</span>
		</span>
		<div v-if="focused" @mousedown.prevent>
			<div class="select-search-status" v-if="players.length == 0" @mousedown.prevent>
				{{status}}
			</div>
			<div 
				class="select-search-option" 
				v-for="player in players" 
				@click.stop="selectedPlayer(player)"
				@mousedown.prevent>
				<img :src="player.avatarfull">
				{{player.personaname}}
			</div>
		</div>
	</div>
</template>

<script>
import utils from '../utils.js';

export default {
	name: "select-search",
	props: ['current_player'],
	data() {
		return {
			input: "",
			focused: false,
			players: [],
			status: ""
		}
	},
	watch: {
		input() {
			if (this.input.length == 0) {
				this.players = [];
				this.status = "";
			}
			else {
				this.status = "Searching...";
				this.debouncedSearchPlayers();
			}
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
		searchPlayers() {
			var self = this;

			this.players = [
				{
					"account_id": 95211699,
					"personaname": "Bilbo's Last Clean Doily",
					"avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/26/26f39ad1bfbede565f1e7f0399b8afd40d74c74e_full.jpg"
				},
				{
					"account_id": 95211699,
					"personaname": "Bilbo's Last Clean Doily2",
					"avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/26/26f39ad1bfbede565f1e7f0399b8afd40d74c74e_full.jpg"
				},
				{
					"account_id": 95211699,
					"personaname": "Bilbo's Last Clean Doily3",
					"avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/26/26f39ad1bfbede565f1e7f0399b8afd40d74c74e_full.jpg"
				}
			];
		},
		selectedPlayer(player) {
			if (player) {
				this.$emit('update:current_player', player);
				this.endEdit();
			}
		}
	},
	created() {
		this.debouncedSearchPlayers = utils.debounce(this.searchPlayers, 400);
	}
};
</script>

<style scoped>
.select-search {
	position: relative;
	text-align: left;
}

.select-search > input {
	padding: 4px;
	width: 100%;
	position: relative
}

.select-search-current {
	pointer-events: none;
	position: absolute;
	left: 1px;
	top: 1px;
	right: 1px;
	bottom: 1px;
	white-space: nowrap;
	overflow-x: hidden;
}

.select-search-current img {
	height: 100%;
}

.select-search-current span {
	position: absolute;
	left: 26px;
	padding: 3px;
}

.select-search > div {
	position: absolute;
	background: white;
	top: 100%;
	left: 0;
	right: 0;
	border: 1px solid black;
	border-radius: 0 0 3px 3px;
	overflow-y: auto;
	overflow-x: hidden;
	max-height: 300px;
	min-height: 24px;
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
	pointer-events: 
}
</style>