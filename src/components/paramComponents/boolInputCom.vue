<template>
	<div class="block box-align" align="left">
		<span class="demonstration">{{comName}}</span>

		<el-autocomplete class="inline-input box-border" v-model="boolTypeValue" :fetch-suggestions="querySearch"
		 placeholder="请输入内容" @input="changeboolType"></el-autocomplete>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				boolTypeValue: this.$attrs.boolTypeValue.toString(),
			}
		},
		props: ["comName"],
		methods: {
			changeboolType(val) {
				this.$emit('changeboolType', Boolean(val))
			},
			querySearch(queryString, cb) {
				// 调用 callback 返回建议列表的数据
				let boolTypeList = [{
					value: "true"
				}, {
					value: "false"
				}]
				cb(boolTypeList);
			}
		}
	};
</script>

<style scoped>
	.box-border {
		margin: 10px;
	}
</style>
