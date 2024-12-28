import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Dashboard: Sign In",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[var(--dash-theme)]">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
