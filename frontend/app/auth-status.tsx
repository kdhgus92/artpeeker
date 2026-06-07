"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type CurrentUser = {
  kakaoId: string;
  nickname: string | null;
  profileImageUrl: string | null;
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export function AuthStatus() {
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = useState(!!apiUrl);

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

        if (!isMounted) {
          return;
        }

        if (response.ok) {
          setUser(await response.json());
        } else {
          setUser(null);
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
    if (!apiUrl) {
      return;
    }

    await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  }

  if (!apiUrl) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center justify-center rounded-md border border-[#d0d7de] bg-[#1f2328] px-4 text-sm font-semibold text-white hover:bg-[#2f353d]"
      >
        로그인 페이지로 이동
      </Link>
    );
  }

  if (isLoading) {
    return (
      <div className="inline-flex h-10 items-center rounded-md border border-[#d0d7de] bg-white px-4 text-sm text-[#59636e]">
        로그인 상태 확인 중
      </div>
    );
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="inline-flex h-10 items-center justify-center rounded-md border border-[#d0d7de] bg-[#1f2328] px-4 text-sm font-semibold text-white hover:bg-[#2f353d]"
      >
        로그인 페이지로 이동
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <div className="inline-flex items-center gap-3 rounded-md border border-[#d0d7de] bg-white px-4 py-2 text-sm text-[#59636e]">
        {user.profileImageUrl ? (
          <span
            aria-hidden="true"
            className="size-7 rounded-full border border-[#d0d7de] bg-cover bg-center"
            style={{ backgroundImage: `url(${user.profileImageUrl})` }}
          />
        ) : null}
        <span className="font-semibold text-[#1f2328]">
          {user.nickname ?? "Kakao 사용자"}
        </span>
        님으로 로그인됨
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="inline-flex h-10 items-center justify-center rounded-md border border-[#d0d7de] bg-white px-4 text-sm font-semibold text-[#1f2328] hover:bg-[#f6f8fa]"
      >
        로그아웃
      </button>
    </div>
  );
}
