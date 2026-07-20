# Kế hoạch Thực thi Frontend: Giao diện Gây quỹ (AI Agent Execution Plan)

> **Mục đích của file này**: Bản đặc tả kỹ thuật (Technical Blueprint) dành riêng cho AI Agent. Cập nhật mới nhất: Chuyển đổi công nghệ từ WordPress sang **Next.js + Tailwind CSS**.

---

## 1. Thông tin chung & Quy chuẩn (Context & Standards)
- **Nền tảng Framework**: **Next.js** (Sử dụng App Router).
- **Styling**: **Tailwind CSS**. Ưu tiên sử dụng Tailwind utility classes, kết hợp file `globals.css` cho các biến CSS cơ bản.
- **Ngôn ngữ**: TypeScript (`.tsx`, `.ts`) để đảm bảo type safety.
- **Tên miền hoạt động**: Các trang liên quan đến dự án và gây quỹ sẽ chạy trên subdomain **`duan.quynhantai.org`**. 
- **Phạm vi Frontend**: Chỉ xây dựng UI Components, xử lý State Management (React Hooks) và giả lập luồng UX tĩnh. Chuẩn bị sẵn các hàm gọi API (Fetch/Axios) để Backend tích hợp.
- **Typography**: Font `Inter` (Nội dung) và `Montserrat` (Tiêu đề) tích hợp qua `next/font`.
- **Responsive**: Bắt buộc thiết kế theo hướng Mobile-first.

---

## 2. Định nghĩa Cấu trúc (Campaign vs Project)
- **Chiến dịch (Campaign)**: Là cấp cha, một sự kiện kêu gọi lớn.
- **Dự án (Project)**: Là cấp con, nằm bên trong một chiến dịch cụ thể, có chung chủ đề với chiến dịch đó.

---

## 3. Tái cấu trúc Thư mục Dự án (Next.js Standalone Architecture)

Vì sử dụng Next.js, Frontend sẽ là một **dự án hoàn toàn độc lập (Standalone Project)**, chạy độc lập trên Node.js và giao tiếp với Backend WordPress thông qua REST API (mô hình Headless CMS). Dự án này sẽ **không** nằm trong thư mục `wp-content/themes/` của WordPress.

Cấu trúc thư mục mới được tối ưu theo chuẩn Clean Architecture & Next.js 14+:

