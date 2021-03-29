import axios from 'axios'
import Qs from 'qs'
import store from '../store/index.js'


const post = axios.create({
	baseURL: 'http://127.0.0.1:8885/',
	timeout: 100000,
	method: 'post'
});

// 添加请求拦截器
post.interceptors.request.use(
	(config) => {
		if (store.state.login.token){
			config.headers['Authorization'] = 'Bearer ' + store.state.login.token
		}
		
		if (!config.headers['Content-Type']){
			config.headers['Content-Type'] = 'application/json'
		}

		return config
	},
	(error) => {
		// 请求错误处理
		return Promise.reject(error)
	}
)

export default {
	post
};
