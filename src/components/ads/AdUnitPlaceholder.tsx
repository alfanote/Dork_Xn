import React, { useEffect, useRef } from 'react';

interface AdUnitPlaceholderProps {
  slotId?: string;
  format?: 'horizontal' | 'rectangle' | 'in-article';
  className?: string;
}

/**
 * AdUnit component embedding the 468x60 iframe ad script.
 * Ad script configuration:
 * atOptions = {
 *   'key' : 'ee8b9aaad8fdd0945b3c43bb9ef7d77c',
 *   'format' : 'iframe',
 *   'height' : 60,
 *   'width' : 468,
 *   'params' : {}
 * };
 * Script src: "https://bicea.org/22/ee8b9aaad8fdd0945b3c43bb9ef7d77c"
 *
 * It uses an isolated sandbox iframe to execute document.write scripts cleanly
 * without interfering with the React root app or other dynamic components.
 */
export const AdUnitPlaceholder: React.FC<AdUnitPlaceholderProps> = ({
  slotId = 'content-unit',
  format = 'horizontal',
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous ad if any
    container.innerHTML = '';

    // Create an isolated sandboxed iframe to safely run document.write based ad tags
    const iframe = document.createElement('iframe');
    iframe.width = '468';
    iframe.height = '60';
    iframe.style.border = 'none';
    iframe.style.overflow = 'hidden';
    iframe.style.display = 'block';
    iframe.style.margin = '0 auto';
    iframe.style.maxWidth = '100%';
    iframe.scrolling = 'no';
    iframe.title = `Ad Unit ${slotId}`;

    container.appendChild(iframe);

    const doc = iframe.contentWindow?.document || iframe.contentDocument;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <base target="_blank">
            <style>
              body { margin: 0; padding: 0; overflow: hidden; background: transparent; display: flex; align-items: center; justify-content: center; }
            </style>
          </head>
          <body>
            <script type="text/javascript">
              atOptions = {
                'key' : 'ee8b9aaad8fdd0945b3c43bb9ef7d77c',
                'format' : 'iframe',
                'height' : 60,
                'width' : 468,
                'params' : {}
              };
            </script>
            <script type="text/javascript" src="https://bicea.org/22/ee8b9aaad8fdd0945b3c43bb9ef7d77c"></script>
          </body>
        </html>
      `);
      doc.close();
    }
  }, [slotId]);

  const formatStyles = {
    horizontal: 'w-full min-h-[80px] max-w-4xl mx-auto my-6',
    rectangle: 'w-full min-h-[80px] max-w-[480px] mx-auto my-6',
    'in-article': 'w-full min-h-[80px] max-w-3xl mx-auto my-6',
  };

  return (
    <div
      className={`relative rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-2.5 text-center flex flex-col items-center justify-center transition-colors ${formatStyles[format]} ${className}`}
      aria-label="Advertisement container"
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mb-1 select-none">
        Advertisement
      </span>

      {/* Ad rendered here */}
      <div
        ref={containerRef}
        className="w-full flex items-center justify-center overflow-hidden"
        style={{ minHeight: '60px' }}
      />
    </div>
  );
};
