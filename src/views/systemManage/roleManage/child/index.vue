<template>
    <table>
        <thead>
        <tr>
            <th>一级菜单</th>
            <th>一级菜单</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(cell,index) in list">
            <td><el-checkbox v-model="cell.auth"></el-checkbox>{{cell.name}}</td>
            <td>
                <ul>
                    <li v-for="(child,key) in cell.child">
                        <el-checkbox v-model="child.auth"></el-checkbox>{{child.name}}
                    </li>
                </ul>
            </td>
        </tr>
        </tbody>
    </table>
</template>
<script>
    export default {
        data() {
            return {
                list: []
            }
        },
        props: {
            roleId: Number
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                this.$ajax.post('http://127.0.0.1:3000/getPermissionByRole', this.$qs.stringify({
                    roleId: this.roleId
                })).then(res => {
                    if (res.data.code == 1) {
                        let permission = res.data.permissionInfo;
                        let s1 = [];
                        this.list.child = []
                        let s2 = [];
                        for (let i = 0; i < permission.length; i++) {
                            if (permission[i].parent_id === 0) {
                                this.list.push({id:permission[i].id,name:permission[i].name,auth:permission[i].auth===1?true:false});
                            } else if (permission[i].parent_id === 1) {
                                s1.push({id:permission[i].id,name:permission[i].name,auth:permission[i].auth===1?true:false})
                            }
                        }
                        for (let j = 0; j < this.list.length; j++) {
                            if (this.list[j].id === 1) {
                                this.list[j].child = s1
                            } else {
                                this.list[j].child = {}
                            }
                        }
                        // this.list = res.data.permissionInfo;
                        console.log(this.list)
                    } else {
                        this.$message.error("权限信息获取失败！");
                    }
                    loading.close();
                })
            },
        }
    }
</script>