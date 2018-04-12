webpackJsonp([8],{

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(273)

var Component = __webpack_require__(24)(
  /* script */
  __webpack_require__(220),
  /* template */
  __webpack_require__(260),
  /* scopeId */
  "data-v-50647992",
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),

/***/ 220:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data() {
        return {
            username: '',
            password: ''
        };
    },
    mounted() {
        if (sessionStorage.getItem('name')) {
            this.$router.push("/index/home");
        }
    },
    methods: {
        login() {
            var that = this;
            if (this.username != '' && this.password != '') {
                this.$ajax.post('http://127.0.0.1:3000/login', this.$qs.stringify({
                    username: that.username,
                    password: that.password
                })).then(res => {
                    if (res.data.code == 1) {
                        that.$message.success("验证通过");
                        sessionStorage.setItem('name', res.data.sname);
                        sessionStorage.setItem('dep', res.data.dep);
                        sessionStorage.setItem('roleIds', res.data.roleIds);
                        setTimeout(function () {
                            that.getPermission();
                            that.$router.push("/index/home");
                        }, 500);
                    } else {
                        that.$message.error("账号密码错误！");
                    }
                });
            } else {
                this.$message.error('账号和密码不能为空');
            }
        },
        getPermission() {
            this.$ajax.post('http://127.0.0.1:3000/getPagePermission', this.$qs.stringify({
                roleIds: sessionStorage.getItem('roleIds')
            })).then(res => {
                if (res.data.code == 1) {
                    let menu = res.data.resourceId.split(',');
                    sessionStorage.setItem('menuPermission', menu);
                } else {
                    this.$message.error("错误！");
                }
            });
        },
        register() {
            this.$router.push("/register");
        }
    }
});

/***/ }),

/***/ 240:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(23)();
// imports


// module
exports.push([module.i, "#login[data-v-50647992]{width:100%;height:100%;background:#2f4d69}.login-box[data-v-50647992]{width:300px;margin:auto;text-align:center;position:absolute;top:25%;bottom:0;left:0;right:0}.login-box .title[data-v-50647992]{font-size:28px;color:#fff;margin-bottom:25px}.login-box .el-input[data-v-50647992]{height:40px;width:300px;margin-bottom:10px}.login-box .el-input input[data-v-50647992]{height:40px}.login-box .el-button--default[data-v-50647992]{width:300px;height:40px;margin-top:10px;background-color:#619ac5;border:0;color:#fff;box-shadow:0 0 3px #333;font-size:16px;letter-spacing:8px}.login-box .el-button--text[data-v-50647992]{margin-top:10px;margin-left:0;color:#fff}", ""]);

// exports


/***/ }),

/***/ 260:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "login"
    },
    on: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) { return null; }
        _vm.login($event)
      }
    }
  }, [_c('div', {
    staticClass: "login-box"
  }, [_c('div', {
    staticClass: "title"
  }, [_vm._v("成本管理系统")]), _vm._v(" "), _c('el-input', {
    attrs: {
      "placeholder": "请输入登陆账号",
      "name": "username"
    },
    model: {
      value: (_vm.username),
      callback: function($$v) {
        _vm.username = $$v
      },
      expression: "username"
    }
  }), _vm._v(" "), _c('el-input', {
    attrs: {
      "type": "password",
      "placeholder": "请输入登陆密码",
      "name": "password"
    },
    model: {
      value: (_vm.password),
      callback: function($$v) {
        _vm.password = $$v
      },
      expression: "password"
    }
  }), _vm._v(" "), _c('el-button', {
    on: {
      "click": _vm.login
    }
  }, [_vm._v("登陆")])], 1)])
},staticRenderFns: []}

/***/ }),

/***/ 273:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(240);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("35e39eaa", content, true);

/***/ })

});
//# sourceMappingURL=8.build.js.map