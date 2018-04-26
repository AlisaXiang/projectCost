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
                    <label>项目状态</label>
                    <el-select filterable v-model="projectStatus" clearable placeholder="请选择" style="width:100%">
                        <el-option
                                v-for="cate in statusList"
                                :key="cate.id"
                                :label="cate.name"
                                :value="cate.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="form-input">
                    <el-button type="success" @click="getList">搜索</el-button>
                </div>
            </div>
            <div class="toolbar-action">
                <el-button-group>
                    <el-button type="primary" @click="addSave">保存</el-button>
                </el-button-group>
            </div>
        </div>
        <el-table
                :data="list"
                tooltip-effect="dark"
                height="520"
                border
                @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="project_name" label="项目名称" width="180">
                <!--<template slot-scope="scope">-->
                <!--<el-input v-model="scope.row.project_name"-->
                <!--:disabled="multipleSelection.indexOf(scope.row) === -1"></el-input>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column label="项目负责人" width="138" prop="leader_name">
                <!--<template slot-scope="scope">-->
                <!--<el-input v-model="scope.row.leader_name"-->
                <!--:disabled="multipleSelection.indexOf(scope.row) === -1"></el-input>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column label="项目类型" width="128">
                <template slot-scope="scope">
                    <el-select filterable v-model="scope.row.projectType" clearable placeholder="请选择" :disabled="1===1">
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
                    <el-select filterable v-model="scope.row.cate_id" clearable placeholder="请选择" :disabled="1===1">
                        <el-option
                                v-for="cate in cateOptions"
                                :key="cate.id"
                                :label="cate.name"
                                :value="cate.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="项目状态" width="158">
                <template slot-scope="scope">
                    <el-select filterable v-model="scope.row.state" clearable placeholder="请选择" style="width:100%"
                               :disabled="multipleSelection.indexOf(scope.row) === -1">
                        <el-option
                                v-for="cate in statusList"
                                :key="cate.id"
                                :label="cate.name"
                                :value="cate.id">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column prop="in_cost" label="投入成本">
                <!--<template slot-scope="scope">-->
                <!--<el-date-picker type="date" style="width:136px" v-model="scope.row.online_time"-->
                <!--:disabled="multipleSelection.indexOf(scope.row) === -1"></el-date-picker>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column prop="consume_cost" label="消耗成本">
            </el-table-column>
            <el-table-column label="剩余成本">
                <template slot-scope="scope">
                    {{scope.row.in_cost-scope.row.consume_cost}}
                </template>
            </el-table-column>
            <el-table-column prop="in_per_unit" label="投入人天">
                <!--<template slot-scope="scope">-->
                <!--<el-input v-model="scope.row.in_per_unit" readonly></el-input>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column prop="consume_per_unit" label="已用人天">
                <!--<template slot-scope="scope">-->
                <!--<el-input v-model="scope.row.consume_per_unit" readonly></el-input>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column label="剩余人天">
                <template slot-scope="scope">
                    {{(scope.row.in_per_unit-scope.row.consume_per_unit) | fix2}}
                </template>
            </el-table-column>

            <el-table-column prop="consumation_ratio" label="消耗费用比" width="100">
                <template slot-scope="scope">
                {{scope.row.consumation_ratio |fix2 | percent2}}
                </template>
            </el-table-column>
            <el-table-column  label="项目进度比" width="100">
                <template slot-scope="scope">
                {{scope.row.project_progress |fix2 | percent2}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button v-show="scope.row.id && (userName === scope.row.leader_name || userName === 'ADMINISTRATOR')" type="primary" @click="getCostDetails(scope.row)">成本明细</el-button>
                    <el-button v-show="scope.row.id && (userName === scope.row.leader_name || userName === 'ADMINISTRATOR')" @click="getTeamAttendance(scope.row)">组员考勤
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog
                title="成本明细"
                :visible.sync="costVisible"
                width="80%">
            <cost :costDetails="costDetails" :detailsList="detailsList" :levelList="levelList" @cancel="cancel"></cost>
        </el-dialog>
        <el-dialog
                title="组员考勤统计"
                :visible.sync="teamVisible"
                width="80%">
            <attendance :costDetails="costDetails" :countInfo="countInfo" :levelList="levelList"
                        :attendanceList="attendanceList" :weekendList="weekendList" :dayList="dayList"
                        @cancel="cancel"></attendance>
        </el-dialog>
    </div>
</template>
<style lang="stylus" src="../../style/index.styl" scoped></style>
<script>
    import cost from './child/costDetails.vue'
    import attendance from './child/attendanceDetail.vue'

    export default {
        data() {
            return {
                userName:sessionStorage.getItem('name'),
                projectName: '',
                projectOwnerName: '',
                projectStatus: '',
                statusList: [{id: 1, name: '正常'}, {id: 2, name: '逾期'}, {id: 3, name: '中止'}, {id: 4, name: '结束'}],
                list: [],
                multipleSelection: [],
                cateOptions: [],
                ptOptions: [{id: 1, name: '内部产品研发'}, {id: 2, name: '实施类-人天'}, {id: 3, name: '实施类-固定金额'}],
                costDetails: [],
                attendanceList: [],
                detailsList: [],
                levelList: [],
                dayList: [],
                weekendList: [],
                countInfo: [],
                costVisible: false,
                teamVisible: false
            }
        },
        components: {
            cost,
            attendance
        },
        filters: {
            fix2: function (value) {
                if (!value) {
                    return ''
                } else {
                    return value.toFixed(2)
                }
            },
            percent2:function (value) {
                if (!value) {
                    return ''
                } else {
                    return value+'%'
                }
            },
        },
        created() {
            this.getCateInfo();
            this.getList();
        },
        methods: {
            getCateInfo() {
                this.$ajax.post('http://127.0.0.1:3000/getCateIds').then(res => {
                    if (res.data.code == 1) {
                        this.cateOptions = res.data.cateIds;
                    } else {
                        this.$message.error("部门信息获取失败！")
                    }
                })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getList() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getProjectCost', this.$qs.stringify({
                    projectName: this.projectName,
                    owner: this.projectOwnerName,
                    status: this.projectStatus
                })).then(res => {
                    if (res.data.code == 1) {
                        this.list = res.data.costInfo;
                    } else {
                        this.$message.error("项目成本信息获取失败！");
                    }
                    loading.close();
                })
            },
            getCostDetail(id) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getProjectCostDetail', this.$qs.stringify({
                    id: id,
                })).then(res => {
                    if (res.data.code == 1) {
                        this.detailsList = res.data.costInfo;
                    } else {
                        this.$message.error("项目成本信息获取失败！");
                    }
                    loading.close();
                })
            },
            getCostDetails(row) {
                this.getCostDetail(row.id);
                this.getLevel();
                this.costDetails = [];
                this.costDetails.push({
                    id: row.id,
                    projectName: row.project_name,
                    leader: row.leader_name,
                    type: row.cate_id
                });
                this.costVisible = true;
            },
            getLevel() {
                this.$ajax.post('http://127.0.0.1:3000/getLevel').then(res => {
                    if (res.data.code == 1) {
                        this.levelList = res.data.levelInfo;
                    } else {
                        this.$message.error("级别信息获取失败！");
                    }
                })
            },
            getTimeAndCost(id) {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getCostTime', this.$qs.stringify({
                    id: id
                })).then(res => {
                    if (res.data.code == 1) {
                        this.countInfo = res.data.countInfo;
                    } else {
                        this.$message.error("项目成本信息获取失败！");
                    }
                    loading.close();
                })
            },
            getAttendance(id, year) {
                this.$ajax.post('http://127.0.0.1:3000/getProjectAttendance', this.$qs.stringify({
                    id: id,
                    atten_time: year
                })).then(res => {
                    if (res.data.code == 1) {
                        //this.attendanceList = res.data.attendanceInfo;
                        const d = new Date(year.substring(0, 4), year.substring(5, 6), 0).getDate();
                        let attenList = res.data.attendanceInfo;
                        for (let k = 0, listLength = attenList.length; k < listLength; k++) {
                            for (let i = 1; i <= d; i++) {
                                attenList.i = '';
                                //const myDay = i < 10 ? "0" + i : i;
                                const myDate = new Date(year.substring(0, 4), year.substring(5, 6) - 1, i);
                                this.dayList.push(i);
                                //attenList[k].push({i: i});
                                if (attenList[k].atten_day) {
                                    if (attenList[k].atten_day.indexOf(i) > -1) {
                                        attenList[k]['i' + i] = 1;
                                    }
                                }
                                const m = myDate.getDay();
                                if (m == 6 || m == 0) {
                                    if (this.weekendList.indexOf(i) > -1) {

                                    } else {
                                        this.weekendList.push(i)
                                    }
                                }
                            }
                        }
                        console.log('weekendList', this.weekendList);
                        for (let m = 0, listLength = attenList.length; m < listLength; m++) {

                        }
                        this.attendanceList = attenList;
                    } else {
                        this.$message.error("考勤获取失败！");
                    }
                })
            },
            getTeamAttendance(row) {
                let d = new Date();
                let year = d.getFullYear();
                let mon = d.getMonth() + 1;
                mon = (mon < 10 ? "0" + mon : mon);
                let yearAndMonth = year.toString() + mon.toString();
                this.getTimeAndCost(row.id);
                this.getAttendance(row.id, yearAndMonth);
                this.getLevel();
                this.costDetails = [];
                this.costDetails.push({
                    id: row.id,
                    projectName: row.project_name,
                    leader: row.leader_name,
                    type: row.cate_id
                });
                this.teamVisible = true;
            },
            addSave() {//updateProjectCostStatus
                if (this.multipleSelection.length > 0) {
                    if (this.multipleSelection.length > 1) {
                        this.$message({message: '警告:一次只能修改一条记录'})
                    } else {
                        this.$ajax.post('http://127.0.0.1:3000/updateProjectCostStatus', this.$qs.stringify({
                            status: this.multipleSelection[0].state,
                            id: this.multipleSelection[0].id,
                        })).then(res => {
                            if (res.data.code == 1) {
                                this.$message({message: '数据更新成功', type: 'success'});
                                this.getList();
                            } else {
                                this.$message.error("更新失败！");
                            }
                        })
                    }
                }
            },
            cancel() {
                this.getList();
                this.costVisible = false;
                this.teamVisible = false;
            },
        }
    }
</script>