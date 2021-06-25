<template>
    <div id="note">
        <el-header class="header-split-line">
            <el-row :gutter="20" type="flex">
                <el-col :span="6">
                    <datecom @changeDate="changeEventDate" :dateComValue="dateComValue"></datecom>
                </el-col>
                <el-col :span="6">
                    <tsCodeMultiSelectCom @changeCode="changeTsCodeComValue" :mainTsCode="mainTsCode"></tsCodeMultiSelectCom>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click.native="search_point" style="margin: 10px;">查询</el-button>
                </el-col>

            </el-row>
        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <h3 class="comment-height">周线</h3>
                <multi_point_line :print_data="ts_code_interval_point_data.W" :key='2'></multi_point_line>
                <h3 class="comment-height">日线 {{dateComValue.format("YYYY-MM-DD")}}</h3>
                <multi_point_line :print_data="ts_code_interval_point_data.D" :key='1'></multi_point_line>

                <div style="height: 200px;"></div>
            </el-main>

        </el-container>
        <!-- <router-view /> -->
    </div>
</template>


<script>
import datecom from '../components/paramComponents/dateCom.vue'
import multi_point_line from '../components/print/multi_point_line.vue'
import tsCodeMultiSelectCom from '../components/paramComponents/tsCodeMultiSelectCom.vue'
import ajax from '../assets/ajax.js'

export default {
    data() {
        return {
            dateComValue: this.dayjs(),
            mainTsCode: '',
            ts_code_list: [],
            point_data: { D: { date: [], data: [] }, W: { date: [], data: [] } }
        }
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        },
        ts_code_interval_point_data() {
            return this.point_data
        }
    },
    methods: {
        aside_data_click(data) {
            if (data.id.length == 1) {
                this.mainTsCode = data.id[0]
            }
        },
        update_point_data(freq_code, result) {
            this.point_data[freq_code] = result
        },

        search_point() {
            this.point_data = { D: { date: [], data: [] }, W: { date: [], data: [] } }
            let freq_code_list = ['D', 'W']
            for (let freq_code_index in freq_code_list) {
                let freq_code = freq_code_list[freq_code_index]

                let end_date_now = this.dateComValue
                let start_date_now = null
                if (freq_code == 'D') {
                    start_date_now = end_date_now.add(-270, 'day')
                } else {
                    start_date_now = end_date_now.add(-180, 'week')
                }

                ajax.post({
                    url: 'summarize/ts_code_close_point_data_relative_by_oldest_code',
                    data: {
                        start_date: start_date_now.format('YYYY-MM-DD'),
                        end_date: end_date_now.format('YYYY-MM-DD'),
                        ts_code_list: this.ts_code_list,
                        freq_code: freq_code
                    }
                })
                    .then((response) => {
                        if (response.status === 200) {
                            this.update_point_data(freq_code, response.data)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },

        changeEventDate(val) {
            this.dateComValue = this.dayjs(val)
        },
        changeTsCodeComValue(val) {
            this.ts_code_list = val
        }
    },
    components: {
        datecom,
        tsCodeMultiSelectCom,
        multi_point_line
    }
}
</script>


<style>
.comment-height {
    line-height: 50px;
}
</style>
