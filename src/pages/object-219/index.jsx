import React from 'react'

export default function () {
  return (
    <div></div>
  )
}

//1.属性的简洁表示法
//ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。
// const foo = 'bar'
// const baz = {foo}
 // baz {foo: "bar"}

//等同于
//const baz = {foo: foo}

//console.log(baz)

//上面代码中，变量foo直接写在大括号里面。这时，属性名就是变量名, 属性值就是变量值。

// function f (x, y) {
//   return {x, y}
// }
//等同于

// function f (x, y) {
//   return {x: x, y: y}
// }
//console.log(f(1,2)) // {x: 1, y: 2}

//除了属性简写，方法也可以简写。

// const obj = {
//   method () {
//     return "Hello"
//   }
// }
//等同行与

// const obj = {
//   method: function () {
//     return "Hello"
//   }
// }

//console.log(obj.method())

//下面是一个实际的例子。
// const birth = '2000/01/01'
// const Person = {
//   name: '张三',
//   birth, 
//   method () {
//     console.log(`我的名字是${this.name},生日是${this.birth}`)
//   }
// }
// Person.method()


//这种写法用于函数的返回值，将会非常方便。

// function getPoint () {
//   const x = 1
//   const y = 10
//   return {x, y}
// }

// console.log(getPoint()) // {x:1, y:10}

//CommonJS 模块输出一组变量，就非常合适使用简洁写法。

// let ms = {}

// function getItem (key) {
//   return key in ms ? ms[key] : null
// }

// function setItem (key, value) {
//   ms[key] = value
// }

// function clear () {
//   ms = {}
// }

// module.exports = { getItem, setItem, clear }
// // 等同于
// module.exports = {
//   getItem: getItem,
//   setItem: setItem,
//   clear: clear
// }

//注意，简写的对象方法不能用作构造函数，会报错。

// const obj = {
//   f () {
//     this.foo = 'bar'
//   }
// }

// new obj.f() // 报错
//上面代码中，f是一个简写的对象方法，所以obj.f不能当作构造函数使用。



//2.属性名表达式

//JavaScript 定义对象的属性，有两种方法。
//const obj = {}
// 方法一
//obj.foo = true

// 方法二
//obj['a' + 'bc'] = 123

//console.log(obj) //{foo: true, abc: 123}

//上面代码的方法一是直接用标识符作为属性名，
//方法二是用表达式作为属性名，这时要将表达式放在方括号之内。

//如果使用字面量方式定义对象（使用大括号），在 ES5 中只能使用方法一（标识符）定义属性。

// const obj = {
//   foo: true,
//   abc: 123
// }

//ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。

// const propKey = 'foo';
// const obj = {
//   [propKey]: true,
//   ['a' + 'bc']: 123
// }

//下面是另一个例子。
// let lastWord = 'last word';

// const a = {
//   'first word': 'hello',
//   [lastWord]: 'world',
//   first: '123',
// }

// console.log(a['first word']) // "hello"
// console.log(a[lastWord]) // "world"
// console.log(a['last word']) // "world"
// console.log(a.first) //123
//console.log(a)

//表达式还可以用于定义方法名。

// let obj = {
//   ['h' + 'ello']() {
//     return 'hi';
//   }
// }

// console.log(obj.hello()) // hi

//注意，属性名表达式与简洁表示法，不能同时使用，会报错。

// 报错
// const foo = 'bar'
// const baz = { [foo] }

// 正确
// const foo = 'bar'
// const baz = { [foo]: 'abc' }
// console.log(baz)

//注意，属性名表达式如果是一个对象，
//默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
// const keyA = 'abc'
// const keyB = {b: 2}

// const myObject = {
//   [keyA]: 'valueA',
//   [keyB]: 'valueB'
// }

// console.log(myObject) // Object {[object Object]: "valueB"}

//6.对象的扩展运算符
//对象的解构赋值用于从一个对象取值，
//相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，
//分配到指定的对象上面。所有的键和它们的值，都会拷贝到新对象上面。

