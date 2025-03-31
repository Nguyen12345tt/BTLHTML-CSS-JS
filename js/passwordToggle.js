$(document).ready(function () {
    $("#toggle-password").click(function () {
        let passwordField = $("#login-password"); // Thử tìm phần tử mật khẩu đăng nhập
        if (!passwordField.length) { // Nếu không tìm thấy, thử tìm phần tử mật khẩu đăng ký
            passwordField = $("#register-password");
        }
        if (passwordField.length) { // Kiểm tra xem phần tử mật khẩu có tồn tại hay không
            let type = passwordField.attr("type") === "password" ? "text" : "password";
            passwordField.attr("type", type);
            $(this).text(type === "password" ? "👁️" : "👁️‍🗨️");
        }
    });
});