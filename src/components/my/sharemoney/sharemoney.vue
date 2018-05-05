<template>
  <div class="container">
    <div class="text">
      模拟 100个人，每人100块钱，每人每轮随机给一块钱给随机的一个人，{{time}}轮后财产分布
    </div>
    <div class="control">
      <div class="start" @click="start">开始</div>
      <div class="stop" @click="stop">暂停</div>
    </div>
    <div>
      <div class="person" v-for="item in people">
        <span class="number">{{item.person}}</span>
        <span class="money" ref="money"></span>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>

    const TOTAL_PEOPLE = 100
    const TOTAL_MONEY = 100
    export default {
      data(){
        return{
          people:[],
          time:0,
          timer:{}
        }
      },
      mounted(){
        this.getPeople()
      },
      methods:{
        start(){
           this.timer = setInterval(()=>{
            this.changeMoney()
          },20)
        },
        stop(){
          clearInterval(this.timer)
        },
        getPeople(){
          let person ={}
          for(let i =0;i<TOTAL_PEOPLE;i++){
            person = {
                'person':i,
                'money':TOTAL_MONEY
            }
            this.people.push(person)
          }
        },
        setHeight(){
          for(let i =0;i<TOTAL_PEOPLE;i++){
            if(this.people[i].money>=0){
              this.$refs.money[i].style.height = this.people[i].money +'px'
              this.$refs.money[i].style.backgroundColor = '#a8a518'
            }else if(this.people[i].money<0){
              this.$refs.money[i].style.height = -this.people[i].money +'px'
              this.$refs.money[i].style.backgroundColor = '#2868ff'
              this.$refs.money[i].style.bottom = 400+this.people[i].money +'px'
            }
          }
        },
        sendMoney(){
          for(let i =0;i<TOTAL_PEOPLE;i++){
            this.people[i].money -= 1
            this.people[Math.floor(Math.random()*TOTAL_PEOPLE)].money += 1
          }
        },
        changeMoney(){
          for(let i=0;i<10;i++){
            this.sendMoney()
          }
          this.time += 10
          this.people.sort(this.sortMoney('money'))
          this.setHeight()
        },
        sortMoney(money){
         return function (a,b) {
           let value1 = a[money]
           let value2 = b[money]
           return value1 - value2
         }
        }
      }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .container
    position relative
    width 1600px
    height 800px
    border 2px solid $color-mylove
    padding 0
    margin-top 100px
    color $color-text
    font-size 18px
    font-weight 600
    .control
      position absolute
      display inline-block
      margin-top -80px
      left: 50%
      transform translate3d(-50%,0,0)
      .start
        position relative
        display inline-block
        margin-right 50px
      .start:hover
        cursor pointer
        color $color-mylove
      .stop
        position relative
        display inline-block
      .stop:hover
        cursor pointer
        color $color-mylove
    .text
      position absolute
      display inline-block
      margin-top -50px
      left: 50%
      transform translate3d(-50%,0,0)

    .person
      list-style none
      display inline-block
      margin 0 1px
      width 14px
      box-sizing border-box
      .number
        font-size 12px
        position absolute
        top 10px
        display inline-block
      .money
        position absolute
        display inline-block
        bottom 400px
        width 14px
</style>
