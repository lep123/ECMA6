import React from 'react'
import axios from 'axios'

export default function () {
  return <div>function</div>
}

//1函数参数的默认值
//ES6 之前，不能直接为函数的参数指定默认值，只能采用变通的方法。
// function log(x, y) {
//   y = y || 'World'
//   console.log(x, y)
// }

// log('Hello') // Hello World
// log('Hello', 'China') // Hello China
// log('Hello', '') // Hello World

//上面代码检查函数log的参数y有没有赋值，
//如果没有，则指定默认值为World。这种写法的缺点在于，
//如果参数y赋值了，但是对应的布尔值为false，则该赋值不起作用。
//就像上面代码的最后一行，参数y等于空字符，结果被改为默认值。

//为了避免这个问题，通常需要先判断一下参数y是否被赋值，如果没有，再等于默认值。

// if (typeof y === 'undefined') {
//   y = 'World'
// }

//ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。

// function log(x, y = 'World') {
//   console.log(x, y)
// }

// log('Hello') // Hello World
// log('Hello', 'China') // Hello China
// log('Hello', '') // Hello


// function Point(x = 0, y = 0) {
//   this.x = x
//   this.y = y
// }

// const p = new Point()
// p // { x: 0, y: 0 }

// 首先，阅读代码的人，可以立刻意识到哪些参数是可以省略的，
// 不用查看函数体或文档；其次，有利于将来的代码优化，
// 即使未来的版本在对外接口中，彻底拿掉这个参数，也不会导致以前的代码无法运行。

//参数变量是默认声明的，所以不能用let或const再次声明。

// function foo(x = 5) {
//   let x = 1 // error
//   const x = 2 // error
// }
//上面代码中，参数变量x是默认声明的，在函数体中，不能用let或const再次声明，否则会报错。

//使用参数默认值时，函数不能有同名参数。

// // 不报错
// function foo(x, x, y) {
//   // ...
// }

// // 报错
// function foo(x, x, y = 1) {
//   // ...
// }
// // SyntaxError: Duplicate parameter name not allowed in this context

//一个容易忽略的地方是，参数默认值不是传值的，
//而是每次都重新计算默认值表达式的值。也就是说，参数默认值是惰性求值的。

// let x = 99
// function foo(p = x + 1) {
//   console.log(p);
// }

// foo() // 100

// x = 100;
// foo() // 101
//上面代码中，参数p的默认值是x + 1。
//这时，每次调用函数foo，都会重新计算x + 1，而不是默认p等于 100。

//与解构赋值结合使用

// function foo({x, y = 5}) {
//   console.log(x, y)
// }

// foo({}) // undefined 5
// foo({x: 1}) // 1 5
// foo({x: 1, y: 2}) // 1 2
// foo() // TypeError: Cannot read property 'x' of undefined

// 上面代码只使用了对象的解构赋值默认值，没有使用函数参数的默认值。
// 只有当函数foo的参数是一个对象时，变量x和y才会通过解构赋值生成。
// 如果函数foo调用时没提供参数，变量x和y就不会生成，从而报错。
// 通过提供函数参数的默认值，就可以避免这种情况。

// function foo({x, y = 5} = {}) {
//   console.log(x, y)
// }

// foo() // undefined 5
// //上面代码指定，如果没有提供参数，函数foo的参数默认为一个空对象。

// function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
//   console.log(method);
// }

// fetch('http://example.com', {})
// // "GET"

// fetch('http://example.com')
// // "GET"


// // 写法一
// function m1({x = 0, y = 0} = {}) {
//   return [x, y];
// }

// // 写法二
// function m2({x, y} = { x: 0, y: 0 }) {
//   return [x, y];
// }

// 上面两种写法都对函数的参数设定了默认值，
// 区别是写法一函数参数的默认值是空对象，
// 但是设置了对象解构赋值的默认值；
// 写法二函数参数的默认值是一个有具体属性的对象，但是没有设置对象解构赋值的默认值。

// // 函数没有参数的情况
// m1() // [0, 0]
// m2() // [0, 0]

// // x 和 y 都有值的情况
// m1({x: 3, y: 8}) // [3, 8]
// m2({x: 3, y: 8}) // [3, 8]

// // x 有值，y 无值的情况
// m1({x: 3}) // [3, 0]
// m2({x: 3}) // [3, undefined]

// // x 和 y 都无值的情况
// m1({}) // [0, 0];
// m2({}) // [undefined, undefined]

// m1({z: 3}) // [0, 0]
// m2({z: 3}) // [undefined, undefined]