```text
raisefund-frontend/               # Thư mục gốc của dự án Next.js (nằm ngoài WordPress)
├── public/                       # Chứa assets tĩnh (images, icons, fonts)
├── src/
│   ├── app/                      # Next.js App Router (Routing & Pages)
│   │   ├── (main)/               # Route group cho các trang public (có chung Layout)
│   │   │   ├── page.tsx          # Trang chủ
│   │   │   ├── campaigns/[id]/page.tsx
│   │   │   ├── projects/[id]/page.tsx
│   │   │   └── terms/page.tsx
│   │   ├── dashboard/            # Route cho trang vận hành
│   │   │   ├── layout.tsx        # Layout Dashboard có Sidebar riêng biệt
│   │   │   └── page.tsx          # Màn hình Dashboard chính
│   │   ├── layout.tsx            # Root Layout (chứa html, body tags)
│   │   └── globals.css           # Global Tailwind CSS
│   ├── components/               # React Components
│   │   ├── ui/                   # Các UI elements cơ bản (Button, Input, Card)
│   │   ├── layout/               # Header (Menu kế thừa từ quynhantai.org), Footer, Sidebar
│   │   ├── shared/               # Component dùng chung (Modals, EmptyState)
│   │   └── features/             # Component chuyên sâu theo nghiệp vụ (ProjectGallery, CampaignSearch)
│   ├── hooks/                    # Custom React Hooks (useDebounce, useAuth...)
│   ├── services/                 # File xử lý gọi API (fetch, axios trỏ về Headless WP)
│   ├── store/                    # Quản lý Global State (Zustand hoặc Context API)
│   ├── types/                    # Khai báo TypeScript Interfaces (IProject, ICampaign, IUser)
│   └── lib/                      # Các hàm tiện ích utils (format tiền tệ, xử lý ngày tháng)
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 4. Phân rã Component (React Components Structure & UX Details)

### 4.1. Các Components Danh sách
- **`<CampaignCard />` (Thẻ Chiến dịch - Trang chủ)**:
  - **Giao diện**: Không thiết kế dạng thẻ bóng đổ thông thường. Bám sát wireframe: Tiêu đề có một đường kẻ ngang (line) đen kéo dài sang bên phải.
  - **Nội dung**: Tiêu đề chiến dịch, Đoạn mô tả ngắn (Tóm tắt).
  - **Hình ảnh**: Một khối ảnh to nằm phía dưới, có khung viền đen cứng cáp.
  - **Action**: Nút CTA "Tìm hiểu thêm >>" đặt ở góc dưới cùng, đè lên/hoặc nằm ngay dưới ảnh. Không có thanh Tiến độ (Progress Bar).
- **`<ProjectCard />` (Thẻ Dự án - Trang Danh sách)**:
  - **Khối hình ảnh**: Ảnh cover + overlay mờ. Thanh Progress bar (hiển thị tiến độ quyên góp) nằm dưới cùng khung ảnh.
  - **Khối nội dung**: Tiêu đề dự án. Hiển thị badge trạng thái (Đang kêu gọi, Đã đóng).
  - **Meta Data**: Số tiền đã quyên góp / Mục tiêu. Số lượt ủng hộ. Số ngày còn lại.

### 4.2. Trang Chi tiết Chiến dịch / Danh sách Dự án (`app/campaigns/[id]/page.tsx`)
- **Khối Hero Banner**: Tiêu đề chiến dịch. (Lưu ý: Đã loại bỏ khối Thống kê/Stats tổng quan theo yêu cầu).
- **Khối Tìm kiếm & Lọc (`<CampaignSearch />`)**:
  - Input tìm kiếm (hỗ trợ **Fuzzy Search** hoặc tìm kiếm tương đối theo từ khóa/tên dự án).
  - Component có sử dụng **Debounce (500ms)** để tránh gọi API liên tục mỗi khi gõ phím.
- **Danh sách Dự án trực thuộc**: Render Grid Responsive (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`).
  - Nếu tìm kiếm không có kết quả: Hiển thị `<EmptyState />` với illustration và text "Không tìm thấy dự án phù hợp".
### 4.3. Trang Chủ (`app/page.tsx`)
- **Hero Banner (Chiến dịch truyền thông)**: Một dải màu xanh lá cây full màn hình. Hiển thị thông điệp chiến dịch (VD: CHIẾN DỊCH HÈ 2026) và đoạn mô tả. Click vào banner sẽ đi thẳng đến trang chiến dịch tương ứng.
- **Danh sách Chiến dịch (`<CampaignCard />`)**: Layout dạng Grid 2 cột, chia các chiến dịch theo chiều dọc. Cuộn xuống để xem các chiến dịch cũ.

### 4.4. Trang Chi tiết Dự án (`app/projects/[id]/page.tsx`)
- **Cột Trái (Nội dung chính)**:
  - `<ProjectGallery />`: Slider ảnh thực tế dự án.
  - `<ProjectContent />`: Nội dung giải trình, sử dụng Rich Text (cần parse an toàn qua DOMPurify nếu là raw HTML từ DB).
- **Cột Phải (Thông tin Ủng hộ)**:
  - `<ProjectStats />`: Tiến độ quyên góp, Số tiền mục tiêu, Lượt ủng hộ.
  - `<DonationActions />`: Cụm nút "Ủng hộ dự án" và "Chia sẻ dự án" (gọi `<ShareModal />`). 
  - `<HistoryTabs />`: Khối "Đã ủng hộ" hiển thị danh sách nhà tài trợ kèm lời chúc. Khối "Giải ngân" hiển thị thông tin từng đợt giải ngân kèm link xem chi tiết sao kê (PDF).

