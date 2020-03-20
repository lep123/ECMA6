
import { handleActions } from 'redux-actions'

const defaultState = {
    userInfo:null,
}
export default handleActions({
    LOGIN: (state, action) => ({ ...state, userInfo: action.payload.result })
}, defaultState)
