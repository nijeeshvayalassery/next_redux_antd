import * as actions from './actions';

const initialState = {
  users: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_USER:
      return {
          ...state,
          users: [...state.users,action.user]
        }
      
    case actions.INIT_USERS:
        return {
          ...state,
          users: [...action.users]
        }

    case actions.DELETE_USER:
      return  {
        ...state,
        users:state.users.filter(item => item.id !== action.id)
      }

    case actions.SAVE_USER:
      const newData = [...state.users];
      const index = newData.findIndex(item => action.user.id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...action.user,
          newLine:false 
        });
      }

      return {
        ...state,
        users:newData
      }
    
    default:
      return state
  }
}

export default reducer;

