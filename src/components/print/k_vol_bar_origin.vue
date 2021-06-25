<template>
    <div style="width: auto;height: 200px" id="main" ref="main"></div>
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
            var option
            let date = this.print_data.map((x) => x.date)
            let amount = this.print_data.map((x) => x.amount)
            let percent = this.print_data.map((x) => x.percent)

            option = {
                tooltip: {
                    axisPointer: {
                        type: 'cross'
                    }
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
                grid: [
                    {
                        height: '80%',
                        left: '10%',
                        bottom: '10%'
                    }
                ],
                legend: {
                    // data: ['1多', '1空']
                },
                xAxis: [
                    {
                        type: 'category',
                        gridIndex: 0,
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: date
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        gridIndex: 0, //对应前面grid的索引位置（第二个）
                        name: 'value',
                        splitLine: {
                            show: false
                        },
                        nameLocation: 'middle',
                        nameTextStyle: {
                            padding: 25
                        },
                        position: 'left'
                        // min: 0
                    },
                    {
                        type: 'value',
                        gridIndex: 0, //对应前面grid的索引位置（第二个）
                        name: 'value percent',
                        splitLine: {
                            show: false
                        },
                        nameLocation: 'middle',
                        nameTextStyle: {
                            padding: 25
                        },
                        position: 'right'
                        // min: 0
                    }
                ],

                series: [
                    {
                        name: 'value',
                        type: 'bar',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: amount,
                        barWidth: '40%',
                        itemStyle: {
                            color: '#F9293E'
                        }
                    },
                    {
                        name: 'value percent',
                        type: 'line',
                        xAxisIndex: 0,
                        yAxisIndex: 1,
                        data: percent,
                        smooth: false,
                        showSymbol: false,
                        lineStyle: {
                            width: 0.5,
                            color: 'black'
                        }
                    }
                ]
            }

            option && this.myChart.setOption(option, true)
        }
    }
}
</script>

<style>
</style>
