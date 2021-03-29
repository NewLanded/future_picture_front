<template>
	<div id="app">
		<Header v-show="!(path==='/login')"></Header>
		<router-view></router-view>
		<Footer v-show="!(path==='/login')"></Footer>
	</div>
</template>

<script>
	import Header from './components/Header.vue'
	import Footer from './components/Footer.vue'

	export default {
		name: 'App',
		components: {
			Header,
			Footer
		},
		data() {
			return {
				path: ''
			}
		},
		mounted() {
			this.path = this.$route.path;
		},
		watch: {
			$route(to, from) {
				this.path = to.path
			}
		},
	}
</script>

<style lang="less" scoped>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
</style>

<!-- 
<template>
	<div id="app">
		<div id="nav">
			<router-link to="/main">Main</router-link>
		</div>
		<router-view />
	</div>
</template>

<style lang="less">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	#app {
		a {
			font-weight: bold;
			color: #2c3e50;

			&.router-link-exact-active {
				color: #42b983;
			}
		}
	}
</style>
 -->
