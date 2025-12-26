"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import * as React from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bhFetch } from "@/lib/api";

export default function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";

  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) {
      setError("Missing token in URL.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await bhFetch("/auth/password-reset/confirm", { method: "POST", body: JSON.stringify({ token, new_password: password }) });
      setDone(true);
      setTimeout(() => router.push("/login"), 900);
    } catch (err: any) {
      setError(err?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Set new password" subtitle="Choose a strong password.">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="text-xs font-medium text-slate-600">New password</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>
        {done ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Password updated. Redirecting…</div> : null}
        {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
        <Button className="w-full" disabled={loading}>{loading ? "Updating…" : "Update password"}</Button>
        <div className="text-sm text-slate-600">
          Back to <Link className="text-slate-900 hover:underline" href="/login">Sign in</Link>
        </div>
      </form>
    </AuthCard>
  );
}
