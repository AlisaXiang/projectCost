var sql = require('./connect');
const NAME = 'ADMINISTRATOR';
const PASSWORD = '123456';
const cateList=[{
    name:'本地项目',
    create_tiem:new Date(),
    update_time:new Date()
},{
    name:'内部项目',
    create_tiem:new Date(),
    update_time:new Date()
},{
    name:'外地项目有FB',
    create_tiem:new Date(),
    update_time:new Date()
},{
    name:'外地项目无FB',
    create_tiem:new Date(),
    update_time:new Date()
}];
const deptList=[{
    name:'技术一部'
},{
    name:'技术二部'
},{
    name:'外部门'
},{
    name:'外部门非本部门报销'
}];
const menuList=[{
  id:1, name:'后台管理',parent_id:0
},{
  id:2, name:'项目预算总揽',parent_id:0
},{
  id:3, name:'项目成本统计',parent_id:0
},{
  id:4, name:'部门人员出勤统计',parent_id:0
},{
  id:5, name:'项目成本统计总览',parent_id:0
},{
  id:101, name:'级别单价管理',parent_id:1
},{
  id:102, name:'杂项单价管理',parent_id:1
},{
  id:103, name:'人员管理',parent_id:1
},{
  id:104, name:'角色管理',parent_id:1
},{
  id:301, name:'项目成本统计明细',parent_id:3
},{
  id:302, name:'项目组成员考勤',parent_id:3
},{
  id:303, name:'项目基本信息',parent_id:3
}];
var dbInit = function () {
    sql.connect(function (err) {
        if (err) {
        } else {
            console.log('成功连接数据库,正在初始化数据库')
            sql.query('CREATE TABLE t_user(  \n' +
                '  id VARCHAR(10) NOT NULL COMMENT \'用户编号,自增,主键\',\n' +
                '  name VARCHAR(100) COMMENT \'用户名 唯一\',\n' +
                '  password VARCHAR(100) COMMENT \'密码\',\n' +
                '  gender VARCHAR(4) COMMENT \'性别\',\n' +
                '  role_id int(8) COMMENT \'角色id\',\n' +
                '  level_id INT(10) COMMENT \'级别id  外键 关联级别表\',\n' +
                '  dept_id INT(10) COMMENT \'部门id  外键 关联部门id\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  fun_group VARCHAR(100) COMMENT \'职能分组\',\n' +
                '  fun_name VARCHAR(100) COMMENT \'职能名称\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  PRIMARY KEY (id),\n' +
                '  UNIQUE INDEX UNIQUE_NAME (name)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_user表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE auth_role(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'角色编号,自增，主键\',\n' +
                '  name VARCHAR(100) COMMENT \'角色名称\',\n' +
                '  descr VARCHAR(255) COMMENT \'描述\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci;', function (err) {
                !err ? console.log('auth_role表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE auth_permission(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'权限id,主键\',\n' +
                '  resource_id varchar(50) COMMENT \'资源id,外键\',\n' +
                '  operation_id varchar(20) COMMENT \'动作id,外键\',\n' +
                '  name VARCHAR(100) COMMENT \'权限名称\',\n' +
                '  descr VARCHAR(255) COMMENT \'权限描述\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '   update_time DATE COMMENT \'更新时间\',\n' +
                '   remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('auth_permission表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE auth_operation(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'编号,自增,主键\',\n' +
                '  name VARCHAR(100) COMMENT \'动作名称\',\n' +
                '  descr VARCHAR(255) COMMENT \'动作描述\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '   update_time DATE COMMENT \'更新时间\',\n' +
                '   remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('auth_permission表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE auth_resource(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'编号,自增,主键\',\n' +
                '  name VARCHAR(100) COMMENT \'动作名称\',\n' +
                '  descr VARCHAR(255) COMMENT \'动作描述\',\n' +
                '  parent_id INT(4) COMMENT \'父编号\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('auth_resource表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE auth_user_role(  \n' +
                '  user_id varchar(10) COMMENT \'用户id,外键\',\n' +
                '  role_id INT(4) COMMENT \'角色id,外键\',\n' +
                '  create_time DATE COMMENT \'创建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\'\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('auth_user_role表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE auth_role_permission(  \n' +
                '  role_id INT(4) COMMENT \'角色id,外键\',\n' +
                '  permission_id varchar(50) COMMENT \'权限id,外键\',\n' +
                '  create_time DATE COMMENT \'创建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\'\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('auth_role_permission表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE t_menu(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'菜单主键\',\n' +
                '  name VARCHAR(100) COMMENT \'菜单名称\',\n' +
                '  level INT(4) COMMENT \'菜单级别\',\n' +
                '  parent_id INT(4) COMMENT \'父节点\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  create_time DATE COMMENT \'创建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_menu表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE t_budget(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'菜单主键\',\n' +
                '  project_name VARCHAR(100) NOT NULL AUTO_INCREMENT COMMENT \'项目名称\',\n' +
                '  leader_id VARCHAR(100) COMMENT \'项目负责人\',\n' +
                '  projectType int(4) COMMENT \'项目类型\',\n' +
                '  cate VARCHAR(255) COMMENT \'项目分类\',\n' +
                '  cate_id INT(4) COMMENT \'项目分类 外键关联项目分类表\',\n' +
                '  start_time DATE COMMENT \'开始时间\',\n' +
                '  online_time DATE COMMENT \'上线时间\',\n' +
                '  create_time DATE COMMENT \'创建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  state INT(2) COMMENT \'项目状态\',\n' +
                '  is_enabled INT(2) COMMENT \'是否使用\',\n' +
                '  leader_name VARCHAR(100) COMMENT \'项目负责人 后面用到直接取数据\',\n' +
                '  amount DECIMAL(12,2) COMMENT \'合同金额\',\n' +
                '  profit_rate DECIMAL(12,2) COMMENT \'利润率\',\n' +
                '  profit DECIMAL(12,2) COMMENT \'利润\',\n' +
                '  in_cost DECIMAL(12,2) COMMENT \'投入成本\',\n' +
                '  per_unit_cost DECIMAL(12,2) COMMENT \'人天单位成本\',\n' +
                '  in_per_unit DECIMAL(12,2) COMMENT \'投入人天\',\n' +
                '  num_per INT(10) COMMENT \'人天\',\n' +
                '  time_count INT(4) COMMENT \'耗时(月)\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  consume_cost decimal(12,2) COMMENT \'已消耗成本\',\n' +
                '  consume_per_unit decimal(12,2) COMMENT \'已消耗人天\',\n' +
                '  project_progress VARCHAR(10) COMMENT \'项目进度\',\n' +
                '  consumation_ratio decimal(12,2) COMMENT \'成本消耗占比\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_budget表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE `t_budget_details` (\n' +
                '`project_id`  int(10) NOT NULL COMMENT \'项目ID\' ,\n' +
                '`project_stage`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT \'项目阶段\' ,\n' +
                '`stage_rate`  varchar(8) CHARACTER SET utf8 NULL DEFAULT NULL COMMENT \'阶段占比\' ,\n' +
                '`stage_putMan`  decimal(12,2) NULL DEFAULT NULL COMMENT \'阶段投入人天\' ,\n' +
                '`stage_start`  date NULL DEFAULT NULL COMMENT \'阶段开始时间\' ,\n' +
                '`stage_end`  date NULL DEFAULT NULL COMMENT \'阶段截止日\' ,\n' +
                '`stage_budget`  decimal(12,2) NULL DEFAULT NULL COMMENT \'阶段预算成本\' ,\n' +
                '`project_process`  varchar(10) CHARACTER SET utf8 NULL DEFAULT NULL COMMENT \'项目进度\' ,\n' +
                '`cost_rate`  decimal(12,2) NULL DEFAULT NULL COMMENT \'成本消耗占比\' ,\n' +
                '`stage_putman_cost`  decimal(12,2) NULL DEFAULT NULL COMMENT \'阶段消耗人天\' ,\n' +
                '`stage_cost`  decimal(12,2) NULL DEFAULT NULL COMMENT \'阶段消耗成本\' ,\n' +
                '`stage_process`  varchar(10) CHARACTER SET utf8 NULL DEFAULT NULL COMMENT \'阶段进度\' ,\n' +
                '`stage_cost_rate`  varchar(10) CHARACTER SET utf8 NULL DEFAULT NULL COMMENT \'各阶段成本消耗占比\' ,\n' +
                '`plan_amount`  decimal(12,2) NULL DEFAULT NULL COMMENT \'计划收款金额\' ,\n' +
                '`plan_amount_time`  date NULL DEFAULT NULL COMMENT \'计划收款时间\' ,\n' +
                '`act_amount`  decimal(12,2) NULL ,\n' +
                '`act_amount_time`  date NULL DEFAULT NULL COMMENT \'实际收款时间\' ,\n' +
                'ALTER TABLE `t_budget_details` ADD CONSTRAINT `projectId` FOREIGN KEY (`project_id`) REFERENCES `t_budget` (`id`);\n' +
                ')ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_budget_details 预算详情表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE `t_cost` (\n' +
                '`id`  int(4) NOT NULL COMMENT \'项目ID\' ,\n' +
                '`project_name`  varchar(100) CHARACTER SET utf8 NULL DEFAULT NULL COMMENT \'项目名称\' ,\n' +
                '`leader_id`  varchar(20) NULL DEFAULT NULL COMMENT \'项目经理ID\' ,\n' +
                '`cate_id`  int(4) NULL DEFAULT NULL COMMENT \'项目分类\' ,\n' +
                '`start_time`  date NULL COMMENT \'开始时间\' ,\n' +
                '`online_time`  date NULL COMMENT \'上线时间\' ,\n' +
                '`end_time`  date NULL COMMENT \'结束时间\' ,\n' +
                '`create_time`  date NULL COMMENT \'创建时间\' ,\n' +
                '`update_time`  date NULL COMMENT \'更新时间\' ,\n' +
                '`state`  int(4) NULL COMMENT \'状态\' ,\n' +
                '`leader_name`  varchar(30) CHARACTER SET utf8 NULL DEFAULT NULL COMMENT \'项目经理\' ,\n' +
                '`amount`  decimal(12,2) NULL COMMENT \'合同金额\' ,\n' +
                '`profit`  decimal(12,2) NULL COMMENT \'利润金额\' ,\n' +
                '`in_cost`  decimal(12,2) NULL COMMENT \'投入成本\' ,\n' +
                '`in_per_unit`  decimal(12,2) NULL COMMENT \'投入人天\' ,\n' +
                '`num_per`  int(12) NULL COMMENT \'人天\' ,\n' +
                '`time_count`  decimal(12,2) NULL COMMENT \'耗时(月)\' ,\n' +
                '`projectType`  int(4) NULL COMMENT \'项目类型\' ,\n' +
                '`consume_cost`  decimal(12,2) NULL COMMENT \'已消耗成本\' ,\n' +
                '`consume_per_unit`  decimal(12,2) NULL COMMENT \'已消耗人天\' ,\n' +
                '`project_progress`  decimal(12,2) NULL COMMENT \'项目进度\' ,\n' +
                '`consumation_ratio`  decimal(12,2) NULL COMMENT \'消耗占比\' ,\n' +
                'PRIMARY KEY (`id`)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_cost表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE t_cost_list(  \n' +
                '  id INT(10) NOT NULL COMMENT \'项目ID\',\n' +
                '  user_id varchar(10) COMMENT \'用户id 外键关联用户表\',\n' +
                '  entry_time DATE COMMENT \'进场时间\',\n' +
                '  exit_time DATE COMMENT \'退场时间\',\n' +
                '  per_time_count INT(10) COMMENT \'人天(天)\',\n' +
                '  month DECIMAL(12,2) COMMENT \'月份(月)\',\n' +
                '  level_id  int(4) COMMENT \'级别ID\',\n' +
                '  level  varchar(50) COMMENT \'级别\',\n' +
                '  per_price DECIMAL(12,2) COMMENT \'级别单价\',\n' +
                '  per_price_count DECIMAL(12,2) COMMENT \'级别单价总和\',\n' +
                '  dept varchar(50) COMMENT \'部门\',\n' +
                '  dept_price DECIMAL(12,2) COMMENT \'部门杂费单价\',\n' +
                '  dept_price_count DECIMAL(12,2) COMMENT \'杂费和\',\n' +
                '  dept_cate_id INT(4) COMMENT \'部门项目分类id 外键 关联项目部门表\',\n' +
                '  user_name VARCHAR(100) COMMENT \'用户名 后面表可能用到,方便取值\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  per_count DECIMAL(12,2) COMMENT \'人均费用总计\',\n' +
                '  count DECIMAL(12,2) COMMENT \'总费用\',\n' +
                '  time_count DECIMAL(12,2) COMMENT \'人天总计\',\n' +
                '  month_count DECIMAL(10,2) COMMENT \'月份总计\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_cost_list表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE t_cate(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'主键\',\n' +
                '  name VARCHAR(100) COMMENT \'部门类型\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_cate表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE t_level(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'主键\',\n' +
                '  name VARCHAR(100) COMMENT \'级别名\',\n' +
                '  price DECIMAL(10,2) COMMENT \'单价\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_level表创建成功') : console.log(err)
            })
            sql.query('CREATE TABLE t_dept(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'主键\',\n' +
                '  name VARCHAR(100) COMMENT \'部门名字\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_dept表创建成功') : console.log(err)
            })

            sql.query('CREATE TABLE t_dept_cate(  \n' +
                '  id INT(4) NOT NULL AUTO_INCREMENT COMMENT \'主键\',\n' +
                '  dept_id INT(4) NOT NULL COMMENT \'部门id  外键关联部门表\',\n' +
                '  cate_id INT(4) COMMENT \'项目类型id  外键 关联项目类型表\',\n' +
                '  price DECIMAL(10,2) COMMENT \'杂费单价\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_dept_cate表创建成功') : console.log(err)
            });
            sql.query('CREATE TABLE t_attendance(  \n' +
                '  id INT(10) NOT NULL AUTO_INCREMENT COMMENT \'主键\',\n' +
                '  user_id VARCHAR(10) COMMENT \'用户id 外键关联用户表主键\',\n' +
                '  atten_time VARCHAR(8) COMMENT \'考勤的时间 比如某年某月\',\n' +
                '  atten_day VARCHAR(500) COMMENT \'考勤的时间 比如某日\',\n' +
                '  per_time INT(10) COMMENT \'用户时间和\',\n' +
                '  level_id INT(4) COMMENT \'级别Id\',\n' +
                '  level varchar(10) COMMENT \'级别\',\n' +
                '  per_price DECIMAL(10,2) COMMENT \'级别单价\',\n' +
                '  per_price_count DECIMAL(10,2) COMMENT \'级别单价和\',\n' +
                '  dept_cate_id INT(4) COMMENT \'部门Id\',\n' +
                '  dept varchar(20) COMMENT \'部门\',\n' +
                '  dept_price DECIMAL(10,2) COMMENT \'杂费\',\n' +
                '  dept_price_count DECIMAL(10,2) COMMENT \'杂费和\',\n' +
                '  count1 DECIMAL(10,2) COMMENT \'用户总计\',\n' +
                '  actor VARCHAR(1000) COMMENT \'是否出勤 1代表出勤,0代表未出勤\',\n' +
                '  count2 DECIMAL(10,2) COMMENT \'总计 所有用户费用总计\',\n' +
                '  create_time DATE COMMENT \'新建时间\',\n' +
                '  update_time DATE COMMENT \'更新时间\',\n' +
                '  is_enabled INT(2) COMMENT \'状态\',\n' +
                '  remark1 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  remark2 VARCHAR(255) COMMENT \'备用字段\',\n' +
                '  user_name VARCHAR(100) COMMENT \'用户名 以便后面取值\',\n' +
                '  PRIMARY KEY (id)\n' +
                ') ENGINE=INNODB CHARSET=utf8 COLLATE=utf8_general_ci', function (err) {
                !err ? console.log('t_attendance表创建成功') : console.log(err)
            });
            //存过
            sql.query('DELIMITER $$\n' +
                'DROP PROCEDURE IF EXISTS getInsertAttendance $$\n' +
                'CREATE PROCEDURE getInsertAttendance(id int(4))\n' +
                'BEGIN\n' +
                'DECLARE done INT DEFAULT 0;\n' +
                'DECLARE userName varchar(50) DEFAULT NULL;\n' +
                'DECLARE cur_1 CURSOR FOR\n' +
                'select a.user_name from t_cost_list a where a.id=id;\n' +
                'DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;\n' +
                'open cur_1;\n' +
                'REPEAT\n' +
                'FETCH cur_1 INTO userName;\n' +
                'if not done then\n' +
                'select @attenTimeCount:=count(a.atten_time),@maxAttenTime:=max(a.atten_time), @minAttenTime:=min(a.atten_time) from t_attendance a where a.project_id=id and a.user_name=userName;\n' +
                'select @differDate:=TIMESTAMPDIFF(MONTH,b.entry_time,b.exit_time),@entry_time:=B.entry_time,@exit_time:=B.exit_time from t_cost_list b where b.id=id and b.user_name=userName;\n' +
                'set @differEntryMonth=PERIOD_DIFF(DATE_FORMAT(@minAttenTime,\'\%Y\%m\'),DATE_FORMAT(@entry_time,\'\%Y\%m\'));\n' +
                'select @differEntryMonth;\n' +
                'while (@differEntryMonth>0) DO\n' +
                'insert into t_attendance(project_id,user_id,per_price,dept_price,actor,user_name,level_id,level,dept_cate_id,dept,atten_time,create_time) SELECT b.id,b.user_id,b.per_price,b.dept_price,0,b.user_name,b.level_id,b. LEVEL,b.dept_cate_id,b.dept,date_format(@entry_time,\'\%Y\%m\%d\'),SYSDATE() FROM t_cost_list b inner join t_attendance c on b.id=c.project_id and b.user_name=c.user_name WHERE	b.id = id AND b.user_name = userName AND @entry_time not IN(select D.atten_time from t_attendance d where d.project_id=id and d.user_name=userName) group by b.id,b.user_name;\n' +
                'set @entry_time=DATE_ADD(@entry_time,interval 1 MONTH);\n' +
                'set @differEntryMonth=PERIOD_DIFF(DATE_FORMAT(@minAttenTime,\'\%Y\%m\'),DATE_FORMAT(@entry_time,\'\%Y\%m\'));\n' +
                'select @differEntryMonth,@entry_time;\n' +
                'commit;\n' +
                'END while;\n' +
                'set @differExitMonth:=PERIOD_DIFF(DATE_FORMAT(@exit_time,\'\%Y\%m\'),DATE_FORMAT(@maxAttenTime,\'\%Y\%m\'));\n' +
                'while (@differExitMonth>0) DO\n' +
                'insert into t_attendance(project_id,user_id,per_price,dept_price,actor,user_name,level_id,level,dept_cate_id,dept,atten_time,create_time) SELECT b.id,b.user_id,b.per_price,b.dept_price,0,b.user_name,b.level_id,b. LEVEL,b.dept_cate_id,b.dept,date_format(@exit_time,\'\%Y\%m\%d\'),SYSDATE() FROM t_cost_list b inner join t_attendance c on b.id=c.project_id and b.user_name=c.user_name WHERE	b.id = id AND b.user_name = userName AND @exit_time not IN(select D.atten_time from t_attendance d where d.project_id=id and d.user_name=userName) group by b.id,b.user_name;\n' +
                'set @exit_time=DATE_SUB(@exit_time,interval 1 MONTH);\n' +
                'set @differExitMonth:=PERIOD_DIFF(DATE_FORMAT(@exit_time,\'\%Y\%m\'),DATE_FORMAT(@maxAttenTime,\'\%Y\%m\'));\n' +
                'commit;\n' +
                'END while;\n' +
                'end if;\n' +
                'UNTIL done END REPEAT;\n' +
                'CLOSE cur_1;\n' +
                'END $$\n' +
                'DELIMITER ;', function (err) {
                !err ? console.log('考勤信息创建成功') : console.log(err)
            });
//ALTER TABLE `t_cost_list` ADD CONSTRAINT `foreign_key` FOREIGN KEY (`id`) REFERENCES `t_cost` (`id`)
            sql.query('ALTER TABLE `t_cost_list` ADD CONSTRAINT `foreign_key` FOREIGN KEY (`id`) REFERENCES `t_cost` (`id`)\n', function (err) {
                !err ? console.log('成本详情外键创建成功') : console.log(err)
            })
            sql.query('insert into t_user set ?', {
                id: '1',
                name: NAME,
                password: PASSWORD,
                gender: '1',
                level_id: '1',
                dept_id: 1,
                is_enabled: 1,
                create_time: new Date(),
                update_time: new Date(),
                fun_group: '1',
                fun_name: '管理员',
                remark1: '',
                remark2: ''
            }, function (err) {
                !err ? console.log('t_user初始化成功') : console.log(err)
            });
            sql.query('insert into auth_role set ?', {
                id: 101,
                name: '管理员',
                desc: '拥有所有权限',
                is_enabled: 1,
                create_time: new Date(),
                update_time: new Date(),
                remark1: '',
                remark2: ''
            }, function (err) {
                !err ? console.log('角色数据初始化成功') : console.log(err)
            });
            sql.query('insert into t_cate(name,create_time,update_time) values ?',[cateList], function (err) {
                !err ? console.log('t_cate数据初始化成功') : console.log(err)
            });
            sql.query('insert into t_dept(name) values ?',[deptList], function (err) {
                !err ? console.log('t_dept数据初始化成功') : console.log(err)
            })
            //menuList
            sql.query('insert into T_MENU(id,name,parent_id) values ?',[menuList], function (err) {
                !err ? console.log('t_menu数据初始化成功') : console.log(err)
            })
            sql.end()
        }
    })
}
dbInit()
