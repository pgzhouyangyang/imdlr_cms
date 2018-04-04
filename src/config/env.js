/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * baseImgPath: 图片存放地址
 *
 */
let baseUrl = '';
let baseImgPath;
if (process.env.NODE_ENV == 'development') {
	baseUrl =  "http://101.26.83.6:8186"
	// baseUrl =  "http://121.42.246.183:8099"
    baseImgPath = 'http://localhost:8080/img/';
}else{
	  baseUrl = 'http://101.26.83.6:8186';
	  // baseUrl =  "http://121.42.246.183:8099"
      baseImgPath = '';
}

export {
	baseUrl,
	baseImgPath
}
