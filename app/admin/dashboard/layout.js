import DashNav from "@/components/DashNav/DashNav";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Al-Arabiya: Admin",
  description:
    "العربية – متجر إلكتروني رائد مختص في بيع مستحضرات تجميل عالية الجودة. نقدم لكِ مجموعة متكاملة من منتجات العناية بالبشرة، المكياج، والعطور المصممة لتلبية احتياجاتك اليومية وتعزيز جمالك الطبيعي. في العربية، نؤمن بأن الجمال يبدأ من الداخل، ولهذا نحرص على تقديم منتجات تجمع بين الفخامة والجودة لتمنحكِ تجربة تسوق استثنائية. اكتشفي الآن جمالكِ معنا!",
};

export default function RootLayout({ children }) {
  return (
    <>
      <div className="flex flex-col bg-[var(--dash-theme)] md:flex-row">
        <DashNav />
        <>{children}</>
      </div>
    </>
  );
}