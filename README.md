# VTAF Frontend (Vietnam Assistance & Foundation)

Giao diện Web Nền tảng Từ thiện và Trợ giúp Xã hội VTAF (Vietnam Assistance & Foundation).

Nền tảng minh bạch hóa các hoạt động thiện nguyện, kết nối các nhà tài trợ, tình nguyện viên và các dự án hỗ trợ cộng đồng trên toàn quốc.

---

## 🚀 Công nghệ sử dụng (Tech Stack)

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **UI Components**: Radix UI Primitives & Custom Design System

---

## ✨ Tính năng chính

- 🏠 **Trang chủ (Landing Page)**: Giới thiệu các dự án nổi bật, chiến dịch gây quỹ, số liệu thống kê minh bạch.
- 🎯 **Chiến dịch gây quỹ (`/campaigns`)**: Tìm kiếm, theo dõi và đóng góp cho các chiến dịch thiện nguyện.
- 🏗️ **Quản lý Dự án (`/projects`)**: Thông tin chi tiết về các dự án đang được triển khai, tiến độ giải ngân.
- 🔐 **Xác thực Người dùng (`/auth`)**: Đăng nhập, Đăng ký tài khoản nhà tài trợ / tổ chức.
- 📊 **Bảng điều khiển (`/dashboard`)**: Quản lý lịch sử đóng góp, hồ sơ cá nhân và theo dõi tác động xã hội.
- ⚖️ **Điều khoản & Pháp lý (`/legal`)**: Quy chế hoạt động, cam kết bảo mật và công khai tài chính.

---

## 🛠️ Hướng dẫn cài đặt & Chạy ứng dụng

### Yêu cầu môi trường
- Node.js >= 18.x
- npm / yarn / pnpm

### Các bước khởi chạy

1. **Cài đặt các gói phụ thuộc (Dependencies):**
   ```bash
   npm install
   ```

2. **Chạy máy chủ phát triển (Development Server):**
   ```bash
   npm run dev
   ```

3. **Mở trình duyệt:**
   Truy cập [http://localhost:3000](http://localhost:3000) để xem ứng dụng.

4. **Xây dựng bản Production:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📁 Cấu trúc thư mục (Folder Structure)

```text
vtaf-frontend/
├── public/                 # Tệp tĩnh (Images, SVGs, Logos)
├── src/
│   ├── app/                # App Router Pages & Routes
│   │   ├── auth/           # Đăng nhập / Đăng ký
│   │   ├── campaigns/      # Các chiến dịch từ thiện
│   │   ├── dashboard/      # Bảng điều khiển người dùng
│   │   ├── legal/          # Trang pháp lý & điều khoản
│   │   ├── projects/       # Quản lý dự án
│   │   ├── globals.css     # Cấu hình CSS toàn cục & Tailwind
│   │   ├── layout.tsx      # Root Layout
│   │   └── page.tsx        # Trang chủ VTAF
│   ├── components/         # Reusable Components (UI, Shared)
│   ├── lib/                # Utilities & Helper Functions
│   └── utils/              # Helper Scripts
├── .gitignore              # Cấu hình bỏ qua tệp tin Git
├── next.config.ts          # Cấu hình Next.js
└── package.json            # Thông tin dự án & phụ thuộc
```
