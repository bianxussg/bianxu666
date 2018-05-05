<template>
    <div class="trigger">
        <div class="hidden" ref="hidden" @click="trigger"></div>
        <div class="open">{{open}}</div>
        <div class="close">{{close}}</div>

    </div>
</template>

<script type='text/ecmascript-6'>
    export default {
        data(){
            return {
              turn:true
            }
        },
      props:{
        open:{
          default :'开',
          type:String
        },
        close:{
          default :'关',
          type:String
        }

      },
      methods:{
        trigger(){
          if(this.turn){
            this.$refs.hidden.style.left = '40px'
          }else{
            this.$refs.hidden.style.left = 0
          }

          this.turn = !this.turn
          this.$emit('clickButton',this.turn)
          console.log('emit'+this.turn)
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .trigger
    width 80px
    height 30px
    border-radius 30px
    background-color rgb(83,55,40)
    position relative
    .open, .close
      position absolute
      height 30px
      line-height 30px
      display inline-block
      color rgb(252,199,3)
      font-weight 700
    .open
      left 15px
    .close
      right 15px
    .hidden
      z-index 1
      position absolute
      height 100%
      width 50%
      border-radius 30px
      background-color #bb7813
      transition 0.5s
      cursor pointer
      left 0

</style>
