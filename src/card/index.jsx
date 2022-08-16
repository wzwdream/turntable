import React, { useState } from 'react'
import './index.css'
function Card(props) {
    const [foodName, setFoodName ] = useState('')
    const changeFood = () => {
        props.addFood(foodName)
        setFoodName('')
    }
    return (
        <div className="card" style={!props.isShow ? { display: 'none' } : {}}>
            <div className='cardTitle'>
                <div className="tools">
                    <div className="circle">
                        <span className="red box1"></span>
                    </div>
                    <div className="circle">
                        <span className="yellow box1"></span>
                    </div>
                    <div className="circle">
                        <span className="green box1"></span>
                    </div>
                </div>
                <span className='titleText'>{props.food === 'meatFood' ? '荤菜' : props.food === 'vegetablesFood' ? '素菜' : '汤'}</span>
                <span className='right_x' onClick={props.closeList}></span>
            </div>
            <div className="card__content">
                <div className='content_header'>
                    <input placeholder="请输入你想要添加的菜名" value={foodName} onChange={(e) => setFoodName(e.target.value)} type="text" className="input" />
                    <button className='addBtn' onClick={changeFood}>添加菜品</button>
                </div>
                <div className='content_box'>
                    {
                        props.foodList.map((item, index) => {
                            return <div className='contentRow' key={item.level}>
                                <span>{item.level}、</span>
                                <span>{item.name}</span>
                                <span className='right_x' onClick={() => props.deeteFood(index)}></span>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Card