import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { ArrowLeft, FileText } from 'lucide-react';

export function PageView() {
  const { pageId } = useParams();
  const { data } = useAdmin();

  const page = data.pages.find((p) => p.id === pageId);

  if (!page) {
    return (
      <div className="py-20 bg-black min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Страница не найдена</h1>
          <Link to="/" className="text-red-500 hover:text-red-400 transition-colors">← На главную</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-black min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors mb-8">
          <ArrowLeft size={16} /> На главную
        </Link>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-red-600/10 rounded-xl">
              <FileText size={22} className="text-red-500" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{page.title}</h1>
          </div>
          <div className="max-w-none">
            {page.content.split('\n').map((rawLine, i) => {
              const line = rawLine.trim();

              // Пустая строка — отступ
              if (line === '') return <div key={i} className="h-3" />;

              // Заголовок раздела (#)
              if (line.startsWith('#')) {
                return (
                  <h2 key={i} className="text-lg sm:text-xl font-bold text-white mt-8 mb-3 pb-2 border-b border-zinc-800 flex items-center gap-2">
                    <span className="w-1 h-5 bg-red-600 rounded-full" />
                    {line.replace(/^#\s*/, '')}
                  </h2>
                );
              }

              // Маркированный пункт (•)
              if (line.startsWith('•')) {
                return (
                  <p key={i} className="text-gray-400 leading-relaxed mb-2 pl-5 relative">
                    <span className="absolute left-0 text-red-500">•</span>
                    {line.replace(/^•\s*/, '')}
                  </p>
                );
              }

              // Нумерованный пункт (1.1. ...)
              if (/^\d+(\.\d+)*\.?\s/.test(line)) {
                return (
                  <p key={i} className="text-gray-400 leading-relaxed mb-2 pl-1">
                    {line}
                  </p>
                );
              }

              // Обычный абзац
              return (
                <p key={i} className="text-gray-400 leading-relaxed mb-3">
                  {line}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
