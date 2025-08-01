import Link from "next/link";
import logo from "@/public/Logo.png";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <Image src={logo} alt="logo" width={32} height={32} />
          Upreps Task
        </Link>
        {children}
        <div className="text-balance text-center text-xs text-muted-foreground ">
          by clicking continue, you agree to our{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="hover:text-primary hover:underline cursor-pointer">
            Privacy Policy
          </span>
        </div>
      </div>
    </div>
  );
}
