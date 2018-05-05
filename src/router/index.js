import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/homePage/homePage.vue'
import my from '@/components/my/my.vue'
import myLove from '@/components/loveCloud/all/all.vue'

Vue.use(Router)

export default new Router({
  routes: [

        {
          path:'/my',
          component:my
        },
        {
          path:'/myLove',
          component:myLove
        }

    ]
})
