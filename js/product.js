$(document).ready(function () {
    let products = [
        { name: "Bút Bi", price: "5,000đ", image: "img/shopping.jpg" },
        { name: "Sổ Tay", price: "15,000đ", image: "img/SoTay.jpg" },
        { name: "Kéo Cắt Giấy", price: "10,000đ", image: "img/download.jpg" },
        { name: "Giấy Double A a4 70gsm", price: "73.000đ", image: "img/GiayDoubleA.jpg" },
        { name: "Sáp màu", price: "10,000đ", image: "img/Sapmau.jpeg" },
        { name: "Giá tài liệu", price: "90.000đ", image: "img/Giatailieu.jpg" },
        { name: "Mực đỏ", price: "40.000đ", image: "img/Mucdau.jpg" },
        { name: "Giấy Double A a3 70gsm", price: "150.000đ", image: "img/GiayA3.jpg" },
        { name: "Giá tài liệu", price: "90.000đ", image: "img/Giatailieu.jpg" },
        { name: "Giá tài liệu", price: "90.000đ", image: "img/Giatailieu.jpg" },
        { name: "Giá tài liệu", price: "90.000đ", image: "img/Giatailieu.jpg" },
        { name: "Giá tài liệu", price: "90.000đ", image: "img/Giatailieu.jpg" }
    ];

    let productList = $("#product-list");
    productList.empty();

    // Hàm tạo thẻ sản phẩm
    const createProductCard = (product, index) => `
        <div class="col-md-3 product-item">
            <div class="card mb-4">
                <a href="product-detail.html?name=${product.name}">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                </a>
                <div class="card-body">
                    <h5 class="card-title product-name">${product.name}</h5>
                    <p class="card-text">${parseInt(product.price.replace(/\D/g, '')).toLocaleString()}đ</p>
                    <button class="btn btn-primary action-btn" data-index="${index}" data-action="add-to-cart">Thêm vào giỏ</button>
                    <button class="btn btn-success action-btn" data-index="${index}" data-action="buy-now">Mua Ngay</button>
                </div>
            </div>
        </div>`;

    // Duyệt sản phẩm và thêm vào danh sách
    products.forEach((product, index) => {
        productList.append(createProductCard(product, index));
    });

    // Xử lý các nút hành động
    $(document).on("click", ".action-btn", function () {
        let index = $(this).data("index");
        let action = $(this).data("action");
        let product = products[index];

        if (action === "add-to-cart") {
            handleCart(product, false);
            alert("Đã thêm vào giỏ hàng!");
        } else if (action === "buy-now") {
            handleCart(product, true);
            window.location.href = "checkout.html";
        }
        updateCartCount();
    });

    // Hàm xử lý giỏ hàng
    const handleCart = (product, checkout) => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingProduct = cart.find(item => item.name === product.name);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        if (checkout) {
            window.location.href = "checkout.html";
        }
    };

    // Cập nhật số lượng giỏ hàng
    const updateCartCount = () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        $("#cart-count").text(cart.length);
    };

    updateCartCount();

    $(".product-link").click(function (event) {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết

    let productName = $(this).data("name"); // Lấy tên sản phẩm từ thuộc tính data-name
    let product = products.find(p => p.name === productName); // Tìm sản phẩm trong mảng products

    if (product) {
        localStorage.setItem("selectedProduct", JSON.stringify(product)); // Lưu sản phẩm vào localStorage
        window.location.href = "product-detail.html?name=" + encodeURIComponent(productName); // Chuyển hướng đến trang chi tiết sản phẩm
    } else {
        alert("Không tìm thấy sản phẩm.");
    }
    });
});