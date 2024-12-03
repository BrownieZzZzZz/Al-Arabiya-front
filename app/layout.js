import "./globals.css";
import "/public/assets/fontawesome/css/fontawesome.css";
import "/public/assets/fontawesome/css/brands.css";
import "/public/assets/fontawesome/css/solid.css";
import "/public/assets/fontawesome/css/all.css";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";


export const metadata = {
  title: "Al-Arabiya",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className="bg-[var(--theme2)]">
        <Nav></Nav>
        {children}
        <Footer />
      </body>
    </html>
  );
}
