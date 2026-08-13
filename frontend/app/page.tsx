import { AuthStatus } from "./auth-status";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f8fa] text-[#1f2328]">
      <AuthStatus />
    </main>
  );
}
