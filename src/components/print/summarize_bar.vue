<template>
	<div style="width: auto;height: 400px" id="main" ref="main"></div>
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
			echartsUpdate() {
				var option;
				let date = this.print_data.date;
				let raise = this.print_data.raise;
				let fall = this.print_data.fall;
				
				let minus = [];
				for (let i = 0; i < raise.length; i++) {
					minus.push(raise[i] - fall[i])
				}

				for (let i = 0; i < fall.length; i++) {
					fall[i] = -fall[i]
				}

				var emphasisStyle = {
					itemStyle: {
						shadowBlur: 10,
						shadowColor: 'rgba(0,0,0,0.3)'
					}
				};

				option = {
					legend: {
						data: ['涨', '跌', '涨-跌'],
						left: '10%'
					},
					toolbox: {
						feature: {
							dataView: {
								show: true,
								readOnly: true
							},
							magicType: {
								show: true,
								type: ['line', 'bar']
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					tooltip: {},
					xAxis: {
						type: 'category',
						data: date,
						name: '日期',
						axisLine: {
							onZero: true
						},
						splitLine: {
							show: false
						},
						splitArea: {
							show: false
						}
					},
					yAxis: [{
						type: 'value',
						name: '涨跌品种数量',
						// min: 0,
						// max: 50,
						interval: 1,
						// axisLabel: {
						// 	formatter: '{value} ml'
						// }
					}],
					grid: {
						bottom: 100
					},
					series: [{
							name: '涨',
							type: 'bar',
							// stack: 'one',
							// barGap: '-100%',
							color: 'rgba(255,0,0,0.5)',
							emphasis: emphasisStyle,
							data: raise,
						},
						{
							name: '跌',
							type: 'bar',
							// stack: 'one',
							barGap: '-100%',
							color: 'rgba(0,255,0,0.5)',
							emphasis: emphasisStyle,
							data: fall,
						},
						{
							name: '涨-跌',
							type: 'line',
							color: 'rgba(106,90,205,0.5)',
							emphasis: emphasisStyle,
							data: minus,
						}
					]
				};


				option && this.myChart.setOption(option);
			}

		}
	}
</script>

<style>
</style>
