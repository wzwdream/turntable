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
        <span className='addIcon' onClick={this.closeList}>
          {
            !this.state.isShow ? <>
              <svg t="1660620041792" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4016" width="32" height="32"><path d="M511.984 64C264.976 64 64 264.96 64 512.016 64 759.024 264.976 960 511.984 960 759.056 960 960 759.024 960 512.016 960 264.944 759.024 64 511.984 64z" fill="#FFBD27" p-id="4017"></path><path d="M695.76 552.16h-143.616v143.536A40.224 40.224 0 0 1 512 735.936a40.256 40.256 0 0 1-40.128-40.24v-143.52h-143.632a40.208 40.208 0 1 1 0-80.4h143.632v-143.584a40.16 40.16 0 1 1 80.288 0v143.568h143.616a40.208 40.208 0 1 1 0 80.416z" fill="#333333" p-id="4018"></path></svg>
              添加
            </>
            : <span>取消</span>
          }
        </span>
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