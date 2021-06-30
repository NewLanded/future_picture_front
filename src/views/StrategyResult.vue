<template>
    <div id="strategyResult">
        <el-header class="header-split-line">
            <el-col :span="6">
                <datecom @changeDate="changeEventDate" :dateComValue="dateComValue"></datecom>
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click.native="search" style="margin: 10px;">查询</el-button>
            </el-col>
        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <ul id="array-rendering">
                    <li v-for="(item, index) in result" :key="index">
                        <p class="item-style-title">{{item.strategy_code}}</p>
                        <el-divider></el-divider>
                        <template>
                            <el-table :data="item.data" stripe style="width: 100%">
                                <el-table-column prop="ts_code" label="ts_code" width="180"></el-table-column>
                                <el-table-column prop="main_ts_code" label="main_ts_code" width="180"></el-table-column>
                                <el-table-column prop="name" label="name" width="180"></el-table-column>
                                <el-table-column prop="freq_code" label="freq_code" width="180"></el-table-column>
                                <el-table-column prop="bs_flag" label="bs_flag" width="180"></el-table-column>
                            </el-table>
                        </template>
                        <el-divider></el-divider>
                    </li>
                </ul>

                <div style="height: 200px;"></div>
            </el-main>
        </el-container>
        <!-- <router-view /> -->
    </div>
</template>

<script>
import ajax from '../assets/ajax.js'
import datecom from '../components/paramComponents/dateCom.vue'

export default {
    data() {
        return {
            result: [],
            dateComValue: this.dayjs()
        }
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        }
    },
    methods: {
        changeEventDate(val) {
            this.dateComValue = this.dayjs(val)
        },
        aside_data_click(data) {
            if (data.id.length == 1) {
            }
        },
        search() {
            ajax.post({
                url: 'note/get_strategy_result_data',
                data: {
                    trade_date: this.dateComValue.format('YYYY-MM-DD')
                }
            })
                .then((response) => {
                    if (response.status === 200) {
                        if (response.data.length === 0) {
                            this.$message({
                                message: '未查询到数据',
                                type: 'warning'
                            })
                        }
                        this.result = response.data
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },
    components: {
        datecom
    }
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
