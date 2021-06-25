<template>
    <div id="step">
        <el-header class="header-split-line">
            <el-row :gutter="20" type="flex">
                <el-col :span="6">
                    <datecom @changeDate="changeEventDate" :dateComValue="dateComValue"></datecom>
                </el-col>
                <el-col :span="6">
                    <el-button style="margin-top:10px" @click="nextDay">下一日</el-button>
                </el-col>
                <el-col :span="6">
                    <el-button style="margin-top:10px" @click="nextWeek">下一周</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="main-el-aside">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <h3 class="comment-height">日线 {{plot_data_date}}</h3>
                <k_bar :print_data="day_data['plotted']" :contract_change_date="contract_change_date_by_main_ts_code" :key='3'></k_bar>
                <h3 class="comment-height">周线</h3>
                <k_bar :print_data="week_data['plotted']" :contract_change_date="contract_change_date_by_main_ts_code" :key='2'></k_bar>
                <h3 class="comment-height">月线</h3>
                <k_bar :print_data="month_data['plotted']" :contract_change_date="contract_change_date_by_main_ts_code" :key='1'></k_bar>
            </el-main>
        </el-container>
        <!-- <router-view /> -->
    </div>
</template>

<script>
import datecom from '../components/paramComponents/dateCom.vue'
import k_bar from '../components/print/k_bar.vue'

