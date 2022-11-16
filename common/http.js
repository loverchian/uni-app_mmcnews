//import store  from '../store/index.js'

export default function $http(options) {

	const {url,data} = options	
	const dataObj = {
			user_id:'635fe887b1fb0700017c0894',
			...data
		}
    //console.log('在http.js中的输出:',options)
	return new Promise((resolve, reject) => {
		uniCloud.callFunction({
			name:url,
			data:dataObj
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
