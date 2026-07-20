# TÀI LIỆU BÀN GIAO (HANDOVER DOCUMENT) - AI AGENT CONTEXT

Chào AI Agent kế nhiệm. Người dùng đang chuyển sang một phiên bản (session) mới để tiếp tục phát triển dự án này. Hãy đọc kỹ tài liệu này để nắm bắt bối cảnh và tiếp tục công việc một cách liền mạch.

## 1. Bối cảnh Dự án (Context)
- **Tên dự án**: RaiseFund Frontend (Cổng thông tin gây quỹ cho Quỹ Hỗ trợ Nhân tài Việt Nam).
- **Domain hoạt động**: `duan.quynhantai.org`
- **Công nghệ**: Next.js 14+ (App Router), Tailwind CSS, TypeScript.
- **Phong cách thiết kế (Aesthetics)**: Sử dụng tone màu xanh lá thương hiệu của quỹ (`#006B3F`). Giao diện sạch sẽ, vuông vức, bám sát các wireframe từ tài liệu mockup của BA.
- **Tài liệu tham khảo quan trọng nhất**: BẮT BUỘC đọc file `Frontend_Implementation_Plan.md` nằm ở thư mục gốc của dự án. File này đã được đối chiếu và đồng bộ 100% với tài liệu Mockup của đội ngũ BA.

## 2. Các hạng mục ĐÃ hoàn thành (Done)
- Khởi tạo dự án Next.js (Standalone) và thiết lập môi trường cơ bản.
- **Layout**: Đã hoàn thiện `<Header />` (với menu được kế thừa chính xác từ `quynhantai.org`) và `<Footer />` (thông tin liên hệ chuẩn).
- **Trang chủ (`app/page.tsx`)**: Đã code xong phần Hero Banner màu xanh lá và Khối danh sách `<CampaignCard />`. Đã loại bỏ khối Thống kê (Stats) theo yêu cầu của user.
- **Component dùng chung**:
  - `<CampaignCard />`: Thẻ chiến dịch bám sát wireframe (Tiêu đề có gạch ngang, hình ảnh viền đen cứng cáp, nút Tìm hiểu thêm ở góc).
  - `<ProjectCard />`: Thẻ dự án (Có thanh Progress bar, huy hiệu trạng thái, màu sắc `#006B3F`).
  - `<EmptyState />`: Component hiển thị khi không tìm thấy kết quả.
  - `<CampaignSearch />`: Thanh tìm kiếm có tích hợp sẵn logic Debounce 500ms.
- **Trang Danh sách Dự án / Chi tiết Chiến dịch (`app/campaigns/[id]/page.tsx`)**: Đã hoàn thiện, bao gồm Hero banner, Thanh tìm kiếm có filter, và lưới hiển thị các `<ProjectCard />`.
- **Trang Chi tiết Dự án (`app/projects/[id]/page.tsx`)**: Đã code xong hoàn chỉnh gồm Slider Ảnh (`<ProjectGallery />`), Nội dung (`<ProjectContent />`), Khối thống kê quyên góp (`<ProjectStats />`), Cụm nút CTA (`<DonationActions />`) và Lịch sử (`<HistoryTabs />`).

## 3. Nhiệm vụ TIẾP THEO cần thực hiện (To-do)
Nhiệm vụ đầu tiên bạn cần hỏi người dùng khi bắt đầu session mới là tiến hành code **Hệ thống Modals (Popup)** cho toàn bộ dự án.

Các Component Modals cần triển khai theo kế hoạch bao gồm:
1. **`<AuthModal />`**: Form Đăng nhập/Đăng ký.
2. **`<DonationModal />`**: Form nhập số tiền và lời nhắn quyên góp (Validate cẩn thận không cho nhập số âm hoặc lớn hơn số tiền còn thiếu).
3. **`<PaymentQrModal />`**: Popup hiển thị mã QR thanh toán sau khi hoàn tất form quyên góp.
4. **`<ShareModal />`**: Popup chia sẻ lên mạng xã hội.

*Bạn nên cân nhắc sử dụng một thư viện quản lý Global State (như Zustand) hoặc Context API để có thể bật tắt các Modals này từ bất kỳ đâu (ví dụ: bấm nút Ủng hộ ở `<DonationActions />` thì gọi hàm mở `<DonationModal />`).*

---

**🔥 Lời nhắn cho AI Agent tiếp theo:** 
Tuyệt đối tuân thủ file `Frontend_Implementation_Plan.md`. Khi bắt đầu, hãy đọc file `HANDOVER.md` này và chào người dùng, tóm tắt ngắn gọn rằng bạn đã nắm bối cảnh, sau đó đề xuất bắt tay vào code **Hệ thống Modals** luôn nhé. Good luck!