export default {
    data() {
        return {
            dateComValue: this.dayjs(),
            plot_data_date: null,
            day_data: null,
            week_data: null,
            month_data: null,
            day_week_month_data_default: {
                queued: {
                    date: [],
                    data: []
                },
                plotted: {
                    date: [],
                    data: []
                }
            }
        }
    },
    created() {
        this.day_data = this.lodash.cloneDeep(this.day_week_month_data_default)
        this.week_data = this.lodash.cloneDeep(this.day_week_month_data_default)
        this.month_data = this.lodash.cloneDeep(this.day_week_month_data_default)
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        },
        contract_change_date_by_main_ts_code() {
            let result = this.$store.state.future_info.contract_change_date_by_main_ts_code
            return result
        }
    },
    watch: {
        '$store.state.future_info.main_code_interval_point_data': {
            deep: true,
            handler(newVal, oldVal) {
                this.code_interval_point_data_ori()
            }
        },
        '$store.state.future_info.ts_code_interval_point_data': {
            deep: true,
            handler(newVal, oldVal) {
                this.code_interval_point_data_ori()
            }
        }
    },
    methods: {
        code_interval_point_data_ori() {
            let main_result_ori = this.$store.state.future_info.main_code_interval_point_data
            let ts_result_ori = this.$store.state.future_info.ts_code_interval_point_data

            let all_result_ori = {}
            all_result_ori['D'] = ts_result_ori['D']
            all_result_ori['W'] = main_result_ori['W']
            all_result_ori['M'] = main_result_ori['M']

            if (all_result_ori['D'].length) {
                // 以日线数据的时间为标准, 将数据分割
                let split_date_index = Math.floor(all_result_ori['D'].length / 2)
                let split_date = all_result_ori['D'][split_date_index].date
                // 把日期搞到周五, 为 下一个星期 这个按钮做准备
                split_date = this.dayjs(split_date).day(5).format('YYYY-MM-DD')
                this.plot_data_date = split_date

                for (let freq_code in all_result_ori) {
                    let freq_data_now = this.lodash.cloneDeep(this.day_week_month_data_default)

                    let freq_data_array_name = ''
                    for (let index in all_result_ori[freq_code]) {
                        if (all_result_ori[freq_code][index].date <= split_date) {
                            freq_data_array_name = 'plotted'
                        } else {
                            freq_data_array_name = 'queued'
                        }

                        freq_data_now[freq_data_array_name]['date'].push(all_result_ori[freq_code][index].date)
                        freq_data_now[freq_data_array_name]['data'].push([
                            all_result_ori[freq_code][index].open,
                            all_result_ori[freq_code][index].close,
                            all_result_ori[freq_code][index].low,
                            all_result_ori[freq_code][index].high
                        ])
                    }

                    if (freq_code === 'M') {
                        this.month_data = freq_data_now
                    } else if (freq_code === 'W') {
                        this.week_data = freq_data_now
                    } else {
                        this.day_data = freq_data_now
                    }
                }
            }
        },
        aside_data_click(data) {
            if (data.id.length === 1) {
                let mainTsCode = data.id[0]
                this.point_picture_func(mainTsCode, this.dateComValue)
            }
        },

        point_picture_func(ts_code, end_date) {
            this.$store.dispatch('future_info/main_code_interval_point_data', {
                ts_code: ts_code,
                start_date: end_date.add(-180, 'month'),
                end_date: end_date,
                freq_code: 'M'
            })
            this.$store.dispatch('future_info/main_code_interval_point_data', {
                ts_code: ts_code,
                start_date: end_date.add(-180, 'week'),
                end_date: end_date,
                freq_code: 'W'
            })
            this.$store.dispatch('future_info/ts_code_interval_point_data', {
                ts_code: ts_code,
                start_date: end_date.add(-270, 'day'),
                end_date: end_date,
                freq_code: 'D'
            })
            this.$store.dispatch('future_info/contract_change_date_by_main_ts_code', {
                main_ts_code: ts_code,
                start_date: end_date.add(-180, 'month'),
                end_date: end_date
            })
        },

        changeEventDate(val) {
            this.dateComValue = val
            this.point_picture_func(this.dateComValue, this.dateComValue)
        },
        nextWeek() {
            let all_data = {
                D: this.day_data,
                W: this.week_data,
                M: this.month_data
            }

            let date_now = this.dayjs(this.plot_data_date).day(12).format('YYYY-MM-DD')
            // 对于国庆和新年等假期可能连续一周的情况做处理
            if (all_data['D']['queued']['date'].length != 0 && all_data['D']['queued']['date'][0] > date_now) {
                date_now = this.dayjs(date_now).day(12).format('YYYY-MM-DD')
            }

            let exists_date_flag = false
            for (let freq_code in all_data) {
                while (all_data[freq_code]['queued']['date'].length != 0 && all_data[freq_code]['queued']['date'][0] <= date_now) {
                    all_data[freq_code]['plotted']['date'].splice(0, 1)
                    all_data[freq_code]['plotted']['data'].splice(0, 1)
                    all_data[freq_code]['plotted']['date'].push(all_data[freq_code]['queued']['date'].splice(0, 1)[0])
                    all_data[freq_code]['plotted']['data'].push(all_data[freq_code]['queued']['data'].splice(0, 1)[0])
                    exists_date_flag = true
                }
            }
            if (exists_date_flag == false) {
                this.$message('已经是最后一条数据')
            } else {
                this.plot_data_date = date_now
            }
        },
        nextDay() {
            let all_data = {
                D: this.day_data,
                W: this.week_data,
                M: this.month_data
            }

            let date_now = this.plot_data_date
            let exists_date_flag = false
            if (all_data['D']['queued']['date'].length != 0) {
                date_now = all_data['D']['queued']['date'][0]

                for (let freq_code in all_data) {
                    if (all_data[freq_code]['queued']['date'].length != 0 && all_data[freq_code]['queued']['date'][0] <= date_now) {
                        all_data[freq_code]['plotted']['date'].splice(0, 1)
                        all_data[freq_code]['plotted']['data'].splice(0, 1)
                        all_data[freq_code]['plotted']['date'].push(all_data[freq_code]['queued']['date'].splice(0, 1)[0])
                        all_data[freq_code]['plotted']['data'].push(all_data[freq_code]['queued']['data'].splice(0, 1)[0])
                        exists_date_flag = true
                    }
                }
            }

            if (exists_date_flag == false) {
                this.$message('已经是最后一条数据')
            } else {
                this.plot_data_date = date_now
            }
        }
    },
    components: {
        datecom,
        k_bar
    }
}
</script>

<style lang="less" scoped>
</style>
