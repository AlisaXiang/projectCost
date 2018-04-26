var express = require('express')
var app = express()
var sql = require('./connect')
var bodyParser = require('body-parser')
var fs = require('fs')
sql.connect()
// 配置允许跨域请求；
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    next()
})

// 获取本机ip地址
function getIp() {
    var os = require('os'),
        iptable = {},
        ifaces = os.networkInterfaces()
    for (var dev in ifaces) {
        ifaces[dev].forEach(function (details, alias) {
            if ((details.family == 'IPv4') && (details.internal == false)) {
                // iptable[dev+(alias?':'+alias:'')]=details.address
                iptable['localIP'] = details.address
            }
        })
    }
    return iptable.localIP
}

// 获取当月的天数
function getDaysInOneMonth(year, month) {
    month = parseInt(month, 10)
    var d = new Date(year, month, 0)
    return d.getDate()
}

// post请求需要
app.use(bodyParser.urlencoded({'limit': '10000kb'}))
app.post('/', function (req, res) {
})
app.post('/login', function (req, res) {
    var loginSQL = 'select a.id,a.name,a.fun_name,b.role_id from t_user a left join auth_user_role b on a.id = b.user_id where a.id="' + req.body.username + '" and a.password="' + req.body.password + '"'
    // var roleSQL='select userId,rile_id from auth_user_role'
    // var totalsql=loginSQL+roleSQL
    sql.query(loginSQL, function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            var roleIds = [];
            for (let i = 0; i < rows.length; i++) {
                roleIds[i] = rows[i].role_id;
            }
            res.send({
                code: 1,
                id: rows[0].id,
                sname: rows[0].name,
                dep: rows[0].fun_name,
                roleIds: roleIds
            })
        }
    })
})
// 获取该用户的页面权限
app.post('/getPagePermission', function (req, res) {
    sql.query('select distinct GROUP_CONCAT(b.resource_id) as resource_id from auth_role_permission a left join auth_permission b on a.permission_id=b.id where a.role_id in (' + [req.body.roleIds] + ')', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            const info = []
            if (rows.length > 0) {
                res.send({
                    code: 1,
                    pId: rows[0].permission_id,
                    resourceId: rows[0].resource_id,
                    oId: rows[0].operation_id
                })
            } else {
                res.send({
                    code: 1,
                    pId: 0,
                    resourceId: 0,
                    oId: 0
                })
            }

        }
    })
})
// 获取级别信息
app.post('/getLevel', function (req, res) {
    sql.query('select id,name,price,1 as isFlag from t_level', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            let levelInfo = []
            for (let i = 0; i < rows.length; i++) {
                levelInfo.push({
                    levelId: rows[i].id,
                    levelName: rows[i].name,
                    levelCost: rows[i].price,
                    isFlag: rows[i].isFlag
                })
            }
            res.send({
                code: 1,
                levelInfo: levelInfo
            })
        }
    })
})
// 修改级别信息
app.post('/updateLevel', function (req, res) {
    sql.query('update t_level set name = ?,price= ?,update_time = SYSDATE() where id=?', [req.body.levelName, req.body.levelCost, req.body.levelId], function (err, result) {
        !err ? res.send({code: 1}) : res.send({code: 0})
    })
})
// 批量插入级别信息
app.post('/addLevel', function (req, res) {
    var data = req.body.levelList;
    var list = new Array()
    if (data) {
        for (let i = 0; i < data.length; i++) {
            list[i] = [data[i].levelName, data[i].levelCost, new Date()]
        }
    }
    sql.query('insert into t_level(name,price,create_time) values ?', [list], function (err) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                msg: '新增成功'
            })
        }
    })
})
// 批量删除级别信息
app.post('/deleteLevel', function (req, res) {
    var data = req.body.levelId
    sql.query('delete from t_level where id in (?)', [data], function (err) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                    code: 1,
                    msg: '删除成功'
                }
            )
        }
    })
})

