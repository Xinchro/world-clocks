let app = new Vue({
  el: '#vue-app',
  data: {
    canvas: {},
    ctx: {},
    radius: 0,
    clockInterval: {},
  },
  methods: {
    start() {
      this.canvas = document.getElementById("canvas")
      this.ctx = canvas.getContext("2d")
      this.radius = canvas.height / 2
      this.ctx.translate(this.radius, this.radius)
      this.radius = this.radius * 0.90
      this.clockInterval = setInterval(() => {  this.drawClock() }, 1000)
    },

    drawClock() {
      this.drawFace(this.ctx, this.radius)
      this.drawNumbers(this.ctx, this.radius)
      this.drawTime(this.ctx, this.radius)
    },

    drawFace(ctx, radius) {
      let grad

      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, 2*Math.PI)
      ctx.fillStyle = 'white'
      ctx.fill()

      grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05)
      grad.addColorStop(0, '#333')
      grad.addColorStop(0.5, 'white')
      grad.addColorStop(1, '#333')

      ctx.strokeStyle = grad
      ctx.lineWidth = radius*0.1
      ctx.stroke()
      ctx.beginPath()
      ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI)
      ctx.fillStyle = '#333'
      ctx.fill()
    },

    drawNumbers(ctx, radius) {
      let ang
      let num

      ctx.font = radius*0.15 + "px arial"
      ctx.textBaseline="middle"
      ctx.textAlign="center"

      for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6
        ctx.rotate(ang)
        ctx.translate(0, -radius*0.85)
        ctx.rotate(-ang)
        ctx.fillText(num.toString(), 0, 0)
        ctx.rotate(ang)
        ctx.translate(0, radius*0.85)
        ctx.rotate(-ang)
      }
    },

    drawTime(ctx, radius) {
        let now = new Date()
        let hour = now.getHours()
        let minute = now.getMinutes()
        let second = now.getSeconds()

        //hour
        hour=hour%12
        hour=(hour*Math.PI/6)+
        (minute*Math.PI/(6*60))+
        (second*Math.PI/(360*60))
        this.drawHand(ctx, hour, radius*0.5, radius*0.07)

        //minute
        minute=(minute*Math.PI/30)+(second*Math.PI/(30*60))
        this.drawHand(ctx, minute, radius*0.8, radius*0.07)

        // second
        second=(second*Math.PI/30)
        this.drawHand(ctx, second, radius*0.9, radius*0.02)
    },

    drawHand(ctx, pos, length, width) {
        ctx.beginPath()
        ctx.lineWidth = width
        ctx.lineCap = "round"
        ctx.moveTo(0,0)
        ctx.rotate(pos)
        ctx.lineTo(0, -length)
        ctx.stroke()
        ctx.rotate(-pos)
    }
  }
})

// launch app
app.start()
