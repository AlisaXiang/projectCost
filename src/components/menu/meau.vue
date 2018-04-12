<template>
    <div>
        <el-col class='side-meau'>
            <div class='side-title'>工作台</div>
            <div class='side-img'>
                <img src='src/assets/images/logo.jpg'/>
            </div>
            <div class='divline'></div>
            <el-menu default-active="2" class="el-menu-vertical-demo" theme='light' @select="handleSelect" router>
                <el-menu-item index="/index/projectBudget" v-if="pMenu.indexOf(2)>-1 && (!pMenu.indexOf(102)>-1)"><img src="../../assets/images/budge.png" style="height:18px"/> 项目预算管理
                </el-menu-item>
                <el-menu-item index="/index/projectCost" v-if="pMenu.indexOf(3)>-1 && (!pMenu.indexOf(103)>-1)"><img src="../../assets/images/count.png" style="height:16px;"/>项目成本统计
                </el-menu-item>
                <el-menu-item index="/index/projectCost" v-if="pMenu.indexOf(4)>-1 && (!pMenu.indexOf(103)>-1)"><img src="../../assets/images/count.png" style="height:16px;"/>项目人员出勤统计
                </el-menu-item>
                <el-menu-item index="/index/projectCost" v-if="pMenu.indexOf(5)>-1 && (!pMenu.indexOf(103)>-1)"><img src="../../assets/images/count.png" style="height:16px;"/>项目成本统计分析
                </el-menu-item>
                <el-submenu index="/index" v-if="pMenu.indexOf(1)>-1">
                    <template slot="title"><i class="el-icon-menu"></i>后台管理</template>
                    <el-menu-item index="/index/levelPrice"  v-if="pMenu.indexOf(101)>-1">级别单价管理</el-menu-item>
                    <el-menu-item index="otherPrice"  v-if="pMenu.indexOf(102)>-1">杂项单价管理</el-menu-item>
                    <el-menu-item index="/index/roleManage"  v-if="pMenu.indexOf(104)>-1">角色管理</el-menu-item>
                    <el-menu-item index="/index/employeeManager"  v-if="pMenu.indexOf(103)>-1">人员管理</el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>
<script>
    export default {
        name: 'home',
        data() {
            return {
                pMenu:sessionStorage.getItem('menuPermission')
            }
        },
        created(){
            console.log(this.pMenu)
            console.log(this.pMenu.indexOf(1))
        },
        methods: {
            handleSelect(key, keyPath) {

            },
            getMenuInfo(){

            }
        }
    }
</script>