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
                @selection-change="handleSelectionChange"
                @cell-dblclick="open">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="角色名称" width="120">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.name"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="界面权限">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.menu" readonly></el-input>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="权限配置"
                :visible.sync="dialogVisible"
                width="45%">
            <child :roleId="roleId"></child>
        </el-dialog>
    </div>
</template>
<style lang="stylus" src="../../../style/index.styl" scoped></style>
<script>
    import child from './child/index.vue'
    export default {
        name: "role",
        data() {
            return {
                modal:null,
                list: [],
                multipleSelection: [],
                levelOptions:[{
                    code:'1',
                    name:'资深'
                },{
                    code:'2',
                    name:'高级'
                }],
                formInline: {
                    user: '',
                    region: ''
                },
                editRow:[],
                dialogVisible: false,
                roleId:null
            }
        },
        components:{child},
        created(){
            this.getList();
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            edit(row){
                this.editRow = row;
            },
            editSave(row){
                this.$ajax.post('http://127.0.0.1:3000/updateLevel',this.$qs.stringify({
                    levelId:row.levelId,
                    levelName:row.levelName,
                    levelCost:row.levelCost
                })).then(res=>{
                    if(res.data.code==1){
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
            open(row,column,cell,event){
                if(column.label === '界面权限'){
                    this.roleId = row.id
                    this.dialogVisible=true
                }

            },
            getList(){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getRolePermission').then(res=>{
                    if(res.data.code==1){
                        this.list = res.data.rolesInfo;
                    }else{
                        this.$message.error("角色信息获取失败！");
                    }
                    loading.close();
                })
            },
            addRow(){
                this.list.push({levelId:'',levelName:'',levelCost:'',isFlag:2});
            },
            addSave(){
                let dataList=[];
                for(let i=0;i<this.list.length;i++){
                    if(!this.list[i].levelId){
                        dataList.push(this.list[i]);
                    }
                }
                this.$ajax.post('http://127.0.0.1:3000/addLevel',this.$qs.stringify({
                    levelList: dataList
                })).then(res=>{
                    if(res.data.code==1){
                        this.dialogVisible = false;
                        this.$message({
                            type: 'success',
                            message: '数据新增成功'
                        });
                        this.getList();
                    }else{
                        this.$message.error("级别信息新增失败！")
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
                        if(this.multipleSelection[i].levelId){
                            dataList.push(this.multipleSelection[i].levelId)
                        }
                    }
                    this.$ajax.post('http://127.0.0.1:3000/deleteLevel',this.$qs.stringify({
                        levelId: dataList
                    })).then(res=>{
                        if(res.data.code==1){
                            this.$message({
                                type: 'success',
                                message: '数据删除成功'
                            });
                            this.getList();
                        }else{
                            this.$message.error("级别信息新增失败！")
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