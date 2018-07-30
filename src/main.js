// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//import ECharts from 'vue-echarts/components/ECharts.vue'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/scatter'
import 'echarts/lib/chart/effectScatter'

/*function leStatic(actiontype, pagetype='',backup = {}){

}*/

   Vue.prototype.$log = function leStatic(actiontype){
      console.log('$log',actiontype)
   };



// 注册组件后即可使用
//Vue.component('chart', ECharts)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
