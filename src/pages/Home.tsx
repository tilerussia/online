import { ArrowRight, Download, ChevronDown, Shield, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { iconMap } from '../utils/iconMap';

export function Home() {
  const { data, isButtonEnabled } = useAdmin();
  const { onlineCount, maxSlots, features } = data;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.15),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-red-600 rounded-2xl blur-2xl opacity-40 animate-pulse" />
              <img
                src="https://i.postimg.cc/hv93Jt6k/ikonka.jpg"
                alt="TILE RUSSIA Logo"
                className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover border-2 border-red-600 shadow-2xl shadow-red-900/30"
              />
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight mb-4">
            <span className="text-red-600">TILE</span>{' '}
            <span className="text-white">RUSSIA</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 mb-2 max-w-2xl mx-auto">
            Лучший RolePlay проект с уникальной атмосферой
          </p>
          <p className="text-sm text-gray-600 mb-10 max-w-xl mx-auto">
            Окунись в мир криминальных разборок, легального бизнеса и головокружительных приключений.
          </p>

          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex items-center gap-2 bg-red-600/10 border border-red-600/30 rounded-full px-4 py-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
              <span className="text-green-400 font-semibold">{onlineCount.toLocaleString()}</span>
              <span className="text-gray-500">игроков онлайн</span>
            </div>
            <span className="text-gray-600 text-sm">из {maxSlots.toLocaleString()}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isButtonEnabled('start-playing') ? (
              <a href="#" className="group flex items-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/40 hover:shadow-red-900/60 hover:-translate-y-0.5">
                <Download size={20} />
                Начать играть
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </a>
            ) : (
              <div className="flex items-center gap-2 px-8 py-4 bg-zinc-800 text-gray-500 font-bold rounded-xl cursor-not-allowed">
                <AlertTriangle size={18} />
                Начать играть (временно недоступно)
              </div>
            )}

            {isButtonEnabled('about') ? (
              <Link to="/about" className="flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-semibold rounded-xl border border-white/10 transition-all duration-300 hover:-translate-y-0.5">
                Подробнее о проекте
              </Link>
            ) : (
              <div className="flex items-center gap-2 px-8 py-4 bg-zinc-800/50 text-gray-600 font-semibold rounded-xl">
                О проекте (недоступно)
              </div>
            )}
          </div>

          {isButtonEnabled('applications') && (
            <div className="mt-4">
              <Link
                to="/applications"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl border border-zinc-700 transition-all duration-300 hover:-translate-y-0.5"
              >
                <Shield size={18} className="text-red-500" />
                Подать заявку
              </Link>
            </div>
          )}
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown size={24} className="text-red-600" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Почему выбирают{' '}
              <span className="text-red-600">TILE RUSSIA</span>?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Мы создали уникальный игровой мир с продуманной экономикой, системой фракций и множеством возможностей.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const colors = ['from-red-600 to-red-800', 'from-red-700 to-rose-900', 'from-zinc-700 to-zinc-900'];
              const color = colors[i % colors.length];
              const IconComp = iconMap[feat.icon] || iconMap['Star'];
              return (
                <div
                  key={i}
                  className="group relative bg-zinc-900/50 border border-zinc-800 hover:border-red-900/50 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-900/10"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${color} mb-4`}>
                    <IconComp size={24} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      {isButtonEnabled('download') && (
        <section className="py-16 bg-gradient-to-r from-red-950 via-black to-red-950 border-y border-red-900/30">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Готов начать своё приключение?</h2>
            <p className="text-gray-400 mb-8">
              Подключайся прямо сейчас и стань частью самого масштабного RolePlay проекта!
            </p>
            <a href="#" className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/50">
              <Download size={20} />
              Скачать лаунчер
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