### 4.5. Hệ thống Modals (Kiểm soát bằng Global State - Zustand)
- **`<AuthModal />`**:
  - Tabs: Đăng nhập / Đăng ký.
  - **Đăng nhập**: SĐT và Mật khẩu. Hỗ trợ Đăng nhập bằng Google/Facebook (NextAuth/Auth.js).
  - **Đăng ký**: Validate form kỹ càng (Zod/Yup). Ràng buộc mật khẩu mạnh, định dạng SĐT Việt Nam.
- **`<DonationModal />`**:
  - Hiển thị thông tin người ủng hộ (có checkbox "Ẩn danh").
  - Form nhập số tiền:
    - **Validate**: Không cho nhập số âm, không cho nhập 0đ, không được nhập chữ. Cảnh báo lỗi UI màu đỏ (`text-red-500`) nếu sai định dạng.
    - **Giới hạn Max**: Nếu nhập số tiền lớn hơn số tiền mục tiêu còn thiếu của dự án, tự động điều chỉnh về mức tối đa còn thiếu hoặc báo lỗi vượt quá.
  - Form lời nhắn: Ô textarea giới hạn 200 ký tự.
- **`<PaymentQrModal />` (Popup quét QR)**:
  - *Lưu ý: Mockup của BA đang thiếu luồng kết thúc quyên góp. Dev chủ động bổ sung luồng hiển thị QR Code để hoàn thiện UX.*
  - Giao diện Popup chứa hình ảnh mã QR Code của ngân hàng chuẩn VietQR.
  - Bên dưới hiển thị: Tên Ngân hàng, Chủ tài khoản, Số tài khoản, Nội dung chuyển khoản.
  - Mỗi trường thông tin đều đi kèm nút `<CopyToClipboard />` (Sao chép) với toast thông báo "Đã sao chép".
- **`<ShareModal />`**: Nút chia sẻ lên Zalo, Facebook (sử dụng Web Share API nếu trên Mobile).

---

## 5. Logic Frontend (React Hooks & State Management)

1. **UX Loading States (Ngăn chặn thao tác lỗi)**:
   - Tất cả các form submit đều phải set `isLoading = true`. Nút bấm sẽ đổi style thành dạng loading spinner và `disabled` để chống User spam click (Double Submit).
2. **Quản lý phiên đăng nhập (Authentication)**:
   - Lưu JWT Token ở `httpOnly cookie` hoặc LocalStorage.
   - Khi ấn "Ủng hộ", hệ thống kiểm tra state `isLoggedIn`. Nếu chưa đăng nhập -> bật `<AuthModal />`. Đăng nhập xong -> bật ngay `<DonationModal />` để flow không bị đứt đoạn.
3. **Debounce Search & Skeleton**:
   - Live search dự án phải có độ trễ (delay) để tiết kiệm băng thông.
   - Khi API đang fetch dữ liệu, render `<CardSkeleton />` thay vì màn hình trắng.

---

## 6. Giao diện Frontend Dashboard (Dành cho Nhà trường / Tổ chức)

- **Layout chính**: Dashboard Sidebar cố định bên trái, Header trên cùng chứa User Profile, khu vực Content bên phải thay đổi theo Route.

#### 6.1. Quy định Phê duyệt & Nộp dự án (Cực kỳ quan trọng)
- **Luồng Xác thực (Verification Flow)**:
  - Các tài khoản (Nhà trường) đăng ký xong mặc định là trạng thái `pending` (Chờ duyệt).
  - **Điều kiện UI**: Khi vào Dashboard, Component sẽ check state `isVerified`. Nếu chưa được Admin phê duyệt, toàn bộ menu "Tạo đề xuất mới" (Nộp dự án) sẽ bị vô hiệu hóa (disabled) hoặc ẩn hoàn toàn. Thay vào đó hiển thị màn hình `<PendingApprovalAlert />`.
- **Form Nộp Dự án (`<SubmitProjectForm />`)**:
  - Giao diện Form đa bước (Multi-step form: Thông tin cơ bản -> Chi phí dự kiến -> Tải lên chứng từ).
  - Phải có cơ chế Upload ảnh/file PDF lên server an toàn.
  - Validate Form bằng `Zod`: Bắt buộc điền các trường bắt buộc, số tiền ngân sách phải hợp lệ.

