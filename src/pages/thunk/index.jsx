import React from 'react'
import { connect } from 'react-redux'
import thunkFn from '@/actions/thunk'
export default 
@connect((state) => ({
  name: state.thunk.name,
}),{
  thunkFn,
})
class extends React.PureComponent {
  componentDidMount () {
    const { thunkFn } = this.props
    thunkFn && thunkFn()
  }
  render () {
    const { name } = this.props
    return (
      <div className="pages_thunk">
       1111{JSON.stringify(name)}
      </div>
    )
  }
}