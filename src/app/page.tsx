import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button"
import { CampaignCard } from "@/components/shared/CampaignCard"

const MOCK_CAMPAIGNS = [
  {
    id: "cp-1",
    title: "Cùng em tới trường - Xây dựng điểm trường Bản Mù, Yên Bái",
    description: "Dự án nhằm xây dựng mới 3 phòng học kiên cố, 1 nhà vệ sinh và cung cấp trang thiết bị học tập cho các em học sinh tiểu học tại vùng cao Bản Mù, giúp các em có một môi trường học tập an toàn và ấm áp hơn trong mùa đông.",
    imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    raised: 150000000,
    goal: 200000000,
  },
  {
    id: "cp-2",
    title: "Nước sạch cho buôn làng - Lắp đặt hệ thống lọc nước tại Tây Nguyên",
    description: "Cung cấp hệ thống lọc nước công suất lớn cho 5 buôn làng đang thiếu nước sạch trầm trọng vào mùa khô, bảo vệ sức khỏe cho hơn 2,000 người dân địa phương.",
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
    raised: 85000000,
    goal: 100000000,
  },
  {
    id: "cp-3",
    title: "Chắp cánh ước mơ - Quỹ học bổng mồ côi vì đại dịch",
    description: "Tài trợ học phí và sinh hoạt phí cho 500 trẻ em không may mất đi người thân trong đại dịch, đảm bảo các em không bị gián đoạn con đường học vấn cho đến khi trưởng thành.",
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
    raised: 250000000,
    goal: 500000000,
  }
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Banner - Chuyển sang thẻ Link vì có note click chuyển hướng */}
      <Link 
        href="/campaigns/chien-dich-he-2026" 
        className="block w-full bg-[#006B3F] hover:bg-[#00824d] transition-colors py-12 md:py-16"
      >
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-xl md:text-3xl font-[family-name:var(--font-playfair)] font-bold text-white mb-3 uppercase tracking-wide">
            CHIẾN DỊCH HÈ 2026
          </h1>
          <p className="text-white/95 text-base md:text-lg font-medium">
            Chắp cánh giấc mơ du học cho những kỹ sư thực hành tài năng tại trường Cao đẳng nghề
          </p>
        </div>
      </Link>

      {/* Featured Campaigns Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Chiến dịch nổi bật</h2>
              <p className="text-slate-600 text-lg">
                Những chương trình quy mô lớn đang cần sự chung sức mạnh mẽ từ cộng đồng để tạo ra những thay đổi mang tính bước ngoặt.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/campaigns">Xem tất cả chiến dịch</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MOCK_CAMPAIGNS.slice(0, 4).map((campaign) => (
              <CampaignCard key={campaign.id} {...campaign} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
