import React from 'react'
import axios from 'axios'
import './style.css'

export default function () {
  return (
    <div className="test_box">
      <div className="box1">点击滚动</div>
      <div className="box2">刷新滚动</div>
      <div className="wrapper">
        <div className="left">left</div>
        <div className="right">right</div>
      </div>
      <div className="father">
        <div className="son"></div>
      </div>
     <div style={{overflow: 'hidden'}}>
      <div className="bother1"></div>
     
     </div>
     <div className="bother2"></div>
    </div>
  )
}

//2.封装一个公共函数，通过调用这个函数返回传入参数的正确类型。

function typeFn (item) {
  return Object.prototype.toString.call(item)
}
console.log(typeFn (1))

//3.有一个div节点，宽，高各200px,最少用3种方式实现div上下左右居中效果
//(1)
// postion:absolute
// top:0
// left: 0
// right: 0 
// bottom: 0
// margin: auto

//(2)
//disply: flex
//justify-content: center
//align-items: center

//(3)
//postion: absolute
//top: 50%
//left: 50%
//transform: translate(-50% -50%)

//4.使用CSS3动画实现2个效果 
// (1)(2)//页面效果 css文件
// (3)说明怎么实现伪GPU渲染
//GPU是显卡 动画会更流畅
//transform:translate3d(x,y,z); 
// (4)如何实现真正的GPU渲染
//will-change 
//属性值 
//auto 等于没有添加 最后使用 不取消占GPU
//自定义支持的属性 transform top left bottom right opcity
//will-change: top
//el.style.willChange = ""

//5.

//(1)
// var name = '小花'

// const obj = {
//   name: '小白',

//   fn () {
//     console.log(this.name)
//   }
// }
//obj.fn()
//小白
//const fn2 = obj.fn

//fn2()
//报错

//obj.fn.call({name: '小红'})
//小红

//(2)
// var name = '小花'

// const obj = {
//   name: '小白',

//   fn: () => {

//     console.log(this.name)
//   }
// }

// obj.fn()
//报错
//const fn2 = obj.fn

//fn2()
//报错

//obj.fn.call({name: '小红'})
//报错

//6.
// const p1 = new Promise((resolve, reject) => {
//   //setTimeout(resolve, 3000, 1)
//   setTimeout(() => {
//     resolve(1)
//   },3000)
// })
//   p1.then(res => {
//     console.log(res,111)
//    return new Promise((resolve, reject) => {
//       setTimeout(resolve, 3000, 2)
//    })
   
//   })
//     .then( res => {
//       console.log(res)
//     })

//7.
const ajax = () => {
  return axios.post('https://blogs.zdldove.top/Home/Apis/listWithPage')
}
//(1) 继发
// async function fn1 () {
//   await ajax()
//   await ajax()
// }
// fn1()

//(2) 并发
//一.
// async function fn2 () {
//   await Promise.all([ajax(), ajax()])
// }
// fn2()

//二.
// async function fn2 () {
//   const ajx = [ajax(), ajax()]
//   await ajx
// }
// fn2()


