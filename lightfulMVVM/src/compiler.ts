import Watcher from "./watcher";

// 进行模板编译
export default class Compiler {
  $el: DocumentFragment;
  context: object;
  $fragment: DocumentFragment;


  constructor(context) {
    this.$el = context.$el;
    this.context = context;
    if (this.$el) {
      // 把dom转成文档片段
      this.$fragment = this.nodeToFragment(this.$el)
      console.log(this.$fragment)
      // 编译模板
      this.compiler(this.$fragment)

      //  把文档添加到页面中
      this.$el.appendChild(this.$fragment)
    }
  }


  /**
   * 把所有元素转成文档片段
   * @param {*} node 
   */
   nodeToFragment(node){
    let fragment = document.createDocumentFragment()
    if (node.childNodes && node.childNodes.length) {
      node.childNodes.forEach(child => {
        // 判断需要的节点
        // 注释或者无用的换行，不添加
        if (!this.ignorable(child)) {
          fragment.appendChild(child);
        }
      })
    }
    return fragment;
}

    /**
     * 忽略不添加的节点
     * @param node 
     */
     ignorable(node) {
        //正则匹配
        const reg = /^[\t\n\r]+/;
        return (//nodeType为3或8时为文本和注释
        node.nodeType === 8 || (node.nodeType === 3 && reg.test(node.textContent))
        )
    }

    /**
     * 模板编译
     * @param node 
     */
     compiler(node){
        if (node.childNodes && node.childNodes.length) {
            node.childNodes.forEach(child => {
                //1 => element
              if (child.nodeType === 1) {
                this.compilerElementNode(child);
                //3 => text
              } else if (child.nodeType === 3) {
                this.compilerTextNode(child);
              }
            })
          }
    }


    /**
     * 编译元素节点
     * @param {*} node 
     */
     compilerElementNode(node) {
        let that = this;
        let attrs = [...node.attributes];
        attrs.forEach(attr => {
        //解构赋值
          let { name: attrName, value: attrValue } = attr;
        //v- 开头的是特殊属性
          if (attrName.indexOf('v-') === 0) {
            let dirName = attrName.slice(2)
            switch (dirName) {
            
            //单向绑定
              case 'text':
                new Watcher(attrValue, this.context, newValue => {
                  node.textContent = newValue;
                })
                break;

            //双向绑定
              case 'model':
                new Watcher(attrValue, this.context, newValue => {
                  node.value = newValue
                })
                node.addEventListener('input', e => {
                  that.context[attrValue] = e.target.value
                }) 
                break;
            }
          }
          if(attrName.indexOf('@') === 0){
            this.compilerMethods(this.context, node, attrName, attrValue)
          }
        })
        this.compiler(node);// 递归
      }

  /**
   * 函数编译
   * @param {*} scope 
   * @param {*} node 
   * @param {*} attrName 
   * @param {*} attrValue 
   */
   compilerMethods(scope: object, node: { addEventListener: (arg0: any, arg1: any) => void; }, attrName: string[], attrValue: string | number){
    //获取类型
    let type = attrName.slice(1);

    let fn = scope[attrValue];
    node.addEventListener(type, fn.bind(scope));
  }

  /**
   * 编译文本节点
   * @param {*} node 
   */
   compilerTextNode(node: { textContent: string; }) {
    let text = node.textContent.trim()
    if (text) {
      // 把text字符串，转换为表达式
      let exp = this.parseText(text)
      // 
      console.log(exp)
      //添加订阅者，计算表达式的值
      // 当表达式依赖的值发生变化时
      // 1.重新计算表达式的值
      // 2.node.textContent赋新值
      // 即可完成Model => View 的响应式
      new Watcher(exp, this.context, newValue => {
        node.textContent = newValue;
      })
    }
  }

  /**
   * 完成文本向表达式的转化
   * text{{msg + 'text'}}
   * "text"+msg+"text"
   * 
   * @param text 
   */
   parseText(text: string) {
    //正则匹配
        const reg = /\{\{(.+?)\}\}/g;
        //分割插值表达式
        let pices = text.split(reg);
        
        //console.log(pices);

        //匹配插值表达式
        let matches = text.match(reg);

        //console.log(matches);
        //表达式数组
        let tokens = [];
        pices.forEach(item => {
        if (matches && matches.indexOf("{{" + item + "}}") > -1) {
            tokens.push("(" + item + ")")
        } else {
            tokens.push('`' + item + '`')
        }
        });
        return tokens.join('+');
    }
}