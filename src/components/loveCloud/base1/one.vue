<template>
  <div class="base1">
    <div class="canvasContain">
      <div class="pic"></div>
      <!--<canvas id="canvas" class="canvas"></canvas>-->
    </div>
    <div class="control">
      <div class="inputContain">
        <span class="des">上底b:</span>
        <input type="number" class="input1" v-model="b">
      </div>
      <div class="inputContain">
        <span class="des">下底a:</span>
        <input type="number" class="input1" v-model="a">
      </div>
      <div class="inputContain">
        <span class="des">高h:</span>
        <input type="number" class="input1" v-model="h">
      </div>
    </div>
    <div class="resultContain">
      <div class="owlContain">
        <owl :oWidth="300" :oHeight="150" @show="showAnswer" ref="owl"></owl>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Owl from './../owl/owl.vue'
    export default {
      data(){
        return{
          b:100,//上底
          a:300,//下底
          h:100,//高
          answer:'hidden'
        }
      },
      mounted(){
        //this.draw()
      },
      methods:{
        draw(){
          let canvas = document.querySelector('canvas'),
          ctx = canvas.getContext('2d')
          canvas.width = 500;
          canvas.height = 300;

          ctx.beginPath()
          ctx.moveTo(50,150)
          ctx.lineTo(50+this.a,150)
          ctx.lineTo(50+(this.a+this.b)/2,150-this.h)
          ctx.lineTo(50+(this.a-this.b)/2,150-this.h)
          ctx.lineTo(50,150)
          ctx.closePath()

          ctx.lineWidth = 5;
          ctx.strokeStyle = 'red'
          ctx.stroke()
        },
        debounce(func,delay) {
          let timer
          return function (...args) {
            if(timer){
              clearTimeout(timer)
            }
            timer = setTimeout(()=>{
              func.apply(this,args)
            },delay)
          }
        },
        showAnswer(){
          this.$refs.owl.answer = 'show'
          this.$refs.owl.result = this.c.toFixed(3)
        }
      },
      created(){
        this.$watch('a',this.debounce(()=>{
          this.$refs.owl.hidden()
        },300))
        this.$watch('b',this.debounce(()=>{
          this.$refs.owl.hidden()
        },300))
        this.$watch('h',this.debounce(()=>{
          this.$refs.owl.hidden()
        },300))
      },
      computed:{
        c:function () {
          return Math.sqrt(Math.pow((this.a-this.b)/2,2)+Math.pow(this.h,2))
        }
      },
      watch:{

      },
      components:{
        Owl
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .base1
    position relative
    .canvasContain
      position absolute
      left 0
      display inline-block
      border 5px solid rgb(252,199,3)
      border-radius 20px
      box-sizing border-box
      width 300px
      height 237px
      background-color white
      .pic
        width 100%
        height 237px
        margin-top 50%
        transform translate3d(0,-50%,0)
        position relative
        background-image url(1.png)
        background-size 100%
        background-repeat no-repeat
    .control
      position absolute
      top 30px
      left 350px
      display flex
      flex-direction column
      width 200px
      .inputContain
        display flex
        .des
          display flex
          justify-content: space-between
          height 51px
          line-height 51px
          width 50px
        .input1
          box-shadow: inset 0 2px 6px #a6bb37;
          margin: 7px 5px;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          font-size: 16px;
          width: 100px;
          height: 21px;
          line-height: 24px;
          padding: 7px 2px 7px 10px;
          background-size: 25px 1px;
          border: 1px solid #d6d6d6;
    .resultContain
      position absolute
      left 550px
      top 80px
      display inline-block





</style>
