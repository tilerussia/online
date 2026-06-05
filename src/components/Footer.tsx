import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { footerLinks } from './Navbar';

function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function VkIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4 8.587 4 8.145c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.372 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.814-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.322-.491.763-.491h1.744c.525 0 .643.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.475-.085.72-.576.72z" />
    </svg>
  );
}

export function Footer() {
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if (adminPassword === 'tileadmin2025') {
      localStorage.setItem('tile-admin-auth', 'true');
      navigate('/admin');
      setShowAdminPrompt(false);
      setAdminError(false);
      setAdminPassword('');
    } else {
      setAdminError(true);
    }
  };

  return (
    <>
      <footer className="bg-zinc-950 border-t border-zinc-800 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="https://i.postimg.cc/hv93Jt6k/ikonka.jpg"
                  alt="TILE RUSSIA"
                  className="w-10 h-10 rounded-lg object-cover border border-red-600"
                />
                <div>
                  <div className="font-bold text-white">TILE RUSSIA</div>
                  <div className="text-xs text-gray-500">Games Studio</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">
                TILE Russia — мобильный RP проект. Все права на игровые материалы принадлежат Tile Russia Games Studio. Проект создан исключительно в развлекательных целях.
              </p>
              <div className="flex items-center gap-3">
                <a href="https://t.me" target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-zinc-900 hover:bg-red-600/20 hover:text-red-500 text-gray-500 rounded-lg transition-all">
                  <TelegramIcon size={18} />
                </a>
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer"
                   className="p-2 bg-zinc-900 hover:bg-red-600/20 hover:text-red-500 text-gray-500 rounded-lg transition-all">
                  <VkIcon size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Навигация</h3>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.to + link.label}>
                    <Link to={link.to} className="text-sm text-gray-500 hover:text-red-400 transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Документы</h3>
              <ul className="space-y-2 mb-6">
                <li><Link to="/page/rules" className="text-sm text-gray-500 hover:text-red-400 transition-colors">Правила проекта</Link></li>
                <li><Link to="/page/privacy" className="text-sm text-gray-500 hover:text-red-400 transition-colors">Конфиденциальность</Link></li>
                <li><Link to="/page/license" className="text-sm text-gray-500 hover:text-red-400 transition-colors">Лицензионное соглашение</Link></li>
                <li><Link to="/page/eula" className="text-sm text-gray-500 hover:text-red-400 transition-colors">EULA</Link></li>
              </ul>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">FAQ</h3>
              <Link to="/faq" className="inline-flex items-center gap-1.5 text-sm text-red-500 hover:text-red-400 transition-colors">
                <HelpCircle size={14} />
                Часто задаваемые вопросы
              </Link>
            </div>
          </div>

          <div className="border-t border-zinc-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">© 2026-2027 Tile Russia Games Studio. Все права защищены.</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/page/eula" className="text-xs text-gray-600 hover:text-red-400 transition-colors">EULA</Link>
              <Link to="/page/privacy" className="text-xs text-gray-600 hover:text-red-400 transition-colors">Конфиденциальность</Link>
              <Link to="/page/rules" className="text-xs text-gray-600 hover:text-red-400 transition-colors">Правила</Link>
              <span
                onClick={() => setShowAdminPrompt(true)}
                className="w-1.5 h-1.5 rounded-full bg-zinc-800 hover:bg-red-600 cursor-pointer transition-colors ml-2"
              />
            </div>
          </div>
        </div>
      </footer>

      {showAdminPrompt && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-red-900/50 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Доступ ограничен</h3>
            <p className="text-sm text-gray-500 mb-4">Введите пароль администратора</p>
            <input
              type="password"
              value={adminPassword}
              onChange={(e) => { setAdminPassword(e.target.value); setAdminError(false); }}
              onKeyDown={(e) => e.key === 'Enter' && handleAdminLogin()}
              placeholder="Пароль..."
              className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors mb-3"
              autoFocus
            />
            {adminError && <p className="text-red-500 text-sm mb-3">Неверный пароль!</p>}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowAdminPrompt(false); setAdminError(false); setAdminPassword(''); }}
                className="flex-1 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-gray-300 rounded-xl transition-colors text-sm font-medium"
              >
                Отмена
              </button>
              <button
                onClick={handleAdminLogin}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors text-sm font-bold"
              >
                Войти
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