app.use(express.static(__dirname + '/images'))
var server = app.listen(3000, function () {
    var port = server.address().port
    console.log('应用实例，访问地址为 http://localhost:', port)
})
// 获取杂费单价信息
app.post('/getOtherPrice', function (req, res) {
    let pageSize = parseInt(req.body.pageSize);
    let pageNum = (parseInt(req.body.pageNum) - 1) * pageSize;
    sql.query('SELECT id,dept_id, cate_id,price ,1 as isFlag,(select count(1) from t_dept_cate)as count FROM t_dept_cate LIMIT ? ,?;',[pageNum, pageSize], function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            let otherPrice = []
            for (let i = 0; i < rows.length; i++) {
                otherPrice.push({
                    id: rows[i].id,
                    deptId: rows[i].dept_id,
                    cateId: rows[i].cate_id,
                    price: rows[i].price,
                    isFlag: rows[i].isFlag
                })
            }
            res.send({
                code: 1,
                otherPrice: otherPrice
            })
        }
    })
})
// 获取项目分类信息
app.post('/getCateIds', function (req, res) {
    sql.query('SELECT id, name FROM t_cate;', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            let cateIds = []
            for (let i = 0; i < rows.length; i++) {
                cateIds.push({id: rows[i].id, name: rows[i].name})
            }
            res.send({
                code: 1,
                cateIds: cateIds
            })
        }
    })
})

// 获取部门信息
app.post('/getDeptIds', function (req, res) {
    sql.query('SELECT id ,name FROM t_dept;', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            let deptIds = [];
            for (let i = 0; i < rows.length; i++) {
                deptIds.push({id: rows[i].id, name: rows[i].name})
            }
            res.send({
                code: 1,
                deptIds: deptIds
            })
        }
    })
});
// 批量插入杂费信息
app.post('/addOtherPrice', function (req, res) {
    var data = req.body.otherList;
    var list = new Array()
    for (let i = 0; i < data.length; i++) {
        list[i] = [data[i].deptId, data[i].cateId, data[i].price, new Date()]
    }
    sql.query('INSERT INTO t_dept_cate(dept_id,cate_id,price,create_time) VALUES ?', [list], function (err) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                msg: '新增成功'
            })
        }
    })
});
// 批量删除杂费信息
app.post('/deleteOtherPrice', function (req, res) {
    var data = req.body.otherId;
    sql.query('DELETE FROM t_dept_cate WHERE  id in (?)', [data], function (err) {
        if (err) {
            res.send({code: 0});
        } else {
            res.send({
                code: 1,
                msg: '删除成功'
            })
        }
    })
});
// 修改杂费信息
app.post('/updateOtherPrice', function (req, res) {
    sql.query('UPDATE t_dept_cate SET dept_id = ?,cate_id = ?,price = ? ,update_time = SYSDATE() WHERE id = ?;', [req.body.deptId, req.body.cateId, req.body.price, req.body.id], function (err, result) {
        !err ? res.send({code: 1}) : res.send({code: 0})
    })
});
// 获取角色信息
app.post('/getRoleInfos', function (req, res) {
    sql.query('SELECT id,name FROM auth_role;', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            let roleInfos = [];
            for (let i = 0; i < rows.length; i++) {
                roleInfos.push({id: rows[i].id, name: rows[i].name})
            }
            res.send({
                code: 1,
                roleInfos: roleInfos
            })
        }
    })
});

// 获取员工信息
app.post('/getEmpInfos', function (req, res) {
    //准备sql分页查询的语句
    let pageSize = parseInt(req.body.pageSize);
    let pageNum = (parseInt(req.body.pageNum) - 1) * pageSize;
    sql.query('SELECT 1 AS isFlag, 1 AS isNew ,u.`name`,GROUP_CONCAT(r.`role_id`) AS role_id ,u.`name`, u.id,u.`fun_group`,u.`fun_name`,u.`level_id`,u.`dept_id`, t.`price` FROM auth_user_role r LEFT JOIN t_user u ON r.user_id = u.id LEFT JOIN t_level t ON u.`level_id` = t.`id` GROUP BY u.`id` LIMIT ? ,?;', [pageNum, pageSize], function (err, rows) {
        if (err) {
            console.log(err);
            res.send({code: 0})
        } else {
            let empInfos = [];
            for (let i = 0; i < rows.length; i++) {
                var roleIds = rows[i].role_id.split(",");
                var arrs = JSON.parse('[' + roleIds + ']');
                empInfos.push({
                    empId: rows[i].id,
                    isNew: rows[i].isNew,
                    empName: rows[i].name,
                    price: rows[i].price,
                    funGroup: rows[i].fun_group,
                    funName: rows[i].fun_name,
                    isFlag: rows[i].isFlag,
                    levelId: rows[i].level_id,
                    deptId: rows[i].dept_id,
                    roleId: arrs
                });
            }
            empInfos.sort(function (a, b) {
                return a.empId - b.empId;
            });
            res.send({
                code: 1,
                empInfos: empInfos
            })
        }
    })
});

