<template>
	<div style="width: auto;height: 300px" id="main" ref="main"></div>
</template>

<script>
	export default {
		props: ['print_data', 'pie_name'],
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
				let data = this.print_data
				data.sort(function(a, b){
					return b.value - a.value
				})


				var option;
				option = {
					title: {
						text: this.pie_name,
						left: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: '{a} <br/>{b} : {c} ({d}%)'
					},
					legend: {
						bottom: 10,
						left: 'center',
						show: false
						// data: ['西凉', '益州', '兖州', '荆州', '幽州']
					},
					series: [{
						type: 'pie',
						radius: '65%',
						center: ['50%', '50%'],
						selectedMode: 'single',
						data: data,
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};


				option && this.myChart.setOption(option, true);
				
				let that = this;
				this.myChart.on('click', function (params) {
					that.$emit('changePieBroker', params.data.name)					
				});
				
			}

		}
	}
</script>

<style>
</style>
