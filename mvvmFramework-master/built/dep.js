"use strict";
// 观察者模式中 通知
Object.defineProperty(exports, "__esModule", { value: true });
var Dep = /** @class */ (function () {
    function Dep() {
        // 存放所有watcher
        this.subs = {};
    }
    Dep.prototype.addSub = function (target) {
        this.subs[target.uid] = target;
    };
    Dep.prototype.notify = function () {
        for (var uid in this.subs) {
            this.subs[uid].update();
        }
    };
    return Dep;
}());
exports.default = Dep;
//# sourceMappingURL=dep.js.map