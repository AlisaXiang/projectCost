<template>
  <section>
    <el-table :data="permissionList" border style="width: 100%; " :cell-style="firstClass">
      <el-table-column
        label="一级菜单">
        <template slot-scope="scope">
          <el-checkbox v-model='scope.row.auth' :label="scope.row.name" :key="scope.row.name"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column
      label="二级菜单" class-name="second">
      <template slot-scope="scope">
        <el-table :data="scope.row.child" :show-header="false" :cell-style="secondClass">
          <el-table-column>
            <template slot-scope="prop">
              <el-checkbox v-model='prop.row.auth' :label="prop.row.name" :key="prop.row.name"></el-checkbox>
              </template>
          </el-table-column>
        </el-table>
      </template>
      </el-table-column>

      </el-table>
      <el-button-group style="margin-top:8px;margin-left:36%">
        <el-button  type="primary" round @click="saveData">確定</el-button>
        <el-button type="info" round @click="cancelDialog">取消</el-button>
      </el-button-group>
    </section>

</template>
<style lang="stylus" scoped>
  .second
    margin: 0 !important
    padding: 0 !important
</style>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        props: {
            roleId: Number,
            permissionList:Array
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                
            },
            firstClass(row, column, rowIndex, columnIndex){
              return "padding: 0px;margin:0px"
            },
            secondClass(row,rowIndex) {
              return 'height:30px;padding:0px;margin:0px;border-right:none'
            },
            cancelDialog(){
              this.$emit('cancel');
            },
            saveData(){
                let rolePermissionList=[];
                let s1=[];
                let s2=[];

                for(let i=0,length=this.permissionList.length;i<length;i++){
                    if(this.permissionList[i].child.length>0){
                        let sum1=0;
                        let child=this.permissionList[i].child;                                         
                        for(let j=0,clength=child.length;j<clength;j++){
                            if(child[j].auth === true){
                                sum1=sum1+1
                                rolePermissionList.push({roleId:this.roleId,id:child[j].id,name:child[j].name,permission_id:child[j].permissionId});
                            }
                        }
                        if(this.permissionList[i].auth === true){
                            rolePermissionList.push({roleId:this.roleId,id:this.permissionList[i].id,name:this.permissionList[i].name,permission_id:this.permissionList[i].permissionId});
                        }else{
                            if(parseFloat(sum1)=== child.length){
                                rolePermissionList.push({roleId:this.roleId,id:this.permissionList[i].id,name:this.permissionList[i].name,permission_id:this.permissionList[i].permissionId});
                            }
                        } 
                    }else{
                        if(this.permissionList[i].auth === true){
                            rolePermissionList.push({roleId:this.roleId,id:this.permissionList[i].id,name:this.permissionList[i].name,permission_id:this.permissionList[i].permissionId});
                        }
                    }
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                if(rolePermissionList.length>0){
                    this.$ajax.post('http://127.0.0.1:3000/insertPermissionByRole', this.$qs.stringify({
                        roleId:this.roleId,
                        list: rolePermissionList
                    })).then(res => {
                        if (res.data.code == 1) {
                            this.cancelDialog();
                        } else {
                            this.$message.error("角色权限更新失败！");
                        }
                        loading.close();
                    })
                }else{
                    this.cancelDialog();
                }
            }
        }
    }
</script>
