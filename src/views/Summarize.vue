<template>
	<div id="summarize">
		<el-header class="header-split-line">
			<datecom @changeDate="changeEventDate" :dateComValue="dateComValue"></datecom>
		</el-header>
		<el-container>
			<el-aside class="main-el-aside">
				<el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
			</el-aside>
			<el-main>
				<h2>日</h2>
				<summarize_bar :print_data="main_code_interval_raise_fall_data.D" :key='1'></summarize_bar>
				<h2>周</h2>
				<summarize_bar :print_data="main_code_interval_raise_fall_data.W" :key='2'></summarize_bar>
				<h2>月</h2>
				<summarize_bar :print_data="main_code_interval_raise_fall_data.M" :key='3'></summarize_bar>
			</el-main>
		</el-container>
		<!-- <router-view /> -->
	</div>
</template>

<script>
	import datecom from '../components/paramComponents/dateCom.vue'
	import summarize_bar from '../components/print/summarize_bar.vue'

	export default {
		// this.$store.commit('login/set_token', response.data.access_token)
		// store.state.login.token
		data() {
			return {
				dateComValue: new Date()
			};
		},
		computed: {
			aside_future_data() {
				return this.$store.getters['future_info/aside_future_data']
			},
			main_code_interval_raise_fall_data() {
				// let result_ori = this.$store.getters['future_info/main_code_interval_raise_fall_data']
				let result_ori = this.$store.state.future_info.main_code_interval_raise_fall_data

				let result = {};
				for (let i in result_ori) {
					result[i] = result_ori[i].slice(-30);
				}

				let result_format = {};
				for (let i in result) {
					result_format[i] = {
						date: [],
						raise: [],
						fall: []
					};
					for (let v in result[i]) {
						result_format[i]['date'].push(result[i][v].date);
						result_format[i]['raise'].push(result[i][v].raise_num);
						result_format[i]['fall'].push(result[i][v].fall_num);
					}
				}

				return result_format
			}
		},
		methods: {
			aside_data_click(data) {

				this.$store.dispatch('future_info/main_code_interval_raise_fall_data', {
					ts_code_list: data.id,
					start_date: new Date(this.dateComValue.getTime() - 3600 * 1000 * 24 * 120),
					end_date: this.dateComValue,
					freq_code: 'D'
				})
				this.$store.dispatch('future_info/main_code_interval_raise_fall_data', {
					ts_code_list: data.id,
					start_date: new Date(this.dateComValue.getTime() - 3600 * 1000 * 24 * 460),
					end_date: this.dateComValue,
					freq_code: 'W'
				})
				this.$store.dispatch('future_info/main_code_interval_raise_fall_data', {
					ts_code_list: data.id,
					start_date: new Date(this.dateComValue.getTime() - 3600 * 1000 * 24 * 2000),
					end_date: this.dateComValue,
					freq_code: 'M'
				})
			},
			changeEventDate(val) {
				this.dateComValue = val;
			}
		},
		components: {
			datecom,
			summarize_bar
		}
	};
</script>

<style lang="less" scoped>
</style>
