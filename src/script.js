let app = new Vue({
  el: '#vue-app',
  data: {
    canvas: {},
    ctx: {},
    radius: 0,
    clockInterval: {},
    locations: [
      {
        "name": "london-uk",
        "offset": 0
      },
      {
        "name": "london-ca",
        "offset": -5
      },
      {
        "name": "johannesburg-sa",
        "offset": 2
      }
    ]
  },
  methods: {
    start() {
      let radius = 200 / 2 // canvas width divided by 2

      this.locations.forEach((loc) => {
        loc.canvas = document.getElementById(`${loc.name}-clock`)
        loc.ctx = loc.canvas.getContext("2d")
        loc.ctx.translate(radius, radius)
      })

      radius = radius * 0.90 // inner radius
      this.clockInterval = setInterval(() => {  this.drawClocks(radius) }, 1000)
    },

    drawClocks(radius) {
      this.locations.forEach((loc) => {
        this.drawClock(loc.ctx, radius, loc.offset)
      })
    },

    drawClock(ctx, radius, offset) {
      this.drawFace(ctx, radius, offset)
      this.drawNumbers(ctx, radius, offset)
      this.drawTime(ctx, radius, offset)
      ctx.strokeStyle = "black" // for clock border
    },

    drawFace(ctx, radius, offset) {
      let grad

      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, 2*Math.PI)
      ctx.fillStyle = this.getColorByHour("face", this.getHour(offset))
      ctx.fill()

      ctx.lineWidth = radius*0.1
      ctx.stroke()
      ctx.beginPath()
      ctx.fillStyle = '#333'
      ctx.fill()
    },

    drawNumbers(ctx, radius, offset) {
      let ang
      let num

      ctx.fillStyle = this.getColorByHour("text", this.getHour(offset))
      ctx.font = radius*0.3 + "px oswald"
      ctx.textBaseline="middle"
      ctx.textAlign="center"


      for(num = 1; num < 13; num++){
        ang = num * Math.PI / 6
        ctx.rotate(ang)
        ctx.translate(0, -radius*(0.8))
        ctx.fillText(num.toString(), 0, 0)
        ctx.translate(0, radius*(0.8))
        ctx.rotate(-ang)
      }
    },

    getTime(offset) {
      let now = new Date()
      let hour = now.getUTCHours()+offset
      if(hour > 24) hour = hour - 24 // check for overtime
      if(hour < 0) hour = 24 + offset // check for overtime
      let minute = now.getUTCMinutes()
      let second = now.getUTCSeconds()

      return {"hour":hour, "minute":minute, "second":second}
    },

    getHour(offset) {
      return this.getTime(offset).hour
    },

    drawTime(ctx, radius, offset) {
        // second
        let second=(this.getTime(offset).second*Math.PI/30)
        this.drawHand(ctx, second, radius*0.9, radius*0.02, this.getColorByHour("second", this.getHour(offset)))
        
        // minute
        let minute=(this.getTime(offset).minute*Math.PI/30)+(second*Math.PI/(30*60))
        this.drawHand(ctx, minute, radius*0.8, radius*0.07, this.getColorByHour("minute", this.getHour(offset)))

        // hour
        let hour=this.getTime(offset).hour%12// remove timezone offset
        hour=
          (hour*Math.PI/6)+
          (minute*Math.PI/(6*60))+
          (second*Math.PI/(360*60))
        this.drawHand(ctx, hour, radius*0.5, radius*0.07, this.getColorByHour("hour", this.getHour(offset)))
    },

    drawHand(ctx, pos, length, width, color) {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.lineCap = "square"
        ctx.moveTo(0,0)
        ctx.rotate(pos)
        ctx.lineTo(0, -length)
        ctx.stroke()
        ctx.rotate(-pos)
    },

    getColorByHour(area, time) {
      switch(time) {
        case 6: // from 06:00
        case 7:
        case 8:
        case 9:
        case 10: // to 10:00 ↓
          // dawn
          if(area === "face") return "#ff976e"
          else if(area === "minute") return "#6eecff"
          else if(area === "hour") return "#c36eff"
          else if(area === "second") return "#ffe06e"
          else if(area === "text") return "black"
          else return "white"
        case 11: // from 11:00
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17: // to 17:00 ↓
          // noon
          if(area === "face") return "#ebac00"
          else if(area === "minute") return "#6e00eb"
          else if(area === "hour") return "#eb007d"
          else if(area === "second") return "#7deb00"
          else if(area === "text") return "black"
          else return "white"
        case 18: // from 18:00
        case 19:
        case 20: // to 20:00 ↓
          // dusk
          if(area === "face") return "#4e3469"
          else if(area === "minute") return "#695c34"
          else if(area === "hour") return "#4f6934"
          else if(area === "second") return "#69344f"
          else if(area === "text") return "white"
          else return "white"
        case 21: // from 21:00
        case 22:
        case 23:
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5: // to 05:00 ↓
          // zero
          if(area === "face") return "#080447"
          else if(area === "minute") return "#472804"
          else if(area === "hour") return "#434704"
          else if(area === "second") return "#470443"
          else if(area === "text") return "white"
          else return "white"
        default:
          console.log(area, time)
          return "white"
      }
    },

    getID(loc) {
      return `${loc}-clock`
    }
  },  
  mounted() {
    // launch app
    this.start()
  }
})