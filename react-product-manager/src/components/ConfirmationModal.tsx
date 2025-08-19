import { Button } from './Button.tsx';

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  confirmButtonText?: string;
  children: React.ReactNode;
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  confirmButtonText = 'Delete',
  children,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm flex flex-col gap-5"
      >
        <div className="flex items-start justify-between">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl -mt-2"
          >
            &times;
          </button>
        </div>
        Are you sure?
        <div className="text-slate-600 text-sm">{children}</div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onClose} className="flex-1">
            Cancel
          </Button>

          <Button variant="delete" onClick={onConfirm} className="flex-1">
            {confirmButtonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
