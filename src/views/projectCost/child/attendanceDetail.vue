<template>
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
                    <label>时间</label>
                    <el-date-picker style="width:100%"
                                    v-model="atten_time"
                                    type="month"
                                    placeholder="选择月">
                    </el-date-picker>
                </div>
                <div class="form-input">
                    <el-button type="success" @click="getAttendanceInfo">搜索</el-button>
                </div>
                <div class="form-input-last">
                    <el-button-group>
                        <!--<el-button type="primary" @click="addRow">新增</el-button>-->
                        <el-button type="primary" @click="saveDetails">保存</el-button>
                    </el-button-group>
                </div>
            </div>
        </div>
        <el-table :data="attenDetailsList"
                  tooltip-effect="dark"
                  width="100%"
                  height="360"
                  :cell-style="getCellStyle"
                  show-summary
                  border>
            <el-table-column fixed label="姓名" width="50px" prop="user_name">
            </el-table-column>
            <el-table-column fixed label="级别" prop="level" width="50px">
            </el-table-column>
            <el-table-column fixed label="部门" prop="dept" width="60px">
            </el-table-column>
            <el-table-column label="1" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i1" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="2" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i2" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="3" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i3" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="4" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i4" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="5" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i5" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="6" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i6" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="7" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i7" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="8" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i8" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="9" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i9" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="10" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i10" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="11" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i11" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="12" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i12" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="13" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i13" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="14" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i14" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="15" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i15" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="16" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i16" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="17" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i17" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="18" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i18" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="19" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i19" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="20" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i20" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="21" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i21" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="22" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i22" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="23" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i23" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="24" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i24" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="25" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i25" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="26" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i26" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="27" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i27" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="28" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i28" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="29" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i29" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="30" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i30" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="31" width="26px">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.i31" @blur="getCount(scope.row)"
                              style="width:18px;background-color: transparent"></el-input>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="人天/天" prop="per_time">
            </el-table-column>
            <el-table-column fixed="right" label="人员单价总计" width="120" prop="per_price_count">
            </el-table-column>
            <el-table-column fixed="right" label="杂项总计" prop="dept_price_count">
            </el-table-column>
            <el-table-column fixed="right" label="费用总计" prop="count2">
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
                level: '',
                atten_time: '',
                start: '',
                end: '',
                attenDetails: [],
                // attenDetailsList: JSON.parse(JSON.stringify(this.attendanceList)),
                weekendInfo: [],
                attenDetailsList: [],
            }
        },
        props: {
            costDetails: Array,
            levelList: Array,
            attendanceList: Array,
            weekendList: Array,
            dayList: Array,
            countInfo:Array
        },
        watch: {
            attendanceList: function () {
                this.attenDetailsList = JSON.parse(JSON.stringify(this.attendanceList));
            },
            weekendList: function () {
                this.weekendInfo = JSON.parse(JSON.stringify(this.weekendList));
            },
        },
        computed: {
            /*attenDetailsList: {
                get: function () {
                    console.log('get ',JSON.parse(JSON.stringify(this.attendanceList)));
                    return JSON.parse(JSON.stringify(this.attendanceList));
                },
                set: function (newValue) {
                    console.log('set',newValue);
                   // this.attenDetailsList = newValue;
                    return newValue
                }
            },*/
        },
        methods: {
            addRow() {

            },
            getAttendanceInfo() {
                let searchDate = this.atten_time ? this.atten_time : new Date();
                let getMonth = searchDate.getMonth() + 1;
                let getYear = searchDate.getFullYear();
                getMonth = getMonth < 10 ? "0" + getMonth : getMonth;
                this.$ajax.post('http://127.0.0.1:3000/getProjectAttendance', this.$qs.stringify({
                    id: this.costDetails[0].id,
                    userName: this.userName,
                    dept: this.dept,
                    level: this.level,
                    atten_time: getYear + '' + getMonth
                })).then(res => {
                    if (res.data.code == 1) {
                        const d = new Date(getYear, getMonth, 0).getDate();
                        let attendanceListInfo = res.data.attendanceInfo;
                        if (attendanceListInfo) {
                            this.weekendInfo = [];
                            for (let k = 0, listLength = attendanceListInfo.length; k < listLength; k++) {
                                for (let i = 1; i <= d; i++) {
                                    attendanceListInfo.i = '';
                                    const myDay = i < 10 ? "0" + i : i;
                                    const myDate = new Date(getYear + '-' + getMonth + '-' + myDay);
                                    this.dayList.push(i);
                                    //attendanceLists[k].push({i: i});
                                    if (attendanceListInfo[k].atten_day) {
                                        if (attendanceListInfo[k].atten_day.indexOf(i) > -1) {
                                            attendanceListInfo[k]['i' + i] = 1;
                                        }
                                    }
                                    const m = myDate.getDay();
                                    if (m == 6 || m == 0) {
                                        this.weekendInfo.push(i)
                                    }
                                }
                            }
                        }

                        this.attenDetailsList = attendanceListInfo;
                    } else {
                        this.$message.error("考勤信息获取失败！");
                    }
                })
            },
            saveDetails() {
                let per_sum=0;
                let count_sum=0;
                for(let i=0,listLength=this.attenDetailsList.length;i<listLength;i++){
                    per_sum=per_sum+parseFloat(this.countInfo[0].per_time?this.countInfo[0].per_time:0)+parseFloat(this.attenDetailsList[i].per_time?this.attenDetailsList[i].per_time:0);
                    count_sum =count_sum + parseFloat(this.countInfo[0].sumCount?this.countInfo[0].sumCount:0)+parseFloat(this.attenDetailsList[i].count2?this.attenDetailsList[i].count2:0)
                }
                this.$ajax.post('http://127.0.0.1:3000/updateProjectAttendance', this.$qs.stringify({
                    id:this.attenDetailsList[0].project_id,
                    list:this.attenDetailsList,
                    per_sum:per_sum,
                    count_sum:count_sum
                })).then(res => {
                    if (res.data.code == 1) {
                        this.$message({message: '数据更新成功', type: 'success'});
                        this.cancel();
                    } else {
                        this.$message.error("更新失败！");
                    }
                })
            },
            getCellStyle(row, column, rowIndex, columnIndex) {
                if (this.dayList.indexOf(row.columnIndex - 2) > -1) {
                    if (this.weekendInfo.indexOf(row.columnIndex - 2) > -1) {
                        return 'background-color: deeppink;'
                    }
                }
            },
            getCount(row) {
                let sum = 0;
                let atten_day = '';
                let regPos = /^\d+(\.\d+)?$/;
                for (let i in row) {
                    if (i.indexOf('i')>-1 && regPos.test(i.replace('i',''))) {
                        if (row[i]) {
                            sum = parseFloat(sum) + parseFloat(row[i]);
                            if (atten_day) {
                                atten_day = atten_day + ',' + i.replace('i','');
                            } else {
                                atten_day = i.replace('i','');
                            }
                        }
                    }
                }
                row.atten_day = atten_day;
                row.per_time = sum;
                if(row.per_price !=0){
                    row.per_price_count = sum * row.per_price;
                }else{
                    row.per_price=0;
                    row.per_price_count = sum * row.per_price;
                }
                if (row.dept_price!=0) {
                    row.dept_price_count = sum * row.dept_price;
                } else {
                    row.dept_price=0;
                    row.dept_price_count = sum * row.dept_price;
                }
                row.count2 = parseFloat(row.per_price_count) + parseFloat(row.dept_price_count);
            },
            cancel(){
                this.$emit('cancel');
            },
        }
    }
</script>
<style lang="stylus" scoped>
    .form-content
        display: inline-block
        width 30%

    .form-row
        position: relative
        .form-input
            width 180px
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
        padding 0px 2px
        background-color transparent
        border none

    .right
        width: 100%
        text-align: right

    .center
        width: 100%
        margin-left 38vw

    .el-table .cell
        padding-left 3px
        padding-right 3px
</style>
