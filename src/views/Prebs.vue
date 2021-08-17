<template>
    <div id="preBS">
        <el-header class="header-split-line">

        </el-header>
        <el-container>
            <el-aside class="main-el-aside" width="200px">
                <el-tree :data="aside_future_data" :props="$store.state.defaultProps" @node-click="aside_data_click"></el-tree>
            </el-aside>
            <el-main>
                <ol v-for="(item, id) in note_data" :key="id">
                    <li>
                        <div class="title_level_two">{{item.conception}}</div>
                        <el-divider></el-divider>
                        <el-table ref="multipleTable" :data="item.condition" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="" label="" width="70"></el-table-column>
                            <el-table-column prop="condition" label="条件" width="1200"></el-table-column>
                        </el-table>
                        <el-divider></el-divider>
                    </li>
                </ol>
            </el-main>
        </el-container>
        <!-- <router-view /> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            multipleSelection: [],
            note_data: []
        }
    },
    computed: {
        aside_future_data() {
            return this.$store.getters['future_info/aside_future_data']
        }
    },
    mounted() {
        this.ajax
            .post({
                url: 'note/get_json_data',
                data: {
                    key_name: 'prebs'
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    let data_format = []
                    for (let index in response.data) {
                        let data_one = response.data[index]
                        let condition_data_one = []
                        for (let index_2 in data_one.condition) {
                            condition_data_one.push({
                                condition: data_one.condition[index_2]
                            })
                        }
                        data_format.push({
                            conception: data_one.conception,
                            condition: condition_data_one
                        })
                    }

                    this.note_data = data_format
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },
    methods: {
        aside_data_click(data) {},

        handleSelectionChange(val) {
            console.log(val)
            // this.multipleSelection = val;
        }
    },
    components: {}
}
</script>

<style lang="less" scoped>
.title_level_two {
    text-align: left;
    font-size: 18px;
    font-weight: bold;
}

.title_level_three {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
}
</style>
