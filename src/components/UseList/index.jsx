import React, { useState, useEffect } from 'react'

export default function Uselist (props) {
  console.log(props)
  const [count, setCount] = useState(0)
  const onClick = () => {
    const { onClick } = props
  
    onClick && onClick('子组件传递的参数')
  }
  return (
    <div className="common_list">
      <button onClick={onClick}>点击</button>
    </div>
  )
}