<template>
    <!--<div scope-slot="title">{{costDetails[0].projectName}}</div>-->
    <div>
        <div class="header">
            <ul class="head-ul">
                <li>{{costDetails[0].projectName}}</li>
                <li>项目负责人:{{costDetails[0].leader}}</li>
                <li>项目分类:{{costDetails[0].type}}</li>
            </ul>
        </div>
        <div class="toolbar">
            <div class="form-row">
                <div class="form-input">
                    <label>姓名</label>
                    <el-input v-model="userName"></el-input>
                </div>
                <div class="form-input">
                    <label>部门</label>
                    <el-input v-model="dept"></el-input>
                </div>
                <div class="form-input">
                    <label>级别</label>
                    <el-select filterable v-model="level" clearable placeholder="请选择" style="width:100%">
                        <el-option
                                v-for="cate in levelList"
                                :key="cate.levelId"
                                :label="cate.levelName"
                                :value="cate.levelId">
                        </el-option>
                    </el-select>
                </div>
                <div class="form-input">
                    <el-button type="success" @click="getCostInfo">搜索</el-button>
                </div>
                <div class="form-input-last">
                    <el-button-group>
                        <el-button type="primary" @click="addRow">新增</el-button>
                        <el-button type="primary" @click="saveDetails">保存</el-button>
                    </el-button-group>
                </div>
            </div>
        </div>
        <el-table :data="costDetailsList"
                  tooltip-effect="dark"
                  width="100%"
                  height="210"
                  border>
            <el-table-column label="姓名" width="120">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.user_name" @blur="getInfoByPerson(scope.row)"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="级别" prop="level">
            </el-table-column>
            <el-table-column label="部门" prop="dept">
            </el-table-column>
            <el-table-column label="进场时间" width="156px">
                <template slot-scope="scope">
                    <el-date-picker style="width:136px" v-model="scope.row.entry_time"
                                    @blur="getPrice(scope.row)"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="退场时间" width="156px">
                <template slot-scope="scope">
                    <el-date-picker style="width:136px" v-model="scope.row.exit_time"
                                    @blur="getPrice(scope.row)"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column label="人天/天" prop="per_time_count">
            </el-table-column>
            <!--<el-table-column label="月份/月" prop="month">-->
            <!--</el-table-column>-->
            <el-table-column label="人员单价总计" width="120" prop="per_price_count">
            </el-table-column>
            <el-table-column label="杂项总计" prop="dept_price_count">
            </el-table-column>
            <el-table-column label="费用总计" prop="per_count">
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="stylus" src="../../../style/index.styl" scoped></style>
<script>
    export default {
        data() {
            return {
                userName: '',
                dept: '',
                level: ''
            }
        },
        props: {
            costDetails: Array,
            detailsList: Array,
            levelList: Array
        },
        computed: {
            costDetailsList: {
                get: function () {
                    return JSON.parse(JSON.stringify(this.detailsList))
                },
                set:function(newValue){
                    return newValue
                }
            }
        },
        created() {
        },
        methods: {
            addRow() {
                this.costDetailsList.push({
                    id: this.costDetails[0].id,
                    user_id: null,
                    entry_time: null,
                    exit_time: null,
                    per_time_count: 0,
                    month: null,
                    per_price: 0,
                    per_price_count: 0,
                    dept: null,
                    dept_price: 0,
                    dept_price_count: 0,
                    dept_cate_id: null,
                    user_name: null,
                    create_time: null,
                    update_time: null,
                    per_count: 0,
                    count: 0,
                    time_count: 0,
                    month_count: 0,
                    level_id: null,
                    level: null
                });
            },
            getCostInfo() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getProjectCostDetail', this.$qs.stringify({
                    id: this.costDetails[0].id,
                    userName: this.userName,
                    dept: this.dept,
                    level: this.level
                })).then(res => {
                    if (res.data.code == 1) {
                        this.costDetailsList = res.data.costInfo;
                    } else {
                        this.$message.error("项目成本信息获取失败！");
                    }
                    loading.close();
                })
            },
            getInfoByPerson(row) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getInfoByPerson', this.$qs.stringify({
                    userName: row.user_name,
                })).then(res => {
                    let info = [];
                    if (res.data.code == 1) {
                        if (res.data.personInfo.length > 0) {
                            info = res.data.personInfo;
                            row.dept_cate_id = info[0].deptId;
                            row.dept = info[0].dept;
                            row.level_id = info[0].level_id;
                            row.level = info[0].level;
                            row.per_price = info[0].levelPrice;
                            row.dept_price = info[0].deptPrice;
                        } else {
                            this.$message({message: '员工不存在，请检查该员工姓名是否填写错误', type: 'warning'});
                        }

                    } else {
                        this.$message.error("人员信息获取失败！");
                    }
                    loading.close();
                })
            },
            getPrice(row) {
                if (row.entry_time && row.exit_time) {
                    if (row.entry_time < row.exit_time) {
                        const beginDate = new Date(row.entry_time);//开始时间
                        const endDate = new Date(row.exit_time);//结束日期
                        let workDayVal = (endDate - beginDate) / 86400000 + 1;//日期差值,即包含周六日、以天为单位的工时，86400000=1000*60*60*24.
                        let remainder = workDayVal % 7;//工时的余数
                        let divisor = Math.floor(workDayVal / 7);//工时向下取整的除数
                        let weekendDay = 2 * divisor;
                        var nextDay = beginDate.getDay();//起始日期的星期，星期取值有（1,2,3,4,5,6,0）
                        for (var tempDay = remainder; tempDay >= 1; tempDay--) {//从起始日期的星期开始 遍历remainder天
                            //第一天不用加1
                            if (tempDay == remainder) {
                                nextDay = nextDay + 0;
                            } else if (tempDay != remainder) {
                                nextDay = nextDay + 1;
                            }
                            if (nextDay == 7) {
                                nextDay = 0;
                            }//周日，变更为0
                            if (nextDay == 0 || nextDay == 6) {
                                weekendDay = weekendDay + 1;
                            }//周六日
                        }
                        workDayVal = workDayVal - weekendDay;//实际工时（天） = 起止日期差 - 周六日数目。
                        row.per_time_count = workDayVal;
                        row.month = workDayVal / 22;
                        row.per_price_count = row.per_time_count * row.per_price;
                        row.dept_price_count = row.per_time_count * row.dept_price;
                        row.per_count = row.per_price_count + row.dept_price_count;
                        console.log(workDayVal);
                    } else {
                        row.entry_time = null;
                        row.exit_time = null;
                        this.$mesage({type: 'warning', message: '警告：退场时间必须大于进场时间'});
                    }
                }

            },
            saveDetails() {
                if(this.costDetailsList){
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/saveProjectCostDetail', this.$qs.stringify({
                    list: this.costDetailsList,
                    id:this.costDetails[0].id
                })).then(res => {
                    if (res.data.code == 1) {
                        this.cancel();
                        this.$message({
                            type: 'success',
                            message: '修改成功'
                        });
                    } else {
                        this.$message.error("项目成本信息更新失败！");
                    }
                    loading.close();
                })
            }else {
                    this.$message({type:'warning',message:'没有数据，不能保存'});
                }
            },
            cancel(){
                this.$emit('cancel');
            },
        }
    }
</script>
<style lang="stylus">
    .form-content
        display: inline-block
        width 30%

    .form-row
        position: relative
        .form-input-last
            position absolute
            top 22px
            right 2px

    .dialog_head_title
        text-align: center;
        font-size: 24px;
        line-height: 24px;
        font-weight: 700;
        margin-bottom: 5px

    .el-dialog__body
        padding 2px 20px

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