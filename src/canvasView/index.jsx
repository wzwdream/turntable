import React, { useEffect, useRef } from 'react'
import Turntable from '../turntable/turntable'
function CanvasView(props) {
    const canvasElem = useRef(null)
    const changFood = (food, foodList) => {
        selectedFood('')
        // const foodList = food === 'meatFood' ? meatFood : food === 'vegetablesFood' ? vegetablesFood : soupFood
        const canvas = canvasElem.current
        const context = canvas.getContext('2d')
        canvas.width = 300
        canvas.height = 300
        const turntable = new Turntable({ canvas: canvas, context: context, awards: foodList, selectedFood: selectedFood })
        turntable.startRotate()
    }
    const selectedFood = (food) => {
        props.selectedFood(food)
    }

    useEffect(() => {
        // getList()
        changFood(props.food, props.foodList)
    }, [props.food, props.foodList])
    return (
        <canvas ref={canvasElem} className='canvas'></canvas>
    )
}

export default CanvasView