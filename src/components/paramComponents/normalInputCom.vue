<template>
    <div class="block box-align" align="left">
        <span class="demonstration">{{comName}}</span>

        <el-input class="inline-input box-border" v-model="comValue" placeholder="请输入内容" @input="changeComValue"></el-input>
    </div>
</template>

<script>
export default {
    data() {
        return {
            comValue: this.$attrs.comValue
        }
    },
    props: ['comName'],
    methods: {
        changeComValue(val) {
            this.$emit('changeComValue', val)
        }
    }
}
</script>

<style scoped>
.box-border {
    margin: 10px;
    width: 200px;
}
</style>
