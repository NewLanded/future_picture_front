<template>
	<div class="block box-align" align="left">
		<span class="demonstration">交易类型</span>

		<el-autocomplete class="inline-input box-border" v-model="tradeTypeValue" :fetch-suggestions="querySearch"
		 placeholder="请输入内容" @input="changeTradeType"></el-autocomplete>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tradeTypeValue: this.$attrs.tradeTypeValue,
			}
		},
		methods: {
			changeTradeType(val) {
				this.$emit('changeTradeType', val)
			},
			querySearch(queryString, cb) {
				// 调用 callback 返回建议列表的数据
				let freqCodeList = [{
					value: 'long_open'
				}, {
					value: 'long_gallon'
				}, {
					value: 'long_reduce'
				}, {
					value: 'long_close'
				}, {
					value: 'short_open'
				}, {
					value: 'short_gallon'
				}, {
					value: 'short_reduce'
				}, {
					value: 'short_close'
				}]
				cb(freqCodeList);
			}
		}
	};
</script>

<style scoped>
	.box-border {
		margin: 10px;
	}
</style>
