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
    test("click is converted to touchstart in a mobile environment", () => {
        Reflect.defineProperty(window.navigator, "userAgent", {
          value: "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
          writable: true,
          enumerable: false,
          configurable: true,
        });
        expect(() => {
          const view = document.createElement("div");
          view.setAttribute('id','app')
          view.innerHTML = "<div @click='show'><div>";
          new Vue({
            el:'#app',
            data: {},
            methods:{}
          });
        }).not.toThrowError();
      });
    test("throw the error correctly when Select v-model is it an array according to the attribute 'multi'", () => {
        expect(() => {
          const view = document.createElement("div");
          view.setAttribute('id','app')
          view.innerHTML = "<select v-model='fruit'></select>";
          new Vue({
            el:"",
            data: {
              fruit: [],
            },
            methods:{}
          });
        }).toThrowError();
      });
  });