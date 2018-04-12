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
                height="580"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="级别">
                <template slot-scope="scope">
                    <el-select filterable v-model="scope.row.levelName" clearable placeholder="请选择" :disabled="scope.row.isFlag === 1">
                        <el-option
                                v-for="item in levelOptions"
                                :key="item.code"
                                :label="item.name"
                                :value="item.name">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="单价/元">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.levelCost" :disabled = "scope.row.isFlag === 1"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="编辑">
                <template slot-scope="scope">
                    <el-button type="text" @click="scope.row.isFlag = 2" v-show="scope.row.levelId && scope.row.isFlag === 1">编辑</el-button>
                    <el-button type="text" @click="editSave(scope.row)" v-show="scope.row.levelId && scope.row.isFlag === 2">确定</el-button>
                    <el-button type="text" @click="getList()" v-show="scope.row.levelId && scope.row.isFlag === 2">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="确认"
                :visible.sync="dialogVisible"
                width="30%">
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
    name: "level",
    data() {
        return {
            list: [],
            multipleSelection: [],
            levelOptions:[{
                code:'1',
                name:'资深'
            },{
                code:'2',
                name:'高级'
            },{
                code:'3',
                name:'中级'
            },{
                code:'4',
                name:'初级'
            },{
                code:'5',
                name:'试用'
            },{
                code:'6',
                name:'学习'
            }],
            formInline: {
                    user: '',
                    region: ''
                },
            editRow:[],
            dialogVisible: false
        }
    },
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
        getList(){
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$ajax.post('http://127.0.0.1:3000/getLevel').then(res=>{
                if(res.data.code==1){
                    this.list = res.data.levelInfo;
                }else{
                    this.$message.error("级别信息获取失败！");
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
            console.log(dataList)
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

<style scoped>

</style>