---

## 7. Bảo mật (Security) & Giới hạn của Frontend

Đây là phần tối quan trọng đối với Next.js & Frontend nói chung:

1. **Bảo vệ bằng Backend API (Server-side Validation)**:
   - **Vấn đề Hack F12 (React DevTools)**: Frontend chỉ làm nhiệm vụ ẩn/hiện nút bấm dựa trên State (VD: ẩn nút "Nộp dự án" nếu `isVerified = false`). Tuy nhiên, người dùng am hiểu công nghệ hoàn toàn có thể mở F12, sửa React State hoặc HTML thuộc tính `disabled` để vượt quyền và hiển thị Form.
   - **Chốt chặn cuối cùng**: Backend API bắt buộc phải kiểm tra lại JWT Token, Role (Quyền) và Trạng thái (Verified). Nếu một tài khoản *chưa được duyệt* cố tình gửi request `POST /projects`, Backend phải chặn lại và trả về lỗi `403 Forbidden`.
   - **Form Validation**: Validate tiền âm, tiền vượt mức, tiền không hợp lệ ở Frontend (Zod/Yup) chỉ là để UI phản hồi nhanh. Backend vẫn phải tự validate lại toàn bộ con số này trước khi lưu DB.
2. **Chống XSS (Cross-Site Scripting)**:
   - Mặc định React/Next.js đã tự động escape các dữ liệu bind vào `{}` để ngăn mã độc script.
   - Đối với nội dung hiển thị dạng Rich Text (với `dangerouslySetInnerHTML`), bắt buộc phải bọc qua thư viện sanitize HTML như **`DOMPurify`** để thanh lọc mọi thẻ `<script>` độc hại.
3. **Khả năng tiếp cận (A11y)**:
   - Các Popup/Modal phải hỗ trợ phím `Tab` để di chuyển focus, và phím `Esc` để đóng (Sử dụng Radix UI / Headless UI).
   - Tương thích tốt với Screen Reader cho người khiếm thị (Thêm các thuộc tính `aria-label`).

---

## 8. Nguyên tắc Thực thi cho AI Agent (AI Coding Guidelines)

Định hướng để AI Agent tạo ra mã nguồn chất lượng cao, thẩm mỹ và không gặp lỗi khi code thực tế:

1. **RSC vs Client Component**: 
   - Mặc định mọi Component của Next.js 14+ là **Server Component**. 
   - Chỉ được phép thêm directive `"use client"` ở đầu file khi Component đó bắt buộc phải sử dụng Hooks (useState, useEffect, useDebounce, onClick...).
2. **Sử dụng UI Primitives**: 
   - Tuyệt đối **không** code chay các thẻ HTML thô (như `<button class="...">`) cho các thành phần dùng chung. Phải import từ `components/ui/` (ví dụ: `<Button>`, `<Input>`) để đảm bảo tính đồng nhất của Design System.
3. **Chất lượng Thẩm mỹ (Premium Aesthetics)**:
   - Giao diện phải mang lại cảm giác "Wow", cao cấp và hiện đại. 
   - Áp dụng các hiệu ứng **Micro-animations** (ví dụ: `hover:scale-105 transition-all`), **Glassmorphism** (kính mờ `backdrop-blur`) ở các Modal/Navbar.
   - Sử dụng màu sắc hài hòa, typography chuẩn chỉ (tránh màu đỏ/xanh lá cây thuần rực rỡ, sử dụng các tone màu dịu hoặc gradient tinh tế).
4. **Tuyệt đối Không dùng Lorem Ipsum**:
   - Khi tạo data giả lập (Mock data) để test UI, phải dùng Tiếng Việt có ý nghĩa thực tế (Ví dụ: "Dự án xây trường Mầm non Xéo Dì", số tiền "50,000,000đ").
   - Nếu cần ảnh minh họa, hãy sử dụng URL ảnh placeholder chất lượng cao hoặc dùng tool `generate_image` để tạo ảnh thực tế.
