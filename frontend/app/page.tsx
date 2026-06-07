import { AuthStatus } from "./auth-status";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f6f8fa] px-6 py-16 text-[#1f2328]">
      <div className="w-full max-w-3xl text-center">
        <p className="text-sm font-medium text-[#59636e]">Artpeeker</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] md:text-5xl">
          작품을 저장하고 다시 보는 가장 단순한 방법
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#59636e]">
          좋아한 작품, 컬렉션, 감상 기록을 깔끔하게 모아두고 카카오 로그인으로
          가볍게 시작하세요.
        </p>
        <div className="mt-8 flex justify-center">
          <AuthStatus />
        </div>
      </div>
    </main>
  );
}
