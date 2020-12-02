import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter)
//路由配置

const router = new VueRouter({
  routes: [
    // {
    //   path: '/index',
    //   meta: {
    //     title: '测试项目'
    //   },
    //   component: (resolve) => require(['./components/HelloWorld'], resolve)
    // },
    {
      path: '/index',
      meta: {
        title: '测试项目'
      },
      component: (resolve) => require(['./components/testgant'], resolve)
    },
    {
      path: '/second',
      meta: {
        title: '测试项目'
      },
      component: (resolve) => require(['./components/testone'], resolve)
    },
    {
      path: '/three',
      meta: {
        title: '测试项目'
      },
      component: (resolve) => require(['./components/testThree'], resolve)
    },
    {
      path: '/table',
      meta: {
        title: 'table'
      },
      component: (resolve) => require(['./components/table'], resolve)
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
});

//跳转后设置scroll为原点
router.afterEach(() => {
  window.scrollTo(0, 0);
  // console.log('sss', to, from, next)
});
//跳转前设置title
router.beforeEach((to, from, next) => {
  // console.log('sss', to, from, next)
  window.document.title = to.meta.title;
  next();
});

//商品列表路由配置
export default router;
