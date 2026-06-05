import { Calendar, ArrowRight, Sparkles, Tag } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const newsColors = [
  'from-red-600 to-red-900',
  'from-red-700 to-rose-900',
  'from-zinc-600 to-zinc-900',
  'from-red-600 to-red-900',
  'from-zinc-600 to-zinc-900',
  'from-red-700 to-rose-900',
];

export function News() {
  const { data } = useAdmin();
  const { news } = data;

  return (
    <div className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="text-red-600">Новости</span> и обновления
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Будьте в курсе всех событий проекта. Регулярные обновления, ивенты и турниры.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="text-center text-gray-500 py-12">Новостей пока нет.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, i) => (
              <article
                key={item.id}
                className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-900/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${newsColors[i % newsColors.length]} flex items-center justify-center`}>
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          const el = e.currentTarget;
                          el.style.display = 'none';
                          const fallback = el.nextElementSibling as HTMLElement | null;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 hidden items-center justify-center">
                        <Sparkles size={48} className="text-white/30" />
                      </div>
                      {/* Gradient overlay for readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </>
                  ) : (
                    <Sparkles size={48} className="text-white/30" />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400 bg-red-600/10 px-2 py-1 rounded-full">
                      <Tag size={12} />
                      {item.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                      <Calendar size={12} />
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-red-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {item.excerpt}
                  </p>

                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                  >
                    Читать дальше
                    <ArrowRight size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
