webpackJsonp([3],{

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(274)
__webpack_require__(275)

var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(229),
  /* template */
  __webpack_require__(261),
  /* scopeId */
  "data-v-530ac028",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 229:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "otherPrice",
    data() {
        return {
            list: [],
            multipleSelection: [],
            deptOptions: [],
            cateOptions: [],
            formInline: {
                user: '',
                region: ''
            },
            editRow: [],
            dialogVisible: false
        };
    },
    created() {
        this.getCateInfo();
        this.getDeptInfo();
        this.getList();
    },
    methods: {
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        editSave(row) {
            this.$ajax.post('http://127.0.0.1:3000/updateOtherPrice', this.$qs.stringify({
                id: row.id,
                deptId: row.deptId,
                cateId: row.cateId,
                price: row.price
            })).then(res => {
                if (res.data.code == 1) {
                    this.dialogVisible = false;
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
        getList() {
            this.$ajax.post('http://127.0.0.1:3000/getOtherPrice').then(res => {
                if (res.data.code == 1) {
                    this.list = res.data.otherPrice;
                } else {
                    this.$message.error("杂费信息获取失败！");
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
        getCateInfo() {
            this.$ajax.post('http://127.0.0.1:3000/getCateIds').then(res => {
                if (res.data.code == 1) {
                    this.cateOptions = res.data.cateIds;
                } else {
                    this.$message.error("部门信息获取失败！");
                }
            });
        },

        addRow() {
            this.list.push({ id: '', deptId: '', cateId: '', price: '', isFlag: 2 });
        },
        addSave() {
            let dataList = [];
            for (let i = 0; i < this.list.length; i++) {
                if (!this.list[i].id) {
                    dataList.push(this.list[i]);
                }
            }
            this.$ajax.post('http://127.0.0.1:3000/addOtherPrice', this.$qs.stringify({
                otherList: dataList
            })).then(res => {
                if (res.data.code == 1) {
                    this.dialogVisible = false;
                    this.$message({
                        type: 'success',
                        message: '数据新增成功'
                    });
                    this.getList();
                } else {
                    this.$message.error("杂费信息新增失败！");
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
                    if (this.multipleSelection[i].id) {
                        dataList.push(this.multipleSelection[i].id);
                    }
                }
                console.log(dataList);
                this.$ajax.post('http://127.0.0.1:3000/deleteOtherPrice', this.$qs.stringify({
                    otherId: dataList
                })).then(res => {
                    if (res.data.code == 1) {
                        this.$message({
                            type: 'success',
                            message: '数据删除成功'
                        });
                        this.getList();
                    } else {
                        this.$message.error("级别删除信息失败！");
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

/***/ 241:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ".content[data-v-530ac028]{margin:30px 20px}.content .toolbar[data-v-530ac028]{padding:0 20px 10px;background-color:#eff2f7;margin-bottom:10px}.content .toolbar .form-row .form-input[data-v-530ac028]{display:inline-block}.content .toolbar .form-row .form-content[data-v-530ac028]{display:inline-block;width:30%}.content .toolbar .toolbar-action[data-v-530ac028]{text-align:right;padding:10px 0}.el-dialog__body[data-v-530ac028]{padding:10px 15px}.head-ul[data-v-530ac028]{text-align:center;list-style:none}.head-ul li[data-v-530ac028]{display:inline}.head-ul li[data-v-530ac028]:first-child{display:block;font-size:20px;font-weight:700}.head-ul li[data-v-530ac028]:last-child{margin-left:30px}", ""]);

// exports


/***/ }),

/***/ 242:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 261:
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
      "selection-change": _vm.handleSelectionChange
    }
  }, [_c('el-table-column', {
    attrs: {
      "type": "selection",
      "width": "55"
    }
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "项目类型"
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
            value: (scope.row.cateId),
            callback: function($$v) {
              _vm.$set(scope.row, "cateId", $$v)
            },
            expression: "scope.row.cateId"
          }
        }, _vm._l((_vm.cateOptions), function(cate) {
          return _c('el-option', {
            key: cate.id,
            attrs: {
              "label": cate.name,
              "value": cate.id
            }
          })
        }))]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "部门"
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
      "label": "杂费/元"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": scope.row.isFlag === 1
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
            value: (scope.row.id && scope.row.isFlag === 1),
            expression: " scope.row.id && scope.row.isFlag === 1"
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
            value: (scope.row.id && scope.row.isFlag === 2),
            expression: " scope.row.id && scope.row.isFlag === 2"
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
            value: (scope.row.id && scope.row.isFlag === 2),
            expression: " scope.row.id && scope.row.isFlag === 2"
          }],
          attrs: {
            "type": "text"
          },
          on: {
            "click": function($event) {
              _vm.getList()
            }
          }
        }, [_vm._v("取消")])]
      }
    }])
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

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(241);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("a176a8fc", content, true);

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(242);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("269535dd", content, true);

/***/ })

});
//# sourceMappingURL=3.build.js.map