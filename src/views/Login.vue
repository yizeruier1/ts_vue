<template>
    <div class="loginbox">
        <div class="login">
            <h1 class="login-title">
                Typescript and vue 入门学习
            </h1>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0" @keyup.enter.native.prevent="handleSubmit">
                <el-form-item prop="username">
                    <el-input type="text" prefix-icon="el-icon-user-solid" v-model="ruleForm.username" auto-complete="off" placeholder="账号"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="text" prefix-icon="el-icon-lock" v-model="ruleForm.password" auto-complete="off" placeholder="密码"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button :loading="Logining" @click.native.prevent="handleSubmit" type="primary" style="width:100%;">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator'

    @Component
    export default class Login extends Vue {
        // 登录中
        @Provide() Logining: boolean = false
        // 表单
        @Provide() ruleForm: {
            username: string;
            password: string;
        } = {
            username: '',
            password: ''
        }
        // 表单验证
        @Provide() rules = {
            username: [{ required: true, message: "请输入账号", trigger: "blur" }],
            password: [{ required: true, message: "请输入密码", trigger: "blur" }]
        }

        handleSubmit(): void{
            (this.$refs["ruleForm"] as any).validate((valid: boolean): void => {
                if(valid){
                    this.Logining = true

                    this.$http.post('/login', this.ruleForm).then((res: any) => {
                        this.Logining = false
                        if(res.data.code === 200){
                            this.$message.success('登录成功！')
                            localStorage.setItem('user', this.ruleForm.username)
                            this.$router.push('/home')
                        }else{
                            this.$message.error(res.data.msg)
                        }
                    })
                }
            })
        }
    }
</script>

<style lang="stylus" scoped>
    .loginbox
        width 100%
        height 100vh
        background-color #EBEEF5
        display flex
        justify-content center
        align-items center
        background url('../assets/images/1.jpg') no-repeat center center
        background-size cover
        .login
            width 260px
            min-height 100px
            padding 20px 20px
            position relative
            color #606266
            background-color #EBEEF5
            border-radius 4px
            box-shadow 0 0 20px #DCDFE6
            .login-title
                width 500px
                height 40px
                position absolute
                left -100px
                top -70px
                text-align center
                font-size 30px
                font-weight 600
                
</style>
