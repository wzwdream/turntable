import React, { Component } from 'react'
import Turntable from './turntable/turntable'
class App extends Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {
      title: '荤菜',
      food: ''
    }
    this.meatFood = [
      { level: '1', name: '回锅肉'},
      { level: '2', name: '红烧肉'},
      { level: '3', name: '苦瓜炒肉'}
    ]
    this.vegetablesFood = [
      { level: '1', name: '凉拌黄瓜'},
      { level: '2', name: '木耳菜'},
      { level: '3', name: '西红柿炒鸡蛋'}
    ]
    this.soupFood = [
      { level: '1', name: '紫菜蛋花汤'},
      { level: '2', name: '西红柿鸡蛋汤'},
      { level: '3', name: '黄瓜皮蛋汤'}
    ]
  }
  changFood(food) {
    this.setState({
      food: ''
    })
    const canvas = this.canvas.current
    const context = canvas.getContext('2d')
    canvas.width = 300
    canvas.height = 300
    const turntable = new Turntable({ canvas: canvas, context: context, awards: this[food], that: this })
    turntable.startRotate()

    const title = food === 'meatFood' ? '荤菜' : food === 'vegetablesFood' ? '素菜' : '汤'
    this.setState({
      title: title
    })
  }
  selectedFood(food) {
    this.setState({
      food: food
    })
  }

  // 获取食物列表
  getList() {
    localStorage.setItem('meatFood',JSON.stringify(this.meatFood))
    const meatFood = localStorage.getItem('meatFood')
    const vegetablesFood = localStorage.getItem('vegetablesFood')
    const soupFood = localStorage.getItem('soupFood')
    meatFood && (this.meatFood = JSON.parse(localStorage.getItem('meatFood')))
    vegetablesFood && (this.meatFood = JSON.parse(localStorage.getItem('vegetablesFood')))
    soupFood && (this.meatFood = JSON.parse(localStorage.getItem('soupFood')))
  }
  componentDidMount() {
    this.getList()
    this.changFood('meatFood')
  }
  render() {
    return <div className='container'>
      <div className='title'>
        <span>{this.state.title}</span>
      </div>
      <div className='btnGroup'>
        <button className='btn' onClick={() => this.changFood('meatFood')}>荤菜</button>
        <button className='btn' onClick={() => this.changFood('vegetablesFood')}>素菜</button>
        <button className='btn' onClick={() => this.changFood('soupFood')}>汤</button>
      </div>
      <div className='selected'>
        <span>选中的食物：{this.state.food}</span>
      </div>
      <div className='box'>
        <canvas ref={this.canvas} className='canvas'></canvas>
      </div>
    </div>
  }
}
export default App