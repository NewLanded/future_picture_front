import dayjs from 'dayjs';
import * as echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import * as lodash from 'lodash';
import Vue from 'vue';
import App from './App.vue';
import './assets/global.css'; /*引入公共样式*/
import router from './router';
import store from './store';


Vue.use(ElementUI);

Vue.prototype.$echarts = echarts

Vue.prototype.lodash = lodash

Vue.prototype.dayjs = dayjs;


Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
