import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        session_key: window.localStorage.getItem("session_key"),
        adminName: ""
    },
    mutations: {
        setSession(state,val,name) {
            state.session_key = val;
            if(navigator.cookieEnabled) {
                window.localStorage.setItem("session_key",val);
            }

        },
        clearSession(state) {
            state.session_key = "";
            state.adminName = "";
            if(navigator.cookieEnabled) {
                window.localStorage.removeItem("session_key");
                window.localStorage.removeItem("adminName");
            }
        },
        localSession(state) {
            state.session_key = window.localStorage.getItem("session_key");
            state.adminName = window.localStorage.getItem("adminName");
        },
        setAdminName(state,name) {
            state.adminName = name;
            if(navigator.cookieEnabled) {
                window.localStorage.setItem("adminName",name);
            }
        }
    }
})
