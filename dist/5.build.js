webpackJsonp([5],{

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(268)
__webpack_require__(269)

var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(227),
  /* template */
  __webpack_require__(256),
  /* scopeId */
  "data-v-25b718a0",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "employeeManager",
    data() {
        return {
            pageSize: 10,
            pageNum: 1,
            empCount: 0,
            list: [],
            multipleSelection: [],
            deptOptions: [],
            levelOptions: [],
            roleOptions: [],
            formInline: {
                user: '',
                region: ''
            },
            editRow: [],
            dialogVisible: false
        };
    },
    created() {
        this.getEmpCount();
        this.getRoleInfos();
        this.getlevelInfo();
        this.getDeptInfo();
        this.getList(this.pageNum, this.pageSize);
    },
    methods: {
        getEmpCount() {
            this.$ajax.post('http://127.0.0.1:3000/getEmpCount').then(res => {
                if (res.data.code == 1) {
                    this.empCount = res.data.empCount;
                    console.log('empCount', this.empCount);
                } else {
                    this.$message.error("员工总数信息获取失败！");
                }
            });
        },
        //取消保存方法
        canceleSave() {
            //重新渲染一次
            this.getList(this.pageNum, this.pageSize);
        },
        //获取当前每页记录数,点击之后触发事件
        handleSizeChange(val) {
            this.pageSize = val;
            //调用分页方法进行分页
            this.getList(this.pageNum, val);
        },
        //获取当前页数,点击之后触发事件
        handleCurrentChange(val) {
            this.currentPage = val;
            //调用分页方法进行分页
            this.getList(val, this.pageSize);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        editSave(row) {
            this.$ajax.post('http://127.0.0.1:3000/updateEmpInfo', this.$qs.stringify({
                empId: row.empId,
                empName: row.empName,
                levelId: row.levelId,
                deptId: row.deptId,
                funGroup: row.funGroup,
                funName: row.funName,
                price: row.price,
                roleId: row.roleId
            })).then(res => {
                if (res.data.code == 1) {
                    this.dialogVisible = false;
                    this.getList(this.pageNum, this.pageSize);
                } else {
                    this.$message.error("员工信息修改失败！");
                }
            });
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        getList(pageNum, pageSize) {
            this.$ajax.post('http://127.0.0.1:3000/getEmpInfos', this.$qs.stringify({
                pageNum: pageNum,
                pageSize: pageSize
            })).then(res => {
                if (res.data.code == 1) {
                    this.list = res.data.empInfos;
                } else {
                    this.$message.error("员工信息获取失败！");
                }
            });
        },
        getDeptInfo() {
            this.$ajax.post('http://127.0.0.1:3000/getDeptIds').then(res => {
                if (res.data.code == 1) {
                    this.deptOptions = res.data.deptIds;
                } else {
                    this.$message.error("部门信息获取失败！");
                }
            });
        },
        getlevelInfo() {
            this.$ajax.post('http://127.0.0.1:3000/getLevel').then(res => {
                if (res.data.code == 1) {
                    this.levelOptions = res.data.levelInfo;
                } else {
                    this.$message.error("级别信息获取失败！");
                }
            });
        },
        getRoleInfos() {
            this.$ajax.post('http://127.0.0.1:3000/getRoleInfos').then(res => {
                if (res.data.code == 1) {
                    this.roleOptions = res.data.roleInfos;
                } else {
                    this.$message.error("角色信息获取失败！");
                }
            });
        },

        addRow() {
            this.list.push({ empName: '', empId: '', funGroup: '', funName: '', deptId: '', levelId: '', roleId: '', price: '', isFlag: '', isNew: '' });
        },
        addSave() {
            let dataList = [];
            for (let i = 0; i < this.list.length; i++) {
                if (!this.list[i].isNew) {
                    dataList.push(this.list[i]);
                }
                console.log(dataList);
            }
            this.$ajax.post('http://127.0.0.1:3000/addEmpInfo', this.$qs.stringify({
                empList: dataList
            })).then(res => {
                if (res.data.code == 1) {
                    this.dialogVisible = false;
                    this.$message({
                        type: 'success',
                        message: '数据新增成功'
                    });
                    this.getList(this.pageNum, this.pageSize);
                } else {
                    this.$message.error("员工信息新增失败！");
                }
            });
        },
        deleteSave() {
            this.$confirm('此操作将删除选中的数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let dataList = [];
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    if (this.multipleSelection[i].empId) {
                        dataList.push(this.multipleSelection[i].empId);
                    }
                }
                console.log(dataList);
                this.$ajax.post('http://127.0.0.1:3000/deleteEmpInfos', this.$qs.stringify({
                    empInfos: dataList
                })).then(res => {
                    if (res.data.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '数据删除成功'
                        });
                        this.getList(this.pageNum, this.pageSize);
                    } else {
                        this.$message.error("员工删除信息失败！");
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
});

/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ".content[data-v-25b718a0]{margin:30px 20px}.content .toolbar[data-v-25b718a0]{padding:0 20px 10px;background-color:#eff2f7;margin-bottom:10px}.content .toolbar .form-row .form-input[data-v-25b718a0]{display:inline-block}.content .toolbar .form-row .form-content[data-v-25b718a0]{display:inline-block;width:30%}.content .toolbar .toolbar-action[data-v-25b718a0]{text-align:right;padding:10px 0}.el-dialog__body[data-v-25b718a0]{padding:10px 15px}.head-ul[data-v-25b718a0]{text-align:center;list-style:none}.head-ul li[data-v-25b718a0]{display:inline}.head-ul li[data-v-25b718a0]:first-child{display:block;font-size:20px;font-weight:700}.head-ul li[data-v-25b718a0]:last-child{margin-left:30px}", ""]);

// exports


/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 256:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "toolbar"
  }, [_c('div', {
    staticClass: "toolbar-action"
  }, [_c('el-button-group', [_c('el-button', {
    attrs: {
      "type": "success"
    },
    on: {
      "click": _vm.addRow
    }
  }, [_vm._v("新增")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.addSave
    }
  }, [_vm._v("保存")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "danger"
    },
    on: {
      "click": _vm.deleteSave
    }
  }, [_vm._v("删除")])], 1)], 1)]), _vm._v(" "), _c('el-table', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "data": _vm.list,
      "tooltip-effect": "dark",
      "height": "450"
    },
    on: {
      "selection-change": _vm.handleSelectionChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "姓名"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": scope.row.isFlag === 1
          },
          model: {
            value: (scope.row.empName),
            callback: function($$v) {
              _vm.$set(scope.row, "empName", $$v)
            },
            expression: "scope.row.empName"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "工号"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": scope.row.isFlag === 1 || scope.row.isFlag === 2
          },
          model: {
            value: (scope.row.empId),
            callback: function($$v) {
              _vm.$set(scope.row, "empId", $$v)
            },
            expression: "scope.row.empId"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "职能分组"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": scope.row.isFlag === 1
          },
          model: {
            value: (scope.row.funGroup),
            callback: function($$v) {
              _vm.$set(scope.row, "funGroup", $$v)
            },
            expression: "scope.row.funGroup"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "职能名称"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": scope.row.isFlag === 1
          },
          model: {
            value: (scope.row.funName),
            callback: function($$v) {
              _vm.$set(scope.row, "funName", $$v)
            },
            expression: "scope.row.funName"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "所属部门"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-select', {
          attrs: {
            "filterable": "",
            "clearable": "",
            "placeholder": "请选择",
            "disabled": scope.row.isFlag === 1
          },
          model: {
            value: (scope.row.deptId),
            callback: function($$v) {
              _vm.$set(scope.row, "deptId", $$v)
            },
            expression: "scope.row.deptId"
          }
        }, _vm._l((_vm.deptOptions), function(dept) {
          return _c('el-option', {
            key: dept.id,
            attrs: {
              "label": dept.name,
              "value": dept.id
            }
          })
        }))]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "级别"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-select', {
          attrs: {
            "filterable": "",
            "clearable": "",
            "placeholder": "请选择",
            "disabled": scope.row.isFlag === 1
          },
          model: {
            value: (scope.row.levelId),
            callback: function($$v) {
              _vm.$set(scope.row, "levelId", $$v)
            },
            expression: "scope.row.levelId"
          }
        }, _vm._l((_vm.levelOptions), function(level) {
          return _c('el-option', {
            key: level.code,
            attrs: {
              "label": level.levelName,
              "value": level.levelId
            }
          })
        }))]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "用户角色"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-select', {
          attrs: {
            "multiple": "",
            "collapse-tags": "",
            "clearable": "",
            "placeholder": "请选择",
            "disabled": scope.row.isFlag === 1
          },
          model: {
            value: (scope.row.roleId),
            callback: function($$v) {
              _vm.$set(scope.row, "roleId", $$v)
            },
            expression: "scope.row.roleId"
          }
        }, _vm._l((_vm.roleOptions), function(role) {
          return _c('el-option', {
            key: role.id,
            attrs: {
              "label": role.name,
              "value": role.id
            }
          })
        }))]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "杂费/元"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": scope.row.isFlag === 1 || scope.row.isFlag === 2
          },
          model: {
            value: (scope.row.price),
            callback: function($$v) {
              _vm.$set(scope.row, "price", $$v)
            },
            expression: "scope.row.price"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "编辑"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-button', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (scope.row.isNew && scope.row.isFlag === 1),
            expression: "scope.row.isNew && scope.row.isFlag === 1"
          }],
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              scope.row.isFlag = 2
            }
          }
        }, [_vm._v("编辑")]), _vm._v(" "), _c('el-button', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (scope.row.isNew && scope.row.isFlag === 2),
            expression: "scope.row.isNew&&scope.row.isFlag === 2"
          }],
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.editSave(scope.row)
            }
          }
        }, [_vm._v("确定")]), _vm._v(" "), _c('el-button', {
          directives: [{
            name: "show",
            rawName: "v-show",
            value: (scope.row.isNew && scope.row.isFlag === 2),
            expression: "scope.row.isNew&&scope.row.isFlag === 2"
          }],
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.canceleSave()
            }
          }
        }, [_vm._v("取消")])]
      }
    }])
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "block"
  }, [_c('el-pagination', {
    attrs: {
      "background": "",
      "current-page": _vm.pageNum,
      "page-sizes": [10, 20],
      "page-size": _vm.pageSize,
      "layout": "total, sizes, prev, pager, next, jumper",
      "total": _vm.empCount
    },
    on: {
      "size-change": _vm.handleSizeChange,
      "current-change": _vm.handleCurrentChange
    }
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "确认",
      "visible": _vm.dialogVisible,
      "width": "30%",
      "before-close": _vm.handleClose
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogVisible = $event
      }
    }
  }, [_c('span', [_vm._v("是否确认进行该操作")]), _vm._v(" "), _c('span', {
    staticClass: "dialog-footer",
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('el-button', {
    on: {
      "click": function($event) {
        _vm.dialogVisible = false
      }
    }
  }, [_vm._v("取 消")]), _vm._v(" "), _c('el-button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": _vm.editSave
    }
  }, [_vm._v("确 定")])], 1)])], 1)
},staticRenderFns: []}

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(235);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("a8944d24", content, true);

/***/ }),

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(236);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("256cd36b", content, true);

/***/ })

});
//# sourceMappingURL=5.build.js.map