document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById("cart-items");
    let totalPriceElement = document.getElementById("total-price");

    let total = 0;
    cartItemsContainer.innerHTML = "";

    cart.forEach((item, index) => {
        let price = parseInt(item.price.replace(/\D/g, "")) * item.quantity;
        total += price;

        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        listItem.innerHTML = `
            ${item.name} (x${item.quantity})
            <span>${price.toLocaleString()}đ</span>
        `;
        cartItemsContainer.appendChild(listItem);
    });

    totalPriceElement.innerText = total.toLocaleString();

    // Xử lý gửi đơn hàng
    document.getElementById("checkout-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let address = document.getElementById("address").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let paymentMethod = document.getElementById("payment-method").value;

        if (!name || !address || !phone) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        alert("Đặt hàng thành công!");
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    });
});