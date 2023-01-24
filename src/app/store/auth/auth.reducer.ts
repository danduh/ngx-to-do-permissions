const initialState = {
  todos: {
    read: '*',
    update: '*',
    delete: '*',
    deletemany: '*',
    create: '*',
  },
  stats: {
    read: '*',
  }
};


export function userPermissionsReducer(state = initialState, action){
  return {...state};
}
