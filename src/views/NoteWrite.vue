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

				
				var xAxisData = [];
				var data1 = [];
				var data2 = [];
				var data3 = [];
				var data4 = [];
				
				for (var i = 0; i < 10; i++) {
				    xAxisData.push('Class' + i);
				    data1.push((Math.random() * 2).toFixed(2));
				    data2.push((Math.random() * 5).toFixed(2));
				    data3.push((Math.random() + 0.3).toFixed(2));
				    data4.push(-Math.random().toFixed(2));
				}
				
				var emphasisStyle = {
				    itemStyle: {
				        shadowBlur: 10,
				        shadowColor: 'rgba(0,0,0,0.3)'
				    }
				};
				
				option = {
				    legend: {
				        data: ['bar', 'bar2', 'bar3', 'bar4'],
				        left: '10%'
				    },
				    toolbox: {
				        feature: {
				            dataView: {
				            	show: true,
				            	readOnly: false
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
				        data: xAxisData,
				        name: 'X Axis',
				        axisLine: {onZero: true},
				        splitLine: {show: false},
				        splitArea: {show: false}
				    },
				    yAxis: {},
				    grid: {
				        bottom: 100
				    },
				    series: [
				        {
				            name: 'bar',
				            type: 'bar',
				            stack: 'one',
				            emphasis: emphasisStyle,
				            data: data1
				        },
				        {
				            name: 'bar2',
				            type: 'bar',
				            stack: 'one',
				            emphasis: emphasisStyle,
				            data: data2
				        },
				        {
				            name: 'bar3',
				            type: 'bar',
				            stack: 'two',
				            emphasis: emphasisStyle,
				            data: data3
				        },
				        {
				            name: 'bar4',
				            type: 'bar',
				            stack: 'two',
				            emphasis: emphasisStyle,
				            data: data4
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
