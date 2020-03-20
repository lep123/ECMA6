import React from 'react'
export default class extends React.PureComponent {
  constructor (props) {
    super(props)
    console.log('constructor')
    this.state = {
      name: '小白'
    }
  }
  onState = () => {
    this.setState({
      name: '小蓝'
    })
  }
  render () {
    console.log('render')
    const { name } = this.state
    const { age } = this.props
    return (
     <div>
        <div>{age}</div>
        <div>{name}</div>
        <button onClick={this.onState}>改变组件state</button>
     </div>
    )
  }
  componentDidMount () {
    console.log('componentDidMount组件挂在后触发')
  }

  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    console.log('componentWillReceiveProps props改变触发')
    console.log('---------------------------')
  }

  shouldComponentUpdate (nextProps, nextState) {
    console.log('shouldComponentUpdate 组件的props或者state更新时触发 true更新 false不更新')
    console.log(nextProps)
    console.log(nextState)
    console.log('---------------------------')
    return true
 
  }

  componentWillUpdate () {
    console.log('componentWillUpdate组件更新前触发')
    console.log('---------------------------')
  }

  componentDidUpdate () {
    console.log('componentDidUpdate组件更新后触发')
    console.log('---------------------------')
  }

  componentWillUnmount () {
    console.log('componentWillUnmount组件卸载后触发')
  }
}