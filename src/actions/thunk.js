import { requestPost } from '@/utils/request'
import apis from '@/services/api'

export default function thunkFn () {
  return function (dispatch) {
    requestPost(apis.testData)
      .then(res => {
        dispatch({
          type: 'ABC',
          payload: res.result.list
        })
      })
  }
}