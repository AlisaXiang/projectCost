<template>
    <div class="content">
        <div class="toolbar">
            <div class="toolbar-action">
                <el-button-group>
                    <el-button type="success" @click="addRow">新增</el-button>
                    <el-button type="primary" @click="addSave">保存</el-button>
                    <el-button type="danger" @click="deleteSave">删除</el-button>
                </el-button-group>
            </div>
        </div>
        <el-table
                :data="list"
                tooltip-effect="dark"
                height="250"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="项目类型">
                <template slot-scope="scope">
                    <el-select filterable v-model="scope.row.cateId" clearable placeholder="请选择" :disabled = "scope.row.isFlag === 1">
                        <el-option
                                v-for="cate in cateOptions"
                                :key="cate.id"
                                :label="cate.name"
                                :value="cate.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
             <el-table-column label="部门">
                            <template slot-scope="scope" >
                                <el-select filterable v-model="scope.row.deptId" clearable placeholder="请选择" :disabled = "scope.row.isFlag === 1">
                                    <el-option
                                            v-for="dept in deptOptions"
                                            :key="dept.id"
                                            :label="dept.name"
                                            :value="dept.id">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
            <el-table-column label="杂费/元">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.price" :disabled = "scope.row.isFlag === 1"></el-input>
                </template>
            </el-table-column>
             <el-table-column label="编辑">
                             <template slot-scope="scope">
                                 <el-button type="text" @click="scope.row.isFlag = 2" v-show=" scope.row.id && scope.row.isFlag === 1">编辑</el-button>
                                 <el-button type="text" @click="editSave(scope.row)" v-show=" scope.row.id && scope.row.isFlag === 2">确定</el-button>
                                 <el-button type="text" @click="getList()" v-show=" scope.row.id && scope.row.isFlag === 2">取消</el-button>
                             </template>
                         </el-table-column>
                     </el-table>
        <el-dialog
                title="确认"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
            <span>是否确认进行该操作</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editSave">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>
<style lang="stylus" src="../../style/index.styl" scoped></style>
<script>
export default {
    name: "otherPrice",
    data() {
        return {
            list: [],
            multipleSelection: [],
            deptOptions:[],
            cateOptions:[],
            formInline: {
                    user: '',
                    region: ''
                },
            editRow:[],
            dialogVisible: false
        }
    },
    created(){
    this.getCateInfo();
    this.getDeptInfo();
    this.getList();
    },
    methods: {
        handleSelectionChange(val){
            this.multipleSelection = val;
        },
        editSave(row){
            this.$ajax.post('http://127.0.0.1:3000/updateOtherPrice',this.$qs.stringify({
                id:row.id,
                deptId:row.deptId,
                cateId:row.cateId,
                price:row.price
            })).then(res=>{
                if(res.data.code==1){
                    this.dialogVisible = false;
                    this.getList();
                }else{
                    this.$message.error("级别信息修改失败！")
                }
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        getList(){
            this.$ajax.post('http://127.0.0.1:3000/getOtherPrice').then(res=>{
                if(res.data.code==1){
                    this.list = res.data.otherPrice;
                }else{
                    this.$message.error("杂费信息获取失败！")
                }
            })
        },
         getDeptInfo(){
                    this.$ajax.post('http://127.0.0.1:3000/getDeptIds').then(res=>{
                        if(res.data.code==1){
                            this.deptOptions = res.data.deptIds;
                        }else{
                            this.$message.error("部门信息获取失败！")
                        }
                    })
                },
        getCateInfo(){
                    this.$ajax.post('http://127.0.0.1:3000/getCateIds').then(res=>{
                        if(res.data.code==1){
                            this.cateOptions = res.data.cateIds;
                        }else{
                            this.$message.error("部门信息获取失败！")
                        }
                    })
         },

        addRow(){
            this.list.push({id:'',deptId:'',cateId:'',price:'',isFlag:2});
        },
        addSave(){
            let dataList=[];
            for(let i=0;i<this.list.length;i++){
                if(!this.list[i].id){
                    dataList.push(this.list[i]);
                }
            }
            this.$ajax.post('http://127.0.0.1:3000/addOtherPrice',this.$qs.stringify({
                otherList: dataList
            })).then(res=>{
                if(res.data.code==1){
                    this.dialogVisible = false;
                    this.$message({
                        type: 'success',
                        message: '数据新增成功'
                    });
                    this.getList();
                }else{
                    this.$message.error("杂费信息新增失败！")
                }
            })
        },
        deleteSave(){
            this.$confirm('此操作将删除选中的数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let dataList=[];
                for(let i=0;i<this.multipleSelection.length;i++){
                    if(this.multipleSelection[i].id){
                        dataList.push(this.multipleSelection[i].id)
                    }
                }
               console.log(dataList);
                this.$ajax.post('http://127.0.0.1:3000/deleteOtherPrice',this.$qs.stringify({
                    otherId: dataList
                })).then(res=>{
                    if(res.data.code==1){
                        this.$message({
                            type: 'success',
                            message: '数据删除成功'
                        });
                        this.getList();
                    }else{
                        this.$message.error("级别删除信息失败！")
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
</script>

<style scoped>

</style>