import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <h1 className="text-6xl font-extrabold text-[#006B3F] font-serif">404</h1>
      <h2 className="mt-4 text-2xl font-bold text-slate-800">Trang không tồn tại</h2>
      <p className="mt-2 text-sm text-slate-500 max-w-md">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#006B3F] hover:bg-[#005030] text-white font-semibold rounded-lg text-sm transition-colors shadow-md"
      >
        <Home className="w-4 h-4" />
        Về trang chủ
      </Link>
    </div>
  );
}
