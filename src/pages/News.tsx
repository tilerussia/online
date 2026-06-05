import { Calendar, ArrowRight, Tag } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

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
            {news.map((item) => (
              <article
                key={item.id}
                className="group bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-900/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image or gradient */}
                <div className="h-48 relative overflow-hidden bg-zinc-950">
                  {item.image ? (
                    <>
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </>
                  ) : (
                    <div className="h-full bg-gradient-to-br from-red-600/20 to-red-900/20 flex items-center justify-center">
                      <div className="text-red-500/30 text-6xl font-black">NEWS</div>
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
                      <Tag size={12} />
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3 text-xs text-gray-500">
                    <Calendar size={12} />
                    {item.date}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-3">
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
