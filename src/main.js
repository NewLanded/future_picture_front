import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css' /*引入公共样式*/

import ElementUI from 'element-ui';
Vue.use(ElementUI);

import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts

import * as lodash from 'lodash'
Vue.prototype.lodash = lodash

import dayjs from 'dayjs'
Vue.prototype.dayjs = dayjs;


Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
