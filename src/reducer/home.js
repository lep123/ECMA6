import { handleActions } from 'redux-actions'

// 最外层 必须这么写
const defaultState = {
  data: []
}

export default handleActions({
  SET_DATA: (state, action) => ({ ...state, data: action.payload }),
  FETCH_FAVORITE : (state, action) => {
    console.log(action,1)
    return {
      ...state,
      data: action.payload.result.list,
    }
  }


}, defaultState)

