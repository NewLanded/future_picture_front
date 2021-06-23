<template>
	<div style="width: auto;height: 400px" id="main" ref="main"></div>
	
</template>

<script>
	export default {
		props: ['print_data'],
		mounted() {
			this.echartsInit()
			this.echartsUpdate()
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

				option = {
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
						type: 'tree',

						data: [this.print_data],

						top: '1%',
						left: '7%',
						bottom: '1%',
						right: '20%',

						symbolSize: 10,
						initialTreeDepth: -1,

						label: {
							verticalAlign: 'middle',
							align: 'right',
							"fontSize": 15,
							"position": "top"
						},

						leaves: {
							label: {
								position: 'right',
								verticalAlign: 'middle',
								align: 'left'
							}
						},

						emphasis: {
							focus: 'descendant'
						},

						expandAndCollapse: true,
						animationDuration: 550,
						animationDurationUpdate: 750
					}]
				};


				option && this.myChart.setOption(option, true);
			}

		}
	}
</script>

<style>
</style>
