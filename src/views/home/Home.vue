<template>
    <div class="homebox">
        
        <el-container>
            <!-- // 头部 -->
            <HomeHeader />

            <el-container>
                <el-aside width="260px">
                    <el-menu
                        default-active="1"
                        class="el-menu-vertical-demo"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-star-off"></i>
                                <span>Welcome</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1">选项1</el-menu-item>
                                <el-menu-item index="1-2">选项2</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-menu-item index="2">
                            <i class="el-icon-menu"></i>
                            <span slot="title">导航二</span>
                        </el-menu-item>
                        <el-menu-item index="3">
                            <i class="el-icon-document"></i>
                            <span slot="title">导航三</span>
                        </el-menu-item>
                        <el-menu-item index="4">
                            <i class="el-icon-setting"></i>
                            <span slot="title">导航四</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>

                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                    </el-breadcrumb>
                </el-main>
            </el-container>


            <el-footer>learn and learn</el-footer>
        </el-container>

    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator'
    import HomeHeader from './component/HomeHeader.vue'
    @Component({
        components: {
            HomeHeader
        }
    })
    export default class Home extends Vue {

        
    }
</script>

<style lang="stylus" scoped>
    @import './home.styl'
</style>