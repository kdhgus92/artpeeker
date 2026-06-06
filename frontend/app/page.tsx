import Link from "next/link";

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
          <Link
            href="/login"
            className="inline-flex h-10 items-center justify-center rounded-md border border-[#d0d7de] bg-[#1f2328] px-4 text-sm font-semibold text-white hover:bg-[#2f353d]"
          >
            로그인 페이지로 이동
          </Link>
        </div>
      </div>
    </main>
  );
}