// 批量插入员工信息
app.post('/addEmpInfo', function (req, res) {
    var data = req.body.empList;
    var list = new Array();
    var roles = new Array();
//准备角色信息
    for (let j = 0; j < data.length; j++) {
        for (let i = 0; i < data[j].roleId.length; i++) {
            var role = [data[j].empId, data[j].roleId[i], new Date()];
            roles.push(role);
        }
    }
    console.log(roles);
//准备员工信息
    for (let i = 0; i < data.length; i++) {
        list[i] = [data[i].empId, data[i].empName,'123456', data[i].levelId, data[i].deptId, data[i].funGroup, data[i].funName, new Date()]
    }
//执行插入用户角色表sql
    sql.query('INSERT INTO auth_user_role(user_id,role_id,create_time)VALUES ?', [roles], function (err1) {
        if (err1) {
            console.log(err1);
        } else {
//执行插入员工
            sql.query('INSERT INTO t_user (id,NAME,password,level_id,dept_id,fun_group,fun_name,create_time) VALUES ?', [list], function (err2) {
                if (err1 || err2) {
                    console.log(err2);
                    res.send({code: 0})
                } else {
                    res.send({
                        code: 1,
                        msg: '新增成功'
                    })
                }
            });
        }
    });
});

// 批量删除员工信息
app.post('/deleteEmpInfos', function (req, res) {
    var data = req.body.empInfos;
    sql.query('DELETE FROM t_user WHERE id IN (?);', [data], function (err1) {
        if (err1) {
            console.log(err1);
        } else {
            sql.query('DELETE FROM auth_user_role WHERE user_id IN (?);', [data], function (err2) {
                if (err1 || err2) {
                    console.log(err2);
                    res.send({code: 0})
                } else {
                    res.send({
                        code: 1,
                        msg: '删除成功'
                    })
                }
            })
        }
    })
});


// 修改员工信息
app.post('/updateEmpInfo', function (req, res) {
//准备角色信息
    var userId = req.body.empId;
    var data = req.body.roleId;
    var list = new Array();
    for (let i = 0; i < data.length; i++) {
        list[i] = [userId, data[i], new Date()]
    }
    sql.query('UPDATE t_user SET NAME = ?,level_id = ?,dept_id = ?,fun_group = ? , fun_name = ?,update_time = SYSDATE() WHERE id = ?', [req.body.empName, req.body.levelId, req.body.deptId, req.body.funGroup, req.body.funName, req.body.empId], function (err1, result) {
        if (err1) {
            console.log(err1);
        } else {
//先将用户角色信息全部删除
            sql.query('DELETE FROM auth_user_role WHERE user_id = ? ;', [userId], function (err2) {
                if (err2 || err1) {
                    console.log(err2);
                    res.send({code: 0})
                } else {
//然后用户角色信息添加到数据库
                    sql.query('INSERT INTO auth_user_role(user_id,role_id,create_time)VALUES ?', [list], function (err3) {
                        if (err3 || err2 || err3) {
                            console.log(err3);
                            res.send({code: 0})
                        } else {
                            res.send({
                                code: 1,
                                msg: '更新成功'
                            })
                        }
                    })
                }
            })
        }
    })
});

// 获取员工总数
app.post('/getEmpCount', function (req, res) {
    sql.query('SELECT COUNT(1) AS count FROM t_user', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                empCount: rows[0].count
            })
        }
    })
});

// 获取角色信息
app.post('/getRolePermission', function (req, res) {
    sql.query('select a.id,a.name,Group_concat(c.resource_id) as resource_id ,GROUP_CONCAT(d.name) as menu from auth_role a left join auth_role_permission b  on a.id=b.role_id left join auth_permission c on b.permission_id=c.id left join t_menu d on c.resource_id=d.id group by a.id', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                rolesInfo: rows
            })
        }
    })
});
// 获取角色对应的页面权限
app.post('/getPermissionByRole', function (req, res) {
    sql.query('SELECT a.id,a.name,(CASE WHEN C.role_id = "' + req.body.roleId + '" THEN 1 ELSE 0 END) as auth,a.parent_id,b.id as permission_id FROM t_menu a LEFT JOIN auth_permission b ON a.id = b.resource_id left join (select * from auth_role_permission where role_Id = "' + req.body.roleId + '") c on b.id = c.permission_id', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                permissionInfo: rows
            })
        }
    })
});
//得到操作权限
app.post('/getPermission', function (req, res) {
    sql.query('SELECT * from auth_permission ', function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                permissionList: rows
            })
        }
    })
});

