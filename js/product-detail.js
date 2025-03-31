let products = [
    {
        name: "Giấy Double A a4 70gsm",
        price: "73.000đ",
        oldPrice: "75.000đ",
        discount: "-3%",
        image: ["img/GiayDoubleA.jpg"],
        description: "Giấy photo Double A A4 70gsm phù hợp cho các nhu cầu in, photocopy trong nhiều lĩnh vực, nổi bật về độ trắng, độ mịn và khả năng in ấn sắc nét.",
        status: "Còn hàng",
        year: "2024",
        brand: "Giấy photo Double A",
        reviews: ["Đánh giá tốt.", "Sản phẩm chất lượng."],
        rating: 5,
        reviewCount: 1,
        related: ["Giấy A4", "Sổ Tay"]
    },
    {
        name: "Mực dấu đỏ",
        price: "40.000đ",
        image: ["img/Mucdau.jpg"],
        description: "Chuyên Mực dấu shiny đỏ uy tín.",
        status: "Còn hàng",
        year: "2024",
        brand: "Mực đỏ",
        reviews: ["Đánh giá tốt.", "Sản phẩm chất lượng"],
        rating: 2,
        reviewCount: 0,
        related: []
    },
    {
        name: "Kéo Cắt Giấy",
        price: "10.000đ",
        image: ["img/download.jpg"],
        description: "Kéo sắt cắt giấy.",
        status: "Còn hàng",
        year: "2024",
        brand: "Kéo Cắt Giấy",
        reviews: ["Đánh giá tốt.", "Sản phẩm chất lượng"],
        rating: 2,
        reviewCount: 0,
        related: []
    },
    {
        name: "Sổ Tay",
        price: "15.000đ",
        image: ["img/SoTay.jpg"],
        description: "Sổ Tay ghi nhớ.",
        status: "Còn hàng",
        year: "2024",
        brand: "Sổ Tay",
        reviews: ["Đánh giá tốt.", "Sản phẩm chất lượng"],
        rating: 2,
        reviewCount: 0,
        related: []
    },
    {
        name: "Bút Bi",
        price: "5.000đ",
        image: ["img/shopping.jpg"],
        description: "Bút bi viết được",
        status: "Còn hàng",
        year: "2024",
        brand: "Bút bi",
        reviews: ["Đánh giá tốt.", "Sản phẩm chất lượng"],
        rating: 2,
        reviewCount: 0,
        related: []
    },
    {
        name: "Giá tài liệu",
        price: "90.000đ",
        image: ["img/Giatailieu.jpg"],
        description: "Giá để tài liệu ngon",
        status: "Còn hàng",
        year: "2024",
        brand: "Giấy A4",
        reviews: ["Đánh giá tốt.", "Sản phẩm chất lượng"],
        rating: 2,
        reviewCount: 0,
        related: []
    },
    {
        name: "Kéo Cắt Giấy",
        price: "10.000đ",
        image: ["img/download.jpg"],
        description: "Kéo sắt cắt giấy.",
        status: "Còn hàng",
        year: "2024",
        brand: "Giấy A4",
        reviews: ["Đánh giá tốt.", "Sản phẩm chất lượng"],
        rating: 2,
        reviewCount: 0,
        related: []
    },
];

