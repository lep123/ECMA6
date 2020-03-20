import { requestPost } from '@/utils/request'
import { createActions } from 'redux-actions'
import Apis from '@/services/api'

export default  createActions({
    SET_DATA: options => requestPost(Apis.listData, options),
    FETCH_FAVORITE: options => requestPost(Apis.listData, options),

  })

