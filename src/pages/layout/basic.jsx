import React from 'react'
import { renderRoutes } from 'react-router-config'
import './style.less'
export default function (props) {
 
  return (
    <div className="pages_baisc">
      <div className="pages_body">
        {renderRoutes(props.route.routes)}
      </div>
      <div className="pages_footer">
        
      </div>
    </div>
  )
}