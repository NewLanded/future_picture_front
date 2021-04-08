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
				<state_tree :print_data="main_code_interval_raise_fall_data" :key='1'></state_tree>
			</el-main>
		</el-container>
		<!-- <router-view /> -->
	</div>
</template>

<script>
	import datecom from '../components/paramComponents/dateCom.vue'
	import state_tree from '../components/print/state_tree.vue'

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
				let result_ori = this.$store.state.future_info.main_code_interval_raise_fall_data
				let result_format = {
					"name": "品种",
					"children": [{
						"name": "玻璃",
						
						// "itemStyle": {
						// 	"color": "red"
						// },
						
						"children": [{
								"name": "趋势",
								"children": [{
										"name": "月线持续前期方向",
									},
									{
										"name": "日线MA5和月线方向相同",
									},
									{
										"name": "MACD周线变化方向和月线方向相同",
									},
									{
										"name": "主要持仓交易所持仓数量未明显反向变化",
									},
								]
							},
							{
								"name": "反转",
								"children": [{
										"name": "MACD月线反转",
									},
									{
										"name": "主要持仓交易所持仓数量反转",
									},
									
								]
							}
						]
					}, ]
				};

				return result_format
			}
		},
		methods: {
			aside_data_click(data) {

				// this.$store.dispatch('future_info/main_code_interval_raise_fall_data', {
				// 	ts_code_list: data.id,
				// 	start_date: new Date(this.dateComValue.getTime() - 3600 * 1000 * 24 * 60),
				// 	end_date: this.dateComValue,
				// 	freq_code: 'D'
				// })
			},
			changeEventDate(val) {
				this.dateComValue = val;
			}
		},
		components: {
			datecom,
			state_tree
		}
	};
</script>

<style lang="less" scoped>
</style>
