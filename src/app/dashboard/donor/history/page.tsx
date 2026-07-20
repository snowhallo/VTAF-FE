"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  CheckCircle,
  Calendar,
  Building,
  CreditCard,
  ChevronDown,
  Eye,
} from "lucide-react";

// Mock donor transaction history
const INITIAL_TRANSACTIONS = [
  {
    txCode: "RF-98213",
    projectTitle: "Tặng học bổng 5 học sinh giỏi đạt kết quả xuất sắc kỳ thi chọn đội tuyển Olympic quốc gia",
    school: "Trường THPT Nguyễn Đình Chiểu",
    amount: 10000000,
    method: "Chuyển khoản VietQR (MB)",
    date: "15-07-2026 10:15",
    status: "success",
    projectId: 2,
  },
  {
    txCode: "RF-71239",
    projectTitle: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    school: "Trường THPT Nguyễn Đình Chiểu",
    amount: 10000000,
    method: "Chuyển khoản VietQR (MB)",
    date: "10-06-2026 14:02",
    status: "success",
    projectId: 4,
  },
  {
    txCode: "RF-70981",
    projectTitle: "Tài trợ tài liệu học tập chuyên sâu và thiết bị thí nghiệm cho học sinh chuyên Tin",
    school: "Trường THPT Nguyễn Đình Chiểu",
    amount: 5000000,
    method: "Chuyển khoản VietQR (MB)",
    date: "09-06-2026 09:45",
    status: "success",
    projectId: 4,
  },
];

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

export default function DonorHistoryPage() {
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      return (
        tx.projectTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.txCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.school.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [transactions, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 font-playfair">Lịch sử ủng hộ của tôi</h2>
        <p className="text-xs text-slate-500">Xem lại toàn bộ danh sách các khoản tài trợ đã chuyển khoản thành công</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo mã giao dịch, dự án, trường..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3F]/20 focus:border-[#006B3F] transition-all bg-slate-50/50"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500 tracking-wider border-b border-slate-100">
                <th className="py-3.5 px-5">Mã GD</th>
                <th className="py-3.5 px-5">Dự án & Trường hỗ trợ</th>
                <th className="py-3.5 px-5">Số tiền ủng hộ</th>
                <th className="py-3.5 px-5">Phương thức</th>
                <th className="py-3.5 px-5">Thời gian</th>
                <th className="py-3.5 px-5">Trạng thái</th>
                <th className="py-3.5 px-5 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <tr key={tx.txCode} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-5">
                      <span className="font-mono font-bold text-slate-800">{tx.txCode}</span>
                    </td>
                    <td className="py-4 px-5 max-w-xs">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 leading-snug block line-clamp-2">
                          {tx.projectTitle}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                          <Building className="w-3 h-3" />
                          {tx.school}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <span className="font-bold text-emerald-700">{formatVND(tx.amount)}</span>
                    </td>
                    <td className="py-4 px-5 text-slate-500">
                      <span className="flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                        {tx.method}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {tx.date}
                      </span>
                    </td>
                    <td className="py-4 px-5">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-100">
                        <CheckCircle className="w-3 h-3 text-emerald-600" />
                        Thành công
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <Link
                        href={`/projects/${tx.projectId}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F]/10 hover:bg-[#006B3F] hover:text-white rounded-lg text-[10px] font-bold text-[#006B3F] transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Xem dự án
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium bg-slate-50/20">
                    Không tìm thấy giao dịch nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
