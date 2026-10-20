import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  masteredCount: number;
  hesitantCount: number;
  starredCount: number;
  onOpenBackupModal?: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  masteredCount,
  hesitantCount,
  starredCount,
  onOpenBackupModal,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 mb-4">
          <RotateCcw className="w-6 h-6 animate-spin-once" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-black text-gray-900 mb-2">
          Xóa toàn bộ cache & Về ban đầu?
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
          Thao tác này sẽ xóa sạch toàn bộ dữ liệu tiến độ bạn đã lưu trong bộ nhớ máy (cache) để ứng dụng trở về nguyên bản:
        </p>

        {/* Stats list */}
        <div className="bg-gray-50 rounded-2xl p-3.5 space-y-2 border border-gray-100 text-xs mb-6">
          <div className="flex items-center justify-between text-gray-700">
            <span>• Các từ đã nhớ:</span>
            <span className="font-bold text-emerald-600">{masteredCount} từ ➔ 0</span>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <span>• Các từ phân vân:</span>
            <span className="font-bold text-amber-600">{hesitantCount} từ ➔ 0</span>
          </div>
          <div className="flex items-center justify-between text-gray-700">
            <span>• Các từ đã lưu sao:</span>
            <span className="font-bold text-yellow-600">{starredCount} từ ➔ 0</span>
          </div>
          <div className="flex items-center justify-between text-gray-700 pt-1 border-t border-gray-200/60">
            <span>• Bộ lọc bài học:</span>
            <span className="font-bold text-gray-900">Về mặc định cả 25 bài</span>
          </div>
        </div>

        {/* Helpful hint to backup before deleting */}
        {onOpenBackupModal && (
          <div className="bg-emerald-50 rounded-xl p-2.5 mb-5 border border-emerald-200 flex items-center justify-between text-xs">
            <span className="text-emerald-900 font-medium">💡 Muốn đổi máy hoặc giữ tiến độ?</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBackupModal();
              }}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
            >
              Xuất file sao lưu (Backup)
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Xóa hết & Về ban đầu</span>
          </button>
        </div>
      </div>
    </div>
  );
};
