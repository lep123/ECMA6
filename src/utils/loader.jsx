import React from 'react'
import Loadable from 'react-loadable';
 
const Loading = () => <div> 加载中... </div>  
export default (loader, loading = Loading) => {	
    return Loadable({
        loader: loader,
        loading,
      });
}