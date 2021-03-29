<template>
	<div style="width: auto;height: 400px" id="main"></div>
</template>

<script>
	export default {
		mounted() {
			this.echartsInit()
		},
		methods: {
			echartsInit() {

				var chartDom = document.getElementById('main');
				var myChart = this.$echarts.init(chartDom);
				var option;


				option = {
					tooltip: {},
					toolbox: {
						feature: {
							dataView: {
								show: true,
								readOnly: false
							},
							restore: {
								show: true
							},
							saveAsImage: {
								show: true
							}
						}
					},
					//多个图，就有多个grid,排序默认0、1、2....
					grid: [
						//0降雨
						{
							x: '7%',
							y: '7%',
							height: '35%',
							left: '10%'
						},
						//1水位流量
						{
							x: '7%',
							y2: '7%',
							height: '35%',
							left: '10%',
							bottom: '15%'
						}
					],
					legend: {
						data: ['蒸发量', '平均温度']
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
							data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

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
							data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

						}
					],
					//y轴，不管有几个x轴，几个y轴，或者图，只要找到他对应的grid图的序号索引就可以精准匹配

					yAxis: [{
							type: 'value',
							gridIndex: 0, //对应前面grid的索引位置（第二个）
							name: '蒸发量',
							//nameLocation:'end',
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
							name: '平均温度',
							nameTextStyle: {
								padding: 25
							},
							position: 'left',
							nameLocation: 'middle',
							splitLine: {
								show: false
							},
						}
					],

					series: [{
							name: '蒸发量',
							// type:'bar',
							// name: "累产气量"
							type: "bar",
							xAxisIndex: 0,
							yAxisIndex: 0,

							data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
						},
						{
							name: '平均温度',
							type: 'bar',

							xAxisIndex: 1,
							yAxisIndex: 1,

							data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
						}
					]
				};


				option && myChart.setOption(option);

			}

		}
	}
</script>

<style>
</style>
