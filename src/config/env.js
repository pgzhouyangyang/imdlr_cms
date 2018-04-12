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
	// baseUrl =  "http://101.26.83.6:8186"
	baseUrl =  "https://imqw.com.cn/imdlr"
}else{
	  baseUrl =  "https://imqw.com.cn/imdlr"
      baseImgPath = '';
}

export {
	baseUrl,
	baseImgPath
}