5. **Code sạch (Clean Code & Hydration)**:
   - Tránh việc render các giá trị ngẫu nhiên hoặc thời gian thực (`Date.now()`, `Math.random()`) trực tiếp trong Server Component vì sẽ gây lỗi **Hydration Mismatch** giữa Server và Client.
   - Không viết comment rác trong code. Code phải tự giải thích được ý nghĩa của nó (Self-documenting code).

---

## 9. Thiết kế Dashboard — Nhà trường & Nhân viên Quỹ

> **Căn cứ**: Tài liệu "Mô hình vận hành Quỹ" và sơ đồ vòng đời dự án (Flowchart đính kèm).

### 9.1. Phân vai & Quyền hạn

| Vai trò | Role key | Quyền hạn chính |
|---|---|---|
| Nhà trường | `school` | Gửi đề xuất, theo dõi tiến trình, xác nhận kết quả hỗ trợ |
| Nhân viên quỹ | `reviewer` | Tiếp nhận, kiểm duyệt hồ sơ, yêu cầu bổ sung, duyệt công khai |
| Quản lý quỹ | `manager` | Phê duyệt giải ngân *(V2)* |
| Nhà tài trợ | `donor` | Xem dự án, quyên góp *(luồng đã có)* |

> **Giai đoạn 1**: Tập trung vào 2 dashboard `school` và `reviewer`.

---

### 9.2. Vòng đời Trạng thái Dự án

```
Draft → Submitted → Under Review → Published → Active (kêu gọi) → Stopped/Closed
                         ↕
                    Thiếu hồ sơ → Nhà trường bổ sung → Under Review
```

| Trạng thái | Badge Tailwind | Ý nghĩa |
|---|---|---|
| `draft` | `bg-slate-100 text-slate-600` | Bản nháp, chưa nộp |
| `submitted` | `bg-blue-100 text-blue-700` | Đã nộp, chờ tiếp nhận |
| `under_review` | `bg-orange-100 text-orange-700` | Đang xét duyệt |
| `needs_revision` | `bg-yellow-100 text-yellow-800` | Cần bổ sung hồ sơ |
| `published` | `bg-green-100 text-green-700` | Đang kêu gọi tài trợ |
| `stopped` | `bg-red-100 text-red-700` | Tạm dừng kêu gọi |
| `closed` | `bg-purple-100 text-purple-700` | Hoàn thành, đã giải ngân |

---

### 9.3. Cấu trúc File & Routing

```
src/app/dashboard/
├── layout.tsx                         [NEW] Shared layout: sidebar + top header
├── school/
│   ├── page.tsx                       [NEW] Tổng quan nhà trường
│   ├── projects/
│   │   ├── page.tsx                   [NEW] Danh sách đề xuất của trường
│   │   ├── new/
│   │   │   └── page.tsx               [NEW] Form đa bước tạo đề xuất mới
│   │   └── [id]/
│   │       └── page.tsx               [NEW] Chi tiết dự án + upload bổ sung
│   └── profile/
│       └── page.tsx                   [NEW] Thông tin trường + tài khoản ngân hàng
└── reviewer/
    ├── page.tsx                       [NEW] Tổng quan + hàng chờ xét duyệt
    ├── submissions/
    │   ├── page.tsx                   [NEW] Danh sách hồ sơ (có lọc)
    │   └── [id]/
    │       └── page.tsx               [NEW] Xét duyệt chi tiết + panel hành động
    └── projects/
        └── page.tsx                   [NEW] Bảng quản lý toàn bộ dự án
```

---

### 9.4. Dashboard — Nhà trường (School Portal)

#### `src/app/dashboard/school/page.tsx` — Trang tổng quan

