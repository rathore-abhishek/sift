"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default async function Home() {
  return (
    <div className="flex min-h-svh items-center justify-center">
      <Button
        render={<Link href={"/auth/login"} />}
        size={"lg"}
        nativeButton={false}
      >
        Login Page
      </Button>
      <Button onClick={() => toast("render toast")}>Render Toast</Button>
    </div>
  );
}
