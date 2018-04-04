import { baseUrl } from './env'
import store from '../store'
import router from '../router'
import vue from 'vue'
// 引入axios
import axios from "axios"
axios.defaults.withCredentials = true;
var CancelToken = axios.CancelToken;
var source = CancelToken.source();
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
        source.cancel()
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
		let params = new FormData()
		Object.keys(param).forEach(key => {
			params.append(key,param[key])
		});

    	Object.assign(requestConfig,{data:params})
    }

    return new Promise((resolve, reject) => {
        axios(Object.assign({url:url,cancelToken: source.token, method:type},requestConfig)).
        then((res)=> {
            resolve(res)
        }).
        catch((err)=> {
            reject(err)
        })

    })



	// var fd = new FormData()
	// fd.append('file', files[0])
	// let config = {
	//     headers: {
	//         'Content-Type': 'multipart/form-data'
	//     }
	// }
	// axios.post(that.uploadUrl, fd,config).then( res => {
	//     console.log(res)
	// }).catch( res => {
	//     console.log(res)
	// })

	//http.js
//设置请求baseURL
// axios.defaults.baseURL = '/api'
// //设置默认请求头
// axios.defaults.headers = {
// "Content-Type": "application/x-www-form-urlencoded"
// }
// // 发送请求前处理request的数据
// axios.defaults.transformRequest = [function (data) {
// let newData = ''
// for (let k in data) {
//   newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
// }
// return newData
// }]
// // 带cookie请求
// axios.defaults.withCredentials = true

	// if (window.fetch && method == 'fetch') {
	// 	let requestConfig = {
	// 		credentials: 'include',
	// 		method: type,
	// 		headers: {
	// 			'Accept': 'application/json',
	// 			'Content-Type': 'application/json'
	// 		},
	// 		mode: "cors",
	// 		cache: "force-cache"
	// 	}
    //
	// 	if (type == 'POST') {
	// 		Object.defineProperty(requestConfig, 'body', {
	// 			value: JSON.stringify(data)
	// 		})
	// 	}
    //
	// 	try {
	// 		const response = await fetch(url, requestConfig);
	// 		const responseJson = await response.json();
	// 		return responseJson
	// 	} catch (error) {
	// 		throw new Error(error)
	// 	}
	// } else {
	// 	return new Promise((resolve, reject) => {
	// 		let requestObj;
	// 		if (window.XMLHttpRequest) {
	// 			requestObj = new XMLHttpRequest();
	// 		} else {
	// 			requestObj = new ActiveXObject;
	// 		}
    //
	// 		let sendData = '';
	// 		if (type == 'POST') {
	// 			sendData = JSON.stringify(data);
	// 		}
    //
	// 		requestObj.open(type, url, true);
	// 		requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	// 		requestObj.send(sendData);
    //
	// 		requestObj.onreadystatechange = () => {
	// 			if (requestObj.readyState == 4) {
	// 				if (requestObj.status == 200) {
	// 					let obj = requestObj.response
	// 					if (typeof obj !== 'object') {
	// 						obj = JSON.parse(obj);
	// 					}
	// 					resolve(obj)
	// 				} else {
	// 					reject(requestObj)
	// 				}
	// 			}
	// 		}
	// 	})
	// }
}
