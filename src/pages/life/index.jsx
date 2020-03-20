import React from 'react'
import LifeCycle from '@@/lifeCycle'
export default class extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      age: 18
    }
  }
  onProps = () => {
    this.setState({
      age: '19'
    })
  }
  render () {
    const { age } = this.state
    
    return (
     <div>
       <LifeCycle age={age}/>
       <button onClick={this.onProps}>点击修改传递的props</button>
     </div>
    )
  }
  
}