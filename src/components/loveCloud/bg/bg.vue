<template>
    <div class="bg">
      <canvas class="canvas"></canvas>
    </div>
</template>

<script type='text/ecmascript-6'>
    export default {
      data(){
          return {}
      },
      mounted(){
        this.draw()
      },
      methods: {
        draw(){
          let canvas = document.querySelector('canvas'),
          ctx = canvas.getContext('2d')
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          ctx.beginPath()
          ctx.moveTo(50, 150)
          ctx.arc(100,100,50,0,2*Math.PI)
          ctx.closePath()

          ctx.fillStyle = 'red'
          ctx.fill()
        },
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .bg
    position fixed
    .canvas
      width 100%



</style>
