import Vue from 'vue'
// import Router from 'vue-router'
import Home from './views/Home.vue'

//路由类  模拟vue路由原理实现简易的路由
class Router {
    constructor(options){
        //保存传进来的路由配置
        this.$options = options
        //创建路由映射
        this.routeMap = {}
        //路由的响应式
        this.app = new Vue({
            data: {
                current: "/"
            }
        })
    }
    init(){
        //绑定事件 监听url变化
        this.bindEvent()
        //解析路由配置
        this.createRouteMap(this.$options)
        //实现两个组件
        this.initComponent()
    }
    bindEvent(){
        window.addEventListener('load',this.onhashChange.bind(this))
        window.addEventListener('hashchange',this.onhashChange.bind(this))
    }
    onhashChange(){
        this.app.current = window.location.hash.slice(1) || '/'
    }
    createRouteMap(options){
        options.routes.forEach(item=>{
            this.routeMap[item.path] = item.component
        })
    }
    initComponent(){
        //router-link router-view两个组件的实现
        Vue.component('router-link',{
            props: {to: String},
            render(h) {
                return h('a',{attrs: {href: "#"+this.to}},[
                    this.$slots.default
                ])
            },
        })
        Vue.component('router-view',{
            render: h=>{
                const comp = this.routeMap[this.app.current]
                return h(comp)
            }
        })
    }
    
}
Router.install = function(Vue){
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        },
    })
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