// 新增角色
app.post('/insertRole', function (req, res) {
    const data=req.body.list;
    let names=new Array();
    let permissions=new Array();
    for(let i=0;i<data.length;i++){
        names[i]=[data[i].name];
    }
    sql.query('insert into auth_role(name) values ?',[names], function (err, rows) {
        if (err) {

            res.send({code: 0,err:err})
        } else {
            res.send({
                code: 1
            })
        }
    })
});
// 新增角色对应的页面权限
app.post('/insertPermissionByRole', function (req, res) {
    const data=req.body.list;
    console.log('data',data);
    let permissions=new Array();
    if(data){
        for(let i=0;i<data.length;i++){
            permissions[i]=[data[i].roleId,data[i].permission_id];
        }
    }
    
    sql.query('delete from auth_role_permission where role_id=?',[req.body.roleId], function (err, rows) {
        if (err) {
            res.send({code: 0,err:err})
        } else {
            sql.query('insert into auth_role_permission(role_id,permission_id) values ?',[permissions], function (err1, rows) {
                if (err1) {
                    res.send({code: 0,err:err1})
                } else {
                    res.send({
                        code: 1
                    })
                }
            })
        }
    })
    
});
//项目预算总览
app.post('/getProjectBudget', function (req, res) {
    let querySql = 'select * from t_budget';
    if (req.body.projectName && req.body.owner && req.body.status) {
        querySql = 'select * from t_budget where leader_name =  "' + req.body.owner + '"and project_name = "' + req.body.projectName + '"and state = "' + req.body.status + '"';
    } else {
        if (req.body.projectName && req.body.owner) {
            querySql = 'select * from t_budget where leader_name =  "' + req.body.owner + '"and project_name = "' + req.body.projectName + '"';
        } else if (req.body.projectName && req.body.status) {
            querySql = 'select * from t_budget where project_name = "' + req.body.projectName + '"and state = "' + req.body.status + '"';
        } else if (req.body.owner && req.body.status) {
            querySql = 'select * from t_budget where leader_name =  "' + req.body.owner + '"and state = "' + req.body.status + '"';
        } else if (req.body.projectName) {
            querySql = 'select * from t_budget where project_name = "' + req.body.projectName + '"'
        } else if (req.body.owner) {
            querySql = 'select * from t_budget where leader_name = "' + req.body.owner + '"'
        } else if (req.body.status) {
            querySql = 'select * from t_budget where state = "' + req.body.status + '"'
        }
    }
    sql.query(querySql, function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                budgetInfo: rows
            })
        }
    })
});

// 批量插入项目信息
app.post('/addProjectBudget', function (req, res) {
    var data = req.body.budgetList;
    var list = new Array()
    for (let i = 0; i < data.length; i++) {
        list[i] = [data[i].project_name, data[i].leader_name, data[i].projectType, data[i].cate_id, new Date(data[i].start_time), new Date(data[i].online_time), parseFloat(data[i].amount ? data[i].amount : 0), parseFloat(data[i].profit_rate ? data[i].profit_rate : 0), parseFloat(data[i].profit ? data[i].profit : 0), parseFloat(data[i].in_cost ? data[i].in_cost : 0), new Date(), new Date()]
    }
    sql.query('insert into t_budget(project_name,leader_name,projectType,cate_id,start_time,online_time,amount,profit_rate,profit,in_cost,create_time,update_time) values ?', [list], function (err) {
        if (err) {
            res.send({code: 0})
        } else {
            sql.query('INSERT INTO t_cost(id,project_name,leader_name,cate_id,start_time,online_time,create_time,amount,profit,in_cost,in_per_unit,projectType)\n' +
                ' select id,project_name,leader_name,cate_id,start_time,online_time,sysdate(),amount,profit,in_cost,in_per_unit,projectType from t_budget t\n' +
                '\t\t\twhere t.id not in (select b.id from t_cost a inner join t_budget b where a.id=b.id)', function (err3) {
                if (err3) {
                    res.send({code: 0})
                } else {
                    res.send({
                        code: 1,
                        msg: '新增成功'
                    })
                }
            })

        }
    })
})

