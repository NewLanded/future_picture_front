<template>
    <div id="calcGainLoss">
        <el-header class="header-split-line">
        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <el-row :gutter="20">
                    <el-col :span="8">
                        合约代码: <el-button>{{mainTsCode}}</el-button>
                    </el-col>
                    <el-col :span="8">
                        损益计算: <el-button>{{gainloss}}</el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <normalInputCom @changeComValue="changeOpenPoint" :comValue="openPoint" comName="开仓点位"></normalInputCom>
                    </el-col>
                    <el-col :span="8">
                        <normalInputCom @changeComValue="changeclosePoint" :comValue="closePoint" comName="平仓点位"></normalInputCom>
                    </el-col>
                    <el-col :span="8">
                        <normalInputCom @changeComValue="changebsNumber" :comValue="bsNumber" comName="开仓数量"></normalInputCom>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <InputSelectionCom @changeInputValue="changelongShort" :inputValue="longShort" :selectOption="selectOption" comName="多空选择"></InputSelectionCom>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import normalInputCom from '../components/paramComponents/normalInputCom.vue'
import InputSelectionCom from '../components/paramComponents/InputSelectionCom.vue'

export default {
    name: 'CalcGainloss',
    data() {
        return {
            mainTsCode: '合约代码',
            selectOption: ['long', 'short'],
            openPoint: 0,
            closePoint: 0,
            bsNumber: 1,
            longShort: '',
            per_unit: 0
        }
    },
    watch: {
        mainTsCode(newValue, oldValue) {
            this.get_per_unit()
        }
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        },
        gainloss() {
            let openPoint = this.openPoint
            let closePoint = this.closePoint
            let bsNumber = this.bsNumber
            let longShort = this.longShort
            let per_unit = this.per_unit

            let result = (closePoint - openPoint) * bsNumber * per_unit
            if (longShort == 'short') {
                result = -result
            } else if (longShort == 'long') {
                result = result
            } else {
                result = 0
            }

            return result
        }
    },
    methods: {
        aside_data_click(data) {
            if (data.id.length == 1) {
                this.mainTsCode = data.id[0]
            }
        },
        changeOpenPoint(val) {
            this.openPoint = val
        },
        changeclosePoint(val) {
            this.closePoint = val
        },
        changebsNumber(val) {
            this.bsNumber = val
        },
        changelongShort(val) {
            this.longShort = val
        },
        get_per_unit() {
            if (this.mainTsCode) {
                this.ajax
                    .post({
                        url: 'symbol/get_per_unit_by_fut_code',
                        data: {
                            main_ts_code: this.mainTsCode
                        }
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            this.per_unit = response.data
                        }
                    })
                    .catch((err) => {
                        this.$message({
                            message: err,
                            type: 'error'
                        })
                    })
            } else {
                this.$message({
                    message: '参数不合法 查询失败',
                    type: 'error'
                })
            }
        }
    },
    components: {
        normalInputCom,
        InputSelectionCom
    }
}
</script>

<style lang="less" scoped>
</style>
