<template>

    <el-aside width="260px">
        <el-menu
            router
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <div v-for="item in menuList" :key="item.name">
                <el-submenu :index="item.path" v-if="item.children">
                    <template slot="title">
                        <i :class="item.meta.icon"></i>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1">选项1</el-menu-item>
                        <el-menu-item index="1-2">选项2</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item :index="item.path" v-else>
                    <i :class="item.meta.icon"></i>
                    <span slot="title">{{ item.meta.title }}</span>
                </el-menu-item>
            </div>
        </el-menu>
    </el-aside>
    
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator'
    import { menuMap } from '@/router/router'
    @Component
    export default class Home extends Vue {
        @Provide() menuList: any = menuMap
        created() {
            
        }
        
    }
</script>

<style lang="stylus" scope>
    .el-aside, .el-menu-vertical-demo
        min-height calc(100vh - 120px)
</style>
