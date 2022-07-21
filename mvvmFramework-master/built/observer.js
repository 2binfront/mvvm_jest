"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dep_1 = require("./dep");
// 进行数据劫持
var Observer = /** @class */ (function () {
    function Observer(data) {
        this.data = data;
        // 遍历对象完成所有数据的劫持
        this.walk(this.data);
    }
    /**
     * 遍历对象
     * @param {*} data
     */
    Observer.prototype.walk = function (data) {
        var _this = this;
        if (!data || typeof data !== 'object') { // 递归结束条件
            return;
        }
        Object.keys(data).forEach(function (key) {
            _this.defineReactive(data, key, data[key]);
        });
    };
    /**
     * 动态设置响应式数据
     * @param {*} data
     * @param {*} key
     * @param {*} value
     */
    Observer.prototype.defineReactive = function (data, key, value) {
        var dep = new dep_1.default();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get: function () {
                dep.addSub(dep_1.default.target);
                return value;
            },
            set: function (newValue) {
                console.log('set');
                value = newValue;
                dep.notify();
            }
        });
        this.walk(value); // 为了完成递归遍历
    };
    return Observer;
}());
exports.default = Observer;
//# sourceMappingURL=observer.js.map