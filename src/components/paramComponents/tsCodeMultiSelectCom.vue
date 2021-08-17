<template>
    <div class="demo-autocomplete block box-align" align="left">
        <span class="demonstration">代码</span>

        <el-select class="inline-input box-border" v-model="ts_code_list" multiple placeholder="请选择" collapse-tags @change="changeCode">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    props: ['mainTsCode'],
    data() {
        return {
            ts_code_list: []
        }
    },
    computed: {
        options() {
            let options = []
            if (this.mainTsCode) {
                this.ts_code_list = []
                let mainTsCodeList = this.mainTsCode.split('.')

                let year = this.dayjs().year().toString().slice(2)
                for (var i = 1; i <= 12; i++) {
                    if (i < 10) {
                        options.push({
                            value: mainTsCodeList[0] + year + '0' + i + '.' + mainTsCodeList[1],
                            label: mainTsCodeList[0] + year + '0' + i + '.' + mainTsCodeList[1]
                        })
                    } else {
                        options.push({
                            value: mainTsCodeList[0] + year + i + '.' + mainTsCodeList[1],
                            label: mainTsCodeList[0] + year + i + '.' + mainTsCodeList[1]
                        })
                    }
                }

                let next_year = this.dayjs().add(1, 'year').year().toString().slice(2)
                for (var i = 1; i <= 12; i++) {
                    if (i < 10) {
                        options.push({
                            value: mainTsCodeList[0] + next_year + '0' + i + '.' + mainTsCodeList[1],
                            label: mainTsCodeList[0] + next_year + '0' + i + '.' + mainTsCodeList[1]
                        })
                    } else {
                        options.push({
                            value: mainTsCodeList[0] + next_year + i + '.' + mainTsCodeList[1],
                            label: mainTsCodeList[0] + next_year + i + '.' + mainTsCodeList[1]
                        })
                    }
                }
            }
            return options
        }
    },
    methods: {
        changeCode(val) {
            this.$emit('changeCode', val)
        }
    }
}
</script>

<style scoped>
</style>
