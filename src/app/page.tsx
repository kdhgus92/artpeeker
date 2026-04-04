"use client";

import { supabase } from "@/lib/supabase/client";

export default function Home() {
  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: "kdhgus92@gmail.com",
      password: "test1234!!",
    });
    console.log("signUp:", data, error);
  };

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "kdhgus92@gmail.com",
      password: "test1234!!",
    });
    console.log("signIn:", data, error);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    console.log("signOut:", error);
  };

  return (
    <main style={{ padding: 20 }}>
      <button onClick={signUp}>Sign up</button>
      <button onClick={signIn} style={{ marginLeft: 8 }}>
        Sign in
      </button>
      <button onClick={signOut} style={{ marginLeft: 8 }}>
        Sign out
      </button>
    </main>
  );
}
