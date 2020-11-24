const initialState = {
    todos: {
        read: '*',
        update: '*'
    },
    stats: {
        read: '*'
    }
};

export function userPermissionsReducer(state = initialState, action) {
    return {...state};
}
