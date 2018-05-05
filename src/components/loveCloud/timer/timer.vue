<template>
    <div class="mytimer">
      <div class="trigger">
        <trigger @clickButton="setendTime"  open="白" close="夜"></trigger>
      </div>
      <canvas class="canvas" id="canvas"></canvas>
    </div>
</template>

<script type='text/ecmascript-6'>
  import trigger from './../trigger/trigger.vue'
  import {digit} from './digit'

  const WINDOW_WIDTH = 800
  const WINDOW_HEIGHT = 350
  const RADIUS = 4
  const MARGIN_LEFT =30
  const MARGIN_TOP = 30
  const colors = ['#33B5E5','#09C','#A6C','#93C','#9C0',
    '#690','#FB3','#F80','#F44','#C00']



    export default {
      data(){
        return {
          morning:false,
          endTime:{},
          endHourse:0,
          endMinute:0,
          endSeconds:0,

          curShowTimeSeconds:0,
          balls :[]


        }
      },

      created(){

      },
      mounted(){
        setTimeout(()=>{
          this.init()
        },600)

      },
      watch:{

      },
      methods:{

        setendTime(){
          this.morning = !this.morning
          this.endTime = new Date()
          if(this.morning){
            this.endHourse =23 - this.endTime.getHours()
            this.endMinute =29 - this.endTime.getMinutes()
            this.endSeconds =60 - this.endTime.getMinutes()
          }else{
            this.endHourse =17 - this.endTime.getHours()
            this.endMinute =59 - this.endTime.getMinutes()
            this.endSeconds =60 - this.endTime.getMinutes()
          }

          this.endTime.setTime(this.endTime.getTime()+(this.endHourse*3600+this.endMinute*60+this.endSeconds)*1000)
        },
        init(){
          let canvas = document.getElementById('canvas')
          let context = canvas.getContext('2d')
          canvas.width = WINDOW_WIDTH
          canvas.height = WINDOW_HEIGHT

          this.setendTime()
          this.curShowTimeSeconds = this.getCurrentShowTimeSeconds()

          setInterval(()=>{
              this.myrender(context)
              this.update()
          },50)
        /*  setTimeout(()=>{
            this.myrender(context)
            this.update()
          },1000)*/

        },
        myrender(ctx){
          ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)

          let hours = parseInt(this.curShowTimeSeconds/3600)
          let minutes = parseInt((this.curShowTimeSeconds-hours*3600)/60)
          let seconds = this.curShowTimeSeconds%60

          /*let hours = 10
          let minutes = 10
          let seconds = 10*/

          this.renderDigir(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx)
          this.renderDigir(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx)
          this.renderDigir(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx)
          this.renderDigir(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minutes/10),ctx)
          this.renderDigir(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minutes%10),ctx)
          this.renderDigir(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx)
          this.renderDigir(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx)
          this.renderDigir(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx)


          for(let i=0;i<this.balls.length;i++){
            ctx.fillStyle = this.balls[i].color
            ctx.beginPath()
            ctx.arc(this.balls[i].x,this.balls[i].y,RADIUS,0,2*Math.PI)
            ctx.closePath()
            ctx.fill()
          }



        },
        renderDigir(x,y,num,ctx){

          ctx.fillStyle = 'rgb(0,102,153)'
         // console.log(digit)
          for(let i = 0;i<digit[num].length;i++){
            for(let j = 0;j<digit[num][i].length;j++){
              if(digit[num][i][j]===1){
                ctx.beginPath()
                ctx.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,Math.PI*2)
                ctx.closePath()
                ctx.fill()
              }
            }
          }
        },
        getCurrentShowTimeSeconds(){
          let curTime = new Date()
          let ret = this.endTime.getTime() - curTime.getTime()
          ret = Math.round(ret/1000)
         // console.log('second'+ret)
          return ret >=0 ? ret : 0
        },
        update(){
          let nextShowTimeSeconds = this.getCurrentShowTimeSeconds()
          let nextHours = parseInt(nextShowTimeSeconds/3600)
          let nextMinutes = parseInt((nextShowTimeSeconds-nextHours*3600)/60)
          let nextSeconds = nextShowTimeSeconds%60

          let curHours = parseInt(this.curShowTimeSeconds/3600)
          let curMinutes = parseInt((this.curShowTimeSeconds-curHours*3600)/60)
          let curSeconds = this.curShowTimeSeconds%60

          if(nextSeconds !== curSeconds){

            if(parseInt(curHours/10) !== parseInt(nextHours/10)){
              this.addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10))
            }
            if(parseInt(curHours%10) !== parseInt(nextHours%10)){
              this.addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours%10))
            }
            if(parseInt(curMinutes/10) !== parseInt(nextMinutes/10)){
              this.addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10))
            }
            if(parseInt(curMinutes%10) !== parseInt(nextMinutes%10)){
              this.addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10))
            }
            if(parseInt(curSeconds/10) !== parseInt(nextSeconds/10)){
              this.addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10))
            }
            if(parseInt(curSeconds%10) !== parseInt(nextSeconds%10)){
              this.addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds%10))
            }
            this.curShowTimeSeconds = nextShowTimeSeconds
          }
          this.updateBalls()
        },
        addBalls(x,y,num){
          for(let i = 0;i<digit[num].length;i++){
            for(let j = 0;j<digit[num][i].length;j++){
              if(digit[num][i][j]===1){
                let aBall = {
                  x:x+j*2*(RADIUS+1)+(RADIUS+1),
                  y:y+i*2*(RADIUS+1)+(RADIUS+1),
                  g:1.5+Math.random(),
                  vx:Math.pow(-1,Math.floor(Math.random()*2))*4,
                  vy:-5,
                  color:colors[Math.floor(Math.random()*colors.length)]
                }
                this.balls.push(aBall)
              }
            }
          }
         // console.log(this.balls.length)
        },
        updateBalls(){
          for(let i =0;i<this.balls.length;i++){
            this.balls[i].x +=this.balls[i].vx
            this.balls[i].y +=this.balls[i].vy
            this.balls[i].vy += this.balls[i].g

            if(this.balls[i].y>=WINDOW_HEIGHT-RADIUS){
              this.balls[i].y = WINDOW_HEIGHT-RADIUS
              this.balls[i].vy = -this.balls[i].vy*0.65

            }
          }
          let cnt = 0
          for(let i = 0;i<this.balls.length;i++){
            if(this.balls[i].x+RADIUS>0 && this.balls[i].x-RADIUS<WINDOW_WIDTH){
              this.balls[cnt++] = this.balls[i]
            }
          }
          while (this.balls.length>Math.min(300,cnt)){
            this.balls.pop()
          }
        }
      },
      components:{
        trigger
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .trigger
    position absolute
    top 20px
    left -30px
    z-index 2
</style>
