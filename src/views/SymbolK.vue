<template>
    <div id="symbol">
        <el-header class="header-split-line">
            <el-row :gutter="20" type="flex">
                <el-col :span="6">
                    <datecom @changeDate="changeEventDate" :dateComValue="dateComValue"></datecom>
                </el-col>
                <el-col :span="6">
                    <ts_code_com @changeCode="changeTsCodeComValue" :tsCodeComValue="tsCodeComValue" :mainTsCode="mainTsCode"></ts_code_com>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <h3 class="comment-height">月线</h3>
                <k_bar :print_data="main_code_interval_point_data.M" :contract_change_date="contract_change_date_by_main_ts_code" :bs_note_data="bs_note_data.M" :note_data="note_data.M" :key='1'></k_bar>
                <h3 class="comment-height">周线</h3>
                <k_bar :print_data="main_code_interval_point_data.W" :contract_change_date="contract_change_date_by_main_ts_code" :bs_note_data="bs_note_data.W" :note_data="note_data.W" :key='2'></k_bar>
                <h3 class="comment-height">日线 {{dateComValue}}</h3>
                <k_bar :print_data="ts_code_interval_point_data.D" :contract_change_date="contract_change_date_by_main_ts_code" :bs_note_data="bs_note_data.D" :note_data="note_data.D" :key='3'></k_bar>

                <h3 class="comment-height">持仓明细</h3>
                <el-row :gutter="20" type="flex">
                    <el-col :span="12">
                        <k_vol_pie_bar :print_data="ts_code_interval_pure_volume_max_date_data.long" @changePieBroker="changePieBroker" :pie_name="pie_name_1" :key='4'></k_vol_pie_bar>
                    </el-col>
                    <el-col :span="12">
                        <k_vol_bar_origin :print_data="ts_code_interval_pure_volume_broker_data.long" :key='5'></k_vol_bar_origin>
                    </el-col>
                </el-row>
                <el-row :gutter="20" type="flex">
                    <el-col :span="12">
                        <k_vol_pie_bar :print_data="ts_code_interval_pure_volume_max_date_data.short" @changePieBroker="changePieBroker" :pie_name="pie_name_2" :key='6'></k_vol_pie_bar>
                    </el-col>
                    <el-col :span="12">
                        <k_vol_bar_origin :print_data="ts_code_interval_pure_volume_broker_data.short" :key='7'></k_vol_bar_origin>
                    </el-col>
                </el-row>
                <!-- <el-row :gutter="20" type="flex">
					<el-col :span="12">
						<k_vol_pie_bar :print_data="ts_code_interval_pure_volume_max_date_data.vol" @changePieBroker="changePieBroker" :pie_name="pie_name_3" :key='9'></k_vol_pie_bar>
					</el-col>
					<el-col :span="12">
						<k_vol_bar_origin :print_data="ts_code_interval_pure_volume_broker_data.long_vol" :key='10'></k_vol_bar_origin>
					</el-col>
				</el-row>
				<el-row :gutter="20" type="flex">
					<el-col :span="12">
						<k_vol_pie_bar :print_data="ts_code_interval_pure_volume_max_date_data.vol" @changePieBroker="changePieBroker" :pie_name="pie_name_4" :key='11'></k_vol_pie_bar>
					</el-col>
					<el-col :span="12">
						<k_vol_bar_origin :print_data="ts_code_interval_pure_volume_broker_data.short_vol" :key='12'></k_vol_bar_origin>
					</el-col>
				</el-row> -->

                <h3 class="comment-height">前N持仓占比</h3>
                <k_vol_bar :print_data="ts_code_interval_pure_holding_data_first_n" :key='8'></k_vol_bar>

                <div style="height: 200px;"></div>
            </el-main>

        </el-container>
        <!-- <router-view /> -->
    </div>
</template>


<script>
import datecom from '../components/paramComponents/dateCom.vue'
import k_bar from '../components/print/k_bar.vue'
import k_vol_bar from '../components/print/k_vol_bar.vue'
import k_vol_bar_origin from '../components/print/k_vol_bar_origin.vue'
import k_vol_pie_bar from '../components/print/k_vol_pie_bar.vue'
import ts_code_com from '../components/paramComponents/tsCodeCom.vue'

