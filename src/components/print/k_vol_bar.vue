<template>
	<div style="width: auto;height: 600px" id="main" ref="main"></div>
</template>

<script>
	export default {
		props: ['print_data'],
		mounted() {
			this.echartsInit()
		},
		data() {
			return {
				myChart: ''
			}
		},

		watch: {
			print_data: {
				handler(new_data, old_data) {
					this.echartsUpdate()
				},
				deep: true
			}
		},

		methods: {
			echartsInit() {
				this.myChart = this.$echarts.init(this.$refs.main)
			},
			negative_array(data) {
				let new_array = [];
				for (let i in data) {
					new_array.push(-data[i])
				}
				return new_array
			},
			echartsUpdate() {
				var option;
				let one_data = this.print_data['1'];
				let three_data = this.print_data['3'];
				let twenty_data = this.print_data['20'];

				option = {
					tooltip: {
						axisPointer: {
							type: 'cross'
						},
					},
					axisPointer: {
						link: {
							xAxisIndex: 'all'
						},
						label: {
							backgroundColor: '#777'
						}
					},
					toolbox: {
						feature: {
							saveAsImage: {
								show: true
							}
						}
					},
					grid: [{
							height: '25%',
							left: '10%',
							bottom: '65%',
						},
						{
							height: '25%',
							left: '10%',
							bottom: '35%',
						},
						{
							height: '25%',
							left: '10%',
							bottom: '5%',
						}
					],
					legend: {
						// data: ['1多', '1空']
					},
					xAxis: [{
							show: false, //隐藏了x轴
							type: 'category',
							gridIndex: 0, //对应前面grid的索引位置（第一个）
							axisTick: {
								alignWithLabel: true
							},
							data: one_data.date,

						},
						{
							show: false, //隐藏了x轴
							type: 'category',
							gridIndex: 1, //对应前面grid的索引位置（第一个）
							axisTick: {
								alignWithLabel: true
							},
							data: three_data.date,

						},
						{
							type: 'category',
							gridIndex: 2, //对应前面grid的索引位置（第二个）
							axisTick: {
								alignWithLabel: true
							},
							data: twenty_data.date,

						}
					],
					yAxis: [{
							type: 'value',
							gridIndex: 0, //对应前面grid的索引位置（第二个）
							name: 'vol',
							splitLine: {
								show: false
							},
							nameLocation: 'middle',
							nameTextStyle: {
								padding: 25
							},
							position: 'left',
							min: 'dataMin'
						},
						{
							type: 'value',
							gridIndex: 0, //对应前面grid的索引位置（第二个）
							name: 'vol percent',
							splitLine: {
								show: false
							},
							nameLocation: 'middle',
							nameTextStyle: {
								padding: 25
							},
							position: 'right',
							min: 'dataMin'
						},
						{
							type: 'value',
							gridIndex: 1,
							name: 'vol',
							splitLine: {
								show: false
							},
							nameLocation: 'middle',
							nameTextStyle: {
								padding: 25
							},
							position: 'left',
						},
						{
							type: 'value',
							gridIndex: 1,
							name: 'vol percent',
							splitLine: {
								show: false
							},
							nameLocation: 'middle',
							nameTextStyle: {
								padding: 25
							},
							position: 'right',
						},
						{
							type: 'value',
							gridIndex: 2,
							name: 'vol',
							splitLine: {
								show: false
							},
							nameLocation: 'middle',
							nameTextStyle: {
								padding: 25
							},
							position: 'left',
						},
						{
							type: 'value',
							gridIndex: 2,
							name: 'vol percent',
							splitLine: {
								show: false
							},
							nameLocation: 'middle',
							nameTextStyle: {
								padding: 25
							},
							position: 'right',
						}
					],

					series: [{
							name: '1 vol',
							type: 'bar',
							xAxisIndex: 0,
							yAxisIndex: 0,
							data: one_data.long,
							barWidth: '40%',
							itemStyle: {
								color: '#F9293E'
							}
						},
						{
							name: '1 vol',
							type: 'bar',
							xAxisIndex: 0,
							yAxisIndex: 0,
							data: this.negative_array(one_data.short),
							barWidth: '40%',
							itemStyle: {
								color: '#00aa3b'
							}
						},
						{
							name: '1 percent',
							type: 'line',
							xAxisIndex: 0,
							yAxisIndex: 1,
							data: one_data.long_percent,
							smooth: false,
							showSymbol: false,
							lineStyle: {
								width: 0.5,
								color: 'black',
							}
						},
						{
							name: '1 percent',
							type: 'line',
							xAxisIndex: 0,
							yAxisIndex: 1,
							data: this.negative_array(one_data.short_percent),
							smooth: false,
							showSymbol: false,
							lineStyle: {
								width: 0.5,
								color: 'black',
							}
						},
						{
							name: '3 vol',
							type: 'bar',
							xAxisIndex: 1,
							yAxisIndex: 2,
							data: three_data.long,
							barWidth: '40%',
							itemStyle: {
								color: '#F9293E'
							}
						},
						{
							name: '3 vol',
							type: 'bar',
							xAxisIndex: 1,
							yAxisIndex: 2,
							data: this.negative_array(three_data.short),
							barWidth: '40%',
							itemStyle: {
								color: '#00aa3b'
							}
						},
						{
							name: '3 percent',
							type: 'line',
							xAxisIndex: 1,
							yAxisIndex: 3,
							data: three_data.long_percent,
							smooth: false,
							showSymbol: false,
							lineStyle: {
								width: 0.5,
								color: 'black',
							}
						},
						{
							name: '3 percent',
							type: 'line',
							xAxisIndex: 1,
							yAxisIndex: 3,
							data: this.negative_array(three_data.short_percent),
							smooth: false,
							showSymbol: false,
							lineStyle: {
								width: 0.5,
								color: 'black',
							}
						},
						{
							name: '20 vol',
							type: 'bar',
							xAxisIndex: 2,
							yAxisIndex: 4,
							data: twenty_data.long,
							barWidth: '40%',
							itemStyle: {
								color: '#F9293E'
							}
						},
						{
							name: '20 vol',
							type: 'bar',
							xAxisIndex: 2,
							yAxisIndex: 4,
							data: this.negative_array(twenty_data.short),
							barWidth: '40%',
							itemStyle: {
								color: '#00aa3b'
							}
						},
						{
							name: '20 percent',
							type: 'line',
							xAxisIndex: 2,
							yAxisIndex: 5,
							data: twenty_data.long_percent,
							smooth: false,
							showSymbol: false,
							lineStyle: {
								width: 0.5,
								color: 'black',
							}
						},
						{
							name: '20 percent',
							type: 'line',
							xAxisIndex: 2,
							yAxisIndex: 5,
							data: this.negative_array(twenty_data.short_percent),
							smooth: false,
							showSymbol: false,
							lineStyle: {
								width: 0.5,
								color: 'black',
							}
						},

					]
				};


				option && this.myChart.setOption(option);
			}

		}
	}
</script>

<style>
</style>