**Wireframe:**
```
┌─────────────────────────────────────────────────────────────┐
│  👋 Xin chào, Trường THPT Nguyễn Đình Chiểu                 │
│  ⚠ Trường chưa hoàn thiện thông tin → [Hoàn thiện ngay →]  │
├──────────┬──────────┬──────────┬────────────────────────────┤
│  3 Dự án │  1 Chờ  │  2 Đang  │  150,000,000đ Tổng nhận   │
│  đã gửi  │  duyệt  │  kêu gọi │                            │
├──────────┴──────────┴──────────┴────────────────────────────┤
│  Dự án của trường tôi                   [+ Tạo đề xuất mới] │
│  • Hỗ trợ học phí HK1 2024-2025   [Cần bổ sung ⚠]         │
│  • Tặng học bổng 5 học sinh        [Đang kêu gọi ✓]        │
│  • Dự phòng học sinh khó khăn      [Bản nháp ✎]            │
├─────────────────────────────────────────────────────────────┤
│  🔔 Thông báo mới nhất                                       │
│  • Hồ sơ "Học phí HK1" cần bổ sung giấy xác nhận (2 giờ)  │
└─────────────────────────────────────────────────────────────┘
```

#### `src/app/dashboard/school/projects/new/page.tsx` — Form tạo đề xuất

**Form gồm 4 bước (Stepper):**

| Bước | Tên | Trường nhập liệu |
|---|---|---|
| 1 | Thông tin chung | Tên dự án*, Mô tả ngắn*, Loại hỗ trợ (Học phí/Học bổng/Dụng cụ/Khác), Chiến dịch |
| 2 | Đối tượng thụ hưởng | Số lượng HS/SV*, Cấp học, Mô tả hoàn cảnh*, Upload danh sách (PDF/Excel) |
| 3 | Tài chính | Số tiền cần (VND)*, Số TK MBBank*, Tên chủ TK*, Thời gian kêu gọi, Kế hoạch kinh phí (PDF) |
| 4 | Hồ sơ đính kèm | Giấy xác nhận HS khó khăn*, Giấy phép trường*, Văn bản đề nghị có chữ ký*, Ảnh minh họa (≤5 ảnh) |

**Validation theo Zod:**
- Số tiền: không âm, không 0, format VND
- SĐT/TK ngân hàng: đúng định dạng Việt Nam
- File: chỉ chấp nhận PDF/JPG/PNG, max 10MB mỗi file

#### `src/app/dashboard/school/projects/[id]/page.tsx` — Chi tiết dự án

- Timeline bước xử lý (Draft → Submitted → Review → Published → Closed)
- **Nếu `needs_revision`**: Banner vàng nổi bật với nội dung yêu cầu của nhân viên quỹ → Nút `[Tải lên tài liệu bổ sung]` + ô phản hồi
- Bảng danh sách nhà tài trợ (ẩn danh hoặc có tên)
- **Nếu `closed`**: Nút `[Xác nhận đã thực hiện hỗ trợ]` + upload ảnh bằng chứng

---

### 9.5. Dashboard — Nhân viên Quỹ (Reviewer Portal)

#### `src/app/dashboard/reviewer/page.tsx` — Tổng quan

**Wireframe:**
```
┌─────────────────────────────────────────────────────────────┐
│  🔔 Cần xử lý hôm nay                                       │
│  • 3 hồ sơ mới chờ tiếp nhận   [Xem ngay →]               │
│  • 1 hồ sơ sắp hết hạn tiếp nhận (còn 4 giờ)              │
├──────────┬──────────┬──────────┬────────────────────────────┤
│  8 Chờ   │  3 Đang  │  12 Đang │  2 Cần xử lý              │
│  tiếp nhận│ xét duyệt│ kêu gọi │  bất thường               │
├──────────┴──────────┴──────────┴────────────────────────────┤
│  Hàng chờ xét duyệt              [Lọc: Mới nhất | Cũ nhất] │
│  🟡 THPT Nguyễn Đình Chiểu — Học phí HK1      [2h trước]   │
│     Chờ tiếp nhận → [Tiếp nhận] [Từ chối]                  │
│  🔴 Trường Mầm non Hoa Mai — Dụng cụ học tập  [5h trước]   │
│     Đang xét duyệt → [Xem hồ sơ]                           │
├─────────────────────────────────────────────────────────────┤
│  ⚠ Cảnh báo bất thường                                      │
│  • Dự án "Học bổng Sơn La" nhận vượt 15% mục tiêu          │
└─────────────────────────────────────────────────────────────┘
```

#### `src/app/dashboard/reviewer/submissions/[id]/page.tsx` — Xét duyệt chi tiết

