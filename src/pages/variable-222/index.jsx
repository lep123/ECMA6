import React from 'react'
import { Button } from "antd";
export default function () {
  return <div>变量的解构赋值 <Button type="danger">1111</Button></div>
}
//以前，为变量赋值，只能直接指定值。

// let a = 1
// let b = 2
// let c = 3

//ES6 允许写成下面这样。

//let [a, b, c] = [1, 2, 3]

// 这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。
// 下面是一些使用嵌套数组进行解构的例子。

// let [foo] = [];
// let [bar, foo] = [1];
// 以上两种情况都属于解构不成功，foo的值都会等于undefined。

//另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。
//这种情况下，解构依然可以成功。

// let [x, y] = [1, 2, 3];
// x // 1
// y // 2

//如果等号的右边不是数组或者严格地说，不是可遍历的结构，那么将会报错。
// 报错
// let [foo] = 1;
// let [foo] = false;
// let [foo] = NaN;
// let [foo] = undefined;
// let [foo] = null;
// let [foo] = {}

//对于 Set 结构，也可以使用数组的解构赋值。

//let [x, y, z] = new Set(['a', 'b', 'c']);
//x // "a"

// 默认值
// 解构赋值允许指定默认值。

// let [foo = true] = []
// foo // true

//注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
//所以，只有当一个数组成员严格等于undefined，默认值才会生效。

// let [x = 1] = [undefined]
// x // 1

// let [x = 1] = [null]
// x // null
//上面代码中，如果一个数组成员是null，默认值就不会生效，因为null不严格等于undefined。


//如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
// function f() {
//   console.log('aaa')
// }
// let [x = f()] = [1]
//上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码。

//默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

// let [x = 1, y = x] = [];     // x=1; y=1
// let [x = 1, y = x] = [2];    // x=2; y=2
// let [x = 1, y = x] = [1, 2]; // x=1; y=2
// let [x = y, y = 1] = [];     // ReferenceError: y is not defined
//上面最后一个表达式之所以会报错，是因为x用y做默认值时，y还没有声明。

//对象的解构赋值

//解构不仅可以用于数组，还可以用于对象。

// let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
// foo // "aaa"
// bar // "bbb"

// 对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；
// 而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

// let { baz } = { foo: 'aaa', bar: 'bbb' };
// baz // undefined

// 例一
//let { log, sin, cos } = Math;

// 例二
// const { log } = console
// log('hello') // hello

//如果变量名与属性名不一致，必须写成下面这样。

// let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// console.log(baz) // "aaa"


// let obj = { first: 'hello', last: 'world' };
// let { first: f, last: l } = obj;
// f // 'hello'
// l // 'world'

// let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' }

//也就是说，对象的解构赋值的内部机制，是先找到同名属性，
//然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

//let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
//baz // "aaa"
//foo // error: foo is not defined
//上面代码中，foo是匹配的模式，baz才是变量。真正被赋值的是变量baz，而不是模式foo。

// 默认值
// 对象的解构也可以指定默认值。

// const {x = 3} = {}
// console.log(x) // 3

// const {x, y = 5} = {x: 1}
// console.log(x) // 1
// console.log(y) // 5

//默认值生效的条件是，对象的属性值严格等于undefined。

// const {x = 3} = {x: undefined};
// x // 3

// const {x = 3} = {x: null};
// x // null

//(1）如果要将一个已经声明的变量用于解构赋值，必须非常小心。
// 错误的写法
let x
console.log(x)
let y
console.log(y)
// SyntaxError: syntax error
