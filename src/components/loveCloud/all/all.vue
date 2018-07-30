<template>
  <transition name="mylove">
    <div class="all">
      <!--<div class="cloudPicContainer">
        <img class="cloudPic" src="./pic/cloud.gif" >
      </div>-->
      <div class="back-container">
        <span class="back-text" @click="back">返回</span>
      </div>
      <div class="timer">
        <timer></timer>
      </div>

      <div class="pic-type-container">
        <span class="pic-type"  v-for="(item,index) in pic"
              @click="chooseImage(index)"
              :class="{'active':currentIndex ===index}">
          <img class="pic-type-c" :src="item.src">
        </span>
        <div class="active-border" ref="activeBorder"></div>
      </div>

      <div class="big-pic">
        <one v-show="show1"></one>
        <two v-show="show2"></two>
        <three v-show="show3"></three>
        <four v-show="show4"></four>
      </div>

    </div>
  </transition>

</template>

<script type='text/ecmascript-6'>
  import one from './../base1/one.vue'
  import two from './../base2/two.vue'
  import three from './../base3/three.vue'
  import four from './../base4/four.vue'
  import bg from './../bg/bg.vue'
  import timer from './../timer/timer.vue'

    export default {
        data(){
            return {
              currentIndex:0,
              show1:true,
              show2:false,
              show3:false,
              show4:false,
              pic:[{src:'./static/1.png'},{src:'./static/2.png'}
              ,{src:'./static/3.png'},{src:'./static/4.png'}]
            }
        },
      methods:{
        back(){
          this.$router.back();
        },
        moveBorder(index){
          this.$refs.activeBorder.style.left = index*100+'px'
        },
        chooseImage(index){
          this.currentIndex = index
          this.moveBorder(index)
          switch (index){
            case 0:
                this.show1=true;
                this.show2=false;
                this.show3=false;
                this.show4=false;
              break;
            case 1:
                this.show1=false;
                this.show2=true;
                this.show3=false;
                this.show4=false;
              break;
            case 2:
                this.show1=false;
                this.show2=false;
                this.show3=true;
                this.show4=false;
              break;
            case 3:
                this.show1=false;
                this.show2=false;
                this.show3=false;
                this.show4=true;
              break;
          }
        }
      },
      components:{
        one,
        two,
        three,
        four,
        bg,
        timer

      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .all
    position relative
    height 1000px
    background-color $color-mylove
    .cloudPicContainer
      position absolute
      .cloudPic
        width 100px
        height 174px
        position relative
        top 150px
    .back-container
      position: relative
      width 100%
      height 50px
      line-height 50px
      background-color $color-my
      .back-text
        margin-left 50px
        padding 10px
        background-color $color-mylove
        border-radius 5px
        cursor pointer
      .back-text:hover
        background-color #bc9045
    .pic-type-container
      width 410px
      height 80px
      position relative
      cursor pointer
      .pic-type
        width 100px
        height 80px
        display inline-block
        .pic-type-c
          width 100px
          height 80px
          background-size 100%
      .active-border
        width 100px
        height 80px
        position absolute
        border-bottom  6px solid $color-my
        top 0
        left 0
        z-index 2
        transition all 0.5s
    .big-pic
      height 370px
      width 100%
      display inline-block
      position absolute
      top 500px

    .timer
      position relative
      z-index 0
      margin-left 100px
      height 360px
      width 900px


  .mylove-enter-active, .mylove-leave-active
    transition all 0.5s
  .mylove-enter, .mylove-leave-to
    transform translate3d(100%,0,0)
</style>
