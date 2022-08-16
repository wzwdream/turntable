import React, { Component } from 'react'
import CanvasView from './canvasView/index.jsx'
import Card from './card'
class App extends Component {
  constructor(props) {
    super(props)
    this.canvas = React.createRef()
    this.state = {
      food: 'meatFood',
      isShow: false,
      selecteFood: '',
      foodList: []
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
    this.closeList = this.closeList.bind(this)
    this.selectedFood = this.selectedFood.bind(this)
    this.changFood = this.changFood.bind(this)
    this.addFood = this.addFood.bind(this)
    this.deeteFood = this.deeteFood.bind(this)
  }
  changFood(food) {
    this.setState({
      food: food,
      foodList: this[food]
    })
  }
  selectedFood(food) {
    this.setState({
      selecteFood: food
    })
  }
  // 添加菜品
  addFood(foodName) {
    if(foodName) {
      const { foodList, food } = this.state
      const len = foodList.length
      foodList.push({
        level: 1 + parseInt(foodList[len - 1].level),
        name: foodName
      })
      this[food] = foodList
      localStorage.setItem(food,JSON.stringify(foodList))
    }
  }
  // 删除菜品
  deeteFood(index) {
    const { foodList, food } = this.state
    foodList.splice(index, 1)
    this.setState({
      foodList: foodList
    })
    this[food] = foodList
    localStorage.setItem(food,JSON.stringify(foodList))
  }
  // 获取食物列表
  getList() {
    const meatFood = localStorage.getItem('meatFood')
    const vegetablesFood = localStorage.getItem('vegetablesFood')
    const soupFood = localStorage.getItem('soupFood')
    meatFood ? this.meatFood = JSON.parse(localStorage.getItem('meatFood')) : localStorage.setItem('meatFood',JSON.stringify(this.meatFood))
    vegetablesFood ? this.vegetablesFood = JSON.parse(localStorage.getItem('vegetablesFood')) : localStorage.setItem('vegetablesFood',JSON.stringify(this.vegetablesFood))
    soupFood ? this.soupFood = JSON.parse(localStorage.getItem('soupFood')) : localStorage.setItem('soupFood',JSON.stringify(this.soupFood))
    this.setState({
      foodList: this.meatFood
    })
  }
  closeList() {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  componentDidMount() {
    this.getList()
  }
  render() {
    return <div className='container'>
      <div className='title'>
        <span>{this.state.food === 'meatFood' ? '荤菜' : this.state.food === 'vegetablesFood' ? '素菜' : '汤'}</span>
      </div>
      <div className='btnGroup'>
        <button className='btn' onClick={() => this.changFood('meatFood')}>荤菜</button>
        <button className='btn' onClick={() => this.changFood('vegetablesFood')}>素菜</button>
        <button className='btn' onClick={() => this.changFood('soupFood')}>汤</button>
      </div>
      <div className='selected'>
        <span>选中的食物：{this.state.selecteFood}</span>
      </div>
      <div className='box'>
        <CanvasView food={this.state.food} foodList={this.state.foodList} selectedFood={this.selectedFood} />
      </div>
      <Card isShow={this.state.isShow} food={this.state.food} foodList={this.state.foodList} addFood={this.addFood} deeteFood={this.deeteFood} closeList={this.closeList} />
    </div>
  }
}
export default App