**Layout 2 cột (2/3 + 1/3):**

- **Cột trái**: Thông tin dự án đầy đủ, hồ sơ đính kèm (preview PDF inline), lịch sử trao đổi & bổ sung hồ sơ
- **Cột phải (Action Panel)**:

| Hành động | UI | Yêu cầu |
|---|---|---|
| ✓ Phê duyệt & Công khai | Nút xanh lá | Confirm modal "Xác nhận duyệt dự án?" |
| ⚠ Yêu cầu bổ sung | Nút vàng | Textarea bắt buộc ghi nội dung yêu cầu |
| ✗ Từ chối hồ sơ | Nút đỏ nhạt | Textarea bắt buộc ghi lý do từ chối |

- Thông tin nhà trường (sidebar mini): tên trường, số dự án đã gửi trước đây, trạng thái xác nhận trường

#### `src/app/dashboard/reviewer/projects/page.tsx` — Quản lý tất cả dự án

- Bảng dữ liệu: Tên dự án | Nhà trường | Trạng thái | Tiến trình % | Ngày tạo | Hành động
- Bộ lọc đa chiều: Trạng thái | Chiến dịch | Nhà trường | Khoảng ngày
- Tìm kiếm toàn văn
- Export báo cáo CSV

---

### 9.6. Sidebar Navigation chung

```
Nhà trường (school):                 Nhân viên Quỹ (reviewer):
├─ 🏠 Tổng quan                      ├─ 🏠 Tổng quan
├─ 📋 Đề xuất của tôi                ├─ 📥 Hàng chờ
│   ├─ Tạo đề xuất mới              │   ├─ Chờ tiếp nhận (3)
│   └─ Danh sách                     │   ├─ Đang xét duyệt (5)
├─ 🔔 Thông báo                      │   └─ Cần bổ sung (2)
├─ 🏫 Thông tin trường               ├─ 📊 Quản lý dự án
└─ ⚙️ Cài đặt tài khoản              ├─ ⚠️ Cảnh báo bất thường
                                     ├─ 🔔 Thông báo
                                     └─ ⚙️ Cài đặt
```

---

### 9.7. Lưu ý Vận hành (từ tài liệu mô hình)

- **Không mở đăng ký công khai**: Nhà trường chỉ vào hệ thống khi được Quỹ mời và cấp tài khoản.
- **Phân tách trách nhiệm**: Người tạo/xử lý hồ sơ không được tự phê duyệt cùng hồ sơ đó.
- **Ngừng kêu gọi tự động**: Khi dự án đủ tiền, hệ thống không tạo thêm hướng dẫn thanh toán mới.
- **Cảnh báo bất thường**: Tài trợ vượt mức, tốc độ tài trợ bất thường → Hiển thị alert để reviewer xử lý trước khi giải ngân.
- **Giải ngân chuyển về nhà trường**: Không chuyển trực tiếp cho cá nhân thụ hưởng.

---

## 10. Template Tham khảo UI cho Dashboard

> **Lưu ý cho AI Agent**: Section này là chỉ dẫn bắt buộc khi build bất kỳ trang nào trong `src/app/dashboard/`. Không tự ý thiết kế lại từ đầu, phải bám sát phong cách và cấu trúc component đã định nghĩa dưới đây.

### 10.1. Template tham khảo chính: shadcn-admin (Sat Naing)

| Thông tin | Chi tiết |
|---|---|
| **Repository** | https://github.com/satnaing/shadcn-admin |
| **Demo** | https://shadcn-admin.netlify.app |
| **Tech Stack** | shadcn/ui + Tailwind CSS + React |
| **License** | MIT (miễn phí, không giới hạn thương mại) |

**Lý do chọn template này:**
- Sidebar collapsible có **badge đếm số** → phù hợp hiển thị `Hàng chờ (3)`, `Cần bổ sung (2)`
- **Light mode clean** — không dùng dark mode mặc định, phù hợp với tone thương hiệu xanh lá `#006B3F`
- Color system trung tính dễ override sang palette của dự án
- Command palette `Cmd+K` cho phép tìm kiếm nhanh (hữu ích cho reviewer)
- Bảng dữ liệu TanStack Table với sort, filter, pagination tích hợp sẵn
- WAI-ARIA accessible, responsive mobile-first
- **Không lock-in**: copy từng component vào codebase, không cài thêm package nặng

