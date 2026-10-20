import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  FileJson, 
  CheckCircle2, 
  AlertCircle, 
  HardDrive, 
  Sparkles,
  HelpCircle,
  Star
} from 'lucide-react';

export interface BackupData {
  app: string;
  version: number;
  exportDate: string;
  masteredWords: string[];
  learningWords: string[];
  starredWords: string[];
  stats?: {
    masteredCount: number;
    learningCount: number;
    starredCount: number;
  };
}

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  masteredIds: Set<string>;
  learningIds: Set<string>;
  starredIds: Set<string>;
  onImportData: (
    data: { mastered: string[]; learning: string[]; starred: string[] },
    mode: 'replace' | 'merge'
  ) => void;
  showToast: (msg: string) => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  masteredIds,
  learningIds,
  starredIds,
  onImportData,
  showToast,
}) => {
  const [activeTab, setActiveTab] = useState<'export' | 'import'>('export');
  const [importMode, setImportMode] = useState<'replace' | 'merge'>('replace');
  const [previewData, setPreviewData] = useState<BackupData | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Handle Export File
  const handleExport = () => {
    try {
      const data: BackupData = {
        app: 'Yama Nihongo',
        version: 1,
        exportDate: new Date().toISOString(),
        masteredWords: Array.from(masteredIds),
        learningWords: Array.from(learningIds),
        starredWords: Array.from(starredIds),
        stats: {
          masteredCount: masteredIds.size,
          learningCount: learningIds.size,
          starredCount: starredIds.size,
        },
      };

      const jsonStr = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const fileName = `yama_nihongo_backup_${dateStr}.json`;

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast(`Đã xuất file sao lưu "${fileName}" thành công!`);
    } catch (err) {
      console.error(err);
      showToast('Có lỗi xảy ra khi tạo file sao lưu!');
    }
  };

  // Handle File Selection for Import
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);

        // Normalize legacy or modern schema
        const mastered = Array.isArray(parsed.masteredWords)
          ? parsed.masteredWords
          : Array.isArray(parsed.minna_mastered_words)
          ? parsed.minna_mastered_words
          : [];

        const learning = Array.isArray(parsed.learningWords)
          ? parsed.learningWords
          : Array.isArray(parsed.minna_learning_words)
          ? parsed.minna_learning_words
          : [];

        const starred = Array.isArray(parsed.starredWords)
          ? parsed.starredWords
          : Array.isArray(parsed.minna_starred_words)
          ? parsed.minna_starred_words
          : [];

        if (mastered.length === 0 && learning.length === 0 && starred.length === 0) {
          setImportError('File không chứa dữ liệu học tập hợp lệ hoặc danh sách từ rỗng.');
          setPreviewData(null);
          return;
        }

        setPreviewData({
          app: parsed.app || 'Yama Nihongo',
          version: parsed.version || 1,
          exportDate: parsed.exportDate || new Date().toISOString(),
          masteredWords: mastered,
          learningWords: learning,
          starredWords: starred,
          stats: {
            masteredCount: mastered.length,
            learningCount: learning.length,
            starredCount: starred.length,
          },
        });
      } catch (err) {
        console.error(err);
        setImportError('File không đúng định dạng JSON chuẩn. Vui lòng chọn file sao lưu hợp lệ.');
        setPreviewData(null);
      }
    };

    reader.onerror = () => {
      setImportError('Không thể đọc file. Vui lòng thử lại.');
      setPreviewData(null);
    };

    reader.readAsText(file);
  };

  // Confirm Import
  const handleConfirmImport = () => {
    if (!previewData) return;

    onImportData(
      {
        mastered: previewData.masteredWords,
        learning: previewData.learningWords,
        starred: previewData.starredWords,
      },
      importMode
    );

    showToast(
      importMode === 'replace'
        ? `Khôi phục thành công! Đã nạp ${previewData.masteredWords.length} từ thuộc và ${previewData.learningWords.length} từ phân vân.`
        : `Gộp dữ liệu thành công! Đã bổ sung dữ liệu học tập vào máy.`
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-4 sm:p-6 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-gray-900 leading-tight flex items-center gap-1.5">
                <span>Xuất / Nhập Cache (Đổi máy)</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Backup
                </span>
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Sao lưu tiến độ hoặc nạp file backup để tiếp tục học khi chuyển sang máy khác
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher: Xuất file / Nhập file */}
        <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100 rounded-xl my-3 sm:my-4">
          <button
            type="button"
            onClick={() => setActiveTab('export')}
            className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'export'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>1. Xuất file Backup (Tải về)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('import')}
            className={`flex items-center justify-center gap-1.5 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
              activeTab === 'import'
                ? 'bg-white text-rose-600 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>2. Nhập file Backup (Nạp lên)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {activeTab === 'export' ? (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-rose-50/80 to-amber-50/50 rounded-2xl p-4 border border-rose-100/80">
                <div className="flex items-center gap-2 text-xs font-bold text-rose-900 mb-2">
                  <Sparkles className="w-4 h-4 text-rose-600" />
                  <span>Dữ liệu học tập hiện tại trên máy này:</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white/90 p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-emerald-700 mb-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Đã thuộc</span>
                    </div>
                    <div className="text-lg font-black text-emerald-800">{masteredIds.size}</div>
                    <div className="text-[10px] text-gray-500">từ vựng</div>
                  </div>

                  <div className="bg-white/90 p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-amber-700 mb-0.5">
                      <HelpCircle className="w-3 h-3" />
                      <span>Phân vân</span>
                    </div>
                    <div className="text-lg font-black text-amber-800">{learningIds.size}</div>
                    <div className="text-[10px] text-gray-500">từ vựng</div>
                  </div>

                  <div className="bg-white/90 p-2.5 rounded-xl border border-rose-100 shadow-2xs">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-yellow-700 mb-0.5">
                      <Star className="w-3 h-3" />
                      <span>Đã lưu</span>
                    </div>
                    <div className="text-lg font-black text-yellow-800">{starredIds.size}</div>
                    <div className="text-[10px] text-gray-500">từ sao</div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-gray-600 space-y-1.5 leading-relaxed bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                <p className="font-bold text-gray-800 flex items-center gap-1">
                  <span>💡 Hướng dẫn đổi máy:</span>
                </p>
                <p>1. Bấm nút <strong>"Tải file sao lưu (.json)"</strong> bên dưới để lưu file vào máy cũ.</p>
                <p>2. Gửi file đó sang máy mới (qua Zalo, Google Drive, Gmail, v.v.).</p>
                <p>3. Mở ứng dụng trên máy mới ➔ Chọn tab <strong>"Nhập file Backup"</strong> ➔ Tải file lên là xong!</p>
              </div>

              <button
                type="button"
                onClick={handleExport}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-rose-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Tải file sao lưu (.json) về máy ngay</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File upload picker box */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/40 hover:bg-rose-50/70 p-6 rounded-2xl text-center cursor-pointer transition-all group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".json,application/json"
                  className="hidden"
                />
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-2.5 group-hover:scale-105 transition-transform">
                  <FileJson className="w-6 h-6" />
                </div>
                <div className="text-xs sm:text-sm font-bold text-gray-800">
                  {previewData ? 'Bấm để chọn file khác' : 'Bấm để chọn file backup (.json)'}
                </div>
                <p className="text-[11px] text-gray-500 mt-1">
                  Hỗ trợ định dạng file sao lưu do Yama Nihongo tạo ra
                </p>
              </div>

              {/* Error message */}
              {importError && (
                <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 rounded-xl text-xs border border-red-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{importError}</span>
                </div>
              )}

              {/* Preview data */}
              {previewData && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Phát hiện file hợp lệ:
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {new Date(previewData.exportDate).toLocaleDateString('vi-VN')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-white p-2 rounded-xl border border-emerald-100 shadow-2xs">
                      <div className="text-[11px] font-semibold text-emerald-700">Đã thuộc</div>
                      <div className="text-base font-black text-emerald-800">{previewData.masteredWords.length}</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-emerald-100 shadow-2xs">
                      <div className="text-[11px] font-semibold text-amber-700">Phân vân</div>
                      <div className="text-base font-black text-amber-800">{previewData.learningWords.length}</div>
                    </div>
                    <div className="bg-white p-2 rounded-xl border border-emerald-100 shadow-2xs">
                      <div className="text-[11px] font-semibold text-yellow-700">Đã lưu sao</div>
                      <div className="text-base font-black text-yellow-800">{previewData.starredWords.length}</div>
                    </div>
                  </div>

                  {/* Mode select: Replace vs Merge */}
                  <div className="pt-2 border-t border-emerald-200/60">
                    <div className="text-[11px] font-bold text-gray-700 mb-1.5">
                      Phương thức nạp vào máy này:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <label 
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                          importMode === 'replace' 
                            ? 'bg-emerald-100/80 border-emerald-400 font-bold text-emerald-900' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="importMode"
                          checked={importMode === 'replace'}
                          onChange={() => setImportMode('replace')}
                          className="text-emerald-600"
                        />
                        <span>Ghi đè (Đổi máy)</span>
                      </label>

                      <label 
                        className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer transition-all ${
                          importMode === 'merge' 
                            ? 'bg-emerald-100/80 border-emerald-400 font-bold text-emerald-900' 
                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="importMode"
                          checked={importMode === 'merge'}
                          onChange={() => setImportMode('merge')}
                          className="text-emerald-600"
                        />
                        <span>Gộp với máy này</span>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleConfirmImport}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 active:scale-98 transition-all cursor-pointer mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Khôi phục dữ liệu ngay bây giờ</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
