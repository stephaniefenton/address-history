
export const initialState = {
    userId: '',
    addresses: [],
};

export const actionTypes = {
    START_LOADING: 'START_LOADING',
    END_LOADING: 'END_LOADING',
    SET_USER_ID: 'SET_USER_ID',
    SET_ADDRESSES: 'SET_ADDRESSES',
};

const ACTIONS_THAT_LOAD = [
  actionTypes.SET_USER_ID,
  actionTypes.SET_ADDRESSES,
];

export function reducer(state, action) {
  switch (action.type) {
    case actionTypes.START_LOADING:
      return {
          ...state,
          isLoading: true
        };
    case actionTypes.END_LOADING:
      return {
          ...state,
          isLoading: false
        };
    case actionTypes.SET_USER_ID:
      return {
          ...state,
          userId: action.payload
        };
    case actionTypes.SET_ADDRESSES:
      return {
          ...state,
          addresses: action.payload
        };
    default:
      throw new Error();
  }
}

export const decoratedReducer = (state, action) => {
  if (ACTIONS_THAT_LOAD.includes(action.type)) {
    return reducer(
      reducer(state, action),
      {type: actionTypes.START_LOADING}
    );
  }
  return reducer(state, action);
}

export default decoratedReducer;