//参数默认值的位置
// 通常情况下，定义了默认值的参数，应该是函数的尾参数。
// 因为这样比较容易看出来，到底省略了哪些参数。
// 如果非尾部的参数设置默认值，实际上这个参数是没法省略的。

// function f(x = 1, y) {
//   return [x, y];
// }

// f() // [1, undefined]
// f(2) // [2, undefined])
// f(, 1) // 报错
// f(undefined, 1) // [1, 1]

//函数的length 属性
//指定了默认值以后，函数的length属性，将返回没有指定默认值的参数个数。
//也就是说，指定了默认值后，length属性将失真。

// (function (a) {}).length // 1
// (function (a = 5) {}).length // 0
// (function (a, b, c = 5) {}).length // 2

//如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。

// (function (a = 0, b, c) {}).length // 0
// (function (a, b = 1, c) {}).length // 1

//作用域

// 一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。
// 等到初始化结束，这个作用域就会消失。
// 这种语法行为，在不设置参数默认值时，是不会出现的。

// var x = 1;

// function f(x, y = x) {
//   console.log(y);
// }

// f(2) // 2

// 上面代码中，参数y的默认值等于变量x。
// 调用函数f时，参数形成一个单独的作用域。
// 在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

//利用参数默认值，可以指定某一个参数不得省略，如果省略就抛出一个错误

// function throwIfMissing() {
//   throw new Error('Missing parameter');
// }

// function foo(mustBeProvided = throwIfMissing()) {
//   return mustBeProvided;
// }

// foo()
// // Error: Missing parameter

//从上面代码还可以看到，
//参数mustBeProvided的默认值等于throwIfMissing函数的运行结果
//（注意函数名throwIfMissing之后有一对圆括号），
//这表明参数的默认值不是在定义时执行，而是在运行时执行。如果参数已经赋值，默认值中的函数就不会运行。

//另外，可以将参数默认值设为undefined，表明这个参数是可以省略的。

//function foo(optional = undefined) { }

//2. rest 参数
// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，
// 这样就不需要使用arguments对象了。
// rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
// function add(...values) {
//   let sum = 0

//   for (let val of values) {
//     sum += val
//   }

//   return sum;
// }

// add(2, 5, 3) // 10
//上面代码的add函数是一个求和函数，利用 rest 参数，可以向该函数传入任意数目的参数。

//注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

// // 报错
// function f(a, ...b, c) {
//  
// }

//函数的length属性，不包括 rest 参数。

// (function(a) {}).length  // 1
// (function(...a) {}).length  // 0
// (function(a, ...b) {}).length  // 1


//3.严格模式
//从 ES5 开始，函数内部可以设定为严格模式。
// function doSomething(a, b) {
//   'use strict'
//   // code
// }

// ES2016 做了一点修改，
// 规定只要函数参数使用了默认值、解构赋值、或者扩展运算符，
// 那么函数内部就不能显式设定为严格模式，否则会报错。

// 报错
// function doSomething(a, b = a) {
//   'use strict';
//   // code
// }

// 报错
// const doSomething = function ({a, b}) {
//   'use strict';
//   // code
// }

// 报错
// const doSomething = (...a) => {
//   'use strict';
//   // code
// }

// const obj = {
//   // 报错
//   doSomething({a, b}) {
//     'use strict'
//     // code
//   }
// }

//两种方法可以规避这种限制。第一种是设定全局性的严格模式，这是合法的。

// 'use strict'

// function doSomething(a, b = a) {
//   // code
// }

//第二种是把函数包在一个无参数的立即执行函数里面。

// const doSomething = (function () {
//   'use strict'
//   return function(value = 42) {
//     return value
//   }
// }())

//5.箭头函数
//ES6 允许使用“箭头”（=>）定义函数。

// const f = v => v;

// // 等同于
// const f = function (v) {
//   return v
// }

//如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。
// const f = () => 5
// // 等同于
// const f = function () { return 5 }

//如果箭头函数的代码块部分多于一条语句，就要使用大括号将它们括起来，并且使用return语句返回。
//const sum = (num1, num2) => { return num1 + num2 }

//由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错。
// const getTempItem = id => ({ id: id, name: "Temp" })

//下面是一种特殊情况，虽然可以运行，但会得到错误的结果。
// const foo = () => { a: 1 };
// foo() // undefined

//箭头函数可以与变量解构结合使用。

// const full = ({ first, last }) => first + ' ' + last

// // 等同于
// function full (person) {
//   return person.first + ' ' + person.last
// }

