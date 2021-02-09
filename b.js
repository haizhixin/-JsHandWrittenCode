

export var foo = 'bar';
setTimeout(function(){
  foo = "baz"
},1000)
console.log(foo,"b.js")

import * as circle from './circle'

//下面两行都是不允许的
circle.foo = 'hello';
circle.area = function () {}

//第一组 
export default === import;
export === import {}


export {add as default}
import {default as foo} from 'modules'
import foo from 'modules'
// 一个模块只能有一个默认输出

