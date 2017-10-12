# 一个简单的模板引擎simpleT
## 模板语法  
- 插值  
```js
let tpl = `
    <p>{{this.name}}</p>
`
let data = {
    name: zst
}
```
- 判断语句  
```js
let tpl = `
    {{if this.isShow]}}
    <p>test</p>
    {{/}}
`
let data = {
    isShow: true
}
```
- 循环  
```js
let tpl = `
    {{# this.array}}
    <a>{{value}}</a>
    {{/}}
`
// 循环代码块中必须用value表示被遍历的元素
let data = {
    array: ['1', '2', '3']
}
```
## 如何使用  
```js
// 引入simpleT.js
import simpleT from './build/simpleT';
let tpl = `
    <h1>{{this.name}}</h1>
    {{if(this.isAdd)}}
    <p>xxx</p>
    {{/if}}
    <p>{{this.title}}222</p>
    {{#this.list}}
    <a>{{val}}</a>
    {{/}}
    <p>over</p>
`
let data = {
    name: 'test',
    isAdd: true,
    title: 'simpleT',
    list: [
        'a',
        'b'
    ]
}
let htmlStr = simpleT(tpl)(data);
```
