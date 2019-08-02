<template>
    <el-header>
        <el-row>
            <el-col :span="1" class="hei60" style="text-align:center;">
                <img class="header-ava" src="@/assets/images/ava.gif" alt="" />
            </el-col>
            <el-col :span="11" class="hei60">
                <span class="header-title">学习记录</span>
            </el-col>
            <el-col :span="12" class="hei60">
                <el-dropdown style="float:right;" @command="handleCommand">
                    <span class="el-dropdown-link">
                        欢迎您： admin
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="1">个人中心</el-dropdown-item>
                        <el-dropdown-item command="2">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-row>
    </el-header>
</template>

<script lang="ts">
    import { Vue, Component } from 'vue-property-decorator'
    @Component
    export default class HomeHeader extends Vue {

        lgout(): void{
            localStorage.removeItem('user')
            this.$router.push('/')
        }

        handleCommand(command: string): void{
            // 去个人中心
            if(command === '1'){

            }
            // 退出登录
            if(command === '2'){
                this.$confirm('确认退出么？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.lgout()
                }).catch(() => {})
            }
        }
    }
</script>
<style lang="stylus" scoped>
    @import '../home.styl'
</style>