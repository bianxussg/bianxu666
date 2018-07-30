<template>
    <div class="owl" ref="owl" @click.stop.prevent="show">
      <div class="owlHeader" ref="owlHeader" :class="{showAnswer:answer==='hidden'}">
        <div class="hand hand-l"></div>
        <div class="hand hand-r"></div>
        <div class="arms">
          <div class="owlLeftHand"></div>
          <div class="owlRightHand"></div>
        </div>
      </div>
      <div class="result" ref="result">{{result}}</div>
    </div>
</template>

<script type='text/ecmascript-6'>
    export default {
        data(){
            return {
              owlresult:['点我~','往这看','点开有惊喜'],
              answer:'hidden',
              result:0
            }
        },
      props:{
        oWidth:{
          default:400,
          type:Number
        },
        oHeight:{
          default:300,
          type:Number
        }

      },
      mounted(){
        this.init()
      },
      methods:{
        init(){
          this.$refs.owl.style.width = this.oWidth +'px'
          this.$refs.owl.style.height = this.oHeight +'px'
          this.$refs.owlHeader.style.width = '211px'
          this.$refs.owlHeader.style.height = '108px'
          this.$refs.owlHeader.style.left = (this.oWidth-parseInt(this.$refs.owlHeader.style.width))/2 +'px'
          this.$refs.owlHeader.style.top = - parseInt(this.$refs.owlHeader.style.height)+5 + 'px'
          this.hidden()
        },
        hidden(){
          this.answer = 'hidden'
          this.result = this.owlresult[Math.floor(Math.random()*this.owlresult.length)]
        },
        show(result){
          this.$emit('show')
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .owl
    border 4px solid rgb(121,82,58)
    border-radius 20px
    position relative
    cursor pointer
    .owlHeader
      position absolute
      background-image url('owl-login.png')
      .hand-l
        transition: 0.7s;
        position absolute
        width 30px
        height 20px
        background-color rgb(83,55,40)
        border-radius 50%
        top 90px
        left 14px
      .hand-r
        transition: 0.7s;
        position absolute
        width 30px
        height 20px
        background-color rgb(83,55,40)
        border-radius 50%
        top 90px
        left 170px
      .arms
        top 58px
        position absolute
        width 100%
        height 41px
        overflow hidden
        .owlLeftHand
          transition: 0.4s ease-in;
          position absolute
          top 47px
          left 10px
          width 40px
          height 65px
          background-image url('owl-login-arm.png')
          transform rotate(-20deg)
        .owlRightHand
          transition: 0.4s ease-in;
          position absolute
          top 47px
          width 40px
          height 65px
          background-image url('owl-login-arm.png')
          transform rotate(20deg) scaleX(-1)
          left 158px
      &.showAnswer
        .hand-l
          transition: 0.7s;
          width 20px
          top 70px
          left 74px
        .hand-r
          transition: 0.7s;
          width 20px
          top 70px
          left 124px
        .arms
          .owlLeftHand
            transition: 0.4s ease-out;
            top 6px
            left 64px
            transform rotate(-10deg)
          .owlRightHand
            transition: 0.4s ease-out;
            top 6px
            left 114px
            transform rotate(10deg) scaleX(-1)
    .result
      text-align center
      font-weight 800
      font-size 50px
      position relative
      top 50%
      transform translate3d(0,-50%,0)

</style>
