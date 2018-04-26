<template>
    <div class="content">

        <div class="toolbar">
            <div class="form-row">
                <div class="form-input">
                    <label>项目名称</label>
                    <el-input v-model="projectName"></el-input>
                </div>
                <div class="form-input">
                    <label>项目负责人</label>
                    <el-input v-model="projectOwnerName"></el-input>
                </div>
                <div class="form-input">
                    <el-button type="success" @click="getList">搜索</el-button>
                </div>
            </div>
            <div class="toolbar-action">
                <el-button-group>
                    <el-button type="success" @click="addRow">新增</el-button>
                    <el-button type="primary" @click="addSave">保存</el-button>
                </el-button-group>
            </div>
        </div>
        <el-table
                :data="list"
                tooltip-effect="dark"
                height="520"
                border
                @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column label="项目名称" width="240">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.project_name"
                              :disabled="scope.row.id && multipleSelection.indexOf(scope.row) === -1"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="项目负责人" width="100">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.leader_name"
                              :disabled="scope.row.id && multipleSelection.indexOf(scope.row) === -1"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="项目类型" width="128">
                <template slot-scope="scope">
                    <el-select filterable v-model="scope.row.projectType" clearable placeholder="请选择" :disabled = "scope.row.id && multipleSelection.indexOf(scope.row) === -1">
                        <el-option
                                v-for="cate in ptOptions"
                                :key="cate.id"
                                :label="cate.name"
                                :value="cate.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="项目分类" width="146">
                <template slot-scope="scope">
                    <el-select filterable v-model="scope.row.cate_id" clearable placeholder="请选择" :disabled = "scope.row.id && multipleSelection.indexOf(scope.row) === -1">
                        <el-option
                                v-for="cate in cateOptions"
                                :key="cate.id"
                                :label="cate.name"
                                :value="cate.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="启动日期" width="158">
                <template slot-scope="scope">
                    <el-date-picker type="date" style="width:136px" v-model="scope.row.start_time"
                                    :disabled="scope.row.id && multipleSelection.indexOf(scope.row) === -1"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="上线日期" width="158">
                <template slot-scope="scope">
                    <el-date-picker type="date" style="width:136px" v-model="scope.row.online_time"
                                    :disabled="scope.row.id && multipleSelection.indexOf(scope.row) === -1"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="合同金额" width="130">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.amount" @blur="getBudgetCount(scope.row)"
                              :disabled="scope.row.id && multipleSelection.indexOf(scope.row) === -1"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="利润率">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.profit_rate" @blur="getBudgetCount(scope.row)"
                              :disabled="scope.row.id && multipleSelection.indexOf(scope.row) === -1"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="利润金额" width="130">
                <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.profit" readonly></el-input>-->
                    {{scope.row.profit}}
                </template>
            </el-table-column>
            <el-table-column label="投入成本" width="130">
                <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.in_cost" readonly></el-input>-->
                    {{scope.row.in_cost}}
                </template>
            </el-table-column>
            <el-table-column label="已消耗成本" width="100">
                <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.consume_cost" readonly></el-input>-->
                    {{scope.row.consume_cost}}
                </template>
            </el-table-column>
            <el-table-column label="投入人天">
                <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.in_per_unit" readonly></el-input>-->
                    {{scope.row.in_per_unit}}
                </template>
            </el-table-column>
            <el-table-column label="已消耗人天" width="100">
                <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.consume_per_unit" readonly></el-input>-->
                    {{scope.row.consume_per_unit}}
                </template>
            </el-table-column>
            <el-table-column label="项目进度">
                <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.project_progress" readonly></el-input>-->
                    {{scope.row.project_progress}}
                </template>
            </el-table-column>
            <el-table-column label="消耗占比">
                <template slot-scope="scope">
                    <!--<el-input v-model="scope.row.consumation_ratio" readonly></el-input>-->
                    {{scope.row.consumation_ratio}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.id && (userName === scope.row.leader_name || userName === 'ADMINISTRATOR')" type="primary" @click="getBudgetDetails(scope.row)">预算详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="预算详情"
                :visible.sync="dialogVisible"
                top="8vh"
                width="90%">
            <detailsMsg :budgetDetails="budgetDetails" :detailsList="detailsList" :listLength="listLength" @cancel="cancel"></detailsMsg>
        </el-dialog>
    </div>
</template>
<style lang="stylus" src="../../style/index.styl" scoped></style>
<script>
    import detailsMsg from './child/index.vue'
    export default {
        name: "project-Budget",
        data() {
            return {
                modal: null,
                login_name:sessionStorage.getItem('name'),
                list: [],
                multipleSelection: [],
                projectName: '',
                projectOwnerName: '',
                dialogVisible: false,
                budgetDetails: [],
                detailsList: [],
                listLength: null,
                userName:sessionStorage.getItem('name'),
                cateOptions:[],
                ptOptions:[{id:1,name:'内部产品研发'},{id:2,name:'实施类-人天'},{id:3,name:'实施类-固定金额'}]
            }
        },
        components:{
            detailsMsg
        },
        created() {
            this.getList();
            this.getCateInfo();
        },
        methods: {
            getCateInfo(){
                this.$ajax.post('http://127.0.0.1:3000/getCateIds').then(res=>{
                    if(res.data.code==1){
                        this.cateOptions = res.data.cateIds;
                    }else{
                        this.$message.error("部门信息获取失败！")
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            edit(row) {
                this.editRow = row;
            },
            editSave(row) {
                this.$ajax.post('http://127.0.0.1:3000/updateLevel', this.$qs.stringify({
                    levelId: row.levelId,
                    levelName: row.levelName,
                    levelCost: row.levelCost
                })).then(res => {
                    if (res.data.code == 1) {
                        this.getList();
                    } else {
                        this.$message.error("级别信息修改失败！")
                    }
                })
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            open(row, column, cell, event) {
                if (column.label === '界面权限') {
                    this.roleId = row.id
                    this.dialogVisible = true
                }

            },
            getList() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getProjectBudget', this.$qs.stringify({
                    projectName: this.projectName,
                    owner: this.projectOwnerName
                })).then(res => {
                    if (res.data.code == 1) {
                        this.list = res.data.budgetInfo;
                    } else {
                        this.$message.error("项目预算信息获取失败！");
                    }
                    loading.close();
                })
            },
            addRow() {
                this.list.push({
                    id:null,
                    project_name: null,
                    leader_name: null,
                    projectType: null,
                    cate_id: null,
                    start_time: null,
                    online_time: null,
                    amount: null,
                    profit_rate: null,
                    profit: null,
                    in_cost: null,
                    consume_cost: null,
                    in_per_unit: null,
                    consume_per_unit: null,
                    project_progress: null,
                    consumation_ratio: null
                });
            },
            addSave() {
                if (this.multipleSelection.length>0) {
                    if (this.multipleSelection.length > 1) {
                        this.$message({message: '警告:一次只能修改一条记录'})
                    } else {
                        this.$ajax.post('http://127.0.0.1:3000/updateProjectBudget', this.$qs.stringify({
                            id:this.multipleSelection[0].id,
                            project_name: this.multipleSelection[0].project_name,
                            leader_name: this.multipleSelection[0].leader_name,
                            projectType: this.multipleSelection[0].projectType,
                            cate_id: this.multipleSelection[0].cate_id,
                            start_time: this.multipleSelection[0].start_time,
                            online_time: this.multipleSelection[0].online_time,
                            amount: parseFloat(this.multipleSelection[0].amount),
                            profit_rate: parseFloat(this.multipleSelection[0].profit_rate),
                            profit: parseFloat(this.multipleSelection[0].profit),
                            in_cost: parseFloat(this.multipleSelection[0].in_cost),
                            consume_cost: parseFloat(this.multipleSelection[0].consume_cost),
                            in_per_unit: parseFloat(this.multipleSelection[0].in_per_unit),
                            consume_per_unit: parseFloat(this.multipleSelection[0].consume_per_unit),
                            project_progress: this.multipleSelection[0].project_progress,
                            consumation_ratio: parseFloat(this.multipleSelection[0].consumation_ratio)
                        })).then(res => {
                            if (res.data.code == 1) {
                                this.$message({
                                    type: 'success',
                                    message: '数据修改成功'
                                });
                                this.getList();
                            } else {
                                this.$message.error("数据修改失败！")
                            }
                        })

                    }
                } else {
                    let dataList = [];
                    for (let i = 0; i < this.list.length; i++) {
                        if (!this.list[i].id) {
                            dataList.push(this.list[i]);
                        }
                    }
                    this.$ajax.post('http://127.0.0.1:3000/addProjectBudget', this.$qs.stringify({
                        budgetList: dataList
                    })).then(res => {
                        if (res.data.code == 1) {
                            this.dialogVisible = false;
                            this.$message({
                                type: 'success',
                                message: '数据新增成功'
                            });
                            this.getList();
                        } else {
                            this.$message.error("数据新增失败！")
                        }
                    })
                }
            },
            deleteSave() {
                this.$confirm('此操作将删除选中的数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let dataList = [];
                    for (let i = 0; i < this.multipleSelection.length; i++) {
                        if (this.multipleSelection[i].levelId) {
                            dataList.push(this.multipleSelection[i].levelId)
                        }
                    }
                    this.$ajax.post('http://127.0.0.1:3000/deleteLevel', this.$qs.stringify({
                        levelId: dataList
                    })).then(res => {
                        if (res.data.code == 1) {
                            this.$message({
                                type: 'success',
                                message: '数据删除成功'
                            });
                            this.getList();
                        } else {
                            this.$message.error("级别信息新增失败！")
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            getBudgetCount(row) {
                if (row.amount && row.profit_rate) {
                    row.profit = row.amount * row.profit_rate;
                    row.in_cost = row.amount - row.profit;
                }
            },
            getBudgetDetails(row){
                this.dialogVisible = true;
                this.detailsList=[];
                const list=[];
                list.push(row);
                this.getDetailsList(row.id);
                this.budgetDetails=JSON.parse(JSON.stringify(list));
            },
            getDetailsList(id) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getProjectBudgetDetails', this.$qs.stringify({
                    projectId: id
                })).then(res => {
                    if (res.data.code == 1) {
                        if(res.data.budgetInfo.length>0){
                            this.detailsList = res.data.budgetInfo;
                            let stage_putMan=0;
                            let stage_budget=0;
                            let project_process=0;
                            let cost_rate=0;
                            let stage_putman_cost=0;
                            let stage_cost=0;
                            for(let i=0;i<this.detailsList.length;i++){
                                stage_putMan = parseFloat(stage_putMan)+parseFloat(this.detailsList[i].stage_putMan);
                                stage_budget = parseFloat(stage_budget)+parseFloat(this.detailsList[i].stage_budget);
                                project_process = parseFloat(project_process)+parseFloat(this.detailsList[i].project_process);
                                cost_rate = parseFloat(cost_rate)+parseFloat(this.detailsList[i].cost_rate);
                                stage_putman_cost = parseFloat(stage_putman_cost)+parseFloat(this.detailsList[i].stage_putman_cost);
                                stage_cost = parseFloat(stage_cost) + parseFloat(this.detailsList[i].stage_cost);
                            }
                            this.detailsList.push({project_id:null,project_stage:'',stage_rate:'',stage_putMan:stage_putMan,stage_start:null,stage_end:null,stage_budget:stage_budget,project_process:project_process,cost_rate:cost_rate,stage_putman_cost:stage_putman_cost,stage_cost:stage_cost,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null});
                        }else{
                            this.detailsList.push(
                                {project_id:id,project_stage:'项目启动阶段',stage_rate:'',stage_putMan:null,stage_start:null,stage_end:null,stage_budget:null,project_process:0,cost_rate:0,stage_putman_cost:null,stage_cost:null,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null},
                                {project_id:id,project_stage:'方案设计阶段',stage_rate:'',stage_putMan:null,stage_start:null,stage_end:null,stage_budget:null,project_process:0,cost_rate:0,stage_putman_cost:null,stage_cost:null,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null},
                                {project_id:id,project_stage:'系统开发阶段',stage_rate:'',stage_putMan:null,stage_start:null,stage_end:null,stage_budget:null,project_process:0,cost_rate:0,stage_putman_cost:null,stage_cost:null,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null},
                                {project_id:id,project_stage:'系统测试阶段',stage_rate:'',stage_putMan:null,stage_start:null,stage_end:null,stage_budget:null,project_process:0,cost_rate:0,stage_putman_cost:null,stage_cost:null,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null},
                                {project_id:id,project_stage:'系统上线阶段',stage_rate:'',stage_putMan:null,stage_start:null,stage_end:null,stage_budget:null,project_process:0,cost_rate:0,stage_putman_cost:null,stage_cost:null,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null},
                                {project_id:id,project_stage:'项目收尾阶段',stage_rate:'',stage_putMan:null,stage_start:null,stage_end:null,stage_budget:null,project_process:0,cost_rate:0,stage_putman_cost:null,stage_cost:null,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null},
                                {project_id:null,project_stage:'',stage_rate:'',stage_putMan:0,stage_start:null,stage_end:null,stage_budget:0,project_process:0,cost_rate:0,stage_putman_cost:0,stage_cost:0,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null});
                        }
                        this.listLength = this.detailsList.length
                    } else {
                        this.$message.error("项目预算信息获取失败！");
                    }
                    loading.close();
                })
            },
            cancel(){
                this.getList();
                this.dialogVisible = false;
            },
            getPrint(){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://localhost:8080/print/receive-data', this.$qs.stringify({area_mgroup:"dfsfzsfffsd"}))
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
</script>
<style lang="stylus">
    .el-dialog__body
        padding:10px 15px
</style>