// 修改项目预算信息
app.post('/updateProjectBudget', function (req, res) {
    sql.query('update t_budget set project_name=?,leader_name=?,projectType=?,cate_id=?,start_time=?,online_time=?,amount=?,profit_rate=?,profit=?,in_cost=?,update_time = SYSDATE() where id=?', [req.body.project_name, req.body.leader_name, req.body.projectType, req.body.cate_id, new Date(req.body.start_time), new Date(req.body.online_time), req.body.amount, req.body.profit_rate, parseFloat(req.body.profit), parseFloat(req.body.in_cost), req.body.id], function (err1, result) {
        // !err ? res.send({code: 1}) : res.send({code: 0})
        if (err1) {
            res.send({code: 0})
        } else {
            sql.query('update t_cost set update_time = SYSDATE(),project_name=?,leader_name=?,projectType=?,cate_id=?,start_time=?,online_time=?,amount=?,profit=?,in_cost=? where id=? ', [req.body.project_name, req.body.leader_name, req.body.projectType, req.body.cate_id, new Date(req.body.start_time), new Date(req.body.online_time), req.body.amount, parseFloat(req.body.profit), parseFloat(req.body.in_cost), req.body.id], function (err2) {
                if (err1 || err2) {
                    res.send({code: 0})
                } else {
                    res.send({
                        code: 1,
                        msg: '更新成功'
                    })
                }
            })
        }
    })
})

////项目预算详情一览
app.post('/getProjectBudgetDetails', function (req, res) {
    let querySql = 'select * from t_budget_details where project_id = "' + req.body.projectId + '"'
    sql.query(querySql, function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                budgetInfo: rows
            })
        }
    })
});

