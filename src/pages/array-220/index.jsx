import React from 'react'

export default function () {
  return (
    <div>array</div>
  )
}
//1.扩展运算符
//扩展运算符(spread) 是三个点(...) 好比rest参数的逆运算 将一个数组转为用逗号分隔的参数序列
//console.log(...[1, 2, 3])
// 1 2 3

//console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5


//该运算符主要用于函数调用。

// function add(x, y) {
//   return x + y
// }

// const numbers = [4, 38]

// add(...numbers) // 42

//扩展运算符与正常的函数参数可以结合使用，非常灵活。

// function f(v, w, x, y, z) { }
// const args = [0, 1]
// f(-1, ...args, 2, ...[3])

//扩展运算符后面还可以放置表达式。
// const x = 0
// const arr = [
//   ...(x > 0 ? ['a'] : []),
//   'b',
// ]
// console.log(arr)

//如果扩展运算符后面是一个空数组，则不产生任何效果。
//console.log([...[], 1])

//注意，只有函数调用时，扩展运算符才可以放在圆括号中，否则会报错。

//console.log((...[1, 2]))
// Uncaught SyntaxError: Unexpected number

//console.log(...[1, 2])
// 1 2

//上面三种情况，扩展运算符都放在圆括号里面，
//但是前两种情况会报错，因为扩展运算符所在的括号不是函数调用。

//可以替代apply方法
//由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

// // ES5 的写法
// function f(x, y, z) {
//   // ...
// }
// var args = [0, 1, 2]
// f.apply(null, args)

// // ES6的写法
// function f(x, y, z) {
//   // ...
// }
// let args = [0, 1, 2]
// f(...args)

//下面是扩展运算符取代apply方法的一个实际的例子，
//应用Math.max方法，简化求出一个数组最大元素的写法。

// // ES5 的写法
// Math.max.apply(null, [14, 3, 77])

// // ES6 的写法
// Math.max(...[14, 3, 77])

// // 等同于
// Math.max(14, 3, 77)

//上面代码中，由于 JavaScript 不提供求数组最大元素的函数，所以只能套用Math.max函数，
//将数组转为一个参数序列，然后求最大值。
//有了扩展运算符以后，就可以直接用Math.max了。


// ES5的 写法
// var arr1 = [0, 1, 2]
// var arr2 = [3, 4, 5]
// Array.prototype.push.apply(arr1, arr2)

// ES6 的写法
// let arr1 = [0, 1, 2]
// let arr2 = [3, 4, 5]
// arr1.push(...arr2)

//上面代码的 ES5 写法中，push方法的参数不能是数组，
//所以只好通过apply方法变通使用push方法。
//有了扩展运算符，就可以直接将数组传入push方法。

//下面是另外一个例子。

// ES5
//new (Date.bind.apply(Date, [null, 2015, 1, 1]))
// ES6
//console.log(new Date(...[2015, 1, 1]))


//扩展运算符的应用
//(1)复制数组
//数组是复合的数据类型，直接复制的话，
//只是复制了指向底层数据结构的指针，而不是克隆一个全新的数组。
// const a1 = [1, 2]
// const a2 = a1

// a2[0] = 2
// a1 // [2, 2]

//上面代码中，a2并不是a1的克隆，而是指向同一份数据的另一个指针。
//修改a2，会直接导致a1的变化。

// const a1 = [1, 2]
// const a2 = a1.concat()

// a2[0] = 2
// a1 // [1, 2]

// 上面代码中，a1会返回原数组的克隆，再修改a2就不会对a1产生影响。
// 扩展运算符提供了复制数组的简便写法。

// const a1 = [1, 2]
// // 写法一
// const a2 = [...a1]
// // 写法二
// //const [...a2] = a1
// //上面的两种写法，a2都是a1的克隆。
// a1[1] = 2
// console.log(a1, a2) //[1, 2] (2) [2, 2]

//注意当引用类型的子元素也为引用类型时 用...只能拷贝一层 第二层依然拷贝的是地址

//（2）合并数组
//扩展运算符提供了数组合并的新写法。

// const arr1 = ['a', 'b']
// const arr2 = ['c']
// const arr3 = ['d', 'e']

// // ES5 的合并数组
// arr1.concat(arr2, arr3);
// // [ 'a', 'b', 'c', 'd', 'e' ]

// // ES6 的合并数组
// [...arr1, ...arr2, ...arr3]
// // [ 'a', 'b', 'c', 'd', 'e' ]

//这两种方法都是浅拷贝，使用的时候需要注意。

// const a1 = [{ foo: 1 }];
// const a2 = [{ bar: 2 }];

// const a3 = a1.concat(a2);
// const a4 = [...a1, ...a2];

// a3[0] === a1[0] // true
// a4[0] === a1[0] // true
// 上面代码中，a3和a4是用两种不同方法合并而成的新数组，
// 但是它们的成员都是对原数组成员的引用，这就是浅拷贝。
// 如果修改了引用指向的值，会同步反映到新数组。


//（3）与解构赋值结合
//扩展运算符可以与解构赋值结合起来，用于生成数组。

// const [first, ...rest] = [1, 2, 3, 4, 5]
// first // 1
// rest  // [2, 3, 4, 5]

// const [first, ...rest] = []
// first // undefined
// rest  // []

