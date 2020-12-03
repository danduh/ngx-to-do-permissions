const initialState = {
  todos: {
    read: '*',
    update: '*',
    create: '*',
  },
  stats: '*'
};


export function userPermissionsReducer(state = initialState, action) {
  return {...state};
}
