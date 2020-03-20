import React from 'react'
import './transform.css'
export default function () {
  return (
    <div className="box">
      <div className="box_rotate"></div>
      <div className="box_translate"></div>
      <div className="box_scale"></div>
      <div className="box_skew"></div>

      <div id="trans3DDemo1">
        <div id="trans3DBoxes1">
          <div className="a1">Front</div>
          <div className="a2">Left</div>
          <div className="a3">Right</div>
          <div className="a4">Top</div>
          <div className="a5">Bottom</div>
          <div className="a6">Back</div>
        </div>
      </div>
    </div>
  )
}


