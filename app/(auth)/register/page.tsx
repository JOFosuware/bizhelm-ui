"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bhFetch } from "@/lib/api";

export default function RegisterPage() {
  const router = useRouter();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await bhFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password })
      });
      setSuccess(true);
      setTimeout(() => router.push("/login"), 800);
    } catch (err: any) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="Create account" subtitle="Set up your BizHelm access">
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-medium text-slate-600">First name</label>
            <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-600">Last name</label>
            <Input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600">Password</label>
          <Input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </div>

        {error ? <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
        {success ? <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">Account created. Check your email to verify.</div> : null}

        <Button className="w-full" disabled={loading}>
          {loading ? "Creating…" : "Create account"}
        </Button>

        <div className="text-sm text-slate-600">
          Already have an account? <Link className="text-slate-900 hover:underline" href="/login">Sign in</Link>
        </div>
      </form>
    </AuthCard>
  );
}
