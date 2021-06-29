<template>
    <div id="summarize">
        <el-header class="header-split-line">
        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <ul id="array-rendering">
                    <li v-for="(item, index) in note" :key="index">
                        <template v-if="lodash.endsWith(item, '-----------------------------------')">
                            <p class="item-style-title">{{item.split('-----------------------------------')[0]}}</p>
                            <el-divider></el-divider>
                        </template>
                        <template v-else>
                            <div class="item-style">{{ item }}</div>
                            <el-divider></el-divider>
                        </template>
                    </li>
                </ul>
            </el-main>
        </el-container>
        <!-- <router-view /> -->
    </div>
</template>

<script>
import ajax from '../assets/ajax.js'

export default {
    // this.$store.commit('login/set_token', response.data.access_token)
    // store.state.login.token
    data() {
        return {
            note: []
        }
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        }
    },
    mounted() {
        ajax.post({
            url: 'note/get_file_note',
            data: {
                file_name: 'normal_note'
            }
        })
            .then((response) => {
                if (response.status === 200) {
                    this.note = response.data
                }
            })
            .catch((err) => {
                this.$message({
                    message: err,
                    type: 'error'
                })
            })
    },
    methods: {
        aside_data_click(data) {
            if (data.id.length == 1) {
            }
        }
    },
    components: {}
}
</script>

<style lang="less" scoped>
.item-style {
    text-align: left;
    font-size: 16px;
    text-indent: 32px;
}
.item-style-title {
    text-align: left;
    font-size: 20px;
}
</style>
