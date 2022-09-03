import Dep from "./dep";

export interface WatcherClass{
  
  update(args?: any): void;
  get(): any;
}

let $uid=0;
export default class Watcher implements WatcherClass {

    private exp:string = null;
    callback:any;
    uid:number;
  private scope: Record<string, any> = null ;
    
  constructor(exp: string, scope: Record<string,any>, callback: any){

        this.exp=exp;
        this.scope=scope;
        this.callback=callback;
        this.uid=$uid++;
        this.update();
    }

    /**
   * 计算表达式
   */
  get() {
    //let newValue = Watcher.computeExpression(this.exp, this.scope);
    //return newValue

    Dep.target = this;
    let newValue = Watcher.computeExpression(this.exp, this.scope);
    Dep.target = null;
    return newValue;
  }

  /**
   * 回调函数的调用
   */
  update() {
    let newValue = this.get()
    this.callback && this.callback(newValue)
  }

  static computeExpression(exp: string, scope: object) {
    // 创建函数
    // 把scope当作作用域
    // 函数内部使用with来指定作用域
    // 执行函数, 得到表达式的值
    let fn = new Function('scope', "with(scope){return " + exp + "}");
    return fn(scope);
  }
}