// 预算详情
app.post('/updateProjectBudgetDetails', function (req, res) {
    sql.query('UPDATE t_budget SET start_time=?,online_time=?,amount=?,profit_rate=?,profit=?,in_cost=?,consume_cost=?,in_per_unit=?,consume_per_unit=?,project_progress=?,consumation_ratio=?,per_unit_cost=?,num_per=?,time_count=?,update_time = SYSDATE() where id=?', [new Date(req.body.start_time), new Date(req.body.online_time), req.body.amount, req.body.profit_rate, parseFloat(req.body.profit), parseFloat(req.body.in_cost), parseFloat(req.body.consume_cost), req.body.in_per_unit, req.body.consume_per_unit, req.body.project_progress, req.body.consumation_ratio, parseFloat(req.body.per_unit_cost), req.body.num_per, req.body.time_count, req.body.projectId], function (err1, result) {
        if (err1) {
            console.log(err1);
        } else {
//先将预算详情信息全部删除
            sql.query('DELETE FROM t_budget_details WHERE project_id = ? ;', [req.body.projectId], function (err2) {
                if (err2 || err1) {
                    res.send({code: 0})
                } else {
                    let data = req.body.detailsList;
                    let list = new Array();
                    for (let i = 0; i < data.length; i++) {
                        list[i] = [data[i].project_id, data[i].project_stage, data[i].stage_rate, parseFloat(data[i].stage_putMan ? data[i].stage_putMan : 0), new Date(data[i].stage_start), new Date(data[i].stage_end), parseFloat(data[i].stage_budget ? data[i].stage_budget : 0), parseFloat(data[i].project_process ? data[i].project_process : 0), parseFloat(data[i].cost_rate ? data[i].cost_rate : 0), parseFloat(data[i].stage_putman_cost ? data[i].stage_putman_cost : 0), parseFloat(data[i].stage_cost ? data[i].stage_cost : 0), parseFloat(data[i].stage_process ? data[i].stage_process : 0), parseFloat(data[i].stage_cost_rate ? data[i].stage_cost_rate : 0)];
                    }
                    //然后预算详情添加到数据库
                    sql.query('INSERT INTO t_budget_details(project_id,project_stage,stage_rate,stage_putMan,stage_start,stage_end,stage_budget,project_process,cost_rate,stage_putman_cost,stage_cost,stage_process,stage_cost_rate) values ?', [list], function (err3) {
                        if (err1 || err2 || err3) {
                            res.send({code: 0})
                        } else {
                            sql.query('update t_cost set update_time = SYSDATE(),project_progress=?,consumation_ratio=?,in_cost=?,in_per_unit=? where id=? ', [parseFloat(req.body.project_progress), parseFloat(req.body.consumation_ratio), parseFloat(req.body.in_cost), parseFloat(req.body.in_per_unit), req.body.projectId], function (err4) {
                                if (err1 || err2 || err3 || err4) {
                                    console.log(err4);
                                    res.send({code: 0})
                                } else {
                                    res.send({
                                        code: 1,
                                        msg: '更新成功'
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
})

//项目成本总览
app.post('/getProjectCost', function (req, res) {
    let querySql = 'select * from t_cost';
    if (req.body.projectName && req.body.owner && req.body.status) {
        querySql = 'select * from t_cost where leader_name =  "' + req.body.owner + '"and project_name = "' + req.body.projectName + '"and state = "' + req.body.status + '"';
    } else {
        if (req.body.projectName && req.body.owner) {
            querySql = 'select * from t_cost where leader_name =  "' + req.body.owner + '"and project_name = "' + req.body.projectName + '"';
        } else if (req.body.projectName && req.body.status) {
            querySql = 'select * from t_cost where project_name = "' + req.body.projectName + '"and state = "' + req.body.status + '"';
        } else if (req.body.owner && req.body.status) {
            querySql = 'select * from t_cost where leader_name =  "' + req.body.owner + '"and state = "' + req.body.status + '"';
        } else if (req.body.projectName) {
            querySql = 'select * from t_cost where project_name = "' + req.body.projectName + '"'
        } else if (req.body.owner) {
            querySql = 'select * from t_cost where leader_name = "' + req.body.owner + '"'
        } else if (req.body.status) {
            querySql = 'select * from t_cost where state = "' + req.body.status + '"'
        }
    }
    sql.query(querySql, function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                costInfo: rows
            })
        }
    })
});

//项目成本明细
app.post('/getProjectCostDetail', function (req, res) {
    let querySql = 'select * from t_cost_list where id = "' + req.body.id + '"'
    if (req.body.userName && req.body.dept && req.body.level) {
        querySql = querySql + ' and  user_name like \'\%' + req.body.userName + '\%\' and dept_cate_id = "' + req.body.projectName + '"and level_id = "' + req.body.level + '"';
    } else {
        if (req.body.userName && req.body.dept) {
            querySql = querySql + ' and  user_name like \'\%' + req.body.userName + '\%\' and dept_cate_id = "' + req.body.dept + '"';
        } else if (req.body.userName && req.body.level) {
            querySql = querySql + ' and  user_name like \'\%' + req.body.userName + '\%\' and level_id = "' + req.body.level + '"';
        } else if (req.body.dept && req.body.level) {
            querySql = 'select * from t_cost_list where dept_cate_id =  "' + req.body.dept + '"and level_id = "' + req.body.level + '"';
        } else if (req.body.userName) {
            querySql = querySql + 'and  user_name like \'\%' + req.body.userName + '\%\'';
        } else if (req.body.dept) {
            querySql = querySql + ' and dept_cate_id = "' + req.body.dept + '"'
        } else if (req.body.level) {
            querySql = querySql + ' and level_id = "' + req.body.level + '"'
        }
    }
    sql.query(querySql, function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                costInfo: rows
            })
        }
    })
});

//得到项目人员信息
app.post('/getInfoByPerson', function (req, res) {
    let querySql = 'select a.name,b.id as deptId,b.name as dept,c.id as level_id,c.name as level,c.price as levelPrice,d.price as deptPrice from t_user a left join t_dept b on a.dept_id=b.id left join t_level c on a.level_id = c.id left join t_dept_cate d on b.id=d.dept_id where a.name = "' + req.body.userName + '"'
    sql.query(querySql, function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                personInfo: rows
            })
        }
    })
});
//新增项目详情
app.post('/saveProjectCostDetail', function (req, res) {
    var data = req.body.list;
    var list = new Array();
    var attenList = new Array();
    for (let i = 0; i < data.length; i++) {
        list[i] = [data[i].id, new Date(data[i].entry_time), new Date(data[i].exit_time), parseFloat(data[i].per_time_count), parseFloat(data[i].month), parseFloat(data[i].per_price), parseFloat(data[i].per_price_count), parseFloat(data[i].dept_price), parseFloat(data[i].dept_price_count), data[i].dept_cate_id, data[i].user_name, new Date(), parseFloat(data[i].per_count), parseFloat(data[i].count), parseFloat(data[i].time_count), parseFloat(data[i].month_count), data[i].level_id, data[i].level, data[i].dept]
        attenList[i] = [data[i].id, data[i].user_id, parseFloat(data[i].per_price), parseFloat(data[i].dept_price), 0, data[i].user_name, data[i].level_id, data[i].level, data[i].dept_cate_id, data[i].dept];
    }
    sql.query('delete from t_cost_list where id=?', [req.body.id], function (err) {
        if (err) {
            res.send({code: 0})
        } else {
            sql.query('insert into t_cost_list(id,entry_time,exit_time,per_time_count,month,per_price,per_price_count,dept_price,dept_price_count,dept_cate_id,user_name,create_time,per_count,count,time_count,month_count,level_id,level,dept) values ?', [list], function (err2) {
                if (err || err2) {
                    res.send({code: 0})
                } else {
                    sql.query('insert into t_attendance(project_id,user_id,per_price,dept_price,actor,user_name,level_id,level,dept_cate_id,dept,atten_time) SELECT b.id,b.user_id,b.per_price,b.dept_price,0,b.user_name,b.level_id,b. LEVEL,b.dept_cate_id,b.dept,DATE_FORMAT(B.entry_time, \'\%Y\%m\%d\') FROM t_cost_list b where b.id = "' + req.body.id + '"and b.user_name not in (select c.user_name from t_cost_list c INNER JOIN t_attendance d on c.id=d.project_id and c.user_name=d.user_name and c.id= "' + req.body.id + '")', function (err4) {
                        if (err || err2 || err4) {
                            res.send({code: 0})
                        } else {
                            res.send({
                                code: 1,
                                msg: '新增成功'
                            })
                        }
                    })

                }
            })
        }
    })
});
//更新项目状态
app.post('/updateProjectCostStatus', function (req, res) {
    sql.query('update t_cost set state = ? where id=?', [req.body.status, req.body.id], function (err) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({code: 1})
        }
    })
});

