import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Dashboard: Reset Password",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