//使用注意点
// （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

// （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

// （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。

// （4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。


//上面四点中，第一点尤其值得注意。this对象的指向是可变的，但是在箭头函数中，它是固定的。

// function foo() {
//   setTimeout(() => {
//     console.log('id:', this.id)
//   }, 100);
// }

// var id = 21;

// foo.call({ id: 42 })
// id: 42

// 上面代码中，setTimeout的参数是一个箭头函数，
// 这个箭头函数的定义生效是在foo函数生成时，而它的真正执行要等到 100 毫秒后。
// 如果是普通函数，执行时this应该指向全局对象window，这时应该输出21。
// 但是，箭头函数导致this总是指向函数定义生效时所在的对象（本例是{id: 42}），所以输出的是42。


// 箭头函数可以让setTimeout里面的this，
// 绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。

// function Timer() {
//   this.s1 = 0
//   this.s2 = 0
//   // 箭头函数
//   setInterval(() => this.s1++, 1000)
//   // 普通函数
//   setInterval(function () {
//     console.log(this) //this指向 window
//     this.s2++
//   }, 1000)
// }

// var timer = new Timer()

// setTimeout(() => console.log('s1: ', timer.s1), 3100)
// setTimeout(() => console.log('s2: ', timer.s2), 3100)
// s1: 3
// s2: 0
// 上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。
// 前者的this绑定定义时所在的作用域（即Timer函数），
// 后者的this指向运行时所在的作用域（即全局对象）。
// 所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。

//箭头函数可以让this指向固定化，
//这种特性很有利于封装回调函数。
//下面是一个例子，DOM 事件的回调函数封装在一个对象里面。

// const handler = {
//   id: '123456',

//   init () {
//     document.addEventListener('click',
//       event => this.doSomething(event.type), false);
//   },

//   doSomething (type) {
//     console.log('Handling ' + type  + ' for ' + this.id);
//   }
// }

// 上面代码的init方法中，使用了箭头函数，这导致这个箭头函数里面的this，总是指向handler对象。
// 否则，回调函数运行时，this.doSomething这一行会报错，因为此时this指向document对象。

// this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，
// 导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
//由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

//不合适场景
//由于箭头函数使得this从“动态”变成“静态”，下面两个场合不应该使用箭头函数。

//第一个场合是定义对象的方法，且该方法内部包括this。
// const cat = {
//   lives: 9,
//   jumps: () => {
//     this.lives--
//   }
// }
// 上面代码中，cat.jumps()方法是一个箭头函数，
// 这是错误的。调用cat.jumps()时，
// 如果是普通函数，该方法内部的this指向cat；
// 如果写成上面那样的箭头函数，使得this指向全局对象，因此不会得到预期结果。
// 这是因为对象不构成单独的作用域，导致jumps箭头函数定义时的作用域就是全局作用域。

//第二个场合是需要动态this的时候，也不应使用箭头函数。
// const button = document.getElementById('press')
// button.addEventListener('click', () => {
//   this.classList.toggle('on')
// })
// 上面代码运行时，点击按钮会报错，因为button的监听函数是一个箭头函数，
// 导致里面的this就是全局对象。如果改成普通函数，this就会动态指向被点击的按钮对象。

// 另外，如果函数体很复杂，有许多行，或者函数内部有大量的读写操作，
// 不单纯是为了计算值，这时也不应该使用箭头函数，而是要使用普通函数，这样可以提高代码可读性。

//7.尾部参数的尾逗号
//ES2017 允许函数的最后一个参数有尾逗号（trailing comma）。
//此前，函数定义和调用时，都不允许最后一个参数后面出现逗号。
// function clownsEverywhere(
//   param1,
//   param2
// ) { /* ... */ }

// clownsEverywhere(
//   'foo',
//   'bar'
// )
//上面代码中，如果在param2或bar后面加一个逗号，就会报错。

// 如果像上面这样，将参数写成多行（即每个参数占据一行），
// 以后修改代码的时候，想为函数clownsEverywhere添加第三个参数，
// 或者调整参数的次序，就势必要在原来最后一个参数后面添加一个逗号。
// 这对于版本管理系统来说，就会显示添加逗号的那一行也发生了变动。
// 这看上去有点冗余，因此新的语法允许定义和调用时，尾部直接有一个逗号。

// function clownsEverywhere(
//   param1,
//   param2,
// ) { /* ... */ }

// clownsEverywhere(
//   'foo',
//   'bar',
// )
// 这样的规定也使得，函数参数与数组和对象的尾逗号规则，保持一致了。