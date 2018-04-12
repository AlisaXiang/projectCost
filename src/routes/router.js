import Vue from 'vue'
import Router from 'vue-router'
const homePage = resolve => require(['../views/home.vue'], resolve)
const levelPrice = resolve => require(['../views/systemManage/level.vue'], resolve)
const otherPrice = resolve => require(['../views/systemManage/otherPrice.vue'], resolve)
const employeeManager = resolve => require(['../views/systemManage/employeeManager.vue'], resolve)
const roleManage = resolve => require(['../views/systemManage/roleManage/role.vue'],resolve)
const login = resolve => require(['../views/Login/login.vue'], resolve)
const projectBudget = resolve => require(['../views/projectBudget/index.vue'],resolve)
const projectCost = resolve => require(['../views/projectCost/index.vue'],resolve)
const index = resolve => require(['../views/index.vue'], resolve)
const Mock = resolve => require(['../views/test/mock.vue'],resolve)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: index,
      children: [
        {path: '/index/home',component: homePage},
        {path: '/index/levelPrice',component: levelPrice},
          {path: '/index/otherPrice',component: otherPrice},
          {path: '/index/employeeManager',component: employeeManager},
          {path: '/index/roleManage',component: roleManage},
          {path: '/index/projectBudget',component:projectBudget},
          {path: '/index/projectCost',component:projectCost},
          { path: '/index/mock',component: Mock}
      ]
    },
    {
      path: '/levelPrice',
      component: levelPrice
    },
      {
          path: '/otherPrice',
          component: otherPrice
      },
      {
          path: '/employeeManager',
          component: employeeManager
      },
    {
      path: '/login',
      component: login
    },
    {
      path: '/', redirect: '/login'
    },{
          path: '/mock',
          component: Mock
      }
  ]
})
