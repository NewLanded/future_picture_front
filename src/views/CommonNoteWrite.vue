<template>
    <div id="commonNoteWrite">
        <el-header class="header-split-line">
            <el-col :span="6">
                <dateCom @changeDate="changeEventDate" :dateComValue="dateComValue"></dateCom>
            </el-col>
            <el-col :span="6">
                <freqCodeCom @changeFreqCode="changeFreqCodeComValue" :freqCodeComValue="freqCodeComValue"></freqCodeCom>
            </el-col>
        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <h2>Note</h2>
                <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 50}" placeholder="请输入内容" v-model="note"></el-input>
                <el-button type="primary" @click.native="commit_note">提交</el-button>
            </el-main>
        </el-container>
        <!-- <router-view /> -->
    </div>
</template>

<script>
import dateCom from '../components/paramComponents/dateCom.vue'
import freqCodeCom from '../components/paramComponents/freqCodeCom.vue'

export default {
    name: 'CommonNoteWrite',
    data() {
        return {
            mainTsCode: '',
            dateComValue: this.dayjs(),
            freqCodeComValue: '',
            note: ''
        }
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        }
    },
    methods: {
        aside_data_click(data) {
            if (data.id.length == 1) {
                this.mainTsCode = data.id[0]
            }
        },
        changeEventDate(val) {
            this.dateComValue = this.dayjs(val)
        },
        changeFreqCodeComValue(val) {
            this.freqCodeComValue = val
        },
        commit_note() {
            if (this.note && this.dateComValue && this.freqCodeComValue) {
                this.ajax
                    .post({
                        url: 'note/note_write',
                        data: {
                            main_ts_code: 'common',
                            ts_code: 'common',
                            trade_date: this.dateComValue.format('YYYY-MM-DD'),
                            freq_code: this.freqCodeComValue,
                            note: this.note
                        }
                    })
                    .then((response) => {
                        if (response.status === 200) {
                            this.$message({
                                message: '提交成功',
                                type: 'success'
                            })
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
                    message: '参数不合法 提交失败',
                    type: 'error'
                })
            }
        }
    },
    components: {
        dateCom,
        freqCodeCom
    }
}
</script>

<style lang="less" scoped>
</style>
