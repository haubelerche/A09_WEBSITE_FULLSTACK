const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isFetching: true,
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isFetching: false,
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isFetching: false,
                error: true,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isFetching: false,
                error: false,
            };
        default:
            return state;
    }
};

export default AuthReducer;