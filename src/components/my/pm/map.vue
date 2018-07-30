<template>
  <div>
    <div class="pm" id="pm"  ref="map"></div>

    <aside
      v-show="open"
      @click="open = false"
    >
      <img
        v-if="img.src"
        :src="img.src"
        :width="img.width"
      >
    </aside>
  </div>

</template>

<script>
  import echarts from 'echarts'
  import chinaMap from './china.json'
  import option from './data/map'
  echarts.registerMap('china', chinaMap)
    export default {
      data(){

        return{
          expand: {
            map: true
          },
          polarTheme: 'dark',
          seconds: -1,
          asyncCount: false,
          connected: true,
          metricIndex: 0,
          open: false,
          img: {}
        }
      },
      mounted () {
        this.init()
      },
      computed:{

      },
      methods: {
        init(){
          let echartsPM = echarts.init(document.getElementById('pm'));
          echartsPM.setOption(option)
        },
       convert () {
           console.log('convert')
           let map = this.$refs.map
           console.log(map.style,'map')
           let width= 300

           let height= 300
           console.log(width, '和',height)
           this.img = {
             src: map.getDataURL({
               pixelRatio: window.devicePixelRatio || 1
             }),
             width,
             height
           }
           console.log(this.img,'img')
           this.open = true
        },
      },
      watch: {

      },

    }
</script>

<style scoped lang="stylus">
  .pm{
    width: 500px;
    height: 500px;
  }
</style>
