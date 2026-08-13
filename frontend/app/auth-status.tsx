"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CurrentUser = {
  kakaoId: string;
  nickname: string | null;
  profileImageUrl: string | null;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

function Brand() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Artpeeker 홈">
      <span className="grid size-8 place-items-center rounded-lg bg-[#1f2328] text-white">
        <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
          <path
            d="M5 17.5 9.2 6.8a1.7 1.7 0 0 1 3.2 0l1.5 3.8m-7.2 2.5h10.6m-1.8-4.2 3.5 8.6"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>
      </span>
      <span className="text-base font-semibold tracking-[-0.02em]">Artpeeker</span>
    </Link>
  );
}

function Header({
  user,
  isLoggingOut,
  onLogout,
}: {
  user?: CurrentUser;
  isLoggingOut?: boolean;
  onLogout?: () => void;
}) {
  return (
    <header className="border-b border-[#d0d7de] bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Brand />
        {user ? (
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <ProfileImage user={user} size="small" />
              <span className="max-w-32 truncate text-sm font-medium">
                {user.nickname ?? "Kakao 사용자"}
              </span>
            </div>
            <button
              type="button"
              onClick={onLogout}
              disabled={isLoggingOut}
              className="h-9 rounded-md border border-[#d0d7de] bg-white px-3 text-sm font-medium hover:bg-[#f6f8fa] disabled:cursor-wait disabled:text-[#8c959f]"
            >
              {isLoggingOut ? "로그아웃 중" : "로그아웃"}
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="inline-flex h-9 items-center rounded-md border border-[#1f2328] bg-[#1f2328] px-3.5 text-sm font-semibold text-white hover:bg-[#2f353d]"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
}

function ProfileImage({
  user,
  size = "large",
}: {
  user: CurrentUser;
  size?: "small" | "large";
}) {
  const sizeClass = size === "small" ? "size-7 text-xs" : "size-14 text-lg";
  const initial = (user.nickname ?? "K").trim().charAt(0).toUpperCase();

  if (user.profileImageUrl) {
    return (
      <span
        role="img"
        aria-label={`${user.nickname ?? "Kakao 사용자"} 프로필 사진`}
        className={`${sizeClass} shrink-0 rounded-full border border-[#d0d7de] bg-[#f6f8fa] bg-cover bg-center`}
        style={{ backgroundImage: `url(${user.profileImageUrl})` }}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={`${sizeClass} grid shrink-0 place-items-center rounded-full border border-[#d0d7de] bg-[#f6f8fa] font-semibold text-[#59636e]`}
    >
      {initial}
    </span>
  );
}

function LoggedOutHome({ isConfigured }: { isConfigured: boolean }) {
  return (
    <>
      <Header />
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-32">
        <div>
          <p className="text-sm font-semibold text-[#59636e]">나만의 조용한 아트 아카이브</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.045em] sm:text-5xl sm:leading-[1.12]">
            마음에 남은 작품을
            <br />오래 간직하세요.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#59636e]">
            전시에서 만난 작품, 다시 보고 싶은 이미지, 그때의 짧은 감상을 한곳에
            모으는 개인 컬렉션입니다.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="inline-flex h-11 items-center rounded-md bg-[#1f2328] px-5 text-sm font-semibold text-white hover:bg-[#2f353d]"
            >
              카카오로 시작하기
            </Link>
            {!isConfigured ? (
              <span className="text-sm text-[#8c959f]">프론트 API 설정이 필요합니다.</span>
            ) : null}
          </div>
        </div>

        <div className="rounded-xl border border-[#d0d7de] bg-white p-4 shadow-[0_8px_30px_rgba(31,35,40,0.06)] sm:p-6">
          <div className="flex items-center justify-between border-b border-[#d8dee4] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#8c959f]">
                My archive
              </p>
              <p className="mt-1 text-sm font-semibold">이번 달의 시선</p>
            </div>
            <span className="rounded-full border border-[#d0d7de] px-2.5 py-1 text-xs text-[#59636e]">
              Private
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-4">
            <div className="aspect-[4/5] rounded-lg bg-[#dce7e2] p-4">
              <div className="h-full rounded-md border border-white/60 bg-[linear-gradient(145deg,#849d91_0%,#cedbd5_46%,#6b8177_47%,#a9bcb3_100%)]" />
            </div>
            <div className="aspect-[4/5] rounded-lg bg-[#ece3d5] p-4">
              <div className="h-full rounded-md border border-white/60 bg-[radial-gradient(circle_at_58%_40%,#c9815a_0_13%,transparent_14%),linear-gradient(155deg,#efe7d8_0_45%,#b5a184_46%_54%,#dbcdb7_55%)]" />
            </div>
          </div>
          <p className="mt-4 text-sm leading-6 text-[#59636e]">
            작품을 저장하고, 컬렉션으로 묶고, 나만의 감상을 기록해보세요.
          </p>
        </div>
      </section>
    </>
  );
}

function Dashboard({
  user,
  isLoggingOut,
  onLogout,
}: {
  user: CurrentUser;
  isLoggingOut: boolean;
  onLogout: () => void;
}) {
  return (
    <>
      <Header user={user} isLoggingOut={isLoggingOut} onLogout={onLogout} />
      <div className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
        <section className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <ProfileImage user={user} />
            <div>
              <p className="text-sm font-medium text-[#59636e]">나의 아트 아카이브</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                {user.nickname ?? "Kakao 사용자"}님의 컬렉션
              </h1>
            </div>
          </div>
          <span className="w-fit rounded-full border border-[#d0d7de] bg-white px-3 py-1.5 text-xs font-medium text-[#59636e]">
            작품 기록 기능 준비 중
          </span>
        </section>

        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            ["저장한 작품", "0"],
            ["컬렉션", "0"],
            ["감상 기록", "0"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-lg border border-[#d0d7de] bg-white px-5 py-4">
              <p className="text-sm text-[#59636e]">{label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{value}</p>
            </div>
          ))}
        </section>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_300px]">
          <section className="overflow-hidden rounded-lg border border-[#d0d7de] bg-white">
            <div className="flex items-center justify-between border-b border-[#d8dee4] px-5 py-4">
              <div>
                <h2 className="font-semibold">최근 저장한 작품</h2>
                <p className="mt-1 text-sm text-[#59636e]">내가 다시 보고 싶은 작품들</p>
              </div>
              <span className="text-xs font-medium text-[#8c959f]">0개</span>
            </div>
            <div className="grid min-h-80 place-items-center px-6 py-12 text-center">
              <div className="max-w-sm">
                <span className="mx-auto grid size-12 place-items-center rounded-full border border-[#d8dee4] bg-[#f6f8fa] text-[#59636e]">
                  <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
                    <path
                      d="M5 5.8A1.8 1.8 0 0 1 6.8 4h10.4A1.8 1.8 0 0 1 19 5.8v12.4a1.8 1.8 0 0 1-1.8 1.8H6.8A1.8 1.8 0 0 1 5 18.2V5.8Zm0 9.7 3.7-3.7a1.4 1.4 0 0 1 2 0l1.5 1.5 1.4-1.4a1.4 1.4 0 0 1 2 0l3.4 3.4M15.5 8h.01"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                    />
                  </svg>
                </span>
                <h3 className="mt-4 font-semibold">첫 작품을 담을 자리를 준비했어요</h3>
                <p className="mt-2 text-sm leading-6 text-[#59636e]">
                  작품 저장 기능이 열리면 이미지와 작가, 감상을 함께 기록할 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-lg border border-[#d0d7de] bg-white">
              <div className="border-b border-[#d8dee4] px-5 py-4">
                <h2 className="font-semibold">컬렉션</h2>
              </div>
              <div className="px-5 py-6 text-sm leading-6 text-[#59636e]">
                주제나 전시별로 작품을 묶는 컬렉션이 여기에 표시됩니다.
              </div>
            </section>
            <section className="rounded-lg border border-[#d0d7de] bg-[#fffdf5] px-5 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8c6d1f]">
                Coming next
              </p>
              <h2 className="mt-2 font-semibold">작품 저장 기능</h2>
              <p className="mt-2 text-sm leading-6 text-[#6e5a26]">
                다음 단계에서 사용자별 작품과 감상 기록을 안전하게 저장할 예정입니다.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

function LoadingHome() {
  return (
    <>
      <header className="h-16 border-b border-[#d0d7de] bg-white" />
      <div className="mx-auto w-full max-w-6xl animate-pulse px-5 py-12 sm:px-8">
        <div className="h-4 w-32 rounded bg-[#d8dee4]" />
        <div className="mt-4 h-10 w-full max-w-md rounded bg-[#d8dee4]" />
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[0, 1, 2].map((item) => (
            <div key={item} className="h-24 rounded-lg bg-[#eaeef2]" />
          ))}
        </div>
      </div>
    </>
  );
}

export function AuthStatus() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(!!apiUrl);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (!apiUrl) {
      return;
    }

    let isMounted = true;

    async function loadCurrentUser() {
      try {
        const response = await fetch(`${apiUrl}/auth/me`, {
          credentials: "include",
        });

        if (isMounted) {
          setUser(response.ok ? await response.json() : null);
        }
      } catch {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      isMounted = false;
    };
  }, []);

  async function handleLogout() {
    if (!apiUrl || isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } finally {
      setIsLoggingOut(false);
    }
  }

  if (isLoading) {
    return <LoadingHome />;
  }

  if (!user) {
    return <LoggedOutHome isConfigured={!!apiUrl} />;
  }

  return <Dashboard user={user} isLoggingOut={isLoggingOut} onLogout={handleLogout} />;
}
