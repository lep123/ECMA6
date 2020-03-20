import React from 'react'
import './transition.css'
export default function () {
  const  handelClick = () => {
    console.log(1)
    const Dom = document.querySelector('#timings-demo')
    console.log(Dom)
    Dom.className='timings-demo-hover'
    

    
  }
  return (
    <div className="box">
      <div className="box1">

      </div>

      <a id="timings-demo-btn" onClick={handelClick}>click</a> 
      <div id="timings-demo"> 
        <div id="ease" className="demo-box">Ease</div> 
        <div id="ease-in" className="demo-box">Ease-in</div> 
        <div id="ease-out" className="demo-box">Ease-out</div> 
        <div id="ease-in-out" className="demo-box">Ease-in-out</div> 
        <div id="linear" className="demo-box">Linear</div> 
        <div id="cubic-bezier" className="demo-box">Cubic-bezier</div> 
      </div>

    </div>
  )
}


