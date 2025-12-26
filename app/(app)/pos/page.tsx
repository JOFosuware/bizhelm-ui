import { PageHeader } from "@/components/ui/page-header";
import { PosTerminal } from "@/components/pos/pos-terminal";

export default function PosPage() {
  return (
    <div className="space-y-4">
      <PageHeader title="POS" subtitle="Fast checkout, receipts, and balance collection." />
      <PosTerminal />
    </div>
  );
}
