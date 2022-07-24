import { describe, test, expect } from "@jest/globals";
import Vue from "../src/index"


describe("global test", () => {
    test("test1", () => {
        let div=document.createElement("div");
        div.setAttribute("id",'app');
        div.innerHTML=`<p>{{msg}}</p>
        <p v-text="msg"></p>
        <input type="text" v-model="msg">
        <button @click="handleClick">click</button>`;

        // let input=document.createElement('input');
        // input.setAttribute('type','text');
        // input.setAttribute('v-model','msg');

        // let button=document.createElement('button');
        // button.setAttribute('@click','handleClick');
        // //button.value='click';

        // div.appendChild(input);
        // div.appendChild(button);
        
        let vm=new Vue({
            el:'#app',
            data:{
                msg:'hello world'
            },
            methods: {
                handleClick() {
                    console.log('handleClick', this.msg);
            }
        }
        })
        expect(vm.$data).toEqual(
            {
                msg:'hello world'
            }
        );
    });
    
  });