"use client";

import Link from "next/link";
import * as React from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bhFetch } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState(" ".trim());
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await bhFetch("/auth/password-reset", { method: "POST", body: JSON.stringify({ email }) });
      setSent(true);
    } catch (err: any) {
      setError(err?.message || "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Reset password" subtitle="We’ll send a reset link to your email.">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="text-xs font-medium text-slate-600">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>
        {sent ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">If that email exists, a reset link has been sent.</div> : null}
        {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
        <Button className="w-full" disabled={loading}>
          {loading ? "Sending…" : "Send reset link"}
        </Button>
        <div className="text-sm text-slate-600">
          Back to <Link className="text-slate-900 hover:underline" href="/login">Sign in</Link>
        </div>
      </form>
    </AuthCard>
  );
}
