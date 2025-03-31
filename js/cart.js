function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Đã thêm vào giỏ hàng!");
    updateCart(); // Gọi updateCart thay vì updateCartCount
}

function updateCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    $("#cart-count").text(cart.length); // Cập nhật số lượng sản phẩm trong giỏ hàng

    let cartItems = $("#cart-items");
    cartItems.empty(); // Xóa nội dung giỏ hàng cũ

    let totalPrice = 0; // Khởi tạo tổng tiền

    cart.forEach(item => {
        let price = parseInt(item.price.replace(/\D/g, '')); // Chuyển giá thành số
        let totalItemPrice = price * item.quantity; // Tính tổng tiền cho mỗi sản phẩm
        totalPrice += totalItemPrice; // Cộng vào tổng tiền

        let cartItem = `
            <tr>
                <td>${item.name}</td>
                <td>${price.toLocaleString()}đ</td>
                <td>${item.quantity}</td>
                <td>${totalItemPrice.toLocaleString()}đ</td>
                <td><button class="btn btn-danger remove-from-cart" data-name="${item.name}">Xóa</button></td>
            </tr>
        `;
        cartItems.append(cartItem);
    });

    $("#total-price").text(totalPrice.toLocaleString() + "đ"); // Hiển thị tổng tiền

    // Xử lý sự kiện xóa sản phẩm khỏi giỏ hàng
    $(".remove-from-cart").click(function () {
        let itemName = $(this).data("name");
        removeFromCart(itemName);
    });

    $(".quantity-input").change(function () {
        let itemName = $(this).data("name");
        let quantity = parseInt($(this).val());
        updateQuantity(itemName, quantity);
    });

    // Thêm trình xử lý sự kiện cho nút "Xóa giỏ hàng"
    $("#clear-cart").click(function () {
        localStorage.removeItem("cart"); // Xóa giỏ hàng khỏi localStorage
        updateCart(); // Cập nhật giao diện giỏ hàng
        alert("Giỏ hàng đã được xóa!"); // Hiển thị thông báo
    });
}

function updateQuantity(itemName, quantity) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedCart = cart.map(item => {
        if (item.name === itemName) {
            item.quantity = quantity;
        }
        return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCart();
}

function removeFromCart(itemName) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let updatedCart = cart.filter(item => item.name !== itemName);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    updateCart(); // Cập nhật giỏ hàng sau khi xóa
}

$(document).ready(function () {
    updateCart(); // Gọi updateCart khi trang được tải
});