"use client"

import { useState } from "react"
import { History, Receipt } from "lucide-react"

const MOCK_DONORS = [
  { id: 1, name: "Nguyễn Văn A", amount: 500000, message: "Chúc các em học tốt!", time: "2 giờ trước" },
  { id: 2, name: "Nhà Hảo Tâm Ẩn Danh", amount: 1000000, message: "", time: "5 giờ trước" },
  { id: 3, name: "Trần Thị B", amount: 200000, message: "Của ít lòng nhiều", time: "1 ngày trước" },
]

const MOCK_DISBURSEMENTS = [
  { id: 1, phase: "Giai đoạn 1", date: "15/08/2026", amount: 200000000, note: "Giải ngân đợt 1 cho 40 sinh viên", fileUrl: "#" },
  { id: 2, phase: "Giai đoạn 2", date: "15/09/2026", amount: 150000000, note: "Giải ngân đợt 2 cho 30 sinh viên", fileUrl: "#" },
]

export function HistoryTabs() {
  const [activeTab, setActiveTab] = useState<"donors" | "disbursements">("donors")

  return (
    <div className="mt-8 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("donors")}
          className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === "donors" ? "text-[#006B3F] border-b-2 border-[#006B3F] bg-slate-50" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <History className="w-4 h-4" />
          Nhà hảo tâm
        </button>
        <button
          onClick={() => setActiveTab("disbursements")}
          className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${
            activeTab === "disbursements" ? "text-[#006B3F] border-b-2 border-[#006B3F] bg-slate-50" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <Receipt className="w-4 h-4" />
          Giải ngân
        </button>
      </div>

      <div className="p-0">
        {activeTab === "donors" && (
          <ul className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {MOCK_DONORS.map((donor) => (
              <li key={donor.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-slate-900">{donor.name}</span>
                  <span className="font-bold text-[#006B3F]">
                    {new Intl.NumberFormat('vi-VN').format(donor.amount)}đ
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 italic">
                    {donor.message ? `"${donor.message}"` : <span className="text-slate-400">Không có lời nhắn</span>}
                  </span>
                  <span className="text-slate-400 text-xs">{donor.time}</span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "disbursements" && (
          <ul className="divide-y divide-slate-100 max-h-[400px] overflow-y-auto">
            {MOCK_DISBURSEMENTS.map((item) => (
              <li key={item.id} className="p-4 hover:bg-slate-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-bold text-slate-900 block">{item.phase}</span>
                    <span className="text-xs text-slate-500">{item.date}</span>
                  </div>
                  <span className="font-bold text-[#C21A30]">
                    - {new Intl.NumberFormat('vi-VN').format(item.amount)}đ
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-2">{item.note}</p>
                <a href={item.fileUrl} className="text-[#006B3F] text-sm font-medium hover:underline inline-flex items-center gap-1">
                  Xem sao kê / Báo cáo
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