export default {
    name: 'SymbolK',
    data() {
        return {
            dateComValue: this.dayjs(),
            tsCodeComValue: '',
            mainTsCode: '',
            pie_name_1: '多头',
            pie_name_2: '空头',
            pie_name_3: '成交量-多',
            pie_name_4: '成交量-空',
            pieBroker: '',
            pie_volume_broker_data: null,
            pie_volume_broker_data_default: { long: [], short: [], long_vol: [], short_vol: [] }
        }
    },
    created() {
        this.pie_volume_broker_data = this.lodash.cloneDeep(this.pie_volume_broker_data_default)
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        },
        main_code_interval_point_data() {
            let result_ori = this.$store.state.future_info.main_code_interval_point_data

            let result = {
                M: {
                    date: [],
                    data: []
                },
                W: {
                    date: [],
                    data: []
                }
            }

            for (let freq_code in result_ori) {
                for (let index in result_ori[freq_code]) {
                    result[freq_code].date.push(result_ori[freq_code][index].date)
                    result[freq_code].data.push([
                        result_ori[freq_code][index].open,
                        result_ori[freq_code][index].close,
                        result_ori[freq_code][index].low,
                        result_ori[freq_code][index].high
                    ])
                }
            }
            return result
        },
        ts_code_interval_point_data() {
            let result_ori = this.$store.state.future_info.ts_code_interval_point_data

            let result = {
                D: {
                    date: [],
                    data: []
                }
            }
            for (let freq_code in result_ori) {
                for (let index in result_ori[freq_code]) {
                    result[freq_code].date.push(result_ori[freq_code][index].date)
                    result[freq_code].data.push([
                        result_ori[freq_code][index].open,
                        result_ori[freq_code][index].close,
                        result_ori[freq_code][index].low,
                        result_ori[freq_code][index].high
                    ])
                }
            }
            return result
        },
        ts_code_interval_pure_holding_data_first_n() {
            let result_ori = this.$store.state.future_info.ts_code_interval_pure_holding_data_first_n

            let result = {}
            for (let index in result_ori) {
                let first_n_data_now = result_ori[index]
                result[first_n_data_now.first_n] = { date: [], long: [], long_percent: [], short: [], short_percent: [] }
                for (let index_data in first_n_data_now.data) {
                    let data = first_n_data_now.data[index_data]
                    result[first_n_data_now.first_n]['date'].push(data.date)
                    result[first_n_data_now.first_n]['long'].push(data.long)
                    result[first_n_data_now.first_n]['long_percent'].push(data.long_percent)
                    result[first_n_data_now.first_n]['short'].push(data.short)
                    result[first_n_data_now.first_n]['short_percent'].push(data.short_percent)
                }
            }

            return result
        },
        ts_code_interval_pure_volume_max_date_data() {
            let result_ori = this.$store.state.future_info.ts_code_interval_pure_volume_data

            let max_date = '1990-01-01'
            for (let key in result_ori) {
                let data_now = result_ori[key]
                for (let index in data_now) {
                    if (data_now[index]['date'] > max_date) {
                        max_date = data_now[index]['date']
                    }
                }
            }

            let result = { long: [], short: [], vol: [] }
            for (let key in result_ori) {
                let data_now = result_ori[key]
                for (let index in data_now) {
                    if (data_now[index]['date'] == max_date) {
                        result[key].push({
                            name: data_now[index]['broker'],
                            value: data_now[index]['amount']
                        })
                    }
                }
            }

            return result
        },
        ts_code_interval_pure_volume_broker_data() {
            let [dateRange, result] = this.format_ts_code_interval_pure_volume_data(this.pieBroker)

            let max_date = dateRange[dateRange.length - 1]
            let volume_type = ''
            if (max_date in result['long']) {
                volume_type = 'long'
            } else {
                volume_type = 'short'
            }
            let vol_key = volume_type + '_vol'

            this.pie_volume_broker_data[volume_type] = []
            this.pie_volume_broker_data[vol_key] = []

            let long_data_now = result['long']
            let short_data_now = result['short']
            let vol_data_now = result['vol']
            for (let date_now_index in dateRange) {
                if (dateRange[date_now_index] in vol_data_now) {
                    this.pie_volume_broker_data[vol_key].push(vol_data_now[dateRange[date_now_index]])
                } else {
                    this.pie_volume_broker_data[vol_key].push({
                        amount: 0,
                        percent: 0,
                        date: dateRange[date_now_index]
                    })
                }

                if (dateRange[date_now_index] in long_data_now) {
                    this.pie_volume_broker_data[volume_type].push(long_data_now[dateRange[date_now_index]])
                } else if (dateRange[date_now_index] in short_data_now) {
                    this.pie_volume_broker_data[volume_type].push({
                        amount: -short_data_now[dateRange[date_now_index]]['amount'],
                        percent: -short_data_now[dateRange[date_now_index]]['percent'],
                        date: dateRange[date_now_index]
                    })
                } else {
                    this.pie_volume_broker_data[volume_type].push({
                        amount: 0,
                        percent: 0,
                        date: dateRange[date_now_index]
                    })
                }
            }
            return this.pie_volume_broker_data
        },
        contract_change_date_by_main_ts_code() {
            let result = this.$store.state.future_info.contract_change_date_by_main_ts_code

            return result
        },
        note_data() {
            let result_ori = this.$store.state.future_info.note_data

            let result = []
            if (this.tsCodeComValue != '') {
                for (let index in result_ori) {
                    if (result_ori[index]['ts_code'] == this.tsCodeComValue) {
                        result.push(result_ori[index])
                    }
                }
            } else {
                result = result_ori
            }

            let result_new = { D: [], W: [], M: [] }
            for (let index in result) {
                result_new[result[index]['freq_code']].push(result[index])
            }

            return result_new
        },
        bs_note_data() {
            let result_ori = this.$store.state.future_info.bs_note_data

            let result = []
            if (this.tsCodeComValue != '') {
                for (let index in result_ori) {
                    if (result_ori[index]['ts_code'] == this.tsCodeComValue) {
                        result.push(result_ori[index])
                    }
                }
            } else {
                result = result_ori
            }

            let result_new = { D: [], W: [], M: [] }
            for (let index in result) {
                result_new[result[index]['freq_code']].push(result[index])
            }

            return result_new
        }
    },
    methods: {
        format_ts_code_interval_pure_volume_data(pieBroker) {
            let result_ori = this.$store.state.future_info.ts_code_interval_pure_volume_data

            let max_date = '1990-01-01'
            let min_date = '2199-12-31'
            let dateRange = []
            for (let key in result_ori) {
                let data_now = result_ori[key]
                for (let index in data_now) {
                    if (data_now[index]['broker'] == this.pieBroker) {
                        if (data_now[index]['date'] > max_date) {
                            max_date = data_now[index]['date']
                        }
                        if (data_now[index]['date'] < min_date) {
                            min_date = data_now[index]['date']
                        }
                        dateRange.push(data_now[index]['date'])
                    }
                }
            }
            dateRange = [...new Set(dateRange)]
            dateRange.sort()

            let result = { long: {}, short: {}, vol: {} }
            for (let key in result_ori) {
                let data_now = result_ori[key]
                for (let index in data_now) {
                    if (data_now[index]['broker'] == this.pieBroker) {
                        result[key][data_now[index]['date']] = {
                            amount: data_now[index]['amount'],
                            percent: data_now[index]['percent'],
                            date: data_now[index]['date']
                        }
                    }
                }
            }

            return [dateRange, result]
        },

        aside_data_click(data) {
            if (data.id.length == 1) {
                let mainTsCode = data.id[0]
                this.mainTsCode = data.id[0]
                this.tsCodeComValue = ''

                this.pieBroker = ''
                this.pie_volume_broker_data = this.lodash.cloneDeep(this.pie_volume_broker_data_default)

                this.point_picture_func(mainTsCode, this.dateComValue)
                this.volume_picture_func(mainTsCode, this.dateComValue)
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
            this.$store.dispatch('future_info/contract_change_date_by_main_ts_code', {
                main_ts_code: ts_code,
                start_date: end_date.add(-180, 'month'),
                end_date: end_date
            })

            this.$store.dispatch('future_info/note_data', {
                main_ts_code: this.mainTsCode,
                start_date: end_date.add(-180, 'month'),
                end_date: end_date
            })
            this.$store.dispatch('future_info/bs_note_data', {
                main_ts_code: this.mainTsCode,
                start_date: end_date.add(-180, 'month'),
                end_date: end_date
            })
        },

        volume_picture_func(ts_code, end_date) {
            this.$store.dispatch('future_info/ts_code_interval_point_data', {
                ts_code: ts_code,
                start_date: end_date.add(-270, 'day'),
                end_date: end_date,
                freq_code: 'D'
            })
            this.$store.dispatch('future_info/ts_code_interval_pure_holding_data_first_n', {
                ts_code: ts_code,
                start_date: end_date.add(-180, 'day'),
                end_date: end_date
            })
            this.$store.dispatch('future_info/ts_code_interval_pure_volume_data', {
                ts_code: ts_code,
                start_date: end_date.add(-180, 'day'),
                end_date: end_date
            })
        },

        changeEventDate(val) {
            this.dateComValue = this.dayjs(val)

            let ts_code = this.tsCodeComValue
            if (!ts_code) {
                ts_code = this.mainTsCode
            }

            this.point_picture_func(ts_code, this.dateComValue)
            this.volume_picture_func(ts_code, this.dateComValue)
        },
        changeTsCodeComValue(val) {
            this.tsCodeComValue = val
            this.volume_picture_func(this.tsCodeComValue, this.dateComValue)
        },
        changePieBroker(val) {
            this.pieBroker = val
        }
    },
    components: {
        datecom,
        ts_code_com,
        k_bar,
        k_vol_bar,
        k_vol_bar_origin,
        k_vol_pie_bar
    }
}
</script>


<style>
.comment-height {
    line-height: 50px;
}
</style>
