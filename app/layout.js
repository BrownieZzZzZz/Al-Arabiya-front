import "./globals.css";
import "/public/assets/fontawesome/css/fontawesome.css";
import "/public/assets/fontawesome/css/brands.css";
import "/public/assets/fontawesome/css/solid.css";
import "/public/assets/fontawesome/css/all.css";


export const metadata = {
  title: "Al-Arabiya",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar">
      <body className="bg-[var(--theme2)]">
        {children}
      </body>
    </html>
  );
}
