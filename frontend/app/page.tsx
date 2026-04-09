import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,#fff8da_0%,#f6efe2_36%,#e7dfd4_100%)] px-6 py-16 text-stone-900">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.16),transparent_40%,rgba(119,98,73,0.08)_75%,transparent)]" />
      <div className="relative w-full max-w-5xl rounded-[2rem] border border-stone-900/10 bg-white/70 p-8 shadow-[0_30px_90px_rgba(74,51,22,0.12)] backdrop-blur md:p-12">
        <div className="grid gap-12 md:grid-cols-[1.2fr_0.8fr] md:items-end">
          <section className="space-y-6">
            <span className="inline-flex rounded-full border border-stone-900/10 bg-white/80 px-4 py-2 text-sm tracking-[0.24em] text-stone-600 uppercase">
              Artpeeker
            </span>
            <div className="space-y-4">
              <h1 className="max-w-2xl text-5xl font-semibold tracking-[-0.05em] text-balance md:text-7xl">
                Favorite artworks, all in one calm place.
              </h1>
              <p className="max-w-xl text-lg leading-8 text-stone-600">
                Build your collection, revisit details that caught your eye,
                and keep your art discoveries synced with a simple social login.
              </p>
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-stone-900/10 bg-stone-950 p-8 text-stone-50 shadow-[0_18px_60px_rgba(0,0,0,0.24)]">
            <p className="text-sm tracking-[0.2em] text-stone-400 uppercase">
              Start here
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Sign in to continue
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-300">
              We set up a dedicated login screen first so the Kakao OAuth flow
              can plug into a clear entry point next.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#FEE500] px-6 text-sm font-semibold text-stone-950 transition-transform duration-200 hover:-translate-y-0.5"
            >
              Open login page
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
