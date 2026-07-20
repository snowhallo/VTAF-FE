export function ProjectContent() {
  return (
    <article className="text-slate-700 leading-relaxed">
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 mt-6 first:mt-0">Mục tiêu dự án</h2>
      <p className="mb-4">
        Dự án hướng tới việc cung cấp học bổng toàn phần cho 100 sinh viên xuất sắc có hoàn cảnh khó khăn đang theo học tại các trường Đại học Công nghệ thông tin trên toàn quốc. Chúng tôi tin rằng tài chính không nên là rào cản ngăn cản những tài năng trẻ phát triển.
      </p>
      
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 mt-8">Kế hoạch triển khai</h2>
      <ul className="list-disc pl-5 mb-4 space-y-2">
        <li><strong>Giai đoạn 1 (Tháng 8/2026):</strong> Tổ chức xét duyệt hồ sơ và phỏng vấn chọn lọc.</li>
        <li><strong>Giai đoạn 2 (Tháng 9/2026):</strong> Tổ chức Lễ trao học bổng đợt 1 và ký kết thỏa thuận đồng hành.</li>
        <li><strong>Giai đoạn 3 (Tháng 12/2026):</strong> Hỗ trợ đào tạo kỹ năng mềm và cấp quyền truy cập các khóa học AI nâng cao.</li>
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 mt-8">Thông điệp từ Ban Tổ Chức</h2>
      <p className="mb-4">
        "Mỗi sự đóng góp của bạn, dù lớn hay nhỏ, đều là một viên gạch xây dựng nên tương lai tươi sáng hơn cho một sinh viên. Hãy cùng Quỹ Hỗ trợ Nhân tài Việt Nam chắp cánh cho những ước mơ công nghệ vươn xa."
      </p>
      
      <blockquote className="border-l-4 border-[#006B3F] pl-4 italic text-slate-600 bg-slate-50 py-3 pr-4 rounded-r-lg mt-6">
        <p>Đầu tư vào giáo dục là khoản đầu tư mang lại lợi nhuận cao nhất cho xã hội.</p>
      </blockquote>
    </article>
  )
}
