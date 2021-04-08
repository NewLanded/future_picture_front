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
				myChart: '',
				bar_width: 3
			}
		},
		watch: {
			print_data: {
				handler(new_data, old_data) {
					this.echartsUpdate()
				},
				deep: true
			},
			
		},

		methods: {
			echartsInit() {
				this.myChart = this.$echarts.init(this.$refs.main)
			},
			echartsUpdate() {
				var option;
				let date = this.print_data.date;
				let data = this.print_data.data;
				
				function calculateMA(dayCount, data) {
					var result = [];
					for (var i = 0, len = data.length; i < len; i++) {
						if (i < dayCount) {
							result.push('-');
							continue;
						}
						var sum = 0;
						for (var j = 0; j < dayCount; j++) {
							sum += data[i - j][1];
						}
						result.push(sum / dayCount);
					}
					return result;
				}

				function calcEMA(n, data) {
					let a = 2 / (n + 1);

					let ema = [data[0]];
					let l = data.length;
					for (let i = 1; i < l; i++) {
						ema.push((a * data[i] + (1 - a) * ema[i - 1]).toFixed(3));
					}

					return ema;
				};

				/*
				 * 计算DIF快线，用于MACD
				 * @param {number} short 快速EMA时间窗口
				 * @param {number} long 慢速EMA时间窗口
				 * @param {array} data 输入数据
				 */
				function calcDIF(short, long, data) {
					var i, l, dif, emaShort, emaLong;
					dif = [];
					emaShort = calcEMA(short, data);
					emaLong = calcEMA(long, data);
					for (i = 0, l = data.length; i < l; i++) {
						dif.push((emaShort[i] - emaLong[i]).toFixed(3));
					}
					return dif;
				};

				/*
				 * 计算DEA慢线，用于MACD
				 * @param {number} mid 对dif的时间窗口
				 * @param {array} dif 输入数据
				 */
				function calcDEA(mid, dif) {
					return calcEMA(mid, dif);
				};

				/*
				 * 计算MACD
				 * @param {number} short 快速EMA时间窗口
				 * @param {number} long 慢速EMA时间窗口
				 * @param {number} mid dea时间窗口
				 * @param {array} data 输入数据
				 */
				function calcMACD(short, long, mid, data) {
					var i, l, dif, dea, macd, result;
					result = {};
					macd = [];
					dif = calcDIF(short, long, data);
					dea = calcDEA(mid, dif);
					for (i = 0, l = data.length; i < l; i++) {
						macd.push(((dif[i] - dea[i]) * 2).toFixed(3));
					}
					result.dif = dif;
					result.dea = dea;
					result.macd = macd;
					return result;
				};

				let close = this.print_data.data.map(function(item) {
					return item[1];
				});
				let macd = calcMACD(12, 26, 9, close);



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
							// x: '7%',
							// y: '7%',
							height: '60%',
							left: '10%',
							bottom: '35%',
							// backgroundColor: 'red',
							// show: true
						},
						{
							// x2: '7%',
							// y2: '7%',
							height: '20%',
							left: '10%',
							bottom: '5%',
							// backgroundColor: 'green',
							// show: true
						}
					],
					legend: {
						data: ['K线', 'MA5', 'MACD', 'DIF', 'DEA']
					},
					xAxis: [{
							show: false, //隐藏了x轴
							type: 'category',
							gridIndex: 0, //对应前面grid的索引位置（第一个）
							axisTick: {
								alignWithLabel: true
							},
							axisLabel: {
								//interval:showNum,  //x轴显示的数量，我这里是动态算的
							},
							data: date,

						},
						{
							type: 'category',
							gridIndex: 1, //对应前面grid的索引位置（第二个）
							axisTick: {
								alignWithLabel: true
							},
							axisLabel: {
								//interval:showNum,
							},
							data: date,

						}
					],
					//y轴，不管有几个x轴，几个y轴，或者图，只要找到他对应的grid图的序号索引就可以精准匹配

					yAxis: [{
							type: 'value',
							gridIndex: 0, //对应前面grid的索引位置（第二个）
							name: 'K线',
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
							gridIndex: 1,
							name: 'MACD',
							splitLine: {
								show: false
							},
							nameLocation: 'middle',
							nameTextStyle: {
								padding: 25
							},
							position: 'left',
						}
					],

					series: [{

							type: 'candlestick',
							name: 'K线',
							xAxisIndex: 0,
							yAxisIndex: 0,
							data: data,
							itemStyle: {
								color: '#FD1050',
								color0: '#0CF49B',
								borderColor: '#FD1050',
								borderColor0: '#0CF49B'
							}
						},
						{

							name: 'MA5',
							type: 'line',
							xAxisIndex: 0,
							yAxisIndex: 0,
							data: calculateMA(5, data),
							smooth: true,
							showSymbol: false,
							lineStyle: {
								width: 0.5,
								color: 'black',
							}
						},
						{
							name: 'MACD',
							type: 'bar',
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: macd.macd,
							// barWidth: '40%',
							itemStyle: {
								color: function(params) {
									var colorList;
									if (params.data >= 0) {
										colorList = '#F9293E';
									} else {
										colorList = '#00aa3b';
									}
									return colorList;
								},

							}
						}, {
							name: 'DIF',
							type: 'line',
							symbol: "none",
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: macd.dif,
							lineStyle: {
								color: '#da6ee8',
								width: 1

							}
						}, {
							name: 'DEA',
							type: 'line',
							symbol: "none",
							xAxisIndex: 1,
							yAxisIndex: 1,
							data: macd.dea,
							lineStyle: {
								opacity: 0.8,
								color: '#39afe6',
								width: 1

							}
						}
					]
				};


				option && this.myChart.setOption(option);
			}

		}
	}
</script>

<style scoped>

</style>
