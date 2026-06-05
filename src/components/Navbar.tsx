import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Gamepad2, Sword, Newspaper, Play } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Главная', icon: Gamepad2, end: true },
  { to: '/about', label: 'О проекте', icon: Sword },
  { to: '/news', label: 'Новости', icon: Newspaper },
  { to: '/how-to-play', label: 'Как начать', icon: Play },
];

const footerLinks = [
  { label: 'Главная', to: '/' },
  { label: 'Сервер', to: '/how-to-play' },
  { label: 'Возможности', to: '/about' },
  { label: 'Скачать', to: '/how-to-play' },
  { label: 'Правила проекта', to: '/page/rules' },
  { label: 'Конфиденциальность', to: '/page/privacy' },
  { label: 'Лицензионное соглашение', to: '/page/license' },
  { label: 'FAQ', to: '/faq' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-red-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <NavLink to="/" className="flex items-center gap-3 group">
              <img
                src="https://i.postimg.cc/hv93Jt6k/ikonka.jpg"
                alt="Logo"
                className="w-10 h-10 rounded-lg object-cover border-2 border-red-600 group-hover:border-red-400 transition-colors"
              />
              <span className="text-xl font-bold uppercase tracking-wider hidden sm:block">
                <span className="text-red-600">TILE</span>{' '}
                <span className="text-white">RUSSIA</span>
              </span>
            </NavLink>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-red-600/20 text-red-500 shadow-sm shadow-red-900/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <link.icon size={16} />
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="lg:hidden border-t border-red-900/20 bg-black/95 backdrop-blur-md">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-red-600/20 text-red-500'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <link.icon size={18} />
                  {link.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}

export { footerLinks };
