<template>
    <!-- <div style="width: 1200px;height: 700px" id="main" ref="main"></div> -->
    <div :style="printStyle" id="main" ref="main"></div>
</template>

<script>
export default {
    props: ['print_data', 'contract_change_date', 'note_data', 'bs_note_data'],
    mounted() {
        this.echartsInit()
    },
    data() {
        return {
            myChart: '',
            timeout_handler: '',
            printStyle: {
                width: '1200px',
                height: '700px'
            }
        }
    },
    watch: {
        // 监听多个, 并且调用同一个方法的时候, 会在axios下载数据的时候失败, 不清楚原因, 应该是某个地方计算量过大卡住了, 或者死循环

        print_data: {
            handler(new_data, old_data) {
                clearTimeout(this.timeout_handler)
                this.timeout_handler = setTimeout(() => {
                    this.echartsUpdate()
                }, 1000)
            },
            deep: true
        },
        contract_change_date: {
            handler(new_data, old_data) {
                clearTimeout(this.timeout_handler)
                this.timeout_handler = setTimeout(() => {
                    this.echartsUpdate()
                }, 1000)
            },
            deep: true
        },
        note_data: {
            handler(new_data, old_data) {
                clearTimeout(this.timeout_handler)
                this.timeout_handler = setTimeout(() => {
                    this.echartsUpdate()
                }, 1000)
            },
            deep: true
        },
        bs_note_data: {
            handler(new_data, old_data) {
                clearTimeout(this.timeout_handler)
                this.timeout_handler = setTimeout(() => {
                    this.echartsUpdate()
                }, 1000)
            },
            deep: true
        }
    },

    methods: {
        echartsInit() {
            this.myChart = this.$echarts.init(this.$refs.main)
        },
        /*
         * 计算MACD
         * @param {number} short 快速EMA时间窗口
         * @param {number} long 慢速EMA时间窗口
         * @param {number} mid dea时间窗口
         * @param {array} data 输入数据
         */
        calcMACD(short, long, mid, data) {
            function calcEMA(n, data) {
                let a = 2 / (n + 1)

                let ema = [data[0]]
                let l = data.length
                for (let i = 1; i < l; i++) {
                    ema.push((a * data[i] + (1 - a) * ema[i - 1]).toFixed(3))
                }

                return ema
            }

            /*
             * 计算DIF快线，用于MACD
             * @param {number} short 快速EMA时间窗口
             * @param {number} long 慢速EMA时间窗口
             * @param {array} data 输入数据
             */
            function calcDIF(short, long, data) {
                var i, l, dif, emaShort, emaLong
                dif = []
                emaShort = calcEMA(short, data)
                emaLong = calcEMA(long, data)
                for (i = 0, l = data.length; i < l; i++) {
                    dif.push((emaShort[i] - emaLong[i]).toFixed(3))
                }
                return dif
            }

            /*
             * 计算DEA慢线，用于MACD
             * @param {number} mid 对dif的时间窗口
             * @param {array} dif 输入数据
             */
            function calcDEA(mid, dif) {
                return calcEMA(mid, dif)
            }

            var i, l, dif, dea, macd, result
            result = {}
            macd = []
            dif = calcDIF(short, long, data)
            dea = calcDEA(mid, dif)
            for (i = 0, l = data.length; i < l; i++) {
                macd.push(((dif[i] - dea[i]) * 2).toFixed(3))
            }
            result.dif = dif
            result.dea = dea
            result.macd = macd
            return result
        },
        calculateMA(dayCount, data) {
            var result = []
            for (var i = 0, len = data.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-')
                    continue
                }
                var sum = 0
                for (var j = 0; j < dayCount; j++) {
                    sum += data[i - j][1]
                }
                result.push(sum / dayCount)
            }
            return result
        },
        getMinValueFromK(data) {
            let y_min = data[0][2]
            for (let i in data) {
                y_min = Math.min(y_min, data[i][2])
            }
            return y_min
        },
        completeKData(date, data) {
            // 补足不够数量的数据, 使每个图的K线数量一致
            // 补充的数据格式是不对的, 但是这种不对的格式能显示出正确的效果, 不清楚原因, 反而补充对的格式会导致失败
            // 这种错的格式, 可能只对某些版本生效, 换了之后可能就不能用了
            if (data.length <= 160) {
                // for (let i = 0; i <= 160 - data.length; i++) {
                //     data.push(0)
                //     date.push('')
                // }
            } else {
                data.splice(0, data.length - 160)
                date.splice(0, date.length - 160)
            }
        },
        formatNoteData(date, note_data_ori) {
            let note_data = {}
            for (let index in note_data_ori) {
                let date_now = note_data_ori[index]['trade_date']
                let note_now = note_data_ori[index]['note']

                date_now = this.dayjs(date_now)
                while (true) {
                    if (date.includes(date_now.format('YYYY-MM-DD'))) {
                        break
                    } else if (date_now.format('YYYY-MM-DD') > date[date.length - 1]) {
                        date_now = this.dayjs(date[date.length - 1])
                        break
                    } else {
                        date_now = date_now.add(1, 'day')
                    }
                }

                date_now = date_now.format('YYYY-MM-DD')
                if (!note_data.hasOwnProperty(date_now)) {
                    note_data[date_now] = ''
                } else {
                    note_data[date_now] += '\n\n'
                }

                note_data[date_now] += note_now
            }
            return note_data
        },
        getHighPoint(date, data) {
            let date_high_point_map = {}
            for (let index in date) {
                date_high_point_map[date[index]] = data[index][3]
            }
            return date_high_point_map
        },
        getBsNoteDataFormat(date, bs_note_data_ori, note_data, date_high_point_map) {
            // bs_note_data_format 用来在图上标志交易的位置, 笔记写到 note_data 中, 方便展示
            let bs_note_data = {}
            for (let index in bs_note_data_ori) {
                let date_now = bs_note_data_ori[index]['trade_date']
                let note_data_now = bs_note_data_ori[index]

                date_now = this.dayjs(date_now)
                while (true) {
                    if (date.includes(date_now.format('YYYY-MM-DD'))) {
                        break
                    } else if (date_now.format('YYYY-MM-DD') > date[date.length - 1]) {
                        date_now = this.dayjs(date[date.length - 1])
                        break
                    } else {
                        date_now = date_now.add(1, 'day')
                    }
                }

                date_now = date_now.format('YYYY-MM-DD')
                if (!bs_note_data.hasOwnProperty(date_now)) {
                    bs_note_data[date_now] = null
                }

                if (!note_data.hasOwnProperty(date_now)) {
                    note_data[date_now] = ''
                } else {
                    note_data[date_now] += '\n\n'
                }

                let note_now_list = [note_data_now['trade_type'], 'point: ' + note_data_now['point'], 'number: ' + note_data_now['number'], note_data_now['note']]
                let note_now = note_now_list.join('\n')
                note_data[date_now] += note_now
            }

            let bs_note_data_format = []
            for (let date_now in bs_note_data) {
                bs_note_data_format.push({
                    name: date_now,
                    coord: [date_now, date_high_point_map[date_now] + date_high_point_map[date_now] / 200],
                    itemStyle: {
                        color: 'rgb(41,60,85)'
                    }
                })
            }

            return bs_note_data_format
        },
        getContractChangeDate(date, contract_change_date_ori) {
            // contract_change_date_ori = JSON.parse(JSON.stringify(contract_change_date_ori))  // 避免循环监听
            // contract_change_date_ori.sort()
            let contract_change_date = []
            for (let index in contract_change_date_ori) {
                let date_now = contract_change_date_ori[index]
                date_now = this.dayjs(date_now)
                while (true) {
                    if (date.includes(date_now.format('YYYY-MM-DD'))) {
                        break
                    } else if (date_now.format('YYYY-MM-DD') > date[date.length - 1]) {
                        break
                    } else {
                        date_now = date_now.add(1, 'day')
                    }
                }

                date_now = date_now.format('YYYY-MM-DD')
                contract_change_date.push({
                    xAxis: date_now
                })
            }

            contract_change_date.sort((a, b) => {
                return a.xAxis - b.xAxis
            })
            return contract_change_date
        },
        echartsUpdate() {
            var option
            let date = this.print_data.date
            let data = this.print_data.data
            let contract_change_date_ori = this.contract_change_date
            let note_data_ori = this.note_data
            let bs_note_data_ori = this.bs_note_data

            this.completeKData(date, data)
            let y_min = this.getMinValueFromK(data)

            // 更新图的大小, 使 日 周 月 K线宽度看起来差不多
            // 使用 this.printStyle.width = (1200 / 160) * data.length + 'px' 没用, 可能是响应速度比较慢
            this.$refs.main.style.width = (1200 / 160) * data.length + 'px'
            this.myChart.clear()
            this.myChart.resize()

            let note_data = this.formatNoteData(date, note_data_ori)
            let date_high_point_map = this.getHighPoint(date, data)
            let bs_note_data_format = this.getBsNoteDataFormat(date, bs_note_data_ori, note_data, date_high_point_map)

            let contract_change_date = this.getContractChangeDate(date, contract_change_date_ori)

            let close = this.print_data.data.map(function (item) {
                return item[1]
            })
            let macd = this.calcMACD(12, 26, 9, close)

            option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: function (params) {
                        if (note_data.hasOwnProperty(params[0].axisValue)) {
                            return note_data[params[0].axisValue]
                        } else {
                            return ''
                        }
                    },
                    extraCssText: 'width:280px; white-space:pre-wrap; text-align:left' // tooltip的样式, 这里是设定宽度, 并且使用 \n 换行, 文字左侧对齐
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
                        height: '60%',
                        left: '10%',
                        bottom: '35%'
                        // backgroundColor: 'red',
                        // show: true
                    },
                    {
                        height: '20%',
                        left: '10%',
                        bottom: '5%'
                        // backgroundColor: 'green',
                        // show: true
                    }
                ],
                legend: {
                    data: ['K线', 'MA5', 'MACD', 'DIF', 'DEA']
                },
                xAxis: [
                    {
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

                        splitNumber: 200,
                        min: 'dataMin',
                        max: 'dataMax',
                        scale: true,
                        boundaryGap: false
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
                        splitNumber: 200,
                        min: 'dataMin',
                        max: 'dataMax',
                        scale: true,
                        boundaryGap: false
                    }
                ],
                //y轴，不管有几个x轴，几个y轴，或者图，只要找到他对应的grid图的序号索引就可以精准匹配

                yAxis: [
                    {
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
                        min: y_min
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
                        position: 'left'
                    }
                ],

                series: [
                    {
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
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            label: {
                                show: false
                            },
                            silent: true,
                            lineStyle: {
                                type: 'dashed',
                                color: 'rgba(128, 128, 128, 0.4)'
                            },
                            data: contract_change_date
                        },
                        markPoint: {
                            label: {
                                formatter: function (param) {}
                            },
                            data: bs_note_data_format,
                            symbolSize: (value, params) => {
                                return [10, 15]
                            }
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: this.calculateMA(5, data),
                        smooth: true,
                        showSymbol: false,
                        lineStyle: {
                            width: 0.5,
                            color: 'black'
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
                            color: function (params) {
                                var colorList
                                if (params.data >= 0) {
                                    colorList = '#F9293E'
                                } else {
                                    colorList = '#00aa3b'
                                }
                                return colorList
                            }
                        }
                    },
                    {
                        name: 'DIF',
                        type: 'line',
                        symbol: 'none',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: macd.dif,
                        lineStyle: {
                            color: '#666666',
                            width: 1
                        }
                    },
                    {
                        name: 'DEA',
                        type: 'line',
                        symbol: 'none',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: macd.dea,
                        lineStyle: {
                            opacity: 0.8,
                            color: '#FF9933',
                            width: 1
                        }
                    }
                ]
            }

            option && this.myChart.setOption(option, true)
        }
    }
}
</script>

<style scoped>
</style>
