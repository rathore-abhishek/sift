import Scale from "@/components/scale";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
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