// const [first, ...rest] = ["foo"]
// first  // "foo"
// rest   // []

//如果将扩展运算符用于数组赋值，只能放在参数的最后一位，否则会报错。

//const [...butLast, last] = [1, 2, 3, 4, 5];
// 报错

//const [first, ...middle, last] = [1, 2, 3, 4, 5];
// 报错

// （4）字符串
//扩展运算符还可以将字符串转为真正的数组。
//console.log([...'h ello']) //空格也占一位
// [ "h", "", "e", "l", "l", "o" ]


//数组实例的 find() 和 findIndex()

// 数组实例的find方法，用于找出第一个符合条件的数组成员。
// 它的参数是一个回调函数，所有数组成员依次执行该回调函数，
// 直到找出第一个返回值为true的成员，然后返回该成员。
// 如果没有符合条件的成员，则返回undefined。

// const n = [1, 4, -5, 10].find((n) => n < 0)
// console.log(n)// -5

// [1, 5, 10, 15].find((value, index, arr) => {
//   return value > 9
// }) // 10
//上面代码中，find方法的回调函数可以接受三个参数，依次为当前的值、当前的位置和原数组。

// 数组实例的findIndex方法的用法与find方法非常类似，
// 返回第一个符合条件的数组成员的位置，如果所有成员都不符合条件，则返回-1。

// [1, 5, 10, 15].findIndex(function(value, index, arr) {
//   return value > 9
// }) // 2

//这两个方法都可以接受第二个参数，用来绑定回调函数的this对象

// function f(v){
//   return v > this.age
// }
// const person = {name: 'John', age: 20}
// [10, 12, 26, 15].find(f, person);   // 26

//上面的代码中，find函数接收了第二个参数person对象，
//回调函数中的this对象指向person对象。

//另外，这两个方法都可以发现NaN，弥补了数组的indexOf方法的不足。

// [NaN].indexOf(NaN)
// // -1

// [NaN].findIndex(y => Object.is(NaN, y)) 
// // 0
////Object.is 比较两个值是否相等 用此方法 NaN 等于NaN

//上面代码中，indexOf方法无法识别数组的NaN成员，
//但是findIndex方法可以借助Object.is方法做到。


//数组的实例 includes()


// Array.prototype.includes方法返回一个布尔值，
// 表示某个数组是否包含给定的值，与字符串的includes方法类似。
// ES2016 引入了该方法。

// console.log([1, 2, 3].includes(2)  )   // true
// console.log([1, 2, 3].includes(4) )    // false
// console.log([1, 2, NaN].includes(NaN)) // true

// 该方法的第二个参数表示搜索的起始位置，默认为0。如果第二个参数为负数，则表示倒数的位置，
// 如果这时它大于数组长度（比如第二个参数为-4，但数组长度为3），则会重置为从0开始。
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
//console.log([1, 2, 3].includes(3, 3))  // false
//[1, 2, 3].includes(3, -1) // true

//indexOf方法有两个缺点，一是不够语义化，
//它的含义是找到参数值的第一个出现位置，所以要去比较是否不等于-1
//表达起来不够直观。二是，它内部使用严格相等运算符（===）进行判断，这会导致对NaN的误判。

//[NaN].indexOf(NaN)
// -1

//includes使用的是不一样的判断算法，就没有这个问题。

//[NaN].includes(NaN)
// true

//9.数组的实例的 flat(), flatMap()
//数组的成员有时还是数组，Array.prototype.flat()用于将嵌套的数组“拉平”，变成一维的数组。
//该方法返回一个新数组，对原数据没有影响。

//[1, 2, [3, 4]].flat()
// [1, 2, 3, 4]
//上面代码中，原数组的成员里面有一个数组，flat()方法将子数组的成员取出来，添加在原来的位置。

//flat()默认只会“拉平”一层，如果想要“拉平”多层的嵌套数组，可以将flat()方法的参数写成一个整数，表示想要拉平的层数，默认为1。

//[1, 2, [3, [4, 5]]].flat()
// [1, 2, 3, [4, 5]]

//[1, 2, [3, [4, 5]]].flat(2)
// [1, 2, 3, 4, 5]
//上面代码中，flat()的参数为2，表示要“拉平”两层的嵌套数组。

//如果不管有多少层嵌套，都要转成一维数组，可以用Infinity关键字作为参数。
//[1, [2, [3]]].flat(Infinity)
// [1, 2, 3]

//如果原数组有空位，flat()方法会跳过空位。
//[1, 2, , 4, 5].flat()
// [1, 2, 4, 5]

// flatMap()方法对原数组的每个成员执行一个函数（相当于执行Array.prototype.map()），
// 然后对返回值组成的数组执行flat()方法。
// 该方法返回一个新数组，不改变原数组。

//[2, 3, 4].flatMap((x) => [x, x * 2])
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
// [2, 4, 3, 6, 4, 8]

//flatMap()只能展开一层数组。

//flatMap()方法的参数是一个遍历函数，该函数可以接受三个参数，
//分别是当前数组成员、当前数组成员的位置（从零开始）、原数组。
// const arr = [1,2,3,4,[1]]
// arr.flatMap(function callback(currentValue, index, array) {
//   // ...
// },{})
//flatMap()方法还可以有第二个参数，用来绑定遍历函数里面的this。










