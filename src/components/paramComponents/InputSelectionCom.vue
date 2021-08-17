<template>
    <div class="block box-align" align="left">
        <span class="demonstration">{{comName}}</span>

        <el-autocomplete class="inline-input box-border" v-model="inputValue" :fetch-suggestions="querySearch" placeholder="请输入内容" @input="changeInputValue"></el-autocomplete>
    </div>
</template>

<script>
export default {
    data() {
        return {
            inputValue: this.$attrs.inputValue
        }
    },
    props: ['comName', 'selectOption'],
    methods: {
        changeInputValue(val) {
            this.$emit('changeInputValue', val)
        },
        querySearch(queryString, cb) {
            // 调用 callback 返回建议列表的数据
            let inputValueList = []
            if (this.selectOption) {
                for (let index in this.selectOption) {
                    inputValueList.push({
                        value: this.selectOption[index]
                    })
                }
            }
            cb(inputValueList)
        }
    }
}
</script>

<style scoped>
</style>