// const { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 }
// console.log(x) // 1
// console.log(y) // 2
// console.log(z) // { a: 3, b: 4 }


//上面代码中，变量z是解构赋值所在的对象。
//它获取等号右边的所有尚未读取的键（a和b），将它们连同值一起拷贝过来。

//由于解构赋值要求等号右边是一个对象，
//所以如果等号右边是undefined或null，就会报错，因为它们无法转为对象。
//const { ...z } = null // 运行时错误
//const { ...z } = undefined // 运行时错误


//解构赋值必须是最后一个参数，否则会报错。

// const { ...x, y, z } = someObject; // 句法错误
// const { x, ...y, ...z } = someObject; // 句法错误

//注意，解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、
//那么解构赋值拷贝的是这个值的引用，而不是这个值的副本。

// let obj = { a: { b: 1 } }
// let { ...x } = obj
// console.log(x.a.b) //1
// obj.a.b = 2
// console.log(x.a.b) // 2

//另外，扩展运算符的解构赋值，不能复制继承自原型对象的属性。
// let o1 = { a: 1 }
// let o2 = { b: 2 }

// o2.__proto__ = o1
// console.log(o2)
// let { ...o3 } = o2
// console.log(o3) // { b: 2 }
// console.log(o3.a) // undefined

// const o = Object.create({ x: 1, y: 2 }) //属性是在原型上的
// o.z = 3

// let { x, ...newObj } = o
// let { y, z } = newObj
// console.log(o)
// console.log(newObj)
// console.log(x) // 1
// console.log(y) // undefined
// console.log(z) // 3

//const { x, ...{ y, z } } = o; //报错
// SyntaxError: ... must be followed by an identifier in declaration contexts

//解构赋值的一个用处，是扩展某个函数的参数，引入其他操作。

// function baseFunction({ a, b }) {
//   // ...
// }

// function wrapperFunction({ x, y, ...restConfig }) {
//   // 使用 x 和 y 参数进行操作
//   // 其余参数传给原始函数
//   return baseFunction(restConfig);
// }

//上面代码中，原始函数baseFunction接受a和b作为参数，
//函数wrapperFunction在baseFunction的基础上进行了扩展，
//能够接受多余的参数，并且保留原始函数的行为。



// var obj = {   //原数据，包含字符串、对象、函数、数组等不同的类型
//   name:"test",
//   main:{
//       a:1,
//       b:2
//   },
//   fn:function(){
      
//   },
//    friends:[1,2,3,[22,33]]
// }

// function copy(obj){
//    let newobj = null;   //声明一个变量用来储存拷贝之后的内容
   
// //判断数据类型是否是复杂类型，如果是则调用自己，再次循环，如果不是，直接赋值即可，
// //由于null不可以循环但类型又是object，所以这个需要对null进行判断
//    if(typeof(obj) == 'object' && obj !== null){ 
   
// //声明一个变量用以储存拷贝出来的值,根据参数的具体数据类型声明不同的类型来储存
//        newobj = obj instanceof Array? [] : {};   
       
// //循环obj 中的每一项，如果里面还有复杂数据类型，则直接利用递归再次调用copy函数
//        for(var i in obj){  
//            newobj[i] = copy(obj[i])
//        }
//    }else{
//        newobj = obj
//    }    
//  return newobj;    //函数必须有返回值，否则结构为undefined
// }

// var obj2 = copy(obj)
// obj2.name = '修改成功'
// obj2.main.a = 100
// console.log(obj,obj2)

class Fruit {
  constructor (name) {
    this.type = '水果'
    this.effect = '可以吃'
    this.name = name
  }
  method () {
    console.log(this.type, this.effect, this.name)
  }
}
const obj = {
  type: '111',
  effect: 'abc'
}
const f1 = new Fruit()
f1.method.call(obj)
const f2 = new Fruit('苹果')
f2.method()


class Apple extends Fruit {
  constructor (name) {
    super()
    this.name = name
  }
  method () {
    console.log(this.type, this.effect, this.name)
  }
}
const a1 = new Apple('苹果')
console.log(a1)