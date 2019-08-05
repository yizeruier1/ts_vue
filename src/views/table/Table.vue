<template>
    <div>
        <el-table :data="tableData" style="width: 100%;" v-loading="tableLoading">
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center">
                <template slot-scope="scope">
                    {{ scope.row.gender === 1 ? '男' : '女' }}
                </template>
            </el-table-column>
            <el-table-column prop="address" label="居住地" align="center"></el-table-column>
            <el-table-column prop="createTime" label="创建日期" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="small">编辑</el-button>
                    <el-button type="danger" plain size="small" @click="deleteData(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination-warp" v-if="tableData.length">
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page.sync="pageNum"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component, Provide } from 'vue-property-decorator'
    import { getTableData, DeleteTableData } from '@/api/api'

    @Component
    export default class Table extends Vue{
        // 表格数据
        tableData: any = []
        tableLoading: boolean = false
        // 分页数据
        pageSize: number = 10
        pageNum: number = 1
        total: number = 0

        // tableRowClassName({row, rowIndex}: any): string {
        //     if (rowIndex % 2 === 0) {
        //         return 'warning-row';
        //     } else if (rowIndex % 2 !== 0) {
        //         return '';
        //     }
        // }

        created() {
            this.initTable()
        }

        // 获取 table 数据
        initTable(): void{
            this.tableLoading = true
            getTableData({
                pageNum: this.pageNum
            }).then((res: any) => {
                this.tableLoading = false
                if(res.code === 200){
                    this.tableData = res.data.list
                    this.total = res.data.total
                }else{
                    this.$message.error(res.msg)
                }
            })
        }

        // 删除数据
        deleteData(id: number): void{
            this.$confirm('确认删除这条记录么？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                DeleteTableData(id).then((res: any) => {
                    if(res.code === 200){
                        this.$message.success('删除成功')
                        this.initTable()
                    }else{
                        this.$message.error(res.msg)
                    }
                })
            }).catch(() => {})
        }

        // 分页显示
        handleCurrentChange(val: number): void{
            this.pageNum = val
            this.initTable()
        }
    }
</script>

<style lang="stylus">
    .el-table .warning-row
        background oldlace

    .el-table .success-row
        background #f0f9eb
    .pagination-warp
        width 100%
        height 30px
        line-height 30px
        text-align center
        margin 20px auto
</style>