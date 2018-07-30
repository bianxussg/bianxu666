<template>
  <transition name="my">
    <div class="mydemo">
      <div class="back-container">
        <router-link ref="back" class="back-text" tag="span" to="/">返回</router-link>
      </div>
      <div class="nav">
        <span class="nav2048 navc" @click="choose('2048')">2048</span>
        <span class="nav-sharemoney navc" @click="choose('sharemoney')">分钱</span>
        <span class="nav-fivechess navc" @click="choose('五子棋')">五子棋</span>
        <span class="nav-echarts navc" @mouseenter.stop="showChild" @mouseleave.stop="hildChild">数据可视化之美</span>
          <div class="echarts-container" v-show="echartsFlag" @mouseenter.stop="showChild" @mouseleave.stop="hildChild">
            <span class="echarts" @click="choose('gdp')">各国人均寿命与GDP关系演变</span>
            <span class="echarts" @click="choose('pm')">pm2.5</span>
            <span class="echarts">其他3</span>
          </div>
        <span class="nav-3 navc">其他3</span>
      </div>
      <div class="show-demo" >
        <div class="game2048-container"  v-show="flag==='2048'">
          <game></game>
        </div>
        <div class="sharemoney-container"  v-show="flag==='sharemoney'">
          <sharemoney></sharemoney>
        </div>
        <div class="fivechess-container"  v-show="flag==='五子棋'">
          <fivechess></fivechess>
        </div>
        <div class="gdp-container"  v-show="flag==='gdp'">
          <gdp></gdp>
        </div>
        <div class="pm-container"  v-show="flag==='pm'">
          <pm></pm>
        </div>
      </div>

    </div>
  </transition>

</template>

<script type='text/ecmascript-6'>
    import game from './2048/game2048.vue'
    import sharemoney from './sharemoney/sharemoney.vue'
    import Fivechess from "./fivechess/fivechess";
    import pm from "./pm/map";
    import gdp from "./gdp/gdp.vue";
    import { Buried } from '@/libs/decorators';
    export default {
        data(){
          return {
            flag:'2048',
            echartsFlag:false,
            echartsFlagTimeout:null,
            echartsFlagTimeout1:null
          }
        },

      @Buried
        methods:{
          choose(flag){
              this.flag = flag
            return 'noBuried'
          },
          showChild(){
            if(this.echartsFlagTimeout1){
              clearTimeout(this.echartsFlagTimeout1)
            }
              this.echartsFlag = true
          },
          hildChild(){
            this.echartsFlagTimeout1 = setTimeout(()=>{
              this.echartsFlag = false
            },500)

          }
        },

        components:{
          Fivechess,
          game,
          sharemoney,
          pm,
          gdp
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
      width 100px
      z-index 5
      .navc
        padding 5px 10px
        width 80px
        text-align center
        letter-spacing 1px
        display inline-block
        margin-top 20px
        background-color $color-mylove
        border-radius 10px
        cursor pointer

        &.navc:hover
          background-color #ffa52a


      .echarts-container
        position absolute
        left 120px
        top 30px
        .echarts
          margin-top 10px
          padding 5px 10px
          border-radius 10px
          display inline-block
          width 120px
          text-align center
          background-color #e9e836
          cursor pointer
          &.echarts:hover
            background-color #e1e204

    .show-demo
      position relative
      .game2048-container
        position relative
        margin-left -450px
      .sharemoney-container
        position relative
        margin-left 150px
      .fivechess-container
        position relative
        margin-left 350px
        margin-top 200px

      .pm-container,.gdp-container
        position relative
        margin-left 350px
        margin-top 200px

  &.my-enter-active, &.my-leave-active
    transition all .5s
  &.my-enter, &.my-leave-to
    transform translate3d(-100%,0,0)
</style>
