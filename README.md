# Vietnam Talents Assistance Fund (VTAF) - Frontend Portal

Dự án Frontend cho **Quỹ Hỗ trợ Nhân tài Việt Nam (VTAF)**. Đây là nền tảng trực tuyến kết nối giữa Nhà trường (đề xuất học bổng), Người kiểm duyệt (xác thực hồ sơ) và Nhà tài trợ (theo dõi và đóng góp tài chính) nhằm bồi dưỡng, phát triển các nhân tài học thuật xuất sắc tại Việt Nam.

Nền tảng được phát triển với định hướng khuyến tài, tập trung hỗ trợ học sinh/sinh viên giỏi, đạt thành tích cao trong học tập và các cuộc thi cấp tỉnh/quốc gia.

---

## 🚀 Các Tính Năng Chính

Nền tảng bao gồm trang chủ công khai giới thiệu dự án/chiến dịch và hệ thống **Dashboard phân quyền** cho 3 nhóm người dùng chính:

1. **Cổng Nhà Trường (School Portal)**
   - Đăng ký và quản lý các đề xuất hỗ trợ học bổng học thuật cho học sinh xuất sắc.
   - Nhập thông tin thành tích học tập, đính kèm minh chứng (bảng điểm, bằng khen, chứng nhận giải thưởng).
   - Quản lý các dự án đang kêu gọi, đã hoàn thành hoặc đang chờ phê duyệt.

2. **Cổng Kiểm Duyệt (Reviewer Portal)**
   - Rà soát các đề xuất học bổng từ phía nhà trường gửi lên.
   - Phê duyệt, từ chối hoặc yêu cầu bổ sung thông tin hồ sơ học tập.
   - Theo dõi tổng quan tiến độ kêu gọi quỹ của các dự án đang hoạt động.

3. **Cổng Nhà Tài Trợ (Donor Portal)**
   - Theo dõi lịch sử tài trợ chi tiết (số tiền, thời gian, dự án cụ thể mà khoản tiền đó hỗ trợ).
   - Xem minh chứng giải ngân thực tế từ phía nhà trường cho học sinh.
   - Theo dõi danh sách các dự án/nhân tài đã và đang đồng hành.

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework:** Next.js (App Router)
- **Ngôn ngữ:** TypeScript
- **Styling:** Tailwind CSS (Vanilla CSS & Tailwind Utility Classes)
- **Icons:** Lucide React
- **Quản lý trạng thái & UI:** React Hooks, CSS-in-JS, Tailwind components

---

## 📦 Hướng Dẫn Setup và Chạy Dự Án

### Yêu cầu hệ thống
- **Node.js** (Khuyến nghị phiên bản LTS mới nhất - v18 hoặc v20)
- **NPM** hoặc **Yarn**

### Bước 1: Clone dự án
Tải mã nguồn về máy local của bạn:
```bash
git clone git@github.com:snowhallo/VTAF-FE.git
cd VTAF-FE
```

### Bước 2: Cấu hình và Cài đặt thư viện
Cài đặt tất cả các gói phụ thuộc cần thiết cho dự án:
```bash
npm install
```

### Bước 3: Chạy dự án ở chế độ Development
Khởi chạy máy chủ phát triển cục bộ:
```bash
npm run dev
```
Sau khi chạy lệnh trên, dự án sẽ khả dụng tại địa chỉ: [http://localhost:3000](http://localhost:3000)

### Bước 4: Xây dựng dự án cho Production (Build & Start)
Để build bản phân phối tối ưu hóa hiệu năng và chạy trên môi trường production:
```bash
# Xây dựng ứng dụng
npm run build

# Khởi chạy server production
npm run start
```

---

## ⚙️ Các Cập Nhật & Tối Ưu Gần Đây

- **Tối ưu hiển thị nhập tiền:** Tự động định dạng thêm dấu phẩy phân tách hàng nghìn khi người dùng nhập số tiền quyên góp (ví dụ: `1.000.000đ`), giúp dễ kiểm tra độ chính xác.
- **Tích hợp logo nội bộ:** Chuyển đổi toàn bộ tài nguyên logo cũ (lỗi 404 online) sang logo nội bộ `/Logo_quy.jpg` được lưu trữ trực tiếp trong thư mục `public/`.
- **Khắc phục lỗi hiển thị trên Dark Mode:** Loại bỏ xung đột CSS dark-mode trong `globals.css` để giữ giao diện sáng nguyên bản sắc nét, khắc phục hoàn toàn tình trạng chữ trắng trên nền trắng ở các ô nhập liệu.
- **Tối ưu hiệu năng hình ảnh:** Thêm đầy đủ thuộc tính `sizes` cho tất cả các thẻ hình ảnh sử dụng thuộc tính `fill` để tối ưu tải trang.
