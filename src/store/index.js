import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        session_key: window.localStorage.getItem("session_key")
    },
    mutations: {
        setSession(state,val) {
            state.session_key = val;
            if(navigator.cookieEnabled) {
                window.localStorage.setItem("session_key",val);
            }

        },
        clearSession(state) {
            state.session_key = "";
            if(navigator.cookieEnabled) {
                window.localStorage.removeItem("session_key");
            }
        },
        localSession(state) {
            state.session_key = window.localStorage.getItem("session_key");
        }
    }
})
