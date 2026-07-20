"use client"

import { Button } from "@/components/ui/Button"
import { Share2, Heart } from "lucide-react"

interface DonationActionsProps {
  status: "active" | "closed"
}

export function DonationActions({ status }: DonationActionsProps) {
  return (
    <div className="flex flex-col gap-3 mt-6">
      <Button 
        size="lg" 
        className="w-full h-14 text-lg font-bold bg-[#C21A30] hover:bg-[#a01527] text-white shadow-md transition-all hover:-translate-y-0.5"
        disabled={status === "closed"}
        onClick={() => alert("Mở form quyên góp (DonationModal)")}
      >
        <Heart className="w-5 h-5 mr-2 fill-current" />
        {status === "active" ? "Ủng hộ dự án này" : "Dự án đã kết thúc"}
      </Button>
      
      <Button 
        variant="outline" 
        size="lg" 
        className="w-full h-12 text-slate-700 border-slate-300 hover:bg-slate-50 transition-colors"
        onClick={() => alert("Mở form chia sẻ (ShareModal)")}
      >
        <Share2 className="w-5 h-5 mr-2" />
        Chia sẻ dự án
      </Button>
    </div>
  )
}
