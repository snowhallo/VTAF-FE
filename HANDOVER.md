# TÀI LIỆU BÀN GIAO (HANDOVER DOCUMENT) - AI AGENT CONTEXT

Chào AI Agent kế nhiệm. Dự án **RaiseFund Frontend (Cổng thông tin gây quỹ cho Quỹ Hỗ trợ Nhân tài Việt Nam)** đã hoàn thành phần lớn khung giao diện, tương tác mockup và tối ưu hóa hệ thống. Dưới đây là thông tin chi tiết về hiện trạng dự án để bạn tiếp tục công việc một cách liền mạch.

---

## 1. Bối cảnh Dự án (Context)
- **Tên dự án**: RaiseFund Frontend (Cổng thông tin cho Quỹ Hỗ trợ Nhân tài Việt Nam - VTAF).
- **Công nghệ**: Next.js 15 (App Router), Tailwind CSS, TypeScript.
- **Định vị thương hiệu**: Quỹ hỗ trợ nhân tài, phát triển năng lực học thuật xuất sắc (không phải quỹ từ thiện cho hoàn cảnh khó khăn). Các tài liệu yêu cầu gồm Bảng điểm, Bằng khen, Chứng nhận học thuật thay vì Giấy chứng nhận hộ nghèo.
- **Mã nguồn GitHub**: `git@github.com:snowhallo/VTAF-FE.git` (Đã được push bản mới nhất lên nhánh `main`).

---

## 2. Các hạng mục ĐÃ hoàn thành (Done)
- **Cổng thông tin công khai (Public Pages)**:
  - **Trang chủ (`app/page.tsx`)**: Đã hoàn thiện Hero Banner và danh sách các chiến dịch lớn đang kêu gọi.
  - **Trang danh sách dự án (`app/campaigns/[id]/page.tsx`)**: Tích hợp công cụ tìm kiếm và lọc dự án theo bộ lọc cụ thể.
  - **Trang chi tiết dự án (`app/projects/[id]/page.tsx`)**: Hiển thị slide ảnh thực tế, thông tin mô tả chi tiết dự án, tiến độ quyên góp, và danh sách các nhà hảo tâm đồng hành.
- **Hệ thống Modals & Tương tác**:
  - **`<DonationModal />`**: Hỗ trợ chọn nhanh số tiền hoặc nhập số tiền tùy chọn. Tự động thêm dấu phẩy phân tách hàng nghìn khi gõ (ví dụ: `1.000.000đ`). Ngăn chặn nhập số âm, vượt quá số tiền còn thiếu.
  - **`<PaymentQrStep />`**: Tự động tạo mã QR thanh toán (VietQR) theo đúng thông tin tài khoản ngân hàng của Quỹ và nội dung chuyển khoản được chuẩn hóa.
  - **`<ShareModal />`**: Popup hỗ trợ chia sẻ thông tin dự án qua mạng xã hội.
- **Hệ thống Dashboard phân quyền**:
  - **Cổng Nhà trường (`/dashboard/school`)**: Cho phép tạo đề xuất mới (giao diện wizard 4 bước), quản lý danh sách đề xuất & dự án của trường, theo dõi trạng thái phê duyệt.
  - **Cổng Kiểm duyệt (`/dashboard/reviewer`)**: Hỗ trợ duyệt hồ sơ đề xuất (phê duyệt, yêu cầu chỉnh sửa) và quản lý các dự án đang hoạt động.
  - **Cổng Nhà tài trợ (`/dashboard/donor`)**: Hiển thị lịch sử đóng góp (số tiền, thời gian, dự án cụ thể được tài trợ) và xem tài liệu minh chứng chi từ nhà trường.
- **Khắc phục lỗi & Tối ưu hóa**:
  - **Lỗi 404**: Khắc phục lỗi 404 khi truy cập `/dashboard` gốc bằng tệp chuyển hướng tự động về `/dashboard/school`. Khắc phục các đường dẫn ảnh bị lỗi 404.
  - **Dark Mode**: Khắc phục lỗi chữ nhập bị mờ/trắng trên nền trắng khi trình duyệt bật chế độ tối bằng cách xóa bỏ cấu hình `prefers-color-scheme: dark` trong `globals.css`.
  - **Hiệu suất (Lighthouse/Next.js)**: Bổ sung thuộc tính `sizes` đầy đủ cho tất cả thẻ `<Image fill />` để tối ưu tải trang.
  - **Giao diện**: Sửa lỗi đè lớp (z-index) giữa Sidebar/Header với nội dung trang khi cuộn.

---

## 3. Các nhiệm vụ TIẾP THEO đề xuất (To-do)
Khi tiếp quản dự án, bạn có thể trao đổi với người dùng để triển khai các bước tiếp theo hướng tới môi trường Production:

1. **Kết nối API thực tế (Backend Integration)**:
   - Chuyển đổi các mock data trong dự án (danh sách dự án, lịch sử đóng góp, hồ sơ đề xuất) thành các cuộc gọi API thực tế tới Backend WordPress hoặc API Node.js/PHP.
2. **Xác thực người dùng (Authentication & Session)**:
   - Tích hợp hệ thống xác thực thực tế (JWT, Next-Auth hoặc Cookies) để bảo vệ các tuyến đường dẫn của `/dashboard` theo đúng vai trò tài khoản đăng nhập.
3. **Cổng thanh toán tự động**:
   - Tích hợp Webhook ngân hàng hoặc các dịch vụ cổng thanh toán tự động (ví dụ: Casso, SePay) để tự động xác nhận giao dịch chuyển khoản khi người dùng quét mã QR thành công mà không cần kiểm duyệt thủ công.
4. **Kiểm thử E2E (End-to-End Testing)**:
   - Thiết lập các kịch bản kiểm thử quy trình từ lúc nhà trường nộp hồ sơ -> kiểm duyệt viên phê duyệt -> nhà tài trợ thực hiện đóng góp qua QR.
