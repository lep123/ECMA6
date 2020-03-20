import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useMappedState } from 'redux-react-hook'
import home from '@/actions/home'
import axios from 'axios'
import _ from 'loadsh'
import UseList from '@@/UseList'

export default function Counter () {
  
  //拿取我们的数据
  const mapState = useCallback(state => {
    console.log(state)
    return {
      data: state.index.data,
    }
  })
 
  const data = useMappedState(mapState)
  console.log(data)
  //从store中读取 dispatch
  const dispatch = useDispatch()
   useEffect(() => {
    dispatch(home.fetchFavorite())
  },[])


  const onClick  = (opt) => {
    dispatch(home.fetchFavorite())
  }
  
  
  return (
    <div className="page_hook">
      {JSON.stringify(data)}
      <button onClick={onClick}>点击</button>
    </div>
  )
}