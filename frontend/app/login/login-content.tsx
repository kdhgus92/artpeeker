"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const kakaoAuthUrl =
  process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL ??
  (apiUrl ? `${apiUrl}/auth/kakao` : "");

export function LoginContent() {
  const searchParams = useSearchParams();
  const isConfigured =
    !!process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL || !!process.env.NEXT_PUBLIC_API_URL;
  const status = searchParams.get("status");
  const nickname = searchParams.get("nickname");
  const error = searchParams.get("error");

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f6f8fa] px-6 py-10 text-[#1f2328]">
      <div className="w-full max-w-[320px]">
        <div className="mb-10 text-center">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-[-0.03em] text-[#1f2328]"
          >
            Artpeeker
          </Link>
          <h1 className="mt-5 text-2xl font-normal">Sign in to Artpeeker</h1>
        </div>

        <section className="rounded-md border border-[#d0d7de] bg-white px-4 py-5 shadow-sm">
          <label className="block text-sm font-medium text-[#1f2328]">
            Account
          </label>
          <div className="mt-2 rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 py-2 text-sm text-[#59636e]">
            Kakao social login
          </div>

          {status === "success" ? (
            <div className="mt-4 rounded-md border border-[#1a7f37]/20 bg-[#dafbe1] px-3 py-3 text-sm text-[#1a531b]">
              {nickname
                ? `${nickname} 님, 로그인에 성공했습니다.`
                : "로그인에 성공했습니다."}
            </div>
          ) : null}

          {status === "error" ? (
            <div className="mt-4 rounded-md border border-[#cf222e]/20 bg-[#ffebe9] px-3 py-3 text-sm text-[#a40e26]">
              {error
                ? `로그인 중 오류가 발생했습니다: ${error}`
                : "로그인 중 오류가 발생했습니다."}
            </div>
          ) : null}

          {isConfigured ? (
            <a
              href={kakaoAuthUrl}
              className="mt-4 flex h-10 w-full items-center justify-center rounded-md border border-[#d0d7de] bg-[#FEE500] px-4 text-sm font-semibold text-[#1f2328] hover:bg-[#f2da00]"
            >
              카카오로 로그인
            </a>
          ) : (
            <div className="mt-4 rounded-md border border-[#d0d7de] bg-[#f6f8fa] px-3 py-3 text-sm leading-6 text-[#59636e]">
              `NEXT_PUBLIC_KAKAO_LOGIN_URL` 또는 `NEXT_PUBLIC_API_URL`
              설정이 필요합니다.
            </div>
          )}
        </section>

        <section className="mt-4 rounded-md border border-[#d0d7de] px-4 py-4 text-center text-sm text-[#59636e]">
          아직 계정 구성이 끝나지 않았다면 먼저 백엔드의 카카오 OAuth 설정을
          완료해주세요.
        </section>
      </div>
    </main>
  );
}
