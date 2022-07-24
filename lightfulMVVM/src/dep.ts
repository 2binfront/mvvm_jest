export default class Dep {
    subs: {};
    static target: { uid: number; };
    constructor() {
      // 存放所有watcher
      this.subs= {};
    }
  
    addSub(target: { uid: number; }) {
      this.subs[target.uid] = target;
    } 
  
    notify() {
      for(let uid in this.subs) {
        this.subs[uid].update()
      }
    }
  }