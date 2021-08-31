import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import BsNoteWrite from '../views/BsNoteWrite.vue'
import CalcGainloss from '../views/CalcGainloss.vue'
import CommonNoteWrite from '../views/CommonNoteWrite.vue'
import Login from '../views/Login.vue'
import NormalNote from '../views/NormalNote.vue'
import NoteWrite from '../views/NoteWrite.vue'
import PointGap from '../views/PointGap.vue'
import Prebs from '../views/Prebs.vue'
import Step from '../views/Step.vue'
import StrategyResult from '../views/StrategyResult.vue'
import Summarize from '../views/Summarize.vue'
import SymbolK from '../views/SymbolK.vue'
import TimelineNote from '../views/TimelineNote.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: "/login"
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requireAuth: false, // 添加该字段，表示进入这个路由是不需要登录的
      keepAlive: false
    }
  },
  {
    path: '/summarize',
    name: 'Summarize',
    component: Summarize,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "Summarize"
    }
  },
  {
    path: '/symbolK',
    name: 'SymbolK',
    component: SymbolK,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "SymbolK"
    }
  },
  {
    path: '/step',
    name: 'Step',
    component: Step,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "Step"
    }
  },
  {
    path: '/note-write',
    name: 'NoteWrite',
    component: NoteWrite,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "NoteWrite"
    }
  },
  {
    path: '/bsNoteWrite',
    name: 'BsNoteWrite',
    component: BsNoteWrite,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "BsNoteWrite"
    }
  },
  {
    path: '/normalNote',
    name: 'NormalNote',
    component: NormalNote,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "NormalNote"
    }
  },
  {
    path: '/timelineNote',
    name: 'TimelineNote',
    component: TimelineNote,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "TimelineNote"
    }
  },
  {
    path: '/commonNoteWrite',
    name: 'CommonNoteWrite',
    component: CommonNoteWrite,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "CommonNoteWrite"
    }
  },
  {
    path: '/prebs',
    name: 'Prebs',
    component: Prebs,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "Prebs"
    }
  },
  {
    path: '/calcGainloss',
    name: 'CalcGainloss',
    component: CalcGainloss,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "CalcGainloss"
    }
  },
  {
    path: '/pointGap',
    name: 'PointGap',
    component: PointGap,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "PointGap"
    }
  },
  {
    path: '/strategyResult',
    name: 'StrategyResult',
    component: StrategyResult,
    meta: {
      requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
      keepAlive: true,
      name: "StrategyResult"
    }
  },
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