### 10.2. Chiến lược tích hợp (Không clone toàn bộ template)

> [!IMPORTANT]
> **TUYỆT ĐỐI KHÔNG** clone hay cài toàn bộ template vào project. Chỉ **tham khảo style** và **copy component cần thiết** vào thư mục `src/components/` của dự án hiện có.

**Quy trình:**
1. Tham khảo source code của [shadcn-admin](https://github.com/satnaing/shadcn-admin) để hiểu cấu trúc layout
2. Copy và adapt các component sau vào project:
   - `AppSidebar` → `src/components/dashboard/AppSidebar.tsx`
   - `SidebarNav` → sử dụng `<SidebarProvider>` từ `shadcn/ui`
   - `TopHeader` với breadcrumb + user avatar dropdown
3. Không copy nguyên vẹn — phải điều chỉnh:
   - Màu sắc theo brand: `#006B3F` (primary), `#C21A30` (danger/accent)
   - Menu items theo đúng cấu trúc route `school` / `reviewer` đã định nghĩa ở Section 9.6
   - Tiếng Việt toàn bộ label

### 10.3. So sánh các lựa chọn đã đánh giá

| Template | GitHub Stars | Ưu điểm | Nhược điểm | Kết luận |
|---|---|---|---|---|
| **shadcn-admin** (Sat Naing) | ~5k ⭐ | Sidebar đẹp, clean, dễ customize, accessible | Vite-based (cần adapt sang Next.js) | ✅ **Chọn làm tham khảo chính** |
| next-shadcn-dashboard-starter | ~6k ⭐ | Next.js App Router, Clerk auth sẵn, Kanban | Phụ thuộc Clerk (phức tạp hơn cần thiết) | 🔶 Dùng tham khảo thêm nếu cần |
| TailAdmin (Next.js free) | ~3k ⭐ | 500+ UI component, chart đẹp | Không dùng shadcn, style "corporate" | ❌ Không phù hợp |
| Shadboard (Qualiora) | ~1k ⭐ | i18n đa ngôn ngữ, Next.js App Router | Ít maintained, ít phổ biến | ❌ Không ưu tiên |

### 10.4. Các shadcn/ui Component cần cài cho Dashboard

Chạy lần lượt các lệnh sau khi build dashboard (nếu chưa có):

```bash
npx shadcn@latest add sidebar
npx shadcn@latest add breadcrumb
npx shadcn@latest add avatar
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
npx shadcn@latest add badge
npx shadcn@latest add alert
npx shadcn@latest add progress
npx shadcn@latest add tabs
npx shadcn@latest add separator
npx shadcn@latest add tooltip
npx shadcn@latest add sheet
```

### 10.5. Màu sắc Dashboard theo Brand

Áp dụng CSS variables trong `globals.css` cho dashboard:

```css
/* Dashboard brand colors */
--dashboard-primary:    #006B3F;  /* Xanh lá — sidebar active, nút chính */
--dashboard-danger:     #C21A30;  /* Đỏ — cảnh báo, từ chối */
--dashboard-warning:    #D97706;  /* Cam — cần bổ sung, đang xét */
--dashboard-success:    #059669;  /* Xanh đậm — đã duyệt, đang kêu gọi */
--dashboard-sidebar-bg: #F8FAFC;  /* Nền sidebar sáng */
--dashboard-content-bg: #FFFFFF;  /* Nền nội dung trắng */
```

### 10.6. Tham khảo thêm (thứ cấp)

- **Recharts**: Dùng cho biểu đồ tiến trình quyên góp, thống kê tổng quan: https://recharts.org
- **TanStack Table v8**: Dùng cho bảng dữ liệu dự án với sort/filter/pagination: https://tanstack.com/table
- **Lucide React**: Icon library (đã có trong dự án): https://lucide.dev
