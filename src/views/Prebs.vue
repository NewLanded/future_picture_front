<template>
	<div id="summarize">
		<el-header class="header-split-line">

		</el-header>
		<el-container>
			<el-aside class="main-el-aside" width="200px">
				<el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
			</el-aside>
			<el-main>
				<div class="title_level_two">震荡----不做, 趋势策略死于震荡, 震荡策略死于趋势, 混着做, 取死之道</div>
				<el-divider></el-divider>
				<div class="title_level_two">趋势----开仓</div>
				<el-divider></el-divider>
				<el-table ref="multipleTable" :data="trend_open" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="" label="" width="70"></el-table-column>
					<el-table-column prop="condition" label="条件" width="1200"></el-table-column>
				</el-table>
				<el-divider></el-divider>
				<div class="title_level_two">趋势----加仓</div>
				<el-divider></el-divider>
				<el-table ref="multipleTable" :data="trend_add" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="" label="" width="70"></el-table-column>
					<el-table-column prop="condition" label="条件" width="1200"></el-table-column>
				</el-table>
				<el-divider></el-divider>
				<div class="title_level_two">趋势----减仓</div>
				<el-divider></el-divider>
				<el-table ref="multipleTable" :data="trend_reduce" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="" label="" width="70"></el-table-column>
					<el-table-column prop="condition" label="条件" width="1200"></el-table-column>
				</el-table>
				<el-divider></el-divider>
				<div class="title_level_two">趋势----平仓</div>
				<el-divider></el-divider>
				<el-table ref="multipleTable" :data="trend_close" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="" label="" width="70"></el-table-column>
					<el-table-column prop="condition" label="条件" width="1200"></el-table-column>
				</el-table>

			</el-main>
		</el-container>
		<!-- <router-view /> -->
	</div>
</template>

<script>
	import state_tree from '../components/print/state_tree.vue'
	import {trend_common_data, trend_open_data, trend_add_data, trend_reduce_data, trend_close_data} from '../../config.host.js'

	export default {
		data() {
			return {
				trend_common_data: trend_common_data,
				trend_open_data: trend_open_data,
				trend_add_data: trend_add_data,
				trend_reduce_data: trend_reduce_data,
				trend_close_data: trend_close_data,
				multipleSelection: []
			}
		},
		computed: {
			aside_future_data() {
				return this.$store.getters['future_info/aside_future_data']
			},
			trend_open(){
				return [...this.trend_common_data, ...this.trend_open_data]
			},
			trend_add(){
				return [...this.trend_common_data, ...this.trend_add_data]
			},
			trend_reduce(){
				return this.trend_reduce_data
			},
			trend_close(){
				return this.trend_close_data
			},
		},
		methods: {
			aside_data_click(data) {},
			handleSelectionChange(val) {
				console.log(val)
				// this.multipleSelection = val;
			}
		},
		components: {
			state_tree
		}
	};
</script>

<style lang="less" scoped>
	// .title_level_one {
	// 	text-align: left;
	// 	font-size: 20px;
	// 	font-weight: bold;
	// }

	.title_level_two {
		text-align: left;
		font-size: 18px;
		font-weight: bold;
	}
	
	.title_level_three {
		text-align: left;
		font-size: 16px;
		font-weight: bold;
	}
</style>
