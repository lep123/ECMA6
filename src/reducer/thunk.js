const defaultState = {
  name: '',
}
export default function (state = defaultState, action) {
  switch (action.type) {
    case 'ABC':
    return { ...state, name: action.payload}

    default:
      return state
  }
}