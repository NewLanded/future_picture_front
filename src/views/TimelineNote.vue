<template>
    <div id="normalNote">
        <el-header class="header-split-line">
        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <div class="block line-position">
                    <div class="radio box-border">
                        排序：
                        <el-radio-group v-model="reverse">
                            <el-radio :label="true">倒序</el-radio>
                            <el-radio :label="false">正序</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="radio box-border">
                        类别：
                        <el-radio-group v-model="classify_name">
                            <el-radio :label="'全部'">全部</el-radio>
                            <el-radio v-for="(_, index) in note" :key="index" :label="index">
                                {{index}}
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <div class="box-border">
                        <el-timeline :reverse="reverse">
                            <el-timeline-item v-for="(activity, index) in note_classified" :key="index" :timestamp="activity.timestamp" placement="top">
                                {{activity.content}}
                            </el-timeline-item>
                        </el-timeline>
                    </div>

                </div>
            </el-main>
        </el-container>
        <!-- <router-view /> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            note: {
                股票: [
                    {
                        content: '创建成功',
                        timestamp: '2018-04-11'
                    }
                ],
                期货: []
            },
            reverse: true,
            classify_name: '全部'
        }
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        },
        note_classified() {
            let data = []
            if (this.classify_name == '全部') {
                for (let classify_name in this.note) {
                    for (let data_now of this.note[classify_name]) {
                        data.push(data_now)
                    }
                }
            } else {
                for (let data_now of this.note[this.classify_name]) {
                    data.push(data_now)
                }
            }
            data.sort((a, b) => {
                return this.dayjs(a.timestamp) - this.dayjs(b.timestamp)
            })
            return data
        }
    },
    mounted() {
        this.ajax
            .post({
                url: 'note/get_file_note_json',
                data: {
                    file_name: 'timeline_note'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    this.note = response.data
                }
            })
            .catch((err) => {
                this.$message({
                    message: err,
                    type: 'error'
                })
            })
    },
    methods: {
        aside_data_click(data) {
            if (data.id.length == 1) {
            }
        }
    },
    components: {}
}
</script>

<style lang="less" scoped>
.line-position {
    display: flex;
    flex-direction: column;
    align-items: left;
    text-align: left;
    // word-break: normal  英文可能不换行, 多的就显示不出来
    // float: left;
}
</style>
