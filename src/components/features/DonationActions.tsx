import { Button } from "@/components/ui/Button"
import { Share2, Heart } from "lucide-react"

interface DonationActionsProps {
  status: "active" | "closed"
  onDonate?: () => void
  onShare?: () => void
}

export function DonationActions({ status, onDonate, onShare }: DonationActionsProps) {
  return (
    <div className="flex flex-col gap-3.5 mt-6">
      <Button 
        size="lg" 
        className="w-full h-14 text-base md:text-lg font-bold bg-[#C21A30] hover:bg-[#a01527] text-white shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 animate-pulse-glow cursor-pointer"
        disabled={status === "closed"}
        onClick={onDonate || (() => alert("Mở form quyên góp (DonationModal)"))}
      >
        <Heart className="w-5 h-5 mr-2 fill-current animate-heartbeat text-white" />
        {status === "active" ? "Ủng hộ dự án ngay" : "Dự án đã kết thúc"}
      </Button>
      
      <Button 
        variant="outline" 
        size="lg" 
        className="w-full h-12 text-slate-700 border-slate-300 hover:bg-slate-50 hover:border-slate-400 transition-all active:scale-95 cursor-pointer"
        onClick={onShare || (() => alert("Mở form chia sẻ (ShareModal)"))}
      >
        <Share2 className="w-5 h-5 mr-2 text-slate-500" />
        Chia sẻ dự án
      </Button>
    </div>
  )
}
