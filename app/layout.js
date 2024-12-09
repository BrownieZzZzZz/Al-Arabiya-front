import "./globals.css";
import "/public/assets/fontawesome/css/fontawesome.css";
import "/public/assets/fontawesome/css/brands.css";
import "/public/assets/fontawesome/css/solid.css";
import "/public/assets/fontawesome/css/all.css";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import FastLinks from "@/components/FastLinks/FastLinks";
import PreFooter from "@/components/PreFooter/PreFooter";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Al-Arabiya",
  description:
    "العربية – متجر إلكتروني رائد متخصص في بيع مستحضرات التجميل عالية الجودة. نقدم لكِ مجموعة متكاملة من منتجات العناية بالبشرة، المكياج، والعطور المصممة لتلبية احتياجاتك اليومية وتعزيز جمالك الطبيعي. في العروبية، نؤمن بأن الجمال يبدأ من الداخل، ولهذا نحرص على تقديم منتجات تجمع بين الفخامة والجودة لتمنحكِ تجربة تسوق استثنائية. اكتشفي الآن جمالكِ مع العربية",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <head>
        <link rel="shortcut icon" href="/images/minilogo.png" type="image/x-icon" />
      </head>
      <body className="bg-[var(--theme2)]">
        <Nav></Nav>
        {children}
        <PreFooter/>
        <Footer />
        <FastLinks/>
        <Toaster/>
      </body>
    </html>
  );
}
