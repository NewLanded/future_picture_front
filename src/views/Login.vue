<template>
    <div class="login-container" id="login">
        <el-form :model="ruleForm2" :rules="rules2" status-icon ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-page">
            <h3 class="title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="ruleForm2.username" auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="ruleForm2.password" auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item style="width:100%;">
                <el-button type="primary" style="width:100%;" @click="submitLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import Qs from 'qs'

export default {
    name: 'Login',
    data() {
        return {
            ruleForm2: {
                username: 'lyb',
                password: '123'
            },
            rules2: {
                username: [
                    {
                        required: true,
                        message: 'please enter your account',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: 'enter your password',
                        trigger: 'blur'
                    }
                ]
            }
        }
    },
    methods: {
        submitLogin: function (event) {
            this.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    this.ajax
                        .post({
                            url: 'token',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            data: Qs.stringify({
                                grant_type: 'password',
                                username: this.ruleForm2.username,
                                password: this.ruleForm2.password
                            })
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                this.$store.commit('login/set_token', response.data.access_token)
                                this.$store.commit('login/set_user', this.ruleForm2.username)

                                this.ajax
                                    .post({
                                        url: 'note/get_file_note_json',
                                        data: {
                                            file_name: 'aside_future_info'
                                        }
                                    })
                                    .then((response) => {
                                        if (response.status === 200) {
                                            this.$store.commit('future_info/set_future_info', response.data)
                                            this.$router.push({
                                                path: '/summarize'
                                            })
                                        }
                                    })
                                    .catch((err) => {
                                        console.log(err)
                                        this.$message({
                                            message: '获取 个券列表 失败',
                                            type: 'error'
                                        })
                                    })
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                            this.$message({
                                message: '登陆失败',
                                type: 'error'
                            })
                        })
                }
            })
        }
    }
}
</script>

<style scoped>
.login-container {
    width: 100%;
    height: 100%;
}

.login-page {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    margin: 120px auto;
    width: 350px;
    padding: 35px 35px 15px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
</style>
