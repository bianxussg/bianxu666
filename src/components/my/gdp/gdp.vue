<template>
  <chart
    :options="this.option"

    ref="map"
    auto-resize
  />
</template>

<script>

  import {option} from './gdp.js'

  import ECharts from '@/baseComponents/echarts/ECharts'
  import 'echarts/lib/chart/map'

    export default {
        name: "gdp",
      data(){
          return{
            option:{}
          }
      },
      created(){
          this.option = option
      //  console.log(option,'option')
      },
      components:{
        chart :ECharts
      }
    }
</script>

<style scoped>

</style>
