import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Table, Code, ChevronDown } from 'lucide-react';
import { DorkItem, SearchEngine } from '../../types/dork';
import { exportToTxt, exportToCsv, exportToJson } from '../../utils/dorkUtils';

interface ExportMenuProps {
  dorks: { item: DorkItem; formattedQuery: string }[];
  domain: string;
  engine: SearchEngine;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ dorks, domain, engine }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (format: 'txt' | 'csv' | 'json') => {
    setIsOpen(false);
    if (format === 'txt') exportToTxt(dorks, domain, engine);
    else if (format === 'csv') exportToCsv(dorks, domain, engine);
    else if (format === 'json') exportToJson(dorks, domain, engine);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={dorks.length === 0}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-colors disabled:opacity-50"
      >
        <Download className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
        <span>Export ({dorks.length})</span>
        <ChevronDown className="w-3 h-3 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl z-30 p-1.5 animate-in fade-in-50 zoom-in-95 duration-100">
          <button
            onClick={() => handleExport('txt')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
          >
            <FileText className="w-4 h-4 text-blue-500" />
            <div>
              <div className="font-medium">Plain Text (.txt)</div>
              <div className="text-[10px] text-slate-400">Human-readable list</div>
            </div>
          </button>

          <button
            onClick={() => handleExport('csv')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Table className="w-4 h-4 text-emerald-500" />
            <div>
              <div className="font-medium">Spreadsheet (.csv)</div>
              <div className="text-[10px] text-slate-400">Excel & Sheets ready</div>
            </div>
          </button>

          <button
            onClick={() => handleExport('json')}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left rounded-lg text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
          >
            <Code className="w-4 h-4 text-purple-500" />
            <div>
              <div className="font-medium">Structured (.json)</div>
              <div className="text-[10px] text-slate-400">Full metadata & tags</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
