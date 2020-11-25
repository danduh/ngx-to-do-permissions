const initialState = {
    todos: {
        read: '*',
        update: '*',
        create: '*'
    },
    stats: {
        read: '*'
    }
};

export function userPermissionsReducer(state = initialState, action) {
    return {...state};
}
