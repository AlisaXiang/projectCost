webpackJsonp([2],{

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(272)

var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(231),
  /* template */
  __webpack_require__(259),
  /* scopeId */
  "data-v-32a7d2ea",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 230:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            list: []
        };
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
                    this.list.child = [];
                    let s2 = [];
                    for (let i = 0; i < permission.length; i++) {
                        if (permission[i].parent_id === 0) {
                            this.list.push({ id: permission[i].id, name: permission[i].name, auth: permission[i].auth === 1 ? true : false });
                        } else if (permission[i].parent_id === 1) {
                            s1.push({ id: permission[i].id, name: permission[i].name, auth: permission[i].auth === 1 ? true : false });
                        }
                    }
                    for (let j = 0; j < this.list.length; j++) {
                        if (this.list[j].id === 1) {
                            this.list[j].child = s1;
                        } else {
                            this.list[j].child = {};
                        }
                    }
                    // this.list = res.data.permissionInfo;
                    console.log(this.list);
                } else {
                    this.$message.error("权限信息获取失败！");
                }
                loading.close();
            });
        }
    }
});

/***/ }),

/***/ 231:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__child_index_vue__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__child_index_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__child_index_vue__);
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
    name: "role",
    data() {
        return {
            modal: null,
            list: [],
            multipleSelection: [],
            levelOptions: [{
                code: '1',
                name: '资深'
            }, {
                code: '2',
                name: '高级'
            }],
            formInline: {
                user: '',
                region: ''
            },
            editRow: [],
            dialogVisible: false,
            roleId: null
        };
    },
    components: { child: __WEBPACK_IMPORTED_MODULE_0__child_index_vue___default.a },
    created() {
        this.getList();
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        edit(row) {
            this.editRow = row;
        },
        editSave(row) {
            this.$ajax.post('http://127.0.0.1:3000/updateLevel', this.$qs.stringify({
                levelId: row.levelId,
                levelName: row.levelName,
                levelCost: row.levelCost
            })).then(res => {
                if (res.data.code == 1) {
                    this.getList();
                } else {
                    this.$message.error("级别信息修改失败！");
                }
            });
        },
        handleClose(done) {
            this.$confirm('确认关闭？').then(_ => {
                done();
            }).catch(_ => {});
        },
        open(row, column, cell, event) {
            if (column.label === '界面权限') {
                this.roleId = row.id;
                this.dialogVisible = true;
            }
        },
        getList() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$ajax.post('http://127.0.0.1:3000/getRolePermission').then(res => {
                if (res.data.code == 1) {
                    this.list = res.data.rolesInfo;
                } else {
                    this.$message.error("角色信息获取失败！");
                }
                loading.close();
            });
        },
        addRow() {
            this.list.push({ levelId: '', levelName: '', levelCost: '', isFlag: 2 });
        },
        addSave() {
            let dataList = [];
            for (let i = 0; i < this.list.length; i++) {
                if (!this.list[i].levelId) {
                    dataList.push(this.list[i]);
                }
            }
            this.$ajax.post('http://127.0.0.1:3000/addLevel', this.$qs.stringify({
                levelList: dataList
            })).then(res => {
                if (res.data.code == 1) {
                    this.dialogVisible = false;
                    this.$message({
                        type: 'success',
                        message: '数据新增成功'
                    });
                    this.getList();
                } else {
                    this.$message.error("级别信息新增失败！");
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
                    if (this.multipleSelection[i].levelId) {
                        dataList.push(this.multipleSelection[i].levelId);
                    }
                }
                this.$ajax.post('http://127.0.0.1:3000/deleteLevel', this.$qs.stringify({
                    levelId: dataList
                })).then(res => {
                    if (res.data.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '数据删除成功'
                        });
                        this.getList();
                    } else {
                        this.$message.error("级别信息新增失败！");
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

/***/ 239:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ".content[data-v-32a7d2ea]{margin:30px 20px}.content .toolbar[data-v-32a7d2ea]{padding:0 20px 10px;background-color:#eff2f7;margin-bottom:10px}.content .toolbar .form-row .form-input[data-v-32a7d2ea]{display:inline-block}.content .toolbar .form-row .form-content[data-v-32a7d2ea]{display:inline-block;width:30%}.content .toolbar .toolbar-action[data-v-32a7d2ea]{text-align:right;padding:10px 0}.el-dialog__body[data-v-32a7d2ea]{padding:10px 15px}.head-ul[data-v-32a7d2ea]{text-align:center;list-style:none}.head-ul li[data-v-32a7d2ea]{display:inline}.head-ul li[data-v-32a7d2ea]:first-child{display:block;font-size:20px;font-weight:700}.head-ul li[data-v-32a7d2ea]:last-child{margin-left:30px}", ""]);

// exports


/***/ }),

/***/ 252:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(230),
  /* template */
  __webpack_require__(255),
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 255:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('table', [_vm._m(0), _vm._v(" "), _c('tbody', _vm._l((_vm.list), function(cell, index) {
    return _c('tr', [_c('td', [_c('el-checkbox', {
      model: {
        value: (cell.auth),
        callback: function($$v) {
          _vm.$set(cell, "auth", $$v)
        },
        expression: "cell.auth"
      }
    }), _vm._v(_vm._s(cell.name))], 1), _vm._v(" "), _c('td', [_c('ul', _vm._l((cell.child), function(child, key) {
      return _c('li', [_c('el-checkbox', {
        model: {
          value: (child.auth),
          callback: function($$v) {
            _vm.$set(child, "auth", $$v)
          },
          expression: "child.auth"
        }
      }), _vm._v(_vm._s(child.name) + "\n                ")], 1)
    }))])])
  }))])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('thead', [_c('tr', [_c('th', [_vm._v("一级菜单")]), _vm._v(" "), _c('th', [_vm._v("一级菜单")])])])
}]}

/***/ }),

/***/ 259:
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
      "height": "250"
    },
    on: {
      "selection-change": _vm.handleSelectionChange,
      "cell-dblclick": _vm.open
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "角色名称",
      "width": "120"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          model: {
            value: (scope.row.name),
            callback: function($$v) {
              _vm.$set(scope.row, "name", $$v)
            },
            expression: "scope.row.name"
          }
        })]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "界面权限"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "readonly": ""
          },
          model: {
            value: (scope.row.menu),
            callback: function($$v) {
              _vm.$set(scope.row, "menu", $$v)
            },
            expression: "scope.row.menu"
          }
        })]
      }
    }])
  })], 1), _vm._v(" "), _c('el-dialog', {
    attrs: {
      "title": "权限配置",
      "visible": _vm.dialogVisible,
      "width": "45%"
    },
    on: {
      "update:visible": function($event) {
        _vm.dialogVisible = $event
      }
    }
  }, [_c('child', {
    attrs: {
      "roleId": _vm.roleId
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(239);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("1a767482", content, true);

/***/ })

});
//# sourceMappingURL=2.build.js.map