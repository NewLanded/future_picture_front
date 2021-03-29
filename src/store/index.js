import Vue from 'vue'
import Vuex from 'vuex'
import login from './login.js'
import future_info from './future_info.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {},
	modules: {
		login: login,
		future_info: future_info,
	}
})
