<template>
	<div id="summarize">
		<el-header class="header-split-line">
			<el-col :span="6">
				<dateCom @changeDate="changeEventDate" :dateComValue="dateComValue"></dateCom>
			</el-col>
			<el-col :span="6">
				<tsCodeCom @changeCode="changeTsCodeComValue" :tsCodeComValue="tsCodeComValue" :mainTsCode="mainTsCode"></tsCodeCom>
			</el-col>
			<el-col :span="6">
				<freqCodeCom @changeFreqCode="changeFreqCodeComValue" :freqCodeComValue="freqCodeComValue"></freqCodeCom>
			</el-col>
		</el-header>
		<el-header class="header-split-line">
			<el-col :span="6">
				<tradeTypeCom @changeTradeType="changeTradeType" :tradeTypeValue="tradeTypeValue"></tradeTypeCom>
			</el-col>
			<el-col :span="6">
				<normalInputCom @changeComValue="changeBsNumber" :comValue="bs_number" comName="交易数量"></normalInputCom>
			</el-col>
			<el-col :span="6">
				<normalInputCom @changeComValue="changeBsPoint" :comValue="bs_point" comName="交易价格"></normalInputCom>
			</el-col>
		</el-header>
		<el-container>
			<el-aside class="main-el-aside" width="200px">
				<el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
			</el-aside>
			<el-main>
				<h2>BS Note</h2>
				<el-input type="textarea" :autosize="{ minRows: 10, maxRows: 50}" placeholder="请输入内容" v-model="bs_note"></el-input>
				<el-button type="primary" @click.native="commit_bs_note">提交</el-button>
			</el-main>
		</el-container>
		<!-- <router-view /> -->
	</div>
</template>

<script>
	import dateCom from '../components/paramComponents/dateCom.vue'
	import tsCodeCom from '../components/paramComponents/tsCodeCom.vue'
	import freqCodeCom from '../components/paramComponents/freqCodeCom.vue'
	import tradeTypeCom from '../components/paramComponents/tradeTypeCom.vue'
	import normalInputCom from '../components/paramComponents/normalInputCom.vue'
	import ajax from '../assets/ajax.js'

	export default {
		data() {
			return {
				mainTsCode: '',
				dateComValue: this.dayjs(),
				tsCodeComValue: '',
				freqCodeComValue: '',
				tradeTypeValue: '',
				bs_note: "",
				bs_number: "",
				bs_point: ""
			};
		},
		computed: {
			aside_future_data() {
				return this.$store.getters['future_info/aside_future_data']
			},

		},
		methods: {
			aside_data_click(data) {
				if (data.id.length == 1) {
					this.mainTsCode = data.id[0];
					this.tsCodeComValue = '';

				}
			},
			changeEventDate(val) {
				this.dateComValue = this.dayjs(val);
			},
			changeTsCodeComValue(val) {
				this.tsCodeComValue = val
			},
			changeFreqCodeComValue(val) {
				this.freqCodeComValue = val
			},
			changeTradeType(val) {
				this.tradeTypeValue = val
			},
			changeBsNumber(val) {
				this.bs_number = val
			},
			changeBsPoint(val) {
				this.bs_point = val
			},
			commit_bs_note() {
				if (this.bs_note && this.dateComValue && this.tsCodeComValue && this.freqCodeComValue && this.tradeTypeValue && this.bs_number && this.bs_point) {
					ajax.post({
						url: 'note/bs_note_write',
						data: {
							main_ts_code: this.mainTsCode,
							ts_code: this.tsCodeComValue,
							trade_date: this.dateComValue.format('YYYY-MM-DD'), 
							freq_code: this.freqCodeComValue,
							trade_type: this.tradeTypeValue,
							number: this.bs_number,
							point: this.bs_point,
							note: this.bs_note
						},
						
					}).then((response) => {
						if (response.status === 200) {
							this.$message({
								message: '提交成功',
								type: 'success'
							})
						}
					}).catch((err) => {
						this.$message({
							message: err,
							type: 'error'
						})
					})
				} else {
					this.$message({
						message: '参数不合法 提交失败',
						type: 'error'
					})
				}
			}
		},
		components: {
			dateCom,
			tsCodeCom,
			freqCodeCom,
			tradeTypeCom,
			normalInputCom
		}
	};
</script>

<style lang="less" scoped>
</style>
