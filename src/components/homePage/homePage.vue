<template>
    <div class="homePage">
      <div class="my">
        <div  class="myLink">
          <div @click="toMy" class="male" >
            <canvas class="canvas1" id="canvas1"></canvas>
          </div>
        </div>

      </div>
      <div class="myLove">
        <div  class="myLoveLink">
          <router-link  to="/myLove" class="female">
            <canvas class="canvas2" id="canvas2"></canvas>
          </router-link>
        </div>

      </div>

    </div>
</template>

<script type='text/ecmascript-6'>
  import "common/stylus/variable.styl"
  const WINDOW_WIDTH = 200
  const WINDOW_HEIGHT = 200
    export default {
        data(){
            return {}
        },
      mounted(){
      //  console.log(1)
        this.initFemale()
        this.initMale()
      },
      methods:{
        toMy(){
          this.$router.push('./my')
        },
        initFemale(){
          let canvas = document.getElementById('canvas2')
          let context = canvas.getContext('2d')
          canvas.width = WINDOW_WIDTH
          canvas.height = WINDOW_HEIGHT
          this.renderFemale(context)
        },
        renderFemale(context){
            //大圆
          context.save()
          context.beginPath()
          context.arc(100,60,40,0,Math.PI*2)
          context.fillStyle = 'rgb(255,102,0)'
          context.fill()
          context.closePath()
          context.restore()
            //扣洞
          context.save()
          context.beginPath()
          context.arc(100,60,20,0,Math.PI*2)
          context.clip()
          context.fillStyle = 'rgb(190,190,47)'
          context.fill()
          context.closePath()
          context.restore()
            //十字
          context.save()
          context.beginPath()
          context.lineTo(90,85)
          context.lineTo(90,115)
          context.lineTo(40,115)
          context.lineTo(40,135)
          context.lineTo(90,135)
          context.lineTo(90,175)
          context.lineTo(110,175)
          context.lineTo(110,135)
          context.lineTo(160,135)
          context.lineTo(160,115)
          context.lineTo(110,115)
          context.lineTo(110,85)
          context.closePath()
          //context.lineCap = 'round'
          context.fillStyle = 'rgb(255,102,0)'
          context.fill()
          context.restore()
        },
        initMale(){
          let canvas = document.getElementById('canvas1')
          let context = canvas.getContext('2d')
          canvas.width = WINDOW_WIDTH
          canvas.height = WINDOW_HEIGHT
          this.renderMale(context)
        },
        renderMale(context){
          //大圆
          context.save()
          context.beginPath()
          context.arc(100,140,40,0,Math.PI*2)
          context.fillStyle = 'rgb(190,190,47)'
          context.fill()
          context.closePath()
          context.restore()
          //扣洞
          context.save()
          context.beginPath()
          context.arc(100,140,20,0,Math.PI*2)
          context.clip()
          context.fillStyle = 'rgb(255,102,0)'
          context.fill()
          context.closePath()
          context.restore()
          //箭头
          context.save()
          context.beginPath()
          context.lineTo(90,105)
          context.lineTo(90,65)
          context.lineTo(60,65)
          context.lineTo(100,25)
          context.lineTo(140,65)
          context.lineTo(110,65)
          context.lineTo(110,105)
          context.lineJoin='bevel'
          context.fillStyle = 'rgb(190,190,47)'
          context.fill()
          context.closePath()
          context.restore()
        },
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .homePage
    position absolute
    top 0
    left:0
    z-index -100
    height 100%
    width 100%
    .my
      position absolute
      height 100%
      width 50%
      top 0
      left 0
      display inline-block
      background-color $color-my
      .myLink
        display inline-block
        width 100%
        height 100%
      .male
        position absolute
        top 50%
        transform translate3d(0,-50%,0) rotate(45deg)
        right 100px
        transition all .5s
        cursor pointer
        &.male:hover
          transition all .5s
          transform translate3d(10%,-60%,0) rotate(45deg)
    .myLove
      position absolute
      height 100%
      width 50%
      top 0
      left 50%
      display inline-block
      background-color $color-mylove

      .myLoveLink
        display inline-block
        width 100%
        height 100%
      .female
        position absolute
        top 50%
        transform translate3d(0,-50%,0)
        left 100px
        transition all .5s
        cursor pointer
        &.female:hover
          transition all .5s
          transform translate3d(-10%,-60%,0)
          animation spin 1s linear infinite

  /*@keyframes spin {
    from {
      transform: scale(0.5)
    }
    to {
      transform: scale(1.2);
    }
  }*/
</style>