//组员考勤
app.post('/getProjectAttendance', function (req, res) {
    sql.query('CALL getInsertAttendance("' + req.body.id + '");', function (err2) {
        if (err2) {
            res.send({code: 0})
        } else {
            let querySql = 'select * from t_attendance where project_id = "' + req.body.id + '"';

            if (req.body.userName && req.body.dept && req.body.level && req.body.atten_time) {
                                                    //'%Y%m%d'
                querySql = querySql + ' and user_name like \'\%' + req.body.userName + '\%\' and dept_cate_id = "' + req.body.projectName + '"and level_id = "' + req.body.level + '" and left(atten_time,6) = "' + req.body.atten_time + '"';
            } else {
                if (req.body.userName && req.body.dept && req.body.level) {
                    querySql = querySql + ' and user_name like \'\%' + req.body.userName + '\%\' and dept_cate_id = "' + req.body.projectName + '"and level_id = "' + req.body.level + '" ';
                } else if (req.body.userName && req.body.dept && req.body.atten_time) {
                    querySql = querySql + ' and  user_name like \'\%' + req.body.userName + '\%\' and dept_cate_id = "' + req.body.projectName + '" and left(atten_time,6) = "' + req.body.atten_time + '"';
                } else if (req.body.userName && req.body.level && req.body.atten_time) {
                    querySql = querySql + ' and  user_name like \'\%' + req.body.userName + '\%\' and level_id = "' + req.body.level + '" and left(atten_time,6) = "' + req.body.atten_time + '"';
                } else if (req.body.dept && req.body.level && req.body.atten_time) {
                    querySql = querySql + 'and dept_cate_id = "' + req.body.projectName + '" and level_id = "' + req.body.level + '" and left(atten_time,6) ="' + req.body.atten_time + '"';
                } else if (req.body.userName && req.body.atten_time) {
                    querySql = querySql + ' and  user_name like \'\%' + req.body.userName + '\%\' and left(atten_time,6) = "' + req.body.atten_time + '"';
                } else if (req.body.userName && req.body.dept) {
                    querySql = querySql + '  user_name like \'\%' + req.body.userName + '\%\' and dept_cate_id = "' + req.body.dept + '"';
                } else if (req.body.atten_time && req.body.dept) {
                    querySql = querySql + ' and left(atten_time,6) ="' + req.body.atten_time + '" and dept_cate_id = "' + req.body.dept + '"';
                } else if (req.body.userName && req.body.level) {
                    querySql = querySql + ' and  user_name like \'\%' + req.body.userName + '\%\' and level_id = "' + req.body.level + '"';
                } else if (req.body.atten_time && req.body.level) {
                    querySql = querySql + ' and left(atten_time,6) ="' + req.body.atten_time + '" and level_id = "' + req.body.level + '"';
                } else if (req.body.dept && req.body.level) {
                    querySql = 'select * from t_cost_list where dept_cate_id =  "' + req.body.dept + '"and level_id = "' + req.body.level + '"';
                } else if (req.body.userName) {
                    querySql = querySql + 'and  user_name like \'\%' + req.body.userName + '\%\'';
                } else if (req.body.dept) {
                    querySql = querySql + ' and dept_cate_id = "' + req.body.dept + '"'
                } else if (req.body.level) {
                    querySql = querySql + ' and level_id = "' + req.body.level + '"'
                } else if (req.body.atten_time) {
                    querySql = querySql + ' and left(atten_time,6) = "' + req.body.atten_time + '"'
                }
            }
            console.log(querySql);
            sql.query(querySql, function (err3, rows) {
                if (err2 || err3) {
                    res.send({code: 0})
                } else {
                    res.send({
                        code: 1,
                        attendanceInfo: rows
                    })
                }
            })
        }
    })

});

