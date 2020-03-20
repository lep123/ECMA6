import axios from 'axios'
import _ from 'loadsh'
import qs from 'qs'
let cancelToken = axios.CancelToken
const cancel = []

const removePending = config => {
	for (let p in cancel) {
		if (cancel[p].u === config.url) {
				cancel[p].f()
		}
	}
}

// 请求拦截器 发送一个请求之前
axios.interceptors.request.use(config => {
	//在一个ajax发送前执行一下取消操作
	removePending(config)
	config.cancelToken = new cancelToken(c => {
		cancel.push({
			f: c,
			u: config.url,
		})
	})

	// 绑定key 值
	// config.data = { ...config.data.data, key: '5d2878270550ac239657ffa54edd96ff' }
	// config.headers = { ...config.headers, key: '5d2878270550ac239657ffa54edd96ff' }
	// config.token = JSON.parse( localStorage.getItem('persist: root')) .token
	// config.token = window.store.getState().login.token
	// config.data = qs.stringify({ ...config.data, token: window.store.getState().login.token })
	// config.data = { ...config.data, token: }
	return config
}, error => {
	return Promise.reject(error)
})

//添加响应拦截器
axios.interceptors.response.use(response => {
	return response
}, error => {
	switch (_.get(error, 'response.status', '')) {
		case 504:
			console.log('您已经断网了....')
			// window.location.href = 'http://localhost:3000/home'
			break

		default:
			break
	}
	return Promise.reject(error)
})

export function requestPost(url, action = {}) {
	const { userInfo } = JSON.parse( localStorage.getItem('persist:root') )
	let datas = ''
	if(userInfo){
		datas = { ...action, token: userInfo.substring(1,userInfo.length-1)}
	}else {
		datas = action
	}
	return new Promise((resolve, reject) => {
		axios({
			method: 'post',
			url,
			data: qs.stringify(datas),
		})
			.then(res => {
				console.log(res.data)
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export function requestGet(url, action = {}) {
	return new Promise((resolve, reject) => {
		axios({
			method: 'get',
			url,
			params: qs.stringify(action),
			
		})
			.then(res => {
				resolve(res.data)
			})
			.catch(err => {
				reject(err)
			})
	})
}
