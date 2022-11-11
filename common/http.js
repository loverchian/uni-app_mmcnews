//import store  from '../store/index.js'

export default function $http(options) {

	const {url,data} = options	
    //console.log('在http.js中的输出:',options)
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name:url,
			data
		}).then(res => {
			if (res.result.code === 200) {
					resolve(res.result)
			}else {
				reject(res.result)
			}
		}).catch(err => {
			reject(err)
		})
	})
}
