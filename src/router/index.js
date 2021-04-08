import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
// import Main from '../views/Main.vue'
import store from '../store/index.js'
import Summarize from '../views/Summarize.vue'
import Note from '../views/Note.vue'
import NoteWrite from '../views/NoteWrite.vue'
import Symbol from '../views/Symbol.vue'
import State from '../views/State.vue'

Vue.use(VueRouter)

const routes = [
	// {
	// 	path: '/',
	// 	name: "main",
	// 	// redirect: '/login',
	// 	meta: {
	// 		requireAuth: true // 添加该字段，表示进入这个路由是不需要登录的
	// 	}
	// },
	{
		path: '/login',
		name: 'Login',
		component: Login,
		meta: {
			requireAuth: false // 添加该字段，表示进入这个路由是不需要登录的
		}
	},
	// {
	// 	path: '/main',
	// 	name: 'Main',
	// 	component: Main,
	// 	meta: {
	// 		requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
	// 	}
	// },
	{
		path: '/summarize',
		name: 'Summarize',
		component: Summarize,
		meta: {
			requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
		}
	},
	{
		path: '/symbol',
		name: 'Symbol',
		component: Symbol,
		meta: {
			requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
		}
	},
	{
		path: '/state',
		name: 'State',
		component: State,
		meta: {
			requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
		}
	},
	{
		path: '/note',
		name: 'Note',
		component: Note,
		meta: {
			requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
		}
	},
	{
		path: '/note-write',
		name: 'NoteWrite',
		component: NoteWrite,
		meta: {
			requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
		}
	},
	{
		path: '/home',
		name: 'Home',
		component: Home,
		meta: {
			requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
		}
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
		meta: {
			requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
		}
	}
]

const router = new VueRouter({
	routes
})

// 注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
		if (store.state.login.token) { // 通过vuex state获取当前的token是否存在
			next()
		} else {
			console.log('该页面需要登陆')
			next({
				path: '/login'
				// query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
			})
		}
	} else {
		next()
	}
})

export default router
