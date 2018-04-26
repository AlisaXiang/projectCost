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
                height="450"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="姓名">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.empName" :disabled = "scope.row.isFlag === 1"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="工号">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.empId" :disabled = "scope.row.isFlag === 1|| scope.row.isFlag === 2"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="职能分组" >
                <template slot-scope="scope">
                    <el-input v-model="scope.row.funGroup" :disabled = "scope.row.isFlag === 1"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="职能名称">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.funName" :disabled = "scope.row.isFlag === 1"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="所属部门">
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
            <el-table-column label="级别">
                <template slot-scope="scope" >
                    <el-select filterable v-model="scope.row.levelId" clearable placeholder="请选择" :disabled = "scope.row.isFlag === 1">
                        <el-option
                                v-for="level in levelOptions"
                                :key="level.code"
                                :label="level.levelName"
                                :value="level.levelId">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="用户角色">
                <template slot-scope="scope" >
                    <el-select  multiple
                                collapse-tags v-model="scope.row.roleId" clearable placeholder="请选择" :disabled = "scope.row.isFlag === 1">
                        <el-option
                                v-for="role in roleOptions"
                                :key="role.id"
                                :label="role.name"
                                :value="role.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="杂费/元">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.price" :disabled = "scope.row.isFlag === 1|| scope.row.isFlag === 2"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="编辑">
                <template slot-scope="scope">
                    <el-button type="text" @click="scope.row.isFlag = 2" v-show="scope.row.isNew && scope.row.isFlag === 1">编辑</el-button>
                    <el-button type="text" @click="editSave(scope.row)" v-show="scope.row.isNew&&scope.row.isFlag === 2">确定</el-button>
                    <el-button type="text" @click="canceleSave()" v-show="scope.row.isNew&&scope.row.isFlag === 2">取消</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block" >
            <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 20]"
                    :page-size = "pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="empCount">
            </el-pagination>
        </div>

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
        name: "employeeManager",
        data() {
            return {
                pageSize:10,
                pageNum:1,
                empCount:0,
                list: [],
                multipleSelection: [],
                deptOptions:[],
                levelOptions:[],
                roleOptions:[],
                formInline: {
                    user: '',
                    region: ''
                },
                editRow:[],
                dialogVisible: false
            }
        },
        created(){
            this.getEmpCount();
            this.getRoleInfos();
            this.getlevelInfo();
            this.getDeptInfo();
            this.getList(this.pageNum,this.pageSize);

        },
        methods: {
            getEmpCount(){
                this.$ajax.post('http://127.0.0.1:3000/getEmpCount').then(res=>{
                    if(res.data.code==1){
                    this.empCount = res.data.empCount;
                    console.log('empCount',this.empCount);
                }else{
                    this.$message.error("员工总数信息获取失败！")
                }
            })
            },
            //取消保存方法
            canceleSave() {
                //重新渲染一次
                this.getList(this.pageNum,this.pageSize);
            },
            //获取当前每页记录数,点击之后触发事件
            handleSizeChange(val) {
                this.pageSize = val;
                //调用分页方法进行分页
                this.getList(this.pageNum,val);
            },
            //获取当前页数,点击之后触发事件
            handleCurrentChange(val) {
                this.currentPage = val;
                //调用分页方法进行分页
                this.getList(val,this.pageSize);
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            editSave(row){
                this.$ajax.post('http://127.0.0.1:3000/updateEmpInfo',this.$qs.stringify({
                    empId:row.empId,
                    empName:row.empName,
                    levelId:row.levelId,
                    deptId:row.deptId,
                    funGroup:row.funGroup,
                    funName:row.funName,
                    price:row.price,
                    roleId:row.roleId
                })).then(res=>{
                    if(res.data.code==1){
                    this.dialogVisible = false;
                    this.getList(this.pageNum,this.pageSize);
                }else{
                    this.$message.error("员工信息修改失败！")
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
            getList(pageNum,pageSize){
                this.$ajax.post('http://127.0.0.1:3000/getEmpInfos',this.$qs.stringify({
                    pageNum:pageNum,
                    pageSize:pageSize
                })).then(res=>{
                    if(res.data.code==1){
                    this.list = res.data.empInfos;
                }else{
                    this.$message.error("员工信息获取失败！")
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
            getlevelInfo(){
                this.$ajax.post('http://127.0.0.1:3000/getLevel').then(res=>{
                    if(res.data.code==1){
                    this.levelOptions = res.data.levelInfo;
                }else{
                    this.$message.error("级别信息获取失败！")
                }
            })
            },
            getRoleInfos(){
                this.$ajax.post('http://127.0.0.1:3000/getRoleInfos').then(res=>{
                    if(res.data.code==1){
                    this.roleOptions = res.data.roleInfos;
                }else{
                    this.$message.error("角色信息获取失败！")
                }
            })
            },

            addRow(){
                this.list.push({empName:'',empId:'',funGroup:'',funName:'',deptId:'',levelId:'',roleId:'',price:'',isFlag:'',isNew:''});
            },
            addSave(){
                let dataList=[];
                for(let i=0;i<this.list.length;i++){
                    if(!this.list[i].isNew){
                        dataList.push(this.list[i]);
                    }
                    console.log(dataList);
                }
                this.$ajax.post('http://127.0.0.1:3000/addEmpInfo',this.$qs.stringify({
                    empList: dataList
                })).then(res=>{
                    if(res.data.code==1){
                    this.dialogVisible = false;
                    this.$message({
                        type: 'success',
                        message: '数据新增成功'
                    });
                    this.getList(this.pageNum,this.pageSize);
                }else{
                    this.$message.error("员工信息新增失败！")
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
                    if(this.multipleSelection[i].empId){
                        dataList.push(this.multipleSelection[i].empId)
                    }
                }
                console.log(dataList);
                this.$ajax.post('http://127.0.0.1:3000/deleteEmpInfos',this.$qs.stringify({
                    empInfos: dataList
                })).then(res=>{
                    if(res.data.code==1){
                    this.$message({
                        type: 'success',
                        message: '数据删除成功'
                    });
                    this.getList(this.pageNum,this.pageSize);
                }else{
                    this.$message.error("员工删除信息失败！")
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