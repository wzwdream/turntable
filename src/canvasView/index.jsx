import React, { useRef, useEffect } from 'react'
import { getTurntable } from '../turntable/turntable'
function CanvasView(props) {
    const canvasElem = useRef(null)
    const changFood = (foodList) => {
        const canvas = canvasElem.current
        const context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height)
        canvas.width = 300
        canvas.height = 300
        let turntable = getTurntable({ canvas: canvas, context: context, awards: foodList, selectedFood: selectedFood })
        turntable.startRotate()
    }
    const selectedFood = (foodName) => {
        props.selectedFood(foodName)
    }

    useEffect(() => {
        changFood(props.foodList)
    }, [props.foodList])
    return (
        <canvas ref={canvasElem} className='canvas'></canvas>
    )
}

export default CanvasView
