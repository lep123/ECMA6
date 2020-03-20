import axios from 'axios'
import fs from 'fs'
export default function () {
  return 'async'
}
//读取文件的方法
const readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) return reject(error)
      resolve(data)
    })
  })
}


// const gen = function* () {
  
//   const f1 = yield readFile('/etc/fstab')
//   const f2 = yield readFile('/etc/shells')
 
//   console.log(f1.toString())
//   console.log(f2.toString())
// }

//可以用async替换
const asyncReadFile = async function () {
  const f1 = await readFile('/etc/fstab')
  const f2 = await readFile('/etc/shells')
  console.log(f1.toString())
  console.log(f2.toString())
}
 
//async的优点
//(1)内置执行器。
//async函数的执行，与普通函数一模一样，只要一行。

//asyncReadFile()


//(2）更好的语义
//async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果


//（3）更广的适用性
//async函数的await命令后面，
//可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，
//但这时会自动转成立即 resolved 的 Promise 对象）

//（4）返回值是 Promise。
//async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。


//基本用法

//async函数返回一个 Promise 对象，
//可以使用then方法添加回调函数。
//当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。




// function timeout(ms) {
//   return new Promise((resolve) => {
//      setTimeout(resolve, ms)
//   })
// }

// async function asyncPrint(value, ms) {
//  await timeout(ms)
//  console.log(value)
// }

// asyncPrint('hello world', 3000)

//由于async函数返回的是 Promise 对象，可以作为await命令的参数。所以，上面的例子也可以写成下面的形式

// async function timeout(ms) {
//   await new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }

// async function asyncPrint(value, ms) {
//   await timeout(ms)
//   console.log(value)
// }

// asyncPrint('hello world', 3000)



// 函数声明
//async function foo() {}

// 函数表达式
//const foo = async function () {}

// 箭头函数
//const foo = async () => {}

// 对象的方法
//let obj = { async foo() {} }
//obj.foo().then()

// Class 的方法
// class Storage {
//   constructor() {
//     this.cachePromise = caches.open('avatars')
   
//   }
 
//   async getAvatar(name) {
//     const cache = await this.cachePromise
//     return cache.match(`/avatars/${name}.jpg`)
//   }
// }

// const storage = new Storage();
// storage.getAvatar('jake')
//   .then( res => {
//     console.log(res)
//   })


  //async函数内部return语句返回的值，会成为then方法回调函数的参数。

//   async function f() {
//     return 'hello world';
//   }
  
// f()
//   .then(v => console.log(v))

//上面代码中，函数f内部return命令返回的值，会被then方法回调函数接收到。
//async函数内部抛出错误，会导致返回的 Promise 对象变为reject状态。
//抛出的错误对象会被catch方法回调函数接收到。

// async function f() {
//   throw new Error('出错了');
// }

// f()
//   .then(v => console.log(v))
//   .catch( err => console.log(err))
    
// Error: 出错了



//async函数返回的 Promise 对象，必须等到内部所有await命令后面的 Promise 对象执行完，才会发生状态改变，
//除非遇到return语句或者抛出错误。
//只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数。