$(document).ready(function () {
    // Lấy thông tin sản phẩm từ URL (nếu có)
    let urlParams = new URLSearchParams(window.location.search);
    let productName = decodeURIComponent(urlParams.get("name"));
    let product = null; // Khai báo product ở đây

    if (products) {
        product = products.find(p => p.name === productName);

        if (product) {
            // Luôn luôn cập nhật localStorage với sản phẩm từ URL
            localStorage.setItem("selectedProduct", JSON.stringify(product));
        }
    }

    // Lấy sản phẩm từ localStorage (sau khi đã cập nhật)
    if (product){
    product = JSON.parse(localStorage.getItem("selectedProduct"));
    }
    
    function addReviewForm() {
        $("#product-reviews").html(`
            <h3>Đánh giá sản phẩm</h3>
            <div class="form-group">
                <label for="rating">Xếp hạng:</label>
                <div id="star-rating">
                    <span class="star" data-rating="1">&#9733;</span>
                    <span class="star" data-rating="2">&#9733;</span>
                    <span class="star" data-rating="3">&#9733;</span>
                    <span class="star" data-rating="4">&#9733;</span>
                    <span class="star" data-rating="5">&#9733;</span>
                </div>
            </div>
            <div class="form-group">
                <label for="comment">Nhận xét:</label>
                <textarea class="form-control" id="comment"></textarea>
            </div>
            <button class="btn btn-primary" id="submit-review">Gửi đánh giá</button>
            <input type="hidden" id="rating" value="0">
        `);

        // Xử lý sự kiện chọn ngôi sao
        $("#star-rating .star").click(function () {
            let rating = $(this).data("rating");

            // Đánh dấu các ngôi sao đã chọn
            $("#star-rating .star").removeClass("selected");
            $(this).prevAll().addBack().addClass("selected");

            // Lưu trữ giá trị đánh giá
            $("#rating").val(rating);
        });

        // Xử lý sự kiện gửi đánh giá
        $("#submit-review").click(function () {
            let rating = $("#rating").val();
            let comment = $("#comment").val();

            // Gửi đánh giá đến máy chủ hoặc lưu trữ cục bộ
            // ...

            alert("Đánh giá của bạn đã được gửi!");
        });
    }

    if (product) {
        // Hiển thị thông tin sản phẩm
        $("#product-name").text(product.name);
        $("#product-price").text(product.price);
        // Hiển thị ảnh chính
        if (product.image && product.image.length > 0) {
            let currentImageIndex = 0; //Biến lưu trữ chỉ số ảnh hiện tại

            $("#main-image").attr("src", product.image[currentImageIndex]);

            let thumbnailImages = $("#thumbnail-images");
            thumbnailImages.empty(); // Xóa ảnh thumbnail cũ

            product.image.forEach((image, index) => {
                let thumbnail = $("<img>").attr("src", image).addClass("thumbnail-image");
                thumbnail.click(function () {
                    $("#main-image").attr("src", image);
                });
                thumbnailImages.append(thumbnail);
            });

            // Thêm nút điều hướng
            $("#image-slider").append(`
                <div class="slider-nav slider-prev">&lt;</div>
                <div class="slider-nav slider-next">&gt;</div>
            `);

            // Xử lý sự kiện nút điều hướng
            $(".slider-prev").click(function () {
                currentImageIndex = (currentImageIndex - 1 + product.image.length) % product.image.length;
                $("#main-image").attr("src", product.image[currentImageIndex]);
            });

            $(".slider-next").click(function () {
                currentImageIndex = (currentImageIndex + 1) % product.image.length;
                $("#main-image").attr("src", product.image[currentImageIndex]);
            });
        } else {
            $("#main-image").attr("src", "img/download.jpg");
        }

        $("#product-description").text(product.description);
        // ... (hiển thị các thông tin khác)

        // Gọi hàm addReviewForm() để thêm form đánh giá và gán sự kiện
        addReviewForm();

        // Hiển thị sản phẩm liên quan
        if (product.related && product.related.length > 0) {
            product.related.forEach(relatedName => {
                let relatedProduct = products.find(p => p.name === relatedName);
                if (relatedProduct) {
                    $("#related-products").append(`
                        <div class="col-md-3">
                            <a href="product-detail.html?name=${encodeURIComponent(relatedProduct.name)}">
                                <img src="${relatedProduct.image[0]}" class="img-fluid" alt="${relatedProduct.name}">
                                <p>${relatedProduct.name}</p>
                            </a>
                        </div>
                    `);
                }
            });
        }
    } else {
        // Hiển thị thông báo lỗi
        $("#product-name").text("Sản phẩm không tồn tại.");
    }

    $("#buy-now").click(function () {
        let product = JSON.parse(localStorage.getItem("selectedProduct"));

        if (product) {
            addToCart(product);
        } else {
            alert("Không tìm thấy thông tin sản phẩm.");
        }
    });
});