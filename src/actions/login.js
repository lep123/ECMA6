import { requestPost } from '@/utils/request'
import { createActions } from 'redux-actions'
import Api from '@/services/api'
export const getUser = createActions({
    LOGIN: options => requestPost(Api.login, options),
})
 