//得到消耗的人天以及成本
app.post('/getCostTime', function (req, res) {
    let querySql = 'select sum(count2) as sumCount,sum(a.per_time) as per_time from t_attendance a where a.project_id= "' + req.body.id + '"'
    sql.query(querySql, function (err, rows) {
        if (err) {
            res.send({code: 0})
        } else {
            res.send({
                code: 1,
                countInfo: rows
            })
        }
    })
});
//更新组员考勤
app.post('/updateProjectAttendance', function (req, res) {
    let data = req.body.list;
    let list = new Array();
    for (let i = 0; i < data.length; i++) {
        list[i] = [data[i].user_id,data[i].atten_time,parseFloat(data[i].per_time?data[i].per_time:0),parseFloat(data[i].per_price?data[i].per_price:0),parseFloat(data[i].per_price_count?data[i].per_price_count:0),parseFloat(data[i].dept_price?data[i].dept_price:0),parseFloat(data[i].dept_price_count?data[i].dept_price_count:0),parseFloat(data[i].count1?data[i].count1:0),data[i].actor,parseFloat(data[i].count2?data[i].count2:0),new Date(data[i].create_time),new Date(),parseFloat(data[i].is_enabled?data[i].is_enabled:0),data[i].remark1,data[i].remark2,data[i].user_name,data[i].project_id,data[i].atten_day,data[i].level_id,data[i].dept_cate_id,data[i].dept,data[i].level];
    }
    console.log(data[0].project_id,data[0].atten_time.substring(0,6),list);
    sql.query('delete from t_attendance where project_id="'+data[0].project_id+'" and left(atten_time,6) = "'+data[0].atten_time.substring(0,6) +'"', function (err2) {
        if (err2) {
            res.send({err:err2,code: 0})
        } else {
            let querySql = 'insert into t_attendance(user_id,atten_time,per_time,per_price,per_price_count,dept_price,dept_price_count,count1,actor,count2,create_time,update_time,is_enabled,remark1,remark2,user_name,project_id,atten_day,level_id,dept_cate_id,dept,level) values ?';
            sql.query(querySql,[list], function (err3, rows) {
                if (err2 || err3) {
                    res.send({err:err3,code: 0,errMsg:list})
                } else {
                    let querySql = 'update t_cost set consume_per_unit=?,consume_cost=? where id=?';
                    sql.query(querySql,[req.body.per_sum,req.body.count_sum,req.body.id], function (err4) {
                        if (err2 || err3 || err4) {
                            res.send({err:err4,code: 0,errMsg:list})
                        } else {
                            res.send({
                                code: 1
                            })
                        }
                    })
                }
            })
        }
    })

});