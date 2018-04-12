import { baseUrl } from './env'
import store from '../store'
import router from '../router'
import vue from 'vue'
// 引入axios
import axios from "axios"
axios.defaults.withCredentials = true;
// axios.defaults.timeout = 2500;
// http request 拦截器
axios.interceptors.request.use(
    config => {
        // config.heards["Access-Control-Allow-Origin"] = "*";

		if(config.methods == "post") {
			config.heards["Content-Type"] = "multipart/form-data";
		}
        // config.headers['Cookie'] = "JSESSIONID=" + store.state.session_key;
        if (store.state.session_key) {  // 判断是否存在session_key，如果存在的话，则每个http header都加上session_key
            // config.headers.Authorization = store.state.session_key;


        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {

        switch (response.data.errcode) {
            case 60000:
                vue.prototype.$message.error(response.data.errmsg);
                break;
            case 60101:
                // 返回 401 清除token信息并跳转到登录页面
                store.commit("clearSession");

                vue.prototype.$alert("登录超时，请重新登录","提示",{
                    type: 'warning'
                }).then(()=> {
                    router.replace({
                        path: '/login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
                }).catch(()=> {

                })
                break;
            case 60102:
                vue.prototype.$message.error(response.data.errmsg);
                break;
            case 60103:
                vue.prototype.$message.error(response.data.errmsg);
                break;
            case 60106:
                vue.prototype.$message.error(response.data.errmsg);
                break;
        }
        return response;
    },
    error => {
        vue.prototype.$message.error("服务器异常请联系管理员");
        // if (error.response) {
        //     switch (error.response.status) {
        //         case 401:
        //             // 返回 401 清除token信息并跳转到登录页面
        //             store.commit("USER_EXIT");
        //             router.replace({
        //                 path: 'login',
        //                 query: {redirect: router.currentRoute.fullPath}
        //             })
        //     }
        // }
        // return Promise.reject(error.response)   // 返回接口返回的错误信息
    }
);
//*/


export default (url = "", {appendUrl = "", param = {}} = {}, type = "GET") => {
	type = type.toUpperCase();
	url = baseUrl + url ;
	if(appendUrl) {
		url += appendUrl
	}
	if(type == "GET") {
		if (Object.keys(param).length) {
			let dataStr = ''; //数据拼接字符串
			Object.keys(param).forEach(key => {
				dataStr += key + '=' + param[key] + '&';
			})

			if (dataStr !== '') {
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
			}
		};
	}
	let requestConfig = {

    };
    if (type == 'POST') {
		let params = new FormData();
		Object.keys(param).forEach(key => {
			params.append(key,param[key])
		});

    	Object.assign(requestConfig,{data:params})
    }

    return new Promise((resolve, reject) => {
        axios(Object.assign({url:url,method:type},requestConfig)).
        then((res)=> {
            resolve(res)
        }).
        catch((err)=> {
            reject(err)
        })

    })
}
