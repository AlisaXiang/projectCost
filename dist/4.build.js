webpackJsonp([4],{

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(276)
__webpack_require__(277)

var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(228),
  /* template */
  __webpack_require__(262),
  /* scopeId */
  "data-v-80939076",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 228:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    name: "level",
    data() {
        return {
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
            dialogVisible: false
        };
    },
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
        getList() {
            const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            this.$ajax.post('http://127.0.0.1:3000/getLevel').then(res => {
                if (res.data.code == 1) {
                    this.list = res.data.levelInfo;
                } else {
                    this.$message.error("级别信息获取失败！");
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
            console.log(dataList);
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

/***/ 243:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, ".content[data-v-80939076]{margin:30px 20px}.content .toolbar[data-v-80939076]{padding:0 20px 10px;background-color:#eff2f7;margin-bottom:10px}.content .toolbar .form-row .form-input[data-v-80939076]{display:inline-block}.content .toolbar .form-row .form-content[data-v-80939076]{display:inline-block;width:30%}.content .toolbar .toolbar-action[data-v-80939076]{text-align:right;padding:10px 0}.el-dialog__body[data-v-80939076]{padding:10px 15px}.head-ul[data-v-80939076]{text-align:center;list-style:none}.head-ul li[data-v-80939076]{display:inline}.head-ul li[data-v-80939076]:first-child{display:block;font-size:20px;font-weight:700}.head-ul li[data-v-80939076]:last-child{margin-left:30px}", ""]);

// exports


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),

/***/ 262:
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
            value: (scope.row.levelName),
            callback: function($$v) {
              _vm.$set(scope.row, "levelName", $$v)
            },
            expression: "scope.row.levelName"
          }
        }, _vm._l((_vm.levelOptions), function(item) {
          return _c('el-option', {
            key: item.code,
            attrs: {
              "label": item.name,
              "value": item.name
            }
          })
        }))]
      }
    }])
  }), _vm._v(" "), _c('el-table-column', {
    attrs: {
      "label": "单价/元"
    },
    scopedSlots: _vm._u([{
      key: "default",
      fn: function(scope) {
        return [_c('el-input', {
          attrs: {
            "disabled": scope.row.isFlag === 1
          },
          model: {
            value: (scope.row.levelCost),
            callback: function($$v) {
              _vm.$set(scope.row, "levelCost", $$v)
            },
            expression: "scope.row.levelCost"
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
            value: (scope.row.levelId && scope.row.isFlag === 1),
            expression: "scope.row.levelId && scope.row.isFlag === 1"
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
            value: (scope.row.levelId && scope.row.isFlag === 2),
            expression: "scope.row.levelId && scope.row.isFlag === 2"
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
            value: (scope.row.levelId && scope.row.isFlag === 2),
            expression: "scope.row.levelId && scope.row.isFlag === 2"
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
      "width": "30%"
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

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(243);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("2a77cb70", content, true);

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(244);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("94acea00", content, true);

/***/ })

});
//# sourceMappingURL=4.build.js.map