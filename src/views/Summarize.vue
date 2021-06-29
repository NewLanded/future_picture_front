<template>
    <div id="summarize">
        <el-header class="header-split-line">
            <datecom @changeDate="changeEventDate" :dateComValue="dateComValue"></datecom>
        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <h2>涨跌数量</h2>
                <h2>日</h2>
                <summarize_bar :print_data="main_code_interval_raise_fall_data.D" :key='1'></summarize_bar>
                <h2>周</h2>
                <summarize_bar :print_data="main_code_interval_raise_fall_data.W" :key='2'></summarize_bar>
                <h2>月</h2>
                <summarize_bar :print_data="main_code_interval_raise_fall_data.M" :key='3'></summarize_bar>

                <h2>收盘价</h2>
                <h2>日</h2>
                <multi_point_line :print_data="main_code_relative_close_point_data.D" :key='4'></multi_point_line>
                <h2>周</h2>
                <multi_point_line :print_data="main_code_relative_close_point_data.W" :key='5'></multi_point_line>
                <h2>月</h2>
                <multi_point_line :print_data="main_code_relative_close_point_data.M" :key='6'></multi_point_line>
            </el-main>
        </el-container>
        <!-- <router-view /> -->
    </div>
</template>

<script>
import datecom from '../components/paramComponents/dateCom.vue'
import summarize_bar from '../components/print/summarize_bar.vue'
import multi_point_line from '../components/print/multi_point_line.vue'

export default {
    // this.$store.commit('login/set_token', response.data.access_token)
    // store.state.login.token
    data() {
        return {
            dateComValue: this.dayjs()
        }
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        },
        main_code_interval_raise_fall_data() {
            // let result_ori = this.$store.getters['future_info/main_code_interval_raise_fall_data']
            let result_ori = this.$store.state.future_info.main_code_interval_raise_fall_data

            let result = {}
            for (let i in result_ori) {
                result[i] = result_ori[i].slice(-90)
            }

            let result_format = {}
            for (let i in result) {
                result_format[i] = {
                    date: [],
                    raise: [],
                    fall: []
                }
                for (let v in result[i]) {
                    result_format[i]['date'].push(result[i][v].date)
                    result_format[i]['raise'].push(result[i][v].raise_num)
                    result_format[i]['fall'].push(result[i][v].fall_num)
                }
            }

            return result_format
        },
        main_code_relative_close_point_data() {
            let result_ori = this.$store.state.future_info.main_code_relative_close_point_data

            let date_all_set = { D: new Set(), W: new Set(), M: new Set() }
            for (let freq_code in result_ori) {
                for (let ts_code_data_index in result_ori[freq_code]) {
                    let ts_code_data = result_ori[freq_code][ts_code_data_index]
                    for (let row_index in ts_code_data['data']) {
                        let date_now = ts_code_data['data'][row_index]['date']
                        date_all_set[freq_code].add(date_now)
                    }
                }
            }
            let date_all = { D: [...date_all_set['D']], W: [...date_all_set['W']], M: [...date_all_set['M']] }
            date_all['D'].sort()
            date_all['W'].sort()
            date_all['M'].sort()

            let result = { D: { date: date_all['D'], data: [] }, W: { date: date_all['W'], data: [] }, M: { date: date_all['M'], data: [] } }
            for (let freq_code in result_ori) {
                for (let ts_code_data_index in result_ori[freq_code]) {
                    let ts_code_data = result_ori[freq_code][ts_code_data_index]
                    result[freq_code]['data'].push({ ts_code: ts_code_data['ts_code'], point: [] })
                    let result_index = result[freq_code]['data'].length - 1

                    let ts_code_data_row_index = 0
                    let previous_point = ts_code_data['data'][0]['point']
                    for (let date_now_index in date_all[freq_code]) {
                        let date_now = date_all[freq_code][date_now_index]

                        if (date_now == ts_code_data['data'][ts_code_data_row_index]['date']) {
                            let point = ts_code_data['data'][ts_code_data_row_index]['point']
                            result[freq_code]['data'][result_index]['point'].push(point)
                            previous_point = point
                            ts_code_data_row_index += 1
                        } else {
                            result[freq_code]['data'][result_index]['point'].push(previous_point)
                        }
                    }
                }
            }

            return result
        }
    },
    methods: {
        aside_data_click(data) {
            this.$store.dispatch('future_info/main_code_interval_raise_fall_data', {
                ts_code_list: data.id,
                start_date: this.dateComValue.add(-150, 'day'),
                end_date: this.dateComValue,
                freq_code: 'D'
            })
            this.$store.dispatch('future_info/main_code_interval_raise_fall_data', {
                ts_code_list: data.id,
                start_date: this.dateComValue.add(-100, 'week'),
                end_date: this.dateComValue,
                freq_code: 'W'
            })
            this.$store.dispatch('future_info/main_code_interval_raise_fall_data', {
                ts_code_list: data.id,
                start_date: this.dateComValue.add(-100, 'month'),
                end_date: this.dateComValue,
                freq_code: 'M'
            })

            this.$store.dispatch('future_info/main_code_relative_close_point_data', {
                ts_code_list: data.id,
                start_date: this.dateComValue.add(-150, 'day'),
                end_date: this.dateComValue,
                freq_code: 'D'
            })
            this.$store.dispatch('future_info/main_code_relative_close_point_data', {
                ts_code_list: data.id,
                start_date: this.dateComValue.add(-100, 'week'),
                end_date: this.dateComValue,
                freq_code: 'W'
            })
            this.$store.dispatch('future_info/main_code_relative_close_point_data', {
                ts_code_list: data.id,
                start_date: this.dateComValue.add(-100, 'month'),
                end_date: this.dateComValue,
                freq_code: 'M'
            })
        },
        changeEventDate(val) {
            this.dateComValue = this.dayjs(val)
        }
    },
    components: {
        datecom,
        summarize_bar,
        multi_point_line
    }
}
</script>

<style lang="less" scoped>
</style>
