<template>
    <div class="fivechess">
      <canvas id="canvas" class="canvas" width="450px" height="450px" @click="downChess"></canvas>
    </div>
</template>

<script>
  export default {
    name: "fivechess",
    data(){
      return{
        ctx:'',
        chessBoardArray:[],
        me:true,
        wins:[],//所有赢法的情况
        count:0,
        myWin:[],
        computerWin:[],
        over:false
      }
    },
    mounted(){
      if(localStorage.getItem('qwe')){
     //   console.log(localStorage.getItem('qwe'))
      }
      this.getCtx()
      this.initWins()
      this.win()
    },
    methods:{
      getCtx(){
        let canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d')
        this.initChessBoardLine(this.ctx)
        this.initChessBoardArray()
       // console.log(this.chessBoardArray,'chessBoardArray')
      },
      initChessBoardLine(ctx){
        ctx.beginPath()
        ctx.lineStyle= '#2da418'
        for(let i=0;i<15;i++){
          ctx.moveTo(15+i*30,15)
          ctx.lineTo(15+i*30,435)
          ctx.stroke()
        }
        for(let i=0;i<15;i++){
          ctx.moveTo(15,15+i*30)
          ctx.lineTo(435,15+i*30)
          ctx.stroke()
        }
        ctx.closePath()
      },
      initChessBoardArray(){
        for(let i=0;i<15;i++){
          this.chessBoardArray[i] = []
          for(let j=0;j<15;j++){
            this.chessBoardArray[i][j] = 0
          }
        }
      },
      oneStep(x,y,me){
        this.ctx.beginPath()
        if( this.chessBoardArray[x][y] === 0 ){
          if(me){
            this.ctx.fillStyle = '#e0dce1'
            this.chessBoardArray[x][y] = 1  //我方下了后 数组点赋值为1
          }else {
             this.ctx.fillStyle = '#080709'
             this.chessBoardArray[x][y] = 2 //AI方下了后 数组点赋值为2
           }
        }else{
          return
        }
        this.ctx.arc(15+x*30,15+y*30,13,0,Math.PI*2)
        this.ctx.fill()
        this.ctx.closePath()
      },
      downChess(e){
        if(this.over){
          return
        }
        if(!this.me){
          return
        }
        let x = Math.floor(e.offsetX/30)
        let y = Math.floor(e.offsetY/30)
         this.oneStep(x,y,true)


        for(let i=0;i<this.count;i++){
          if(this.wins[x][y][i]){
            this.myWin[i]++
            this.computerWin[i] = 6
            if(this.myWin[i] ===5){
              setTimeout(()=>{
                alert('你赢了')
                this.over = true
              })

            }
          }
        }
        if(!this.over){
          this.me = !this.me
          this.computerAI()
        }

      },
      computerAI(){
        console.log('进computerai')
        let myScore = []
        let computerScore = []
        let max = 0
        let u, v = 0 //最高分数点的坐标
        for(let i=0;i<15;i++){
          myScore[i] = []
          computerScore[i] = []
          for(let j=0;j<15;j++){
            myScore[i][j] = 0
            computerScore[i][j] = 0
          }
        }
       // console.log(computerScore,'computerScore')
        for(let i=0;i<15;i++){
          for(let j=0;j<15;j++){
            if(this.chessBoardArray[i][j]===0){
              for(let k=0;k<this.count;k++){
                if(this.wins[i][j][k]){
                  if(this.myWin[k]===1){
                    myScore[i][j] += 200
                  }else if(this.myWin[k]===2){
                    myScore[i][j] += 400
                  }else if(this.myWin[k]===3){
                    myScore[i][j] += 2000
                  }else if(this.myWin[k]===4){
                    myScore[i][j] += 10000
                  }
                  if(this.computerWin[k]===1){
                    computerScore[i][j] += 220
                  }else if(this.computerWin[k]===2){
                    computerScore[i][j] += 420
                  }else if(this.computerWin[k]===3){
                    computerScore[i][j] += 2200
                  }else if(this.computerWin[k]===4){
                    computerScore[i][j] += 20000
                  }
                }
              }
              if(myScore[i][j]>max){
                max = myScore[i][j]
                u = i
                v = j
              }else if(myScore[i][j]===max){
               /* if(computerScore[i][j] > computerScore[u][v]){
                  u = i
                  v = j
                }*/
              }

              if(computerScore[i][j]>max){
                max = computerScore[i][j]
                u = i
                v = j
              }else if(myScore[i][j]===max){
                /*if(myScore[i][j]>myScore[u][v]){
                  u = i
                  v = j
                }*/
              }
            }
          }
        }
        this.oneStep(u,v,false)
        for(let i=0;i<this.count;i++){
          if(this.wins[u][v][i]){
            this.computerWin[i]++
            this.myWin[i] = 6
            if(this.computerWin[i] ===5){
              setTimeout(()=>{
                alert('计算机赢了')
                this.over = true
              })
            }
          }
        }
        if(!this.over){
          this.me = !this.me
        }

      },
      initWins(){
        //赢法数组
        for(let i =0;i<15;i++){
          this.wins[i] = []
          for(let j=0;j<15;j++){
            this.wins[i][j] = []
          }
        }
        //所有竖着
        for(let i =0;i<15;i++){
          for(let j=0;j<11;j++){
            for(let k=0;k<5;k++){
              this.wins[i][j+k][this.count] = true
            }
            this.count ++
          }
        }

        //所有横着
        for(let i =0;i<15;i++){
          for(let j=0;j<11;j++){
            for(let k=0;k<5;k++){
              this.wins[j+k][i][this.count] = true
            }
            this.count ++
          }
        }

        //所有斜线
        for(let i =0;i<11;i++){
          for(let j=0;j<11;j++){
            for(let k=0;k<5;k++){
              this.wins[i+k][j+k][this.count] = true
            }
            this.count ++
          }
        }

        //所有反斜线
        for(let i =0;i<11;i++){
          for(let j=14;j>3;j--){
            for(let k=0;k<5;k++){
              this.wins[i+k][j-k][this.count] = true
            }
            this.count ++
          }
        }

      //  console.log(this.count,'this.count')
      },
      win(){
        for(let i=0;i<this.count;i++){
          this.myWin[i] = 0
          this.computerWin[i] = 0
        }
      }






    }
  }
</script>

<style scoped  lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  .fivechess
    .canvas
      border 1px solid $color-mylove
</style>
