<template>
	<div class="block box-align" align="left">
		<span class="demonstration">频率</span>

		<el-autocomplete class="inline-input box-border" v-model="freqCodeComValue" :fetch-suggestions="querySearch"
		 placeholder="请输入内容" @input="changeFreqCode"></el-autocomplete>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				freqCodeComValue: this.$attrs.freqCodeComValue,
			}
		},
		methods: {
			changeFreqCode(val) {
				this.$emit('changeFreqCode', val)
			},
			querySearch(queryString, cb) {
				// 调用 callback 返回建议列表的数据
				let freqCodeList = [{value: 'D'}, {value: 'W'}, {value: 'M'}]
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
