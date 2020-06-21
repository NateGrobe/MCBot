import userService from '../services/user'

const channelReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_CHANNEL':{
      return action.user
    }
    case 'CLEAR_CHANNEL':
      return []
    default:
      return state
  }
}

export const findChannel = username => {
  return async dispatch => {
    const user = await userService.getUser(username)
    dispatch({
      type: 'GET_CHANNEL',
      user
    })
  }
}

export const clearChannel = () => {
  return async dispatch => {
    dispatch({
      type: 'CLEAR_CHANNEL'
    })
  }
}

export default channelReducer
