import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
//配置Vuex状态管理
const store = new Vuex.Store({
    state: {
        productList: []
    },
    getters: {
        // brands: state => {
        //   const brands = state.productList.map(item => item.brand);
        //   return util.getFilterArray(brands);
        // },
    },
    //mutations只能以同步方式
    mutations: {
        //获取数据
        setProductList(state, data) {
            state.productList = data;
        },
    },
    actions: {
        projectData(state, data) {
            console.log('sss', state, data)
            return new Promise(resolve => {
                resolve();
            });
        },
    }
});
export default store;