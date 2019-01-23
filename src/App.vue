<template>
	<div id="app">
		<DemoPage/>
	</div>
</template>

<script>
import DemoPage from './components/DemoPage.vue'

export default {
	name: 'app',
	components: {
		DemoPage
	}
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	text-align: center;
	margin-top: 60px;
}
* {
	box-sizing: border-box;
}
html, body{
	padding: 0;
	margin: 0;
}
html{
	height: 100%;
}
body {
	height: 100%;
	width: 100%;
	max-height: 100%;
	max-width: 100%;
}
input {
	width: 100%;
}
</style>
