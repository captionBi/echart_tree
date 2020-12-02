import MyLoading from './loading.vue'
const Loading = {
    install: (Vue) => {
        Vue.component('Loading', MyLoading)
    }
}
export default Loading