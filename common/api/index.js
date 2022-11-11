
//批量导出文件
const requireApi = require.context(  //常常用来在组件内引入多个组件
	// api 目录的相对路径
	'.',
	// 是否查询子目录
	false,
	// 查询文件的一个后缀，使用正则来匹配
	/.js$/
)


let module = {}

requireApi.keys().forEach( (key,index) => {
	if ( key === './index.js') return
	Object.assign(module,requireApi(key))//方法只会拷贝源对象自身的并且可枚举的属性到目标对象
	
})
//console.log('在index.js中的打印:',module);
export default module