//可以把网速调慢可看出效果
const ajax = () => {
  return new Promise((resolve, reject) => {
    axios.get('https://elm.cangdu.org/v2/signout')
      .then( res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// async function fn() {
//   const aj1 = await ajax()
//   const aj2 = await ajax()

//   return 1
// }

// fn()
//   .then( res => {
//     console.log(res)
//   })



//正常情况下，await命令后面是一个 Promise 对象，返回该对象的结果。

//1.如果不是 Promise 对象，就直接返回对应的值。

// const fn = async function () {
//   return await 1
// }
// fn()
//   .then( res => {
//     console.log(res)
//   })


//2.await命令后面是一个thenable对象（即定义then方法的对象），那么await会将其等同于 Promise 对象。

//例子1
// class Sleep {
//   constructor(timeout) {
//     this.timeout = timeout
//   }
//   then(resolve, reject) {
//     const startTime = Date.now()
//     setTimeout(
//       () => resolve(Date.now() - startTime),
//       this.timeout
//     )
//   }
// }

// (async () => {
//   const sleepTime = await new Sleep(1000)
//   console.log(sleepTime)
// })()

//例子2
// class Obj {
//   then (resolve) {
//     resolve(ajax())
//   }
// }

// (async () => {
//     const res = await new Obj()
//     console.log(res)
// })()

//这个例子还演示了如何实现休眠效果。
//JavaScript 一直没有休眠的语法，但是借助await命令就可以让程序停顿指定的时间。下面给出了一个简化的sleep实现。

// function sleep(interval) {
//   return new Promise(resolve => {
//     setTimeout(resolve, interval)
//   })
// }

// // 用法
// async function one2FiveInAsync() {
//   for(let i = 1; i <= 5; i++) {
//     console.log(i)
//     await sleep(1000)
//   }
// }

// one2FiveInAsync()


//await命令后面的 Promise 对象如果变为reject状态，则reject的参数会被catch方法的回调函数接收到。

// async function f() {
//   await Promise.reject('出错了');
// }

// f()
// .then(v => console.log(v))
// .catch(e => console.log(e))
// 出错了
//!!!注意，上面代码中，await语句前面没有return，
//但是reject方法的参数依然传入了catch方法的回调函数。这里如果在await前面加上return，效果是一样的。

//任何一个await语句后面的 Promise 对象变为reject状态，那么整个async函数都会中断执行。

// async function f() {
//   await Promise.reject('出错了');
//   await Promise.resolve('hello world') // 不会执行
// }

//有时，我们希望即使前一个异步操作失败，也不要中断后面的异步操作。

// async function f() {
//   await Promise.reject('出错了')
//     .catch(e => console.log(e)) // 出错了
//   return await Promise.resolve('hello world')
// }

// f()
// .then(v => console.log(v))

// hello world


//如果await后面的异步操作出错，那么等同于async函数返回的 Promise 对象被reject。

// async function f() {
//   await new Promise(function (resolve, reject) {
//     reject('出错了')
//   })
// }

// f()
// .then(v => console.log(v))
// .catch(e => console.log(e))


//多个await命令后面的异步操作，如果不存在继发关系，最好让它们同时触发。
//放慢网速可以看出效果
// const fn = async () => {
//   const aj1 = await ajax()
//   const aj2 = await ajax()

// }
//fn()
//上面代码中，aj1和aj2是两个独立的异步操作（即互不依赖），
//被写成继发关系。这样比较耗时，因为只有aj1完成以后，才会执行aj2 ，完全可以让它们同时触发。

// 写法一
// const fn = async () => {
//   const [aj1, aj2] = await Promise.all([ajax(), ajax()])
// }
//fn()
// 写法二
// const fn = async () => {
//   const [fn1, fn2] = [ajax(), ajax()]
//   let aj1 = await fn1
//   let aj2 = await fn2
  
// }
// fn()

//第三点，await命令只能用在async函数之中，如果用在普通函数，就会报错。

// async function dbFuc(db) {
//   let docs = [{}, {}, {}]

//   // 报错
//   docs.forEach(function (doc) {
//     await ajax()
//   });
// }

//上面代码会报错，因为await用在普通函数之中了。但是，如果将forEach方法的参数改成async函数，也有问题。

// function dbFuc(db) { //这里不需要 async
//   let docs = [{}, {}, {}]

//   // 可能得到错误结果
//   docs.forEach(async function (doc) {
//     await ajax()
//   });
// }

//上面代码可能不会正常工作，原因是这时三个db.post操作将是并发执行，也就是同时执行，而不是继发执行。正确的写法是采用for循环。

// async function dbFuc(db) {
//   let docs = [{}, {}, {}]

//   for (let doc of docs) {
//     await ajax()
//   }
// }
// dbFuc()

//如果确实希望多个请求并发执行，可以使用Promise.all方法。当三个请求都会resolved时，下面两种写法效果相同。

// async function dbFuc(db) {
//   let docs = [{}, {}, {}]
//   let promises = docs.map((doc) => ajax())

//   let results = await Promise.all(promises)
//   console.log(results)
// }

// 或者使用下面的写法

// async function dbFuc(db) {
//   let docs = [{}, {}, {}]
//   let promises = docs.map((doc) => ajax())
//   let results = []
//   for (let promise of promises) {
//     results.push(await promise)
//   }
//   console.log(results)
// }
// dbFuc()



//第四点，async 函数可以保留运行堆栈。

const a = () => {
  b().then(() => c());
}
//上面代码中，函数a内部运行了一个异步任务b()。
//当b()运行的时候，函数a()不会中断，而是继续执行。
//等到b()运行结束，可能a()早就运行结束了，b()所在的上下文环境已经消失了。
//如果b()或c()报错，错误堆栈将不包括a()。

//现在将这个例子改成async函数。

// const a = async () => {
//   await b()
//   c()
// }
//上面代码中，b()运行的时候，a()是暂停执行，上下文环境都保存着。
//一旦b()或c()报错，错误堆栈将包括a()。