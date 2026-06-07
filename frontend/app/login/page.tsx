import { Suspense } from "react";
import { LoginContent } from "./login-content";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#f6f8fa] px-6 text-sm text-[#59636e]">
          로그인 화면을 불러오는 중
        </main>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
