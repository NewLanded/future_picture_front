<template>
	<div class="demo-autocomplete block box-align">
		<span class="demonstration">代码</span>
		<el-autocomplete class="inline-input box-border" v-model="tsCodeComValue" :fetch-suggestions="querySearch"
		 placeholder="请输入内容" @input="changeCode"></el-autocomplete>
	</div>
</template>

<script>
	export default {


		data() {
			return {
				tsCodeComValue: this.$attrs.tsCodeComValue
			};
		},
		computed: {
			tsCodeList() {
				let result = [];
				let mainTsCodeList = this.$attrs.mainTsCode.split(".");

				let date = new Date();
				let year = date.getFullYear().toString().slice(2);

				for (var i = 1; i <= 12; i++) {
					if (i < 10) {
						result.push({value: mainTsCodeList[0] + year + '0' + i + "." + mainTsCodeList[1]})
					} else {
						result.push({value: mainTsCodeList[0] + year + i + "." + mainTsCodeList[1]})
					}
				};
				return result;

			}
		},
		methods: {
			changeCode(val) {
				this.$emit('changeCode', val)
			},
			querySearch(queryString, cb) {
				// 调用 callback 返回建议列表的数据
				let tsCodeList = this.tsCodeList;
				cb(tsCodeList);
			}
		},

	}
</script>

<style>
	.box-border {
		margin: 10px;
	}
</style>
