import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Scale from "@/components/scale";
import { auth } from "@/server/better-auth";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = async ({ children }) => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session?.user) return redirect("/dashboard");

  return (
    <div className="relative min-h-svh overflow-clip">
      <div className="relative mx-auto max-w-7xl">
        <Scale count={50} direction="left" />
        <Scale count={50} direction="right" />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
