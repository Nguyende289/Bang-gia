function editPrice(plan) {
    // Ẩn giá cũ và hiển thị input và nút lưu
    const priceElement = document.getElementById(`${plan}-price`);
    const inputElement = document.getElementById(`${plan}-input`);
    const editButton = document.querySelector(`#${plan}-edit-btn`);
    const saveButton = document.getElementById(`${plan}-save-btn`);

    // Hiển thị input và nút lưu, ẩn giá cũ và nút chỉnh sửa
    priceElement.style.display = "none";
    inputElement.style.display = "block";
    saveButton.style.display = "inline-block";
    editButton.style.display = "none";

    // Đưa giá cũ vào trường nhập liệu
    inputElement.value = priceElement.textContent.replace(" VND", "");
    inputElement.focus(); // Tự động focus vào input
}

function savePrice(plan) {
    const inputElement = document.getElementById(`${plan}-input`);
    const priceElement = document.getElementById(`${plan}-price`);
    const editButton = document.querySelector(`#${plan}-edit-btn`);
    const saveButton = document.getElementById(`${plan}-save-btn`);

    // Lấy giá mới từ input
    const newPrice = inputElement.value;
    
    // Kiểm tra giá trị hợp lệ
    if (newPrice && !isNaN(newPrice)) {
        priceElement.textContent = `${newPrice} VND`; // Cập nhật giá mới
    }
    
    // Ẩn input và nút lưu, hiển thị lại giá cũ và nút chỉnh sửa
    inputElement.style.display = "none";
    saveButton.style.display = "none";
    priceElement.style.display = "block";
    editButton.style.display = "inline-block";
}
