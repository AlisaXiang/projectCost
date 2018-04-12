<template>
    <div>
        <div class="dialog_head_title">{{budgetDetails[0].project_name}}</div>
        <el-table :data="budgetDetails"
                  tooltip-effect="dark"
                  height="90"
                  border>
            <el-table-column label="启动日期" width="158">
                <template slot-scope="scope">
                    <el-date-picker type="date" style="width:136px" v-model="scope.row.start_time"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="上线日期" width="158">
                <template slot-scope="scope">
                    <el-date-picker type="date" style="width:136px" v-model="scope.row.online_time"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="合同金额" width="130">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.amount" @blur="getBudgetCount(scope.row)" :rules="[{ type: 'number', message: '年龄必须为数字值'}]"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="利润率">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.profit_rate"  @blur="getBudgetCount(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="利润金额">
                <template slot-scope="scope">
                    {{scope.row.profit}}
                    <!--<el-input v-model="scope.row.profit" readonly></el-input>-->
                </template>
            </el-table-column>
            <el-table-column label="投入成本">
                <template slot-scope="scope">
                    {{scope.row.in_cost}}
                </template>
            </el-table-column>
            <el-table-column label="人天单位成本" width="150">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.per_unit_cost" @blur="getBlurCount(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="投入人天">
                <template slot-scope="scope">
                    {{scope.row.in_per_unit || 0}}
                </template>
            </el-table-column>
            <el-table-column label="人员(位)">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.num_per" @blur="getBlurCount(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="耗时(月)">
                <template slot-scope="scope">
                    {{scope.row.time_count}}
                </template>
            </el-table-column>
        </el-table>
        <div class="right">
            <el-button type="primary" round @click="addRow">新增</el-button>
        </div>
        <el-table :data="detailsList"
                  tooltip-effect="dark"
                  height="380"
                  border>
            <el-table-column type="index" width="60">
                <template slot-scope="scope">
                    <img src="../../../assets/images/delete.png" @click="deleteRow(scope.$index)" v-show="scope.row.project_id"/>
                    <span v-show="!scope.row.project_id">总计</span>
                </template>
            </el-table-column>
            <el-table-column label="项目阶段">
                <el-table-column
                        label="阶段"
                        width="160">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.project_stage" v-show="scope.row.project_id"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        label="占比"
                        width="90">
                    <template slot-scope="scope">
                        <div v-show="scope.row.project_id">
                            <el-input v-model="scope.row.stage_rate" style="width:50px" @blur="getDetailCount(scope.row)"></el-input>&nbsp;%
                        </div>
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column label="项目计划">
                <el-table-column
                        prop="stage_putMan"
                        label="阶段投入人天"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="阶段开始日"
                        width="156">
                    <template slot-scope="scope">
                        <el-date-picker type="date" style="width:136px" v-model="scope.row.stage_start"  v-show="scope.row.project_id"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                        label="阶段截止日"
                        width="156">
                    <template slot-scope="scope">
                        <el-date-picker type="date" style="width:136px" v-model="scope.row.stage_end"  v-show="scope.row.project_id"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="stage_budget"
                        label="阶段预算成本"
                        width="120">
                </el-table-column>
            </el-table-column>
            <el-table-column label="项目实际情况">
                <el-table-column
                        label="项目进度"
                        width="120">
                    <template slot-scope="scope">
                        {{scope.row.project_process | addPercent}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="成本消耗占比"
                        width="120">
                    <template slot-scope="scope">
                        {{scope.row.cost_rate | addPercent}}
                    </template>
                </el-table-column>
                <el-table-column
                        label="阶段消耗人天"
                        width="130">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.stage_putman_cost" @blur="getDetailCount(scope.row)" v-show="scope.row.project_id"></el-input>
                        <span v-show="!scope.row.project_id">{{scope.row.stage_putman_cost}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="阶段消耗成本"
                        width="130">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.stage_cost" @blur="getDetailCount(scope.row)"  v-show="scope.row.project_id"></el-input>
                        <span v-show="!scope.row.project_id">{{scope.row.stage_cost}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                        label="各阶段进度(%)"
                        width="120">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.stage_process" style="width:80px"  @blur="getDetailCount(scope.row)"  v-show="scope.row.project_id"></el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="stage_cost_rate"
                        label="各阶段成本消耗占比(%)"
                        width="172">
                </el-table-column>
            </el-table-column>
        </el-table>
        <el-button-group class="center">
            <el-button type="primary" round @click="saveList">保存</el-button>
            <el-button type="info" round @click="cancel">取消</el-button>
        </el-button-group>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                mainInfo: [],
                listLength:this.detailsList.length
            }
        },
        props: {
            budgetDetails: Array,
            detailsList:Array,
            // listLength:Number
        },
        methods: {
            getBlurCount(row) {
                row.in_per_unit = parseFloat(row.in_cost / row.per_unit_cost).toFixed(2);
                if (row.in_per_unit && row.num_per) {
                    row.time_count = parseFloat(row.in_per_unit/row.num_per/22).toFixed(2)
                }
            },
            getBudgetCount(row) {
                if (row.amount && row.profit_rate) {
                    row.profit = row.amount * row.profit_rate;
                    row.in_cost = row.amount - row.profit;
                }
            },
            getDetailCount(row){
                this.listLength=this.detailsList.length;
                if(row.stage_rate){
                    this.rules(row.stage_rate);
                    row.stage_putMan = parseFloat(this.budgetDetails[0].in_per_unit*row.stage_rate/100).toFixed(2);
                    row.stage_budget = parseFloat(this.budgetDetails[0].per_unit_cost*row.stage_putMan).toFixed(2);
                }
                if(row.stage_process){
                    this.rules(row.stage_rate);
                    row.project_process =parseFloat(row.stage_process*row.stage_rate/100).toFixed(2)
                }
                if(row.stage_cost){
                    this.rules(row.stage_cost);
                    row.stage_cost_rate =parseFloat(row.stage_cost/row.stage_budget*100).toFixed(2)
                }
                if(row.stage_cost_rate && row.stage_rate){
                    row.cost_rate =parseFloat(row.stage_cost_rate*row.stage_rate/100).toFixed(2);
                }
                let stage_putMan=0;
                let stage_budget=0;
                let project_process=0;
                let cost_rate=0;
                let stage_putman_cost=0;
                let stage_cost=0;
                for(let i=0;i<this.detailsList.length-1;i++){
                    if(this.detailsList[i].stage_putMan){
                        stage_putMan = parseFloat(stage_putMan)+parseFloat(this.detailsList[i].stage_putMan);
                    }
                    if(this.detailsList[i].stage_budget){
                        stage_budget = parseFloat(stage_budget)+parseFloat(this.detailsList[i].stage_budget);
                    }
                    if(this.detailsList[i].project_process){
                        project_process = parseFloat(project_process)+parseFloat(this.detailsList[i].project_process);
                    }
                    if(this.detailsList[i].cost_rate){
                        cost_rate = parseFloat(cost_rate)+parseFloat(this.detailsList[i].cost_rate);
                    }
                    if(this.detailsList[i].stage_putman_cost){
                        stage_putman_cost = parseFloat(stage_putman_cost)+parseFloat(this.detailsList[i].stage_putman_cost);
                    }
                    if(this.detailsList[i].stage_cost){
                        stage_cost = parseFloat(stage_cost) + parseFloat(this.detailsList[i].stage_cost);
                    }
                }
                this.budgetDetails[0].consume_cost=stage_cost;
                this.budgetDetails[0].consume_per_unit=stage_putman_cost;
                this.budgetDetails[0].project_progress=project_process;
                this.budgetDetails[0].consumation_ratio=cost_rate;
                this.detailsList[this.listLength-1]={project_id:null,project_stage:'',stage_rate:'',stage_putMan:stage_putMan,stage_start:null,stage_end:null,stage_budget:stage_budget,project_process:project_process,cost_rate:cost_rate,stage_putman_cost:stage_putman_cost,stage_cost:stage_cost,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null};
            },
            addRow(){
                this.detailsList.pop();
                this.detailsList.push({project_id:this.budgetDetails[0].id,project_stage:'',stage_rate:'',stage_putMan:null,stage_start:null,stage_end:null,stage_budget:null,project_process:null,cost_rate:null,stage_putman_cost:null,stage_cost:null,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null});
                let stage_putMan=0;
                let stage_budget=0;
                let project_process=0;
                let cost_rate=0;
                let stage_putman_cost=0;
                let stage_cost=0;
                for(let i=0;i<this.detailsList.length-1;i++){
                    if(this.detailsList[i].stage_putMan){
                        stage_putMan = parseFloat(stage_putMan)+parseFloat(this.detailsList[i].stage_putMan);
                    }
                    if(this.detailsList[i].stage_budget){
                        stage_budget = parseFloat(stage_budget)+parseFloat(this.detailsList[i].stage_budget);
                    }
                    if(this.detailsList[i].project_process){
                        project_process = parseFloat(project_process)+parseFloat(this.detailsList[i].project_process);
                    }
                    if(this.detailsList[i].cost_rate){
                        cost_rate = parseFloat(cost_rate)+parseFloat(this.detailsList[i].cost_rate);
                    }
                    if(this.detailsList[i].stage_putman_cost){
                        stage_putman_cost = parseFloat(stage_putman_cost)+parseFloat(this.detailsList[i].stage_putman_cost);
                    }
                    if(this.detailsList[i].stage_cost){
                        stage_cost = parseFloat(stage_cost) + parseFloat(this.detailsList[i].stage_cost);
                    }
                }
                this.detailsList.push({project_id:null,project_stage:'',stage_rate:'',stage_putMan:stage_putMan,stage_start:null,stage_end:null,stage_budget:stage_budget,project_process:project_process,cost_rate:cost_rate,stage_putman_cost:stage_putman_cost,stage_cost:stage_cost,stage_process:null,stage_cost_rate:null,plan_amount:null,plan_amount_time:null,act_amount:null,act_amount_time:null});
                this.listLength=this.detailsList.length;
            },
            deleteRow(index){
                this.detailsList.splice(index,1);
            },
            saveList(){
                let list=[];
                for(let i=0;i<this.detailsList.length;i++){
                    if(this.detailsList[i].project_id){
                        list.push(this.detailsList[i]);
                    }
                }
                this.$ajax.post('http://127.0.0.1:3000/updateProjectBudgetDetails',this.$qs.stringify({
                    projectId:this.budgetDetails[0].id,
                    start_time: this.budgetDetails[0].start_time,
                    online_time: this.budgetDetails[0].online_time,
                    amount: this.budgetDetails[0].amount,
                    profit_rate: this.budgetDetails[0].profit_rate,
                    profit: this.budgetDetails[0].profit,
                    in_cost: this.budgetDetails[0].in_cost,
                    consume_cost: this.budgetDetails[0].consume_cost,
                    in_per_unit: this.budgetDetails[0].in_per_unit,
                    consume_per_unit: this.budgetDetails[0].consume_per_unit,
                    project_progress: this.budgetDetails[0].project_progress,
                    consumation_ratio: this.budgetDetails[0].consumation_ratio,
                    per_unit_cost:this.budgetDetails[0].per_unit_cost,
                    num_per:this.budgetDetails[0].num_per,
                    time_count:this.budgetDetails[0].time_count,
                    detailsList:list
                })).then(res=>{
                    if(res.data.code==1){
                        this.$message({
                            message:'修改成功',
                            type:'success'
                        });
                        this.$emit('cancel');
                    }else{
                        this.$message.error("预算详情修改失败！")
                    }
                })
            },
            cancel(){
                this.$emit('cancel');
            },
            rules(data){
                const param=/^[0-9]+(.[0-9]{2})?$/;
                if(!param.test(data)){
                    data = '';
                    this.$message({
                        message:'警告:请输入数字,小数点后仅能输入两位',
                        type:'warning'
                    });
                }
                return data
            },
            getSummaries(param) {
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = '总价';
                        return;
                    }
                    // const dataIndex=[1,2,4,5,9,10];//3,6,7,8,9,10
                    // if(dataIndex.indexOf(index)>-1){
                    //     const values = data.map(item => item[column.property]);
                    //     console.log(index,values);
                    //     // console.log(index,data[column.property]);
                    // }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] += '';
                    } else {

                        sums[index] = '';
                    }
                });
                return sums;
            },
            percentValue(row,column){
                // if(row.project_process){
                //     row.project_process+='%'
                // }
                // if(row.cost_rate){
                //     row.cost_rate+='%'
                // }

                // return row
            }
        }
    }
</script>
<style lang="stylus">
    .dialog_head_title
        text-align: center;font-size:24px;line-height: 24px;font-weight: 700;margin-bottom:5px
    .el-table td, .el-table th
        padding 5px 0px
    .el-input__inner
        height 36px
        padding 0px 3px
    .right
        width: 100%
        text-align: right
    .center
        width: 100%
        margin-left 38vw
</style>