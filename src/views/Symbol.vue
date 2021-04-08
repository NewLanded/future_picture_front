<template>
	<div id="note">
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
			<el-aside class="main-el-aside">
				<el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
			</el-aside>
			<el-main>
				<h3 class="comment-height">月线</h3>
				<k_bar :print_data="main_code_interval_point_data.M" :key='1'></k_bar>
				<h3 class="comment-height">周线</h3>
				<k_bar :print_data="main_code_interval_point_data.W" :key='2'></k_bar>
				<h3 class="comment-height">日线</h3>
				<k_bar :print_data="ts_code_interval_point_data.D" :key='3'></k_bar>
				
				<h3 class="comment-height">前N持仓占比</h3>
				<k_vol_bar :print_data="ts_code_interval_pure_holding_data_first_n" :key='4'></k_vol_bar>
				
				<h3 class="comment-height">持仓明细</h3>
				<el-row :gutter="20" type="flex">
					<el-col :span="12">
						<k_vol_pie_bar :print_data="ts_code_interval_pure_volume_max_date_data.long" @changePieBroker="changePieBroker" :pie_name="pie_name_1" :key='5'></k_vol_pie_bar>
					</el-col>
					<el-col :span="12">
						<k_vol_bar_origin :print_data="ts_code_interval_pure_volume_broker_data.long" :key='6'></k_vol_bar_origin>
					</el-col>
				</el-row>
				<el-row :gutter="20" type="flex">
					<el-col :span="12">
						<k_vol_pie_bar :print_data="ts_code_interval_pure_volume_max_date_data.short" @changePieBroker="changePieBroker" :pie_name="pie_name_2" :key='7'></k_vol_pie_bar>
					</el-col>
					<el-col :span="12">
						<k_vol_bar_origin :print_data="ts_code_interval_pure_volume_broker_data.short" :key='6'></k_vol_bar_origin>
					</el-col>
				</el-row>
				<el-row :gutter="20" type="flex">
					<el-col :span="12">
						<k_vol_pie_bar :print_data="ts_code_interval_pure_volume_max_date_data.vol" @changePieBroker="changePieBroker" :pie_name="pie_name_3" :key='9'></k_vol_pie_bar>
					</el-col>
					<el-col :span="12">
						<k_vol_bar_origin :print_data="ts_code_interval_pure_volume_broker_data.vol" :key='6'></k_vol_bar_origin>
					</el-col>
				</el-row>
				
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
		data() {
			return {
				dateComValue: new Date(),
				tsCodeComValue: '',
				mainTsCode: '',
				pie_name_1: '多头',
				pie_name_2: '空头',
				pie_name_3: '成交量',
				pieBroker: ''
			};
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
				};
				for (let freq_code in result_ori) {
					for (let date in result_ori[freq_code]) {
						result[freq_code].date.push(date)
						result[freq_code].data.push([result_ori[freq_code][date].open, result_ori[freq_code][date].close, result_ori[
							freq_code][date].low, result_ori[freq_code][date].high])
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
				};
				for (let freq_code in result_ori) {
					for (let date in result_ori[freq_code]) {
						result[freq_code].date.push(date)
						result[freq_code].data.push([result_ori[freq_code][date].open, result_ori[freq_code][date].close, result_ori[
							freq_code][date].low, result_ori[freq_code][date].high])
					}
				}
				return result
			},
			ts_code_interval_pure_holding_data_first_n() {
				let result_ori = this.$store.state.future_info.ts_code_interval_pure_holding_data_first_n;
				
				let result = {}
				for (let index in result_ori){
					let first_n_data_now = result_ori[index];
					result[first_n_data_now.first_n] = {date: [], long: [], long_percent: [], short: [], short_percent: []}
					for (let index_data in first_n_data_now.data){
						let data = first_n_data_now.data[index_data];
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
				let result_ori = this.$store.state.future_info.ts_code_interval_pure_volume_data;
				
				let max_date = "1990-01-01";
				for (let key in result_ori){
					let data_now = result_ori[key];
					for (let index in data_now){
						if(data_now[index]['date'] > max_date){
							max_date = data_now[index]['date']
						}
					}
				}
				
				let result = {long: [], short: [], vol: []}
				for (let key in result_ori){
					let data_now = result_ori[key];
					for (let index in data_now){
						if (data_now[index]['date'] == max_date){
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
				let result_ori = this.$store.state.future_info.ts_code_interval_pure_volume_data;
				
				let max_date = "1990-01-01";
				let min_date = "2199-12-31";
				let dateRange = [];
				for (let key in result_ori){
					let data_now = result_ori[key];
					for (let index in data_now){
						if(data_now[index]['date'] > max_date){
							max_date = data_now[index]['date']
						}
						if(data_now[index]['date'] < min_date){
							min_date = data_now[index]['date']
						}
						dateRange.push(data_now[index]['date'])
					}
				}
				dateRange = [...new Set(dateRange)]
				dateRange.sort()
				
				let result = {long: {}, short: {}, vol: {}}
				for (let key in result_ori){
					let data_now = result_ori[key];
					for (let index in data_now){
						if (data_now[index]['broker'] == this.pieBroker){
							result[key][data_now[index]['date']] = {
								amount: data_now[index]['amount'],
								percent: data_now[index]['percent'],
								date: data_now[index]['date']
							}
						}
					}
				}
				
				let result_formated = {long: [], short: [], vol: []}
				for (let key in result){
					let data_now = result[key];
					for (let date_now_index in dateRange){
						if(dateRange[date_now_index] in data_now){
							result_formated[key].push(data_now[dateRange[date_now_index]])
						}else{
							result_formated[key].push({
								amount: 0,
								percent: 0,
								date: dateRange[date_now_index]
							})
						}
					}
				}
				
				return result_formated
			}
		},
		methods: {
			aside_data_click(data) {
				if (data.id.length == 1) {
					let mainTsCode = data.id[0];
					this.mainTsCode = data.id[0];
					this.tsCodeComValue = '';
					this.pieBroker = '';

					this.point_picture_func(mainTsCode, this.dateComValue)
					this.volume_picture_func(mainTsCode, this.dateComValue)
					
				}

			},
			
			point_picture_func(ts_code, end_date){
				this.$store.dispatch('future_info/main_code_interval_point_data', {
					ts_code: ts_code,
					start_date: new Date(end_date.getTime() - 3600 * 1000 * 24 * 3650),
					end_date: end_date,
					freq_code: 'M'
				})
				this.$store.dispatch('future_info/main_code_interval_point_data', {
					ts_code: ts_code,
					start_date: new Date(end_date.getTime() - 3600 * 1000 * 24 * 854),
					end_date: end_date,
					freq_code: 'W'
				})
			},
			
			volume_picture_func(ts_code, end_date){
				this.$store.dispatch('future_info/ts_code_interval_point_data', {
					ts_code: ts_code,
					start_date: new Date(end_date.getTime() - 3600 * 1000 * 24 * 180),
					end_date: end_date,
					freq_code: 'D'
				})
				this.$store.dispatch('future_info/ts_code_interval_pure_holding_data_first_n', {
					ts_code: ts_code,
					start_date: new Date(end_date.getTime() - 3600 * 1000 * 24 * 180),
					end_date: end_date
				})
				this.$store.dispatch('future_info/ts_code_interval_pure_volume_data', {
					ts_code: ts_code,
					start_date: new Date(end_date.getTime() - 3600 * 1000 * 24 * 180),
					end_date: end_date
				})
			},
			
			changeEventDate(val) {
				this.dateComValue = val;
				
				let ts_code = this.tsCodeComValue
				if(!ts_code){
					ts_code = this.mainTsCode
				}
				
				this.point_picture_func(ts_code, this.dateComValue)
				this.volume_picture_func(ts_code, this.dateComValue)
			},
			changeTsCodeComValue(val) {
				this.tsCodeComValue = val;
				this.volume_picture_func(this.tsCodeComValue, this.dateComValue)
			},
			changePieBroker(val) {
				this.pieBroker = val;
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
	};
</script>


<style>
	.comment-height{
		line-height: 50px;
	}
</style>
