"use client";

import { Card, CardContent } from "@/components/ui/card";

export function AuthCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="mb-5">
          <div className="text-lg font-semibold">{title}</div>
          {subtitle ? <div className="mt-1 text-sm text-slate-600">{subtitle}</div> : null}
        </div>
        {children}
      </CardContent>
    </Card>
  );
}
