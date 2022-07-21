"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dep_1 = require("./dep");
var $uid = 0;
var Watcher = /** @class */ (function () {
    function Watcher(exp, scope, callback) {
        this.exp = exp;
        this.scope = scope;
        this.callback = callback;
        this.uid = $uid++;
        this.update();
    }
    /**
     * 计算表达式
     */
    Watcher.prototype.get = function () {
        dep_1.default.target = this;
        var newValue = Watcher.computeExpression(this.exp, this.scope);
        dep_1.default.target = null;
        return newValue;
    };
    /**
     * 回调函数的调用
     */
    Watcher.prototype.update = function () {
        var newValue = this.get();
        this.callback && this.callback(newValue);
    };
    Watcher.computeExpression = function (exp, scope) {
        // 创建函数
        // 把scope当作作用域
        // 函数内部使用with来指定作用域
        // 执行函数, 得到表达式的值
        var fn = new Function('scope', "with(scope){return " + exp + "}");
        return fn(scope);
    };
    return Watcher;
}());
exports.default = Watcher;
//# sourceMappingURL=wacther.js.map