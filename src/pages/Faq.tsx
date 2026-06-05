import { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export function Faq() {
  const { data } = useAdmin();
  const { faq } = data;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filtered = faq.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="py-16 bg-black">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Часто задаваемые <span className="text-red-600">вопросы</span>
          </h1>
          <p className="text-gray-500 max-w-xl mx-auto mb-8">
            Не нашли ответ? Напишите нам в поддержку или загляните на форум.
          </p>

          <div className="relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-900/20 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle size={18} className="text-red-500 flex-shrink-0" />
                  <span className="font-medium text-white">{item.question}</span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-gray-500 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-5 pb-5 pl-12 text-gray-400 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            Ничего не найдено. Попробуйте изменить запрос.
          </div>
        )}

        <div className="text-center mt-12 p-8 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-2">Остались вопросы?</h3>
          <p className="text-gray-500 mb-4">
            Наша поддержка работает круглосуточно и всегда готова помочь!
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300"
          >
            Написать в поддержку
          </a>
        </div>
      </div>
    </div>
  );
}
