// API Mock
const API_URL = "https://67ce94b9125cd5af757b1621.mockapi.io/accounts";

//Đăng ký
async function register() {
    let username = document.getElementById("register-username").value.trim();
    let password = document.getElementById("register-password").value.trim();
    let messageBox = document.getElementById("message");

    if (!username || !password) {
        messageBox.innerText = "Vui lòng nhập đầy đủ thông tin!";
        return;
    }

    try {
        // Kiểm tra xem tên người dùng đã tồn tại chưa
        let response = await fetch(API_URL);
        if (!response.ok) {
            // Xử lý lỗi HTTP khi lấy danh sách người dùng
            if (response.status === 404) {
                messageBox.innerText = "API không tồn tại.";
            } else if (response.status >= 500) {
                messageBox.innerText = "Lỗi máy chủ. Vui lòng thử lại sau.";
            } else {
                messageBox.innerText = "Lỗi không xác định.";
            }
            return;
        }

        let users = await response.json();
        let existingUser = users.find(user => user.username === username);

        if (existingUser) {
            messageBox.innerText = "Tên người dùng đã tồn tại. Vui lòng chọn tên khác.";
            return;
        }

        // Nếu tên người dùng chưa tồn tại, tiến hành đăng ký
        let registerResponse = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (!registerResponse.ok) {
            // Xử lý lỗi HTTP khi đăng ký
            if (registerResponse.status === 400) {
                try {
                    let errorData = await registerResponse.json();
                    messageBox.innerText = errorData.error || "Lỗi đăng ký.";
                } catch (jsonError) {
                    messageBox.innerText = "Lỗi đăng ký (phản hồi không hợp lệ).";
                }
            } else if (registerResponse.status >= 500) {
                messageBox.innerText = "Lỗi máy chủ. Vui lòng thử lại sau.";
            } else {
                messageBox.innerText = "Lỗi đăng ký không xác định.";
            }
            return;
        }

        messageBox.classList.remove("text-danger");
        messageBox.classList.add("text-success");
        messageBox.innerText = "Đăng ký thành công!";
        setTimeout(() => { window.location.href = "login.html"; }, 1000);

    } catch (error) {
        // Xử lý lỗi kết nối
        messageBox.innerText = "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet của bạn.";
        console.error("Lỗi đăng ký:", error);
    }
}

//Đăng nhập
async function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let response = await fetch(API_URL);
    let users = await response.json();

    let user = users.find(user => user.username === username && user.password === password);

    if (user) {
        document.getElementById("message").innerText = "Đăng nhập thành công!";
        localStorage.setItem("user", JSON.stringify(user));
        setTimeout(() => { window.location.href = "index.html"; }, 1000);
    } else {
        document.getElementById("message").innerText = "Tên đăng nhập hoặc mật khẩu không đúng!";
    }
    localStorage.setItem("user", JSON.stringify(user));
}

$(document).ready(function () {
    $("#register-password").keypress(function (event) {
        if (event.which === 13) {
            register();
        }
    });

    $("#login-password").keypress(function (event) {
        if (event.which === 13) {
            login();
        }
    });
});