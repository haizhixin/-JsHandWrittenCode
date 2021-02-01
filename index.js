/**
 * 开发环境优化方式
 * 
 * 1,关闭hash
 * 2,关闭压缩
 * 3,多线程打包thread loader
 * 4,使用缓存 cache-loader hard-source-webpack-plugin
 * 5,如果使用source-map 使用eval-cheap-source-map
 * 
 * 优化webpack的构建速度
 * 
 * 
 * 
 * 异步执行的执行机制
 * 
 * 1,同步任务在主线程上执行,主线程之外有一个任务队列
 * 2,当异步任务有了结果后,就会往任务队列中放入一个任务
 * 3,当主线程上的执行栈为空时,就会去任务队列的队头取出一个任务执行,主线程不断循环此过程,直到浏览器关闭这就是事件循环
 * 
 * 事件循环
 * 首先修改数据,同步任务，同一事件循环的所有同步任务都在主线程上执行,形成一个执行栈此时还没有涉及DOM
 * 
 * Vue开启一个异步队列,并缓冲在此事件循环中发生的所有数据改变 如果同一个watcher被多次触发，只会被推入到队列中一次
 * 
 * 同步任务执行完毕 开始执行异步watcher队列任务 更新DOM Vue在尝试对异步对列使用原生的Promise.then和MessageChannel方法如果执行环境不支持会采用setTimeout(fn,0)代替
 * 
 * 此时通过Vue.nextTick获取到改变后的DOM 通过setTimeout(fn,0)也可以同样获取到
 * 
 * function defineReactive(target) {
 *   if(typeof !=="object"||target===null){
 *     return target 
 *   }
 * 
 *   const handler = {
 *     get(target,property,receiver) {
 *      return Reflect.get(target,property,receiver);
 *    }
 *    set(target,property,value) {
 *       if(value !==taget[property]){
 *        renderView()
 *       }
 *      return Reflect.set(target,property,value)
 *    }
 *    return new Proxy(target,handler)
 *   }
 * }
 *
    const original = arraryProto[method];
 * def(arrayMethods,method,function mutator(...args){
      const result = original.apply(this,args)
      const ob = this._ob_;
       let inserted;
       if(inserted){
           ob.observeArray(inserted)
       }
       ob.dep.notify()
       return result
 * })
    介绍 Vue template到render的过程

 * 1. Vue在模板编译版本的源码中会执行compileToFunctions 将template转化为render函数
    
    const {render,staticRender} = compileToFunctions(template)
    compileToFunctions中的主要逻辑
    1,调用parse方法将template转化为ast抽象语法树
    const ast = parse(template.trim(),options)
    parse目标 是把template转换为AST树它是一种用JavaScript对象的形式来描述整个模板 
    解析过程:利用正则表达式 顺序解析模板 当解析到开始标签 闭合标签 文本的时候都会分别执行对应的回调函数 来达到构造AST树的目的
 * AST的元素节点总共三种类型 type为1表示普通元素 2为
    2.对静态节点做优化
     optimize(ast,options)
     分析出那些是静态节点给其打一个标记 为后续更新渲染可以直接跳过静态节点做优化
 * 深度遍历AST查看每个子树的节点元素是否为静态节点或者静态根节点
 静态节点DOM永远不会改变 这对运行时模板更新起到了极大的优化作用
 * 3.生成代码
   const code = generate(ast,options)
   generate将ast抽象语法树编译成render字符串 并将静态部分放到staticRenderFns中 
   最后通过new Function(code)生成渲染函数
 *
 
 import和export是静态的模块导入导出语法 因此可以静态分析 所以可以使用treeshaking
 tree shaking 不支持动态导入 如CommonJs中的require()语法 只支持静态的导入ES6的import/export

 packjson中手动指定 副作用的代码 sideEffects

 初始化参数 开始编译 确定入口 编译模块 完成模块编译 输出资源 输出完成
 */

//抽取第三方模块
modules.exports = {
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            chunks: 'all', //全部模块入口
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: 1,
                },
                common: {
                    test: /[\\/]src[\\/]/,
                    name: "common",
                    minChunks: 3, //复用指定引用次数的组件
                    priority: -10,
                    reuseExistingChunk: true
                }
            },
        }
    }
}