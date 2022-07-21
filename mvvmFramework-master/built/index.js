"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observer_1 = require("./observer");
var compiler_1 = require("./compiler");
var Vue = /** @class */ (function () {
    function Vue(options) {
        // 获取dom对象
        this.$el = document.querySelector(options.el);
        // 转存数据
        this.$data = options.data || {};
        // 数据代理 为了：vm.data.msg => vm.msg
        this._proxyData(this.$data);
        this._proxyMethods(options.methods);
        // 数据劫持
        new observer_1.default(this.$data);
        // 模板编译
        new compiler_1.default(this);
    }
    /**
     * 数据的代理
     * @param {*} data
     */
    Vue.prototype._proxyData = function (data) {
        var _this = this;
        Object.keys(data).forEach(function (key) {
            Object.defineProperty(_this, key, {
                set: function (newValue) {
                    data[key] = newValue;
                },
                get: function () {
                    return data[key];
                }
            });
        });
    };
    /**
    * 函数的代理
    * @param {*} methods
    */
    Vue.prototype._proxyMethods = function (methods) {
        var _this = this;
        if (methods && typeof methods === 'object') {
            Object.keys(methods).forEach(function (key) {
                _this[key] = methods[key];
            });
        }
    };
    return Vue;
}());
window.Vue = Vue;
//# sourceMappingURL=index.js.map