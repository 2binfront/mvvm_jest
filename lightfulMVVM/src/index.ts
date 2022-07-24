import Compiler from "./compiler";
import Observer from "./observer"

export default class Vue{
    $el:HTMLElement;
    $data:object;
    options:{
        el:string,
        data:object,
        methods:object
    };
    compile: Compiler;
    obser: Observer;
    constructor(options: { el: string; data: {}; methods: {}; }){
        //获取元素 dom 对象
        this.$el=document.querySelector(options.el);
        
        //转存数据
        this.$data = options.data || {};

        //数据和函数的代理
        this._proxyData(this.$data);
        this._proxyMethods(options.methods);

        //数据劫持
        this.obser=new Observer(this.$data);

        //模板编译，页面渲染
        this.compile=new Compiler(this);
    }


    /**
     * 数据的代理，访问vue对象时代理其数据
     * @param data 
     */
    _proxyData(data: object){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                set(newValue){
                    data[key] = newValue;
                },
                get(){
                    return data[key];
                }
            })
        });
    }

    /**
     * 对vue对象的方法的简单代理，其实就是复制
     * @param methods 
     */
    _proxyMethods(methods: { [x: string]: Function; }){
        if(methods && typeof methods === "object"){
            Object.keys(methods).forEach(key => {
                this[key] = methods[key];
            });
        }
    }
}

window['Vue']=Vue;