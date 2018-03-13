import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        breadListState: [
            {
                name: "账号管理",
                path: "/"
            },
            {
                name: "待审核列表",
                path: "/authstr"
            }
        ]
    },
    mutations: {
        breadListMutations(state,list){
          state.breadListState = list
        }
    }
})
