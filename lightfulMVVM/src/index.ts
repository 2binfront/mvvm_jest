import Compiler from "./compiler";
import Observer from "./observer"

export interface VueClass{
    $data: Record<string, any>;
    [x: string]: any;
}

export interface VueOption{
    el: string; 
    data: {}; 
    methods?: Record<string, any>;
}

export default class Vue implements VueClass{

    public $data: Record<string, any> = {};

    constructor(options: VueOption){
        //获取元素 dom 对象
        this.$el=document.querySelector(options.el);
        
        //转存数据
        this.$data = options.data || {};

        //数据和函数的代理
        this._proxyData();
        this._proxyMethods(options.methods);

        //数据劫持
        this.obser=new Observer(this.$data);

        //模板编译，页面渲染
        new Compiler(this);
    }


    /**
     * 数据的代理，访问vue对象时代理其数据
     * @param data 
     */
    _proxyData(): void{
        Object.keys(this.$data).forEach(key => {
            Object.defineProperty(this, key, {
                set(newValue){
                    this.$data[key] = newValue;
                },
                get(){
                    return this.$data[key];
                }
            })
        });
    }

    /**
     * 对vue对象的方法的简单代理，其实就是复制
     * @param methods 
     */
    _proxyMethods(methods: Record<string, any>){
        if(methods && typeof methods === "object"){
            Object.keys(methods).forEach(key => {
                this[key] = methods[key];
            });
        }
    }
}
