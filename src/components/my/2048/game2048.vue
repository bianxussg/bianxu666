<template>
  <div class="game">
    <div class="header">
      <h1>2048</h1>
      <span class="start" @click="again()">NEW GAME</span>
      <div class="score">score:{{score}}</div>
      <p>分别用wsad键盘，控制上下左右</p>
    </div>
    <div class="cube-game">
      <div class="cube" v-for="itemf in board">
        <!-- <transition name="cube">-->
        <span ref="cube"  v-show="itemc!==0"  class="cube-child"
              v-for="itemc in itemf">{{itemc}}</span>
        <!-- </transition>-->

      </div>
    </div>
    <div class="layer" v-if="loseFlag">
      <div class="contain">
        <h1 class="">您输了哦~~</h1>
        <div class="again" @click="again">在来一局</div>
        <div class="cancel" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
  import Vue from 'vue'
  export default {
    data(){
      return{
        score:0,
        color:['#FFFF06','#6DC307','#ffd702','#07ff6e','#066A34'
          ,'#4890B1','#0D3EFF','#7C0BFF','#c203ff','#FF12DC','#FF1627','#FF5F1F'],
        board:[
          [2,2,8,0],
          [0,0,0,0],
          [0,0,2,2],
          [2,4,2,0]
        ],
        loseFlag:false
      }
    },
    mounted(){
      this.init()
      this.getColor()
      let _this = this
      document.addEventListener('keydown',function (e) {
        if(e.keyCode===87){//up
          _this.up()
        }else if(e.keyCode===68){//right
          _this.right()
        }else if(e.keyCode===83){//down
          _this.down()
        }else if(e.keyCode===65){//left
          _this.left()
        }
        //  Vue.set(this.board)
      })
    },
    watch:{
      /* board: {
       handler () {
       console.log('obj.a changed')
       },
       //immediate: true,
       deep: true
       }*/
    },
    computed:{

    },
    created(){

    },
    methods:{
      init(){
        let cube = this.$refs.cube
        for(let i = 0;i<4;i++){
          for(let j=0;j<4;j++){
            let x = i*4 +j
            cube[x].style.top = `${i*120+20}px`
            cube[x].style.left = `${j*120+20}px`
          }
        }
      },
      getColor(){
        let cube = this.$refs.cube
        for(let i = 0;i<4;i++) {
          for (let j = 0; j < 4; j++) {
            for(let m = 0;m<this.color.length;m++){
              let x = i*4 +j
              if(cube[x].innerHTML === `${Math.pow(2,m)}` && cube[x].innerHTML !=='0'){
                cube[x].style.backgroundColor = this.color[m]
              }
            }
          }
        }
      },
      lose(){
        this.loseFlag = true
      },
      again(){
        this.loseFlag=false
        this.board=[
          [0,0,0,0],
          [0,0,0,0],
          [0,0,2,2],
          [2,4,2,0]
        ]
        this.$set(this.board)
        this.$nextTick(()=>{
          this.getColor()
        })
        this.score = 0
      },
      cancel(){
        this.loseFlag=false
      },
      addNew(board){
        let index = 0
        let cutArr = []
        for(let i = 0;i<=3;i++) {
          for (let j = 0;j <=3;j++) {
            if(board[i][j]===0){
              cutArr.push(index)
              index ++
            }
          }
        }
        if(cutArr.length===0){
          this.lose()
        }

        index = 0
        let two = this.getTwo(cutArr)
        for(let i = 0;i<=3;i++) {
          for (let j = 0;j <=3;j++) {
            if(board[i][j]===0){
              if(two[0]===index ||  (two[1] && two[1] === index)){
                board[i].splice(j,1,2)
              }
              index++
            }
          }
        }


      },
      getTwo(arr){
        let two = []
        if(arr.length===1){
          two[0] = 0
          return two
        }

        if(arr.length>=2){
          let index1 = Math.floor(Math.random()*arr.length)
          let index2 = Math.floor(Math.random()*arr.length)
          two.push(index1)
          two.push(index2)
          if(index1===index2){
            if(index1===arr.length ){
              index1--
            }else if(index1===0){
              index1++
            }
          }
          return two
        }

      },
      addScore(score){
        this.score += score
      },
      up(){

        // this.tempBoard = this.board
        // 是够合并
        for(let i = 3;i>=0;i--) {
          for (let j = 3;j >=0;j--) {
            if(this.board[i][j] !== 0){
              if(i>0 && this.board[i][j]===this.board[i-1][j]){
                let temp = this.board[i-1][j]
                this.board[i-1].splice(j,1,temp * 2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
              if(i>1 && this.board[i][j]===this.board[i-2][j] && this.board[i-1][j] ===0){
                let temp = this.board[i-2][j]
                this.board[i-2].splice(j,1,temp * 2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
              if(i>2 && this.board[i][j]===this.board[i-3][j] && this.board[i-1][j] ===0  && this.board[i-2][j] ===0){
                let temp = this.board[i-3][j]
                this.board[i-3].splice(j,1,temp * 2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
            }
          }
        }

        //是否向上移动
        //this.$set(this.board)
        for(let i = 3;i>=0;i--) {
          for (let j = 3;j >=0;j--) {
            if(this.board[i][j] === 0){
              if(i !== 3){
                let temp1 = this.board[i+1][j]
                this.board[i].splice(j,1,temp1)
                this.board[i+1].splice(j,1,0)
                if(i<2 && this.board[i+2][j] !== 0){
                  let temp2 = this.board[i+2][j]
                  this.board[i+1].splice(j,1,temp2)
                  this.board[i+2].splice(j,1,0)
                }
                if(i<1 && this.board[i+3][j] !== 0){
                  let temp2 = this.board[i+3][j]
                  this.board[i+2].splice(j,1,temp2)
                  this.board[i+3].splice(j,1,0)
                }
              }
            }
          }
        }
        this.addNew(this.board)
        this.$nextTick(()=>{
          this.getColor()
        })


      },
      down(){
        //是否合并
        for(let i = 0;i<=3;i++) {
          for (let j = 0;j<=3;j++) {
            if(this.board[i][j] !== 0){
              if(i <3 && this.board[i][j]===this.board[i+1][j]){
                let temp = this.board[i][j]
                this.board[i+1].splice(j,1,temp*2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
              if(i<2 && this.board[i][j]===this.board[i+2][j] && this.board[i+1][j]===0){
                let temp = this.board[i][j]
                this.board[i+2].splice(j,1,temp*2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
              if(i<1 && this.board[i][j]===this.board[i+3][j] && this.board[i+1][j]===0 && this.board[i+2][j]===0){
                let temp = this.board[i][j]
                this.board[i+3].splice(j,1,temp*2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
            }
          }
        }
        //是否向下移动
        for(let i = 0;i<=3;i++) {
          for (let j = 0;j <=3;j++) {
            if(this.board[i][j] === 0){
              if(i !== 0){
                let temp1 = this.board[i-1][j]
                this.board[i-1].splice(j,1,0)
                this.board[i].splice(j,1,temp1)
                if(i>1 && this.board[i-2][j] !== 0){
                  let temp2 = this.board[i-2][j]
                  this.board[i-1].splice(j,1,temp2)
                  this.board[i-2].splice(j,1,0)
                }
                if(i>2 && this.board[i-3][j] !== 0){
                  let temp2 = this.board[i-3][j]
                  this.board[i-2].splice(j,1,temp2)
                  this.board[i-3].splice(j,1,0)
                }
              }
            }
          }
        }
        this.addNew(this.board)
        this.$nextTick(()=>{
          this.getColor()
        })
      },
      right(){
        //是否合并
        for(let i = 0;i<=3;i++) {
          for (let j = 0;j <=3;j++) {
            if(this.board[i][j] !== 0){
              if(j <3 && this.board[i][j]===this.board[i][j+1]){
                let temp = this.board[i][j]
                this.board[i].splice(j+1,1,temp*2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
              if(j<2 && this.board[i][j]===this.board[i][j+2] && this.board[i][j+1]===0){
                let temp = this.board[i][j]
                this.board[i].splice(j+2,1,temp*2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
              if(j<1 && this.board[i][j]===this.board[i][j+3] && this.board[i][j+1]===0 && this.board[i][j+2]===0){
                let temp = this.board[i][j]
                this.board[i].splice(j+3,1,temp*2)
                this.board[i].splice(j,1,0)
                this.addScore(temp * 2)
              }
            }
          }
        }
        //是否向右移动
        for(let i = 0;i<=3;i++) {
          for (let j = 0;j <=3;j++) {
            if(this.board[i][j] === 0){
              if(j !== 0){
                let temp1 = this.board[i][j-1]
                this.board[i].splice(j-1,1,0)
                this.board[i].splice(j,1,temp1)
                if(j>1 && this.board[i][j-2] !== 0){
                  let temp2 = this.board[i][j-2]
                  this.board[i].splice(j-1,1,temp2)
                  this.board[i].splice(j-2,1,0)
                }
                if(j>2 && this.board[i][j-3] !== 0){
                  let temp2 = this.board[i][j-3]
                  this.board[i].splice(j-2,1,temp2)
                  this.board[i].splice(j-3,1,0)
                }
              }
            }
          }
        }
        this.addNew(this.board)
        this.$nextTick(()=>{
          this.getColor()
        })
      },
      left(){
        //是否合并
        for(let i = 3;i>=0;i--) {
          for (let j = 3;j>=0;j--) {
            if(this.board[i][j] !== 0){
              if(j <3 && this.board[i][j]===this.board[i][j+1]){
                let temp = this.board[i][j]
                this.board[i].splice(j,1,temp*2)
                this.board[i].splice(j+1,1,0)
                this.addScore(temp * 2)
              }
              if(j<2 && this.board[i][j]===this.board[i][j+2] && this.board[i][j+1]===0){
                let temp = this.board[i][j]
                this.board[i].splice(j,1,temp*2)
                this.board[i].splice(j+2,1,0)
                this.addScore(temp * 2)
              }
              if(j<1 && this.board[i][j]===this.board[i][j+3] && this.board[i][j+1]===0 && this.board[i][j+2]===0){
                let temp = this.board[i][j]
                this.board[i].splice(j,1,temp*2)
                this.board[i].splice(j+3,1,0)
                this.addScore(temp * 2)
              }
            }
          }
        }
        //是否向左移动
        for(let i = 3;i>=0;i--) {
          for (let j = 3;j>=0;j--) {
            if(this.board[i][j] === 0){
              if(j !== 3){
                let temp1 = this.board[i][j+1]
                this.board[i].splice(j+1,1,0)
                this.board[i].splice(j,1,temp1)
                if(j<2 && this.board[i][j+2] !== 0){
                  let temp2 = this.board[i][j+2]
                  this.board[i].splice(j+1,1,temp2)
                  this.board[i].splice(j+2,1,0)
                }
                if(j<1 && this.board[i][j+3] !== 0){
                  let temp2 = this.board[i][j+3]
                  this.board[i].splice(j+2,1,temp2)
                  this.board[i].splice(j+3,1,0)
                }
              }
            }
          }
        }
        this.addNew(this.board)
        this.$nextTick(()=>{
          this.getColor()
        })
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .game
    position relative
    .header
      position relative
      text-align center
      .start
        display inline-block
        padding 10px
        border-radius 10px
        background-color $color-mylove
      .start:hover
        background-color #ffa52a
        cursor pointer
      .score
        position relative
        margin-top 20px
    .cube-game
      width 508px
      height 508px
      position relative
      box-sizing border-box
      margin 50px auto
      border 4px solid $color-mylove
      padding 20px
      border-radius 10px
      .cube
        .cube-child
          width 100px
          height 100px
          line-height 100px
          display inline-block
          position absolute
          border-radius 6px
          text-align center
          font-size 30px
          font-weight 700
    /* &.cube-enter-active, &.cube-leave-active
       transition all 0.2s*/
    .layer
      position fixed
      top 0
      left 0
      bottom 0
      right 0
      background rgba(0,0,0,0.2)
      .contain
        position absolute
        background-color white
        padding 20px
        top 50%
        left 50%
        transform translate3d(-50%,-50%,0)
        z-index 5
        border-radius 10px
        .again
          display inline-block
          padding 10px
          background-color $color-mylove
          border-radius 3px
          cursor pointer
        .again:hover
          background-color #ffa52a
        .cancel
          display inline-block
          padding 10px
          background-color $color-mylove
          border-radius 3px
          margin-left 20px
          cursor pointer
        .cancel:hover
          background-color #ffa52a
</style>
