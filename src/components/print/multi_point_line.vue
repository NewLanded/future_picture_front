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
            var option

            let date = this.print_data['date']
            let ts_code_list = []
            for (let index in this.print_data['data']) {
                ts_code_list.push(this.print_data['data'][index]['ts_code'])
            }

            option = {
                title: {
                    text: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ts_code_list
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: date
                },
                yAxis: {
                    type: 'value'
                },
                series: []
            }

            for (let index in this.print_data['data']) {
                option['series'].push({
                    name: this.print_data['data'][index]['ts_code'],
                    symbol: 'none',
                    type: 'line',
                    data: this.print_data['data'][index]['point'],
                    lineStyle: {
                        width: 1.5
                    }
                })
            }

            option && this.myChart.setOption(option, true)
        }
    }
}
</script>

<style>
</style>
