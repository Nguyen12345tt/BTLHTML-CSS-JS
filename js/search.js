$(document).ready(function () {
    $("#search-input-lg, #search-input-mobile").on("input", function () { // Sử dụng sự kiện 'input'
        let searchValue = $(this).val().toLowerCase().trim();
        console.log("Giá trị tìm kiếm:", searchValue);

        $(".product-item").each(function () {
            let productName = $(this).find(".product-name").text().toLowerCase();
            console.log("Tên sản phẩm:", productName);

            if (searchValue === "") { // Nếu ô tìm kiếm trống, hiển thị tất cả sản phẩm
                $(this).fadeIn();
            } else if (productName.includes(searchValue)) {
                $(this).fadeIn();
            } else {
                $(this).fadeOut();
            }
        });
    });
});