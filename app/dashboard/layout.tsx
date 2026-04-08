import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
    <>
      {children}
      <div id="dialog"></div>
    </>
  );
};

export default DashboardLayout;
