<template>
    <div class="homebox">
        
        <el-container>
            <!-- // 头部 -->
            <HomeHeader />

            <el-container>
                <!-- // 左边导航菜单 -->
                <LeftNav></LeftNav>

                <!-- // 路径 导航 -->
                <el-main>
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: item.path }" v-for="item in breadcrumbArr" :key="item.name">{{ item.meta.title }}</el-breadcrumb-item>
                    </el-breadcrumb>

                    <div style="margin-top:20px;">
                        <router-view />
                    </div>
                </el-main>
            </el-container>

            <el-footer>learn and learn</el-footer>
        </el-container>

    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide, Watch } from 'vue-property-decorator'
    import HomeHeader from './component/HomeHeader.vue'
    import LeftNav from './component/LeftNav.vue'
    @Component({
        components: {
            HomeHeader,
            LeftNav
        }
    })
    export default class Home extends Vue {
        @Provide() breadcrumbArr: any = []

        @Watch('$route', { immediate: true, deep: true })
        routeChange(route: any): void{
            this.breadcrumbArr = route.matched
        }
    }
</script>

<style lang="stylus" scoped>
    @import './home.styl'
</style>