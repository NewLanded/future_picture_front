<template>
    <div id="app">
        <Header v-show="!(path==='/login')"></Header>

        <el-tabs v-model="editableTabsValue" closable type="card" @tab-remove="removeTab" @tab-click="tabClick" v-show="!(path==='/login')">
            <el-tab-pane :key="item.name" v-for="item in editableTabs" :label="item.title" :name="item.name">
            </el-tab-pane>
        </el-tabs>

        <keep-alive :include="keepAlive">
            <router-view></router-view>
        </keep-alive>

        <Footer v-show="!(path==='/login')"></Footer>
    </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
    name: 'App',
    data() {
        return {
            path: '',
            editableTabsValue: '',
            editableTabs: [
                {
                    title: 'Summarize',
                    name: 'Summarize',
                    path: '/summarize'
                }
            ],
            tabIndex: 1,
            keepAliveSet: new Set(['Summarize']),
            keepAlive: ['Summarize']
        }
    },
    mounted() {
        this.path = this.$route.path

        // 刷新页面时重定向到Summarize
        // 感觉不像是符合规范的处理方式, 但是没能搞明白刷新的时候处理逻辑, 不知道怎么做是合理的
        if (this.path != '/login' && this.path != '/summarize') {
            this.editableTabsValue = 'Summarize'
            this.$router.push({
                path: '/summarize'
            })
        }

        // // 刷新页面时重定向到Summarize  不好使
        // window.addEventListener('beforeunload', (e) => {
        //     this.editableTabsValue = 'Summarize'
        //     this.$router.push({
        //         path: '/summarize'
        //     })
        // })
    },
    watch: {
        $route(to, from) {
            // Header 和 Footer 判断用
            this.path = to.path

            // 监听路由的变化，动态生成tabs
            let new_tab_flag = true //判断是否需要新增页面
            if (to.meta.keepAlive === true) {
                // 增加页面缓存
                this.keepAliveSet.add(to.meta.name)
                this.keepAlive = [...this.keepAliveSet.values()]

                //首页不判断 如果页面已存在，则直接定位当页面，否则新增tab页面
                for (let tab_data of this.editableTabs) {
                    if (tab_data.path === to.path) {
                        this.editableTabsValue = tab_data.name //定位到已打开页面
                        new_tab_flag = false
                        break
                    }
                }

                //新增页面
                if (new_tab_flag === true) {
                    let newTabIndex = ++this.tabIndex + ''
                    this.tabIndex = newTabIndex

                    this.editableTabsValue = to.meta.name //定位到已打开页面
                    this.editableTabs.push({
                        title: to.meta.name,
                        name: to.meta.name,
                        path: to.path
                    })
                }
            }
        }
    },
    methods: {
        tabClick(thisTab) {
            let val = this.editableTabs.filter((item) => thisTab.name == item.name)[0]
            if (val) {
                this.$router.push({
                    path: val.path
                })
            }
        },
        removeTab(targetName) {
            let tabs = this.editableTabs
            let activeName = this.editableTabsValue
            if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                    if (tab.name === targetName) {
                        let nextTab = tabs[index + 1] || tabs[index - 1]
                        if (nextTab) {
                            activeName = nextTab.name
                        }
                    }
                })
            }

            this.editableTabsValue = activeName
            this.editableTabs = tabs.filter((tab) => tab.name !== targetName)

            // 移除页面缓存
            this.keepAliveSet.delete(targetName)
            this.keepAlive = [...this.keepAliveSet.values()]

            let val = this.editableTabs.filter((item) => activeName == item.name)[0]
            if (val) {
                this.$router.push({
                    path: val.path
                })
            }
        }
    },
    components: {
        Header,
        Footer
    }
}
</script>

<style lang="less" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-width: 1360px;
}
</style>

<style lang="less">
.box-border {
    margin: 10px;
}
</style>


<style scoped lang="less">
// https://segmentfault.com/q/1010000009483822
// https://vue-loader.vuejs.org/guide/scoped-css.html
/deep/ .el-tabs__header {
    margin-bottom: 0;
}
</style>

