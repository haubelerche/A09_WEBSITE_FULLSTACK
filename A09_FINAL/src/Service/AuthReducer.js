const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                user: null,
                token: null, // Đang thực hiện đăng nhập, chưa có token
                isAuthenticated: false,
                isFetching: true, // Đang trong trạng thái gửi yêu cầu
                error: false,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user, // Dữ liệu người dùng từ backend
                token: action.payload.token, // JWT token từ backend
                isAuthenticated: true, // Đăng nhập thành công
                isFetching: false, // Đã hoàn thành yêu cầu
                error: false,
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                token: null, // Không có token nếu đăng nhập thất bại
                isAuthenticated: false,
                isFetching: false, // Kết thúc trạng thái yêu cầu
                error: true, // Có lỗi xảy ra
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null, // Xóa token khi đăng xuất
                isAuthenticated: false, // Trạng thái không đăng nhập
                isFetching: false,
                error: false,
            };
        default:
            return state; // Trả về trạng thái hiện tại nếu không khớp action
    }
};

export default AuthReducer;