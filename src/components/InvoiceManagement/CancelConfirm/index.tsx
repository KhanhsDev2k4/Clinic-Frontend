import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle } from "lucide-react";

interface CancelConfirmProps {
  invoiceCode: string;
  onBack: () => void;
  onConfirm: () => void;
}

function CancelConfirm({ invoiceCode, onBack, onConfirm }: CancelConfirmProps) {
  return (
    <div className="space-y-4">
      <Separator />
      <div className="flex gap-3 rounded-lg bg-red-50 border border-red-100 px-4 py-3">
        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
        <p className="text-xs text-red-700">
          This will cancel invoice <span className="font-mono font-semibold">{invoiceCode}</span>.
          This action cannot be undone.
        </p>
      </div>

      <DialogFooter className="gap-2">
        <Button variant="outline" size="sm" className="text-xs h-8" onClick={onBack}>
          Back
        </Button>
        <Button
          size="sm"
          className="text-xs h-8 bg-red-600 hover:bg-red-700 text-white"
          onClick={onConfirm}
        >
          Confirm Cancel
        </Button>
      </DialogFooter>
    </div>
  );
}

export default CancelConfirm;
