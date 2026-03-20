import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-svh flex items-center justify-center">
      <Button render={<Link href={"/auth/login"} />} size={"lg"}>
        Login Page
      </Button>
    </div>
  );
}
