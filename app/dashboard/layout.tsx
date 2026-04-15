import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";
import { auth } from "@/server/better-auth";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = async ({
  children,
}) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) return redirect("/auth/login");

  return (
    <div className="flex min-h-svh flex-col">
      <Navbar />
      {children}
      <Footer />
      <div id="dialog"></div>
    </div>
  );
};

export default DashboardLayout;
