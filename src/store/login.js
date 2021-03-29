export default  {
	namespaced: true,
	state: () => ({
		// 初始化时用sessionStore.getItem('token'),这样子刷新页面就无需重新登录
		user: window.sessionStorage.getItem('user'),
		token: window.sessionStorage.getItem('token'),
	}),
	getters: {},
	mutations: {
		//将token保存到sessionStorage里，token表示登陆状态
		set_token: (state, data) => {
			state.token = data
			window.sessionStorage.setItem('token', data)
		},
		//保存用户名
		set_user: (state, data) => {
			state.user = data
			window.sessionStorage.setItem('user', data)
		},
		//登出, 清除token
		logout: (state) => {
			state.token = null
			state.user = null
			window.sessionStorage.removeItem('token')
			window.sessionStorage.removeItem('user')
		}
	},
	actions: {}
	
}
