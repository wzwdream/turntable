// 转盘类
export default class Turntable {
  constructor(options) {
    this.canvas = options.canvas
    this.context = options.context
    this.startRadian = 0
    this.canBeClick = true
    this.awards = options.awards
    this.that = options.that
    this.food = ''
  }
  getLineTextList(context, text, maxLineWidth) {
    let wordList = text.split(''), tempLine = '', lineList = []
    for (let i = 0; i < wordList.length; i++) {
      if (context.measureText(tempLine).width >= maxLineWidth) {
        lineList.push(tempLine)
        maxLineWidth -= context.measureText(text[0]).width
        tempLine = ''
      }
      tempLine += wordList[i]
    }
    lineList.push(tempLine)
    return lineList
  }
  drawPanel() {
    const context = this.context
    const startRadian = this.startRadian
    context.save()
    context.beginPath()
    context.fillStyle = '#FD6961'
    context.arc(150, 150, 150, startRadian, Math.PI * 2 + startRadian, false)
    context.fill()
    context.restore()
  }
  // 奖品块
  drawPrizeBlock() {
    const context = this.context
    const awards = this.awards
    let startRadian = this.startRadian, RadianGap = Math.PI * 2 / awards.length, endRadian = startRadian + RadianGap
    for (let i = 0; i < awards.length; i++) {
      context.save()
      context.beginPath()
      context.fillStyle = i % 3 === 0 ? '#96fbc4' : i % 3 === 1 ? '#fddb92' : '#ace0f9'
      context.moveTo(150, 150)
      context.arc(150, 150, 140, startRadian, endRadian, false)
      context.fill()
      context.restore()

      context.save()
      context.fillStyle = '#000'
      context.font = "14px Arial"
      context.translate(
        150 + Math.cos(startRadian + RadianGap / 2) * 140,
        150 + Math.sin(startRadian + RadianGap / 2) * 140
      )
      context.rotate(startRadian + RadianGap / 2 + Math.PI / 2)
      this.getLineTextList(context, awards[i].name, 70).forEach((line, index) => {
        context.fillText(line, -context.measureText(line).width / 2, ++index * 25)
      })
      context.restore()

      startRadian += RadianGap
      endRadian += RadianGap
    }
  }
  // 开始按钮
  drawButton() {
    const context = this.context
    context.save()
    context.beginPath()
    context.fillStyle = '#FF0000'
    context.arc(150, 150, 30, 0, Math.PI * 2, false)
    context.fill()
    context.restore()

    context.save()
    context.beginPath()
    context.fillStyle = '#000'
    context.font = '20px Arial'
    context.translate(150, 150)
    context.fillText('Start', -context.measureText('Start').width / 2, 8)
    context.restore()
  }
  // 箭头
  drawArrow() {
    const context = this.context
    context.save()
    context.beginPath()
    context.fillStyle = '#FF0000'
    context.moveTo(140, 125)
    context.lineTo(150, 100)
    context.lineTo(160, 125)
    context.closePath()
    context.fill()
    context.restore()
  }
  windowToCanvas(canvas, e) {
    const canvasPostion = canvas.getBoundingClientRect(), x = e.clientX, y = e.clientY
    return {
      x: x - canvasPostion.left,
      y: y - canvasPostion.top
    }
  };
  // 开始转动
  startRotate() {
    const canvas = this.canvas
    const context = this.context
    const canvasStyle = canvas.getAttribute('style');
    this.render()
    canvas.addEventListener('mousedown', e => {
      if (!this.canBeClick) return
      this.canBeClick = false
      let loc = this.windowToCanvas(canvas, e)
      context.beginPath()
      context.arc(150, 150, 30, 0, Math.PI * 2, false)
      if (context.isPointInPath(loc.x, loc.y)) {
        this.startRadian = 0
        const distance = this.distanceToStop()
        this.rotatePanel(distance)
      }
    })
    canvas.addEventListener('mousemove', e => {
      let loc = this.windowToCanvas(canvas, e)
      context.beginPath()
      context.arc(150, 150, 30, 0, Math.PI * 2, false)
      if (context.isPointInPath(loc.x, loc.y)) {
        canvas.setAttribute('style', `cursor: pointer;${canvasStyle}`)
      } else {
        canvas.setAttribute('style', canvasStyle)
      }
    })
  }
  rotatePanel(distance) {
    let changeRadian = (distance - this.startRadian) * (100 / (Math.random() * 5000 + 4000) * 1.5)
    this.startRadian += changeRadian
    if (distance - this.startRadian <= 0.05) {
      this.canBeClick = true;
      this.that.selectedFood(this.food)
      return
    }
    this.render()
    window.requestAnimationFrame(this.rotatePanel.bind(this, distance));
  }
  distanceToStop() {
    let middleDegrees = 0, distance = 0
    const awardsToDegreesList = this.awards.map((data, index) => {
      let awardRadian = (Math.PI * 2) / this.awards.length
      return awardRadian * index + (awardRadian * (index + 1) - awardRadian * index) / 2
    });
    const currentPrizeIndex = Math.floor(Math.random() * this.awards.length)
    this.food = this.awards[currentPrizeIndex].name
    middleDegrees = awardsToDegreesList[currentPrizeIndex];
    distance = Math.PI * 3 / 2 - middleDegrees
    distance = distance > 0 ? distance : Math.PI * 2 + distance
    return distance + Math.PI * 10;
  };
  render() {
    this.drawPanel()
    this.drawPrizeBlock()
    this.drawButton()
    this.drawArrow()
  }
}