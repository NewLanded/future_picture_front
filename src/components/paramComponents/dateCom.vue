<template>
	<div class="block box-align" align="left">
		<span class="demonstration">日期</span>

		<el-date-picker v-model="date" @change="changeDate" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"
		 class="box-border"></el-date-picker>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				date: this.$attrs.dateComValue,
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '一周前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}, {
						text: '一月前',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', date);
						}
					}]
				},
			};
		},
		methods: {
			changeDate(val) {
				this.$emit('changeDate', val)
			}
		}
	};
</script>

<style scoped>
	.box-border {
		margin: 10px;
	}
</style>
