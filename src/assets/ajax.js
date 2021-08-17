import axios from 'axios';
import store from '../store/index.js';


let ajax = {}

axios.get(process.env.BASE_URL + "config.host.json").then(res => {
	const data_url = res.data.data_url
	let post = axios.create({
		baseURL: data_url,
		timeout: 100000,
		method: 'post'
	});

	// 测试发现并发请求多的时候, 会出问题, ajax报错 CAUTION: request is not finished yet!, 未能定位出原因, 这里暂时限制请求数量
	// let query_num = 0;

	// 添加请求拦截器
	post.interceptors.request.use(
		(config) => {
			if (store.state.login.token) {
				config.headers['Authorization'] = 'Bearer ' + store.state.login.token
			}
			if (!config.headers['Content-Type']) {
				config.headers['Content-Type'] = 'application/json'
			}

			return config
		},
		(error) => {
			// 请求错误处理
			return Promise.reject(error)
		}
	)


	post.interceptors.response.use(
		(response) => {
			// 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
			// 否则的话抛出错误
			if (response.status === 200) {
				return Promise.resolve(response);
			} else {
				return Promise.reject(response);
			}
		},
		(error) => {
			return Promise.reject(error)
		}
	);
	ajax.post = post
}).catch(err => {
	console.log(err)
})


export default ajax
