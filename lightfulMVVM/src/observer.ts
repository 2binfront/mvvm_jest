import Dep from "./dep"

export default class Observer{
    data:Object;

    constructor(data: object){
        
        this.data = data;

        //遍历对象完成所有数据的劫持
        this.walk(this.data);
    }

    /**
     * 遍历data的一层
     * @param data 
     */
    walk(data: object){
        if(!data || typeof data !== "object"){
            return;
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        })
    }


    /**
     * 动态设置响应数据
     * @param data 
     * @param key 
     * @param value 
     */
    defineReactive(data: Object, key: PropertyKey, value: any){
        let dep = new Dep();
        Object.defineProperty(data, key, {
            //可遍历
            enumerable: true,

            //不可再配置
            configurable: false,

            get: ()=>{
                //console.log('get');
                Dep.target && dep.addSub(Dep.target);
                return value;
            },

            set: (newValue) => {
                //console.log('set');
                value = newValue;
                dep.notify();
            }
        });

        //防止 data 嵌套对象，递归遍历
        this.walk(value);
    }
}