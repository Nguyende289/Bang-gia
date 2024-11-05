// API Key và URL từ AppSheet
const API_KEY = 'YOUR_API_KEY';  // Thay YOUR_API_KEY bằng API Key của bạn
const APP_ID = 'YOUR_APP_ID';    // Thay YOUR_APP_ID bằng App ID của bạn
const TABLE_NAME = 'PriceTable'; // Tên bảng của bạn trong AppSheet

// URL endpoint của AppSheet API
const apiUrl = `https://api.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/data`;

// Hàm để lấy dữ liệu từ AppSheet API
async function fetchData() {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'ApplicationAccessKey': API_KEY, // Dùng API Key để xác thực
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        
        // Gọi hàm để hiển thị dữ liệu
        displayPricingData(data);
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu từ AppSheet:", error);
    }
}

// Hàm hiển thị bảng giá từ dữ liệu API
function displayPricingData(data) {
    const pricingTable = document.getElementById("pricing-table");
    pricingTable.innerHTML = ""; // Xóa nội dung cũ trước khi cập nhật

    // Duyệt qua dữ liệu và tạo bảng giá
    data.rows.forEach(item => {
        const pricingOption = document.createElement("div");
        pricingOption.classList.add("pricing-option");

        // Tạo phần hiển thị tên sản phẩm
        const title = document.createElement("h2");
        title.textContent = item["Tên Sản Phẩm"]; // Cột tên sản phẩm trong AppSheet
        pricingOption.appendChild(title);

        // Tạo phần hiển thị giá mua vào
        const buyPrice = document.createElement("p");
        buyPrice.textContent = `Giá Mua Vào: ${item["Giá Mua Vào"]} VND`; // Cột giá mua vào
        pricingOption.appendChild(buyPrice);

        // Tạo phần hiển thị giá bán ra
        const sellPrice = document.createElement("p");
        sellPrice.textContent = `Giá Bán Ra: ${item["Giá Bán Ra"]} VND`; // Cột giá bán ra
        pricingOption.appendChild(sellPrice);

        // Thêm phần bảng giá vào trang
        pricingTable.appendChild(pricingOption);
    });
}

// Hàm cập nhật dữ liệu sau một khoảng thời gian nhất định
function startPolling() {
    // Lấy dữ liệu ngay lập tức khi trang được tải
    fetchData();

    // Lập lại việc lấy dữ liệu sau mỗi 30 giây (30000 ms)
    setInterval(fetchData, 30000); // Cập nhật mỗi 30 giây
}

// Gọi hàm để bắt đầu polling khi trang được tải
startPolling();
