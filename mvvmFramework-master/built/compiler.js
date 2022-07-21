"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var wacther_1 = require("./wacther");
// 进行模板编译
var Compiler = /** @class */ (function () {
    function Compiler(context) {
        this.$el = context.$el;
        this.context = context;
        if (this.$el) {
            // 把dom转成文档片段
            this.$fragment = this.nodeToFragment(this.$el);
            console.log(this.$fragment);
            // 编译模板
            this.compiler(this.$fragment);
            //  把文档添加到页面中
            this.$el.appendChild(this.$fragment);
        }
    }
    /**
     * 把所有元素转成文档片段
     * @param {*} node
     */
    Compiler.prototype.nodeToFragment = function (node) {
        var _this = this;
        var fragment = document.createDocumentFragment();
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(function (child) {
                // 判断需要的节点
                // 注释或者无用的换行，不添加
                if (!_this.ignorable(child)) {
                    fragment.appendChild(child);
                }
            });
        }
        return fragment;
    };
    /**
     * 忽略哪些节点不添加
     * @param {*} node
     */
    Compiler.prototype.ignorable = function (node) {
        var reg = /^[\t\n\r]+/;
        return (node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent)));
    };
    /**
     * 模板编译
     * @param {*} node
     */
    Compiler.prototype.compiler = function (node) {
        var _this = this;
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(function (child) {
                if (child.nodeType === 1) {
                    _this.compilerElementNode(child);
                }
                else if (child.nodeType === 3) {
                    _this.compilerTextNode(child);
                }
            });
        }
    };
    /**
     * 编译元素节点
     * @param {*} node
     */
    Compiler.prototype.compilerElementNode = function (node) {
        var _this = this;
        var that = this;
        var attrs = __spreadArray([], node.attributes, true);
        attrs.forEach(function (attr) {
            var attrName = attr.name, attrValue = attr.value;
            if (attrName.indexOf('v-') === 0) {
                var dirName = attrName.slice(2);
                switch (dirName) {
                    case 'text':
                        new wacther_1.default(attrValue, _this.context, function (newValue) {
                            node.textContent = newValue;
                        });
                        break;
                    case 'model':
                        new wacther_1.default(attrValue, _this.context, function (newValue) {
                            node.value = newValue;
                        });
                        node.addEventListener('input', function (e) {
                            that.context[attrValue] = e.target.value;
                        });
                        break;
                }
            }
            if (attrName.indexOf('@') === 0) {
                _this.compilerMethods(_this.context, node, attrName, attrValue);
            }
        });
        this.compiler(node); // 递归
    };
    /**
     * 函数编译
     * @param {*} scope
     * @param {*} node
     * @param {*} attrName
     * @param {*} attrValue
     */
    Compiler.prototype.compilerMethods = function (scope, node, attrName, attrValue) {
        var type = attrName.slice(1);
        var fn = scope[attrValue];
        node.addEventListener(type, fn.bind(scope));
    };
    /**
     * 编译文本节点
     * @param {*} node
     */
    Compiler.prototype.compilerTextNode = function (node) {
        var text = node.textContent.trim();
        if (text) {
            // 把text字符串，转换为表达式
            var exp = this.parseText(text);
            // 
            console.log(exp);
            //添加订阅者，计算表达式的值
            // 当表达式依赖的值发生变化时
            // 1.重新计算表达式的值
            // 2.node.textContent给最新的值
            // 即可完成Model => View 的响应式
            new wacther_1.default(exp, this.context, function (newValue) {
                node.textContent = newValue;
            });
        }
    };
    /**
     * 完成文本向表达式的转化
     * @param {*} text
     */
    Compiler.prototype.parseText = function (text) {
        var reg = /\{\{(.+?)\}\}/g;
        var pices = text.split(reg);
        //
        console.log(pices);
        var matches = text.match(reg);
        // 
        console.log(matches);
        var tokens = [];
        pices.forEach(function (item) {
            if (matches && matches.indexOf("{{" + item + "}}") > -1) {
                tokens.push("(" + item + ")");
            }
            else {
                tokens.push('`' + item + '`');
            }
        });
        return tokens.join('+');
    };
    return Compiler;
}());
exports.default = Compiler;
//# sourceMappingURL=compiler.js.map