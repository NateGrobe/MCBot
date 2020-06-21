import userService from '../services/user'

const userReducer = (state = [], action) => {
  switch(action.type) {
    case 'GET_USER':{
      return action.user
    }
    default:
      return state
  }
}

export const findUserId = username => {
  return async dispatch => {
    const user = await userService.getUser(username)
    dispatch({
      type: 'GET_USER',
      user
    })
  }
}

export default userReducer
