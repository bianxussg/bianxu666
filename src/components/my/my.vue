<template>
  <transition name="my">
    <div class="mydemo">
      <div class="back-container">
        <router-link ref="back" class="back-text" tag="span" to="/">返回</router-link>
      </div>
      <div class="nav">
        <span class="nav2048 navc" @click="choose('2048')">2048</span>
        <span class="nav-sharemoney navc" @click="choose('sharemoney')">分钱</span>
        <span class="nav-1 navc">其他1</span>
        <span class="nav-2 navc">其他2</span>
        <span class="nav-3 navc">其他3</span>
      </div>
      <div class="show-demo" >
        <div class="game2048-container"  v-show="flag==='2048'">
          <game></game>
        </div>
        <div class="sharemoney-container"  v-show="flag==='sharemoney'">
          <sharemoney></sharemoney>
        </div>
      </div>

    </div>
  </transition>

</template>

<script type='text/ecmascript-6'>
    import game from './2048/game2048.vue'
    import sharemoney from './sharemoney/sharemoney.vue'
    export default {
        data(){
          return {
            flag:'2048'
          }
        },
        methods:{
          choose(flag){
              this.flag = flag
          }
        },
        components:{
          game,
          sharemoney
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .mydemo
    position relative
    width 1800px
    height 1000px
    background-color $color-my
    .back-container
      height 50px
      line-height 50px
      background-color $color-mylove
      .back-text
        margin-left 50px
        padding 10px
        background-color $color-my
        border-radius 5px
        cursor pointer
      .back-text:hover
        background-color #ffa52a
    .nav
      position absolute
      top 300px
      left 50px
      width 60px
      z-index 5
      .navc

        width 50px
        height 30px
        line-height 30px
        text-align center
        display inline-block
        margin-top 20px
        background-color $color-mylove
        border-radius 10px
        padding 5px
        cursor pointer

        &.navc:hover
          background-color #ffa52a


    .show-demo
      position relative
      .game2048-container
        position relative
        margin-left -450px
      .sharemoney-container
        position relative
        margin-left 150px
  &.my-enter-active, &.my-leave-active
    transition all .5s
  &.my-enter, &.my-leave-to
    transform translate3d(-100%,0,0)
</style>
