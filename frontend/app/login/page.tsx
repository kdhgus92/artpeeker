const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");
const kakaoAuthUrl =
  process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL ?? (apiUrl ? `${apiUrl}/auth/kakao` : "");

export default function LoginPage() {
  const isConfigured =
    !!process.env.NEXT_PUBLIC_KAKAO_LOGIN_URL || !!process.env.NEXT_PUBLIC_API_URL;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f7f1dc_0%,#eadcc7_42%,#d9c6a8_100%)] px-6 py-16 text-stone-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.75),transparent_36%),radial-gradient(circle_at_bottom_left,rgba(117,74,22,0.18),transparent_28%)]" />

      <section className="relative grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white/75 shadow-[0_32px_90px_rgba(88,61,20,0.16)] backdrop-blur md:grid-cols-[0.95fr_1.05fr]">
        <div className="bg-stone-950 px-8 py-12 text-stone-50 md:px-10 md:py-14">
          <p className="text-sm tracking-[0.24em] text-stone-400 uppercase">
            Artpeeker login
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-balance">
            Save what moved you, and come back anytime.
          </h1>
          <p className="mt-6 max-w-md text-sm leading-7 text-stone-300">
            Kakao login will be the primary sign-in method. This screen is ready
            for that flow and already separates the UI from the API endpoint.
          </p>

          <div className="mt-10 space-y-4 text-sm text-stone-300">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              One-tap social sign-in keeps onboarding light for casual users.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              OAuth callback handling can stay in the ASP.NET backend where
              secrets remain protected.
            </div>
          </div>
        </div>

        <div className="px-8 py-12 md:px-10 md:py-14">
          <div className="max-w-md">
            <p className="text-sm tracking-[0.22em] text-stone-500 uppercase">
              Continue
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
              Sign in with Kakao
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              Use your Kakao account to sync likes, collections, and recent art
              views across devices.
            </p>

            {isConfigured ? (
              <a
                href={kakaoAuthUrl}
                className="mt-10 flex h-14 items-center justify-center gap-3 rounded-full bg-[#FEE500] px-6 text-base font-semibold text-[#191600] shadow-[inset_0_-2px_0_rgba(0,0,0,0.14)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="text-lg leading-none">K</span>
                Continue with Kakao
              </a>
            ) : (
              <div className="mt-10 rounded-3xl border border-amber-900/15 bg-amber-50 px-5 py-4 text-sm leading-7 text-stone-700">
                Kakao login URL is not configured yet.
                <br />
                Set <code>NEXT_PUBLIC_KAKAO_LOGIN_URL</code> or{" "}
                <code>NEXT_PUBLIC_API_URL</code> to activate the button.
              </div>
            )}

            <div className="mt-8 rounded-3xl border border-stone-900/10 bg-white px-5 py-4 text-sm leading-7 text-stone-600">
              Recommended next step: create a backend endpoint like{" "}
              <code>/auth/kakao</code> and redirect users to Kakao from there.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
