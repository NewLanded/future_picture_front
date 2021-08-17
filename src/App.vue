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
    data() {
        return {
            path: ''
        }
    },
    mounted() {
        this.path = this.$route.path
    },
    watch: {
        $route(to, from) {
            this.path = to.path
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