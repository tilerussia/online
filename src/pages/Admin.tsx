import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useAdmin,
  type NewsItem, type FaqItem, type Feature,
  type Faction, type StepItem, type PageContent, type ButtonVisibility
} from '../context/AdminContext';
import {
  ArrowLeft, Save, Trash2, Plus, RefreshCw, Shield,
  Newspaper, HelpCircle, Layout, Settings, LogOut, BookOpen,
  Send, ToggleLeft, ToggleRight, FileText
} from 'lucide-react';

type Tab = 'general' | 'news' | 'faq' | 'features' | 'factions' | 'steps' | 'buttons' | 'telegram' | 'pages' | 'applications';

export function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const navigate = useNavigate();

  const {
    data,
    updateOnlineCount,
    updateMaxSlots,
    updateNews,
    updateFaq,
    updateFeatures,
    updateFactions,
    updateSteps,
    updateRequirements,
    updateButtons,
    updatePages,
    updateTelegram,
    resetToDefaults,
  } = useAdmin();

  const [onlineCount, setOnlineCount] = useState(data.onlineCount.toString());
  const [maxSlots, setMaxSlots] = useState(data.maxSlots.toString());
  const [news, setNews] = useState<NewsItem[]>(JSON.parse(JSON.stringify(data.news)));
  const [faq, setFaq] = useState<FaqItem[]>(JSON.parse(JSON.stringify(data.faq)));
  const [features, setFeatures] = useState<Feature[]>(JSON.parse(JSON.stringify(data.features)));
  const [factions, setFactions] = useState<Faction[]>(JSON.parse(JSON.stringify(data.factions)));
  const [steps, setSteps] = useState<StepItem[]>(JSON.parse(JSON.stringify(data.steps)));
  const [reqMin, setReqMin] = useState(data.requirements.min.join('\n'));
  const [reqRec, setReqRec] = useState(data.requirements.rec.join('\n'));
  const [buttons, setButtons] = useState<ButtonVisibility[]>(JSON.parse(JSON.stringify(data.buttonVisibility)));
  const [pages, setPages] = useState<PageContent[]>(JSON.parse(JSON.stringify(data.pages)));
  const [botToken, setBotToken] = useState(data.telegramBotToken);
  const [chatIds, setChatIds] = useState<string[]>(data.telegramChatIds || (data.telegramChatId ? [data.telegramChatId] : []));
  const [savedMsg, setSavedMsg] = useState('');

  // Applications
  const [applications] = useState<any[]>(
    JSON.parse(localStorage.getItem('tile-applications') || '[]')
  );

  useEffect(() => {
    const auth = localStorage.getItem('tile-admin-auth');
    if (auth === 'true') setAuthenticated(true);
  }, []);

  const handleLogin = () => {
    if (password === 'tileadmin2025') {
      localStorage.setItem('tile-admin-auth', 'true');
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tile-admin-auth');
    setAuthenticated(false);
    navigate('/');
  };

  const showSaved = () => {
    setSavedMsg('✅ Сохранено!');
    setTimeout(() => setSavedMsg(''), 2000);
  };

  const saveGeneral = () => {
    updateOnlineCount(parseInt(onlineCount) || 0);
    updateMaxSlots(parseInt(maxSlots) || 100);
    updateRequirements({ min: reqMin.split('\n').filter(Boolean), rec: reqRec.split('\n').filter(Boolean) });
    showSaved();
  };

  const saveNews = () => { updateNews(news); showSaved(); };
  const saveFaq = () => { updateFaq(faq); showSaved(); };
  const saveFeatures = () => { updateFeatures(features); showSaved(); };
  const saveFactions = () => { updateFactions(factions); showSaved(); };
  const saveSteps = () => { updateSteps(steps); showSaved(); };
  const saveButtons = () => { updateButtons(buttons); showSaved(); };
  const saveTelegram = () => { updateTelegram(botToken, chatIds); showSaved(); };
  const savePages = () => { updatePages(pages); showSaved(); };

  const addNewsItem = () => {
    const newId = Math.max(0, ...news.map((n) => n.id)) + 1;
    setNews([...news, { id: newId, title: 'Новая новость', date: new Date().toLocaleDateString('ru-RU'), category: 'Общее', excerpt: 'Описание...', image: '' }]);
  };

  const addFaqItem = () => setFaq([...faq, { question: 'Новый вопрос', answer: 'Ответ...' }]);
  const addFeature = () => setFeatures([...features, { icon: 'Star', title: 'Новая особенность', desc: 'Описание...' }]);
  const addFaction = () => setFactions([...factions, { icon: 'Users', name: 'Новая фракция', desc: 'Описание...' }]);
  const addStep = () => setSteps([...steps, { icon: 'Play', title: 'Новый шаг', desc: 'Описание...', details: ['Деталь 1', 'Деталь 2'] }]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="bg-zinc-900 border border-red-900/50 rounded-2xl p-8 w-full max-w-sm shadow-2xl">
          <div className="text-center mb-6">
            <Shield size={48} className="text-red-600 mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-white">Админ-панель</h1>
            <p className="text-sm text-gray-500 mt-1">TILE RUSSIA</p>
          </div>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()} placeholder="Пароль администратора"
            className="w-full px-4 py-3 bg-black border border-zinc-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-red-600/50 transition-colors mb-3" autoFocus />
          {error && <p className="text-red-500 text-sm mb-3">Неверный пароль!</p>}
          <button onClick={handleLogin} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors">Войти</button>
          <button onClick={() => navigate('/')} className="w-full mt-3 py-2 text-gray-500 hover:text-white text-sm transition-colors">← На главную</button>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'general', label: 'Общее', icon: <Settings size={18} /> },
    { key: 'news', label: 'Новости', icon: <Newspaper size={18} /> },
    { key: 'faq', label: 'FAQ', icon: <HelpCircle size={18} /> },
    { key: 'features', label: 'Преимущества', icon: <Layout size={18} /> },
    { key: 'factions', label: 'Фракции', icon: <Shield size={18} /> },
    { key: 'steps', label: 'Как начать', icon: <BookOpen size={18} /> },
    { key: 'buttons', label: 'Кнопки', icon: <ToggleLeft size={18} /> },
    { key: 'telegram', label: 'Telegram', icon: <Send size={18} /> },
    { key: 'pages', label: 'Страницы', icon: <FileText size={18} /> },
    { key: 'applications', label: `Заявки (${applications.length})`, icon: <Shield size={18} /> },
  ];

  const inputClass = "w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-red-600/50 transition-colors";
  const textareaClass = "w-full px-3 py-2 bg-black border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:border-red-600/50 transition-colors resize-y";
  const labelClass = "block text-xs font-medium text-gray-400 mb-1";
  const btnPrimary = "flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors";
  const btnOutline = "flex items-center gap-1.5 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-gray-300 text-sm rounded-lg transition-colors";

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-zinc-950 border-b border-red-900/30 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-red-600" />
          <span className="font-bold text-red-500">TILE RUSSIA</span>
          <span className="text-gray-600">|</span>
          <span className="text-sm text-gray-400">Панель администратора</span>
        </div>
        <div className="flex items-center gap-3">
          {savedMsg && <span className="text-green-400 text-sm">{savedMsg}</span>}
          <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-400 transition-colors">
            <LogOut size={16} /> Выйти
          </button>
        </div>
      </header>

      <div className="bg-zinc-950 border-b border-zinc-800 px-4 flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
              activeTab === tab.key ? 'border-red-600 text-red-500' : 'border-transparent text-gray-500 hover:text-white'
            }`}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto p-4 sm:p-8">
        {/* ---- GENERAL ---- */}
        {activeTab === 'general' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold">⚙️ Общие настройки</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div><label className={labelClass}>Онлайн игроков</label><input type="number" value={onlineCount} onChange={(e) => setOnlineCount(e.target.value)} className={inputClass} /></div>
              <div><label className={labelClass}>Максимум слотов</label><input type="number" value={maxSlots} onChange={(e) => setMaxSlots(e.target.value)} className={inputClass} /></div>
            </div>
            <div><label className={labelClass}>Минимальные системные требования (по строке)</label><textarea value={reqMin} onChange={(e) => setReqMin(e.target.value)} rows={6} className={textareaClass} /></div>
            <div><label className={labelClass}>Рекомендуемые системные требования (по строке)</label><textarea value={reqRec} onChange={(e) => setReqRec(e.target.value)} rows={6} className={textareaClass} /></div>
            <div className="flex gap-3">
              <button onClick={saveGeneral} className={btnPrimary}><Save size={16} /> Сохранить</button>
              <button onClick={resetToDefaults} className={btnOutline}><RefreshCw size={16} /> Сбросить к defaults</button>
            </div>
          </div>
        )}

        {/* ---- NEWS ---- */}
        {activeTab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">📰 Новости</h2>
              <button onClick={addNewsItem} className={btnPrimary}><Plus size={16} /> Добавить</button>
            </div>
            <p className="text-xs text-gray-500 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
              💡 Для загрузки изображения: загрузите файл на <a href="https://postimages.org" target="_blank" rel="noopener noreferrer" className="text-red-400 underline">postimages.org</a> и вставьте прямую ссылку (URL, начинающийся с https://i.postimg.cc/...)
            </p>
            {news.map((item, i) => (
              <div key={item.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">ID: {item.id}</span>
                  <button onClick={() => setNews(news.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
                <input value={item.title} onChange={(e) => { const n = [...news]; n[i] = { ...n[i], title: e.target.value }; setNews(n); }} className={inputClass} placeholder="Заголовок" />
                <div className="grid grid-cols-2 gap-3">
                  <input value={item.date} onChange={(e) => { const n = [...news]; n[i] = { ...n[i], date: e.target.value }; setNews(n); }} className={inputClass} placeholder="Дата" />
                  <input value={item.category} onChange={(e) => { const n = [...news]; n[i] = { ...n[i], category: e.target.value }; setNews(n); }} className={inputClass} placeholder="Категория" />
                </div>
                <textarea value={item.excerpt} onChange={(e) => { const n = [...news]; n[i] = { ...n[i], excerpt: e.target.value }; setNews(n); }} rows={2} className={textareaClass} placeholder="Краткое описание" />
                <input value={item.image || ''} onChange={(e) => { const n = [...news]; n[i] = { ...n[i], image: e.target.value }; setNews(n); }} className={inputClass} placeholder="URL изображения (https://i.postimg.cc/...)" />
                {item.image && (
                  <div className="relative h-40 rounded-lg overflow-hidden border border-zinc-700">
                    <img src={item.image} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
                  </div>
                )}
              </div>
            ))}
            <button onClick={saveNews} className={btnPrimary}><Save size={16} /> Сохранить новости</button>
          </div>
        )}

        {/* ---- FAQ ---- */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">❓ FAQ</h2>
              <button onClick={addFaqItem} className={btnPrimary}><Plus size={16} /> Добавить</button>
            </div>
            {faq.map((item, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Вопрос #{i + 1}</span>
                  <button onClick={() => setFaq(faq.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
                <input value={item.question} onChange={(e) => { const f = [...faq]; f[i] = { ...f[i], question: e.target.value }; setFaq(f); }} className={inputClass} placeholder="Вопрос" />
                <textarea value={item.answer} onChange={(e) => { const f = [...faq]; f[i] = { ...f[i], answer: e.target.value }; setFaq(f); }} rows={3} className={textareaClass} placeholder="Ответ" />
              </div>
            ))}
            <button onClick={saveFaq} className={btnPrimary}><Save size={16} /> Сохранить FAQ</button>
          </div>
        )}

        {/* ---- FEATURES ---- */}
        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">⭐ Преимущества (главная страница)</h2>
              <button onClick={addFeature} className={btnPrimary}><Plus size={16} /> Добавить</button>
            </div>
            {features.map((feat, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">#{i + 1}</span>
                  <button onClick={() => setFeatures(features.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
                <input value={feat.icon} onChange={(e) => { const f = [...features]; f[i] = { ...f[i], icon: e.target.value }; setFeatures(f); }} className={inputClass} placeholder="Иконка (Users, Server, Shield, Star, Sparkles)" />
                <input value={feat.title} onChange={(e) => { const f = [...features]; f[i] = { ...f[i], title: e.target.value }; setFeatures(f); }} className={inputClass} placeholder="Заголовок" />
                <textarea value={feat.desc} onChange={(e) => { const f = [...features]; f[i] = { ...f[i], desc: e.target.value }; setFeatures(f); }} rows={2} className={textareaClass} placeholder="Описание" />
              </div>
            ))}
            <button onClick={saveFeatures} className={btnPrimary}><Save size={16} /> Сохранить</button>
          </div>
        )}

        {/* ---- FACTIONS ---- */}
        {activeTab === 'factions' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">🛡️ Фракции</h2>
              <button onClick={addFaction} className={btnPrimary}><Plus size={16} /> Добавить</button>
            </div>
            {factions.map((f, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">#{i + 1}</span>
                  <button onClick={() => setFactions(factions.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
                <input value={f.icon} onChange={(e) => { const n = [...factions]; n[i] = { ...n[i], icon: e.target.value }; setFactions(n); }} className={inputClass} placeholder="Иконка: Shield, Sword, Users, Building2" />
                <input value={f.name} onChange={(e) => { const n = [...factions]; n[i] = { ...n[i], name: e.target.value }; setFactions(n); }} className={inputClass} placeholder="Название" />
                <textarea value={f.desc} onChange={(e) => { const n = [...factions]; n[i] = { ...n[i], desc: e.target.value }; setFactions(n); }} rows={2} className={textareaClass} placeholder="Описание" />
              </div>
            ))}
            <button onClick={saveFactions} className={btnPrimary}><Save size={16} /> Сохранить</button>
          </div>
        )}

        {/* ---- STEPS ---- */}
        {activeTab === 'steps' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">📋 Шаги «Как начать»</h2>
              <button onClick={addStep} className={btnPrimary}><Plus size={16} /> Добавить</button>
            </div>
            {steps.map((step, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Шаг #{i + 1}</span>
                  <button onClick={() => setSteps(steps.filter((_, j) => j !== i))} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                </div>
                <input value={step.icon} onChange={(e) => { const s = [...steps]; s[i] = { ...s[i], icon: e.target.value }; setSteps(s); }} className={inputClass} placeholder="Иконка: Download, UserPlus, Monitor, Play" />
                <input value={step.title} onChange={(e) => { const s = [...steps]; s[i] = { ...s[i], title: e.target.value }; setSteps(s); }} className={inputClass} placeholder="Заголовок шага" />
                <textarea value={step.desc} onChange={(e) => { const s = [...steps]; s[i] = { ...s[i], desc: e.target.value }; setSteps(s); }} rows={2} className={textareaClass} placeholder="Описание" />
                <textarea value={step.details.join('\n')} onChange={(e) => { const s = [...steps]; s[i] = { ...s[i], details: e.target.value.split('\n').filter(Boolean) }; setSteps(s); }} rows={3} className={textareaClass} placeholder="Детали (по одной на строку)" />
              </div>
            ))}
            <button onClick={saveSteps} className={btnPrimary}><Save size={16} /> Сохранить</button>
          </div>
        )}

        {/* ---- BUTTONS VISIBILITY ---- */}
        {activeTab === 'buttons' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">🔘 Видимость кнопок на сайте</h2>
            <p className="text-sm text-gray-500 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
              Включите или выключите кнопки на сайте. Если кнопка выключена — она не отображается, а при прямом переходе показывается сообщение «Временно недоступно».
            </p>
            {buttons.map((btn, i) => (
              <div key={btn.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-white">{btn.label}</div>
                  <div className="text-xs text-gray-500">ID: {btn.id}</div>
                </div>
                <button
                  onClick={() => { const b = [...buttons]; b[i] = { ...b[i], enabled: !b[i].enabled }; setButtons(b); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    btn.enabled ? 'bg-green-600/20 text-green-400' : 'bg-zinc-800 text-gray-500'
                  }`}
                >
                  {btn.enabled ? <ToggleRight size={20} /> : <ToggleLeft size={20} />}
                  {btn.enabled ? 'Включена' : 'Выключена'}
                </button>
              </div>
            ))}
            <button onClick={saveButtons} className={btnPrimary}><Save size={16} /> Сохранить</button>
          </div>
        )}

        {/* ---- TELEGRAM ---- */}
        {activeTab === 'telegram' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">📨 Настройки Telegram</h2>
            <p className="text-sm text-gray-500 bg-zinc-900 p-3 rounded-lg border border-zinc-800">
              Укажите токен бота и ID чатов (пользователей или групп), куда будут приходить уведомления о новых заявках.
            </p>
            <div>
              <label className={labelClass}>Токен бота (Bot Token)</label>
              <input type="text" value={botToken} onChange={(e) => setBotToken(e.target.value)} className={inputClass} placeholder="8367451122:AAFfiN-nr7KtLRCzY2CW1atjN9bJPq3KO0Y" />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-gray-400">ID чатов / получателей (Chat IDs)</label>
                <button onClick={() => setChatIds([...chatIds, ''])} className="text-xs text-red-500 hover:text-red-400 flex items-center gap-1">
                  <Plus size={12} /> Добавить получателя
                </button>
              </div>
              
              <div className="space-y-3">
                {chatIds.map((id, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input 
                      type="text" 
                      value={id} 
                      onChange={(e) => {
                        const newIds = [...chatIds];
                        newIds[index] = e.target.value;
                        setChatIds(newIds);
                      }} 
                      className={inputClass} 
                      placeholder="8388066117" 
                    />
                    <button 
                      onClick={() => setChatIds(chatIds.filter((_, i) => i !== index))}
                      className="p-2 text-gray-500 hover:text-red-500 bg-zinc-900 border border-zinc-700 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {chatIds.length === 0 && (
                  <p className="text-sm text-gray-500 italic">Получатели не добавлены. Уведомления приходить не будут.</p>
                )}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <h3 className="font-medium text-white mb-2">Тестовая отправка</h3>
              <p className="text-xs text-gray-500 mb-4">Сообщение будет отправлено всем указанным получателям выше.</p>
              <button
                onClick={async () => {
                  try {
                    await Promise.all(
                      chatIds.map(id => 
                        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${id}&text=${encodeURIComponent('✅ Тестовое сообщение от TILE RUSSIA! Бот настроен корректно.')}`, { mode: 'no-cors' })
                      )
                    );
                    alert('Сообщения отправлены! Проверьте Telegram.');
                  } catch {
                    alert('Ошибка отправки. Проверьте токен и ID.');
                  }
                }}
                disabled={chatIds.length === 0}
                className={btnOutline + (chatIds.length === 0 ? ' opacity-50 cursor-not-allowed' : '')}
              >
                <Send size={16} /> Отправить тестовое сообщение
              </button>
            </div>
            <button onClick={saveTelegram} className={btnPrimary}><Save size={16} /> Сохранить настройки</button>
          </div>
        )}

        {/* ---- PAGES ---- */}
        {activeTab === 'pages' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">📄 Страницы сайта</h2>
            {pages.map((page, i) => (
              <div key={page.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">/{page.id}</span>
                </div>
                <input value={page.title} onChange={(e) => { const p = [...pages]; p[i] = { ...p[i], title: e.target.value }; setPages(p); }} className={inputClass} placeholder="Заголовок" />
                <textarea value={page.content} onChange={(e) => { const p = [...pages]; p[i] = { ...p[i], content: e.target.value }; setPages(p); }} rows={8} className={textareaClass} placeholder="Содержимое страницы (по абзацам)" />
              </div>
            ))}
            <button onClick={savePages} className={btnPrimary}><Save size={16} /> Сохранить страницы</button>
          </div>
        )}

        {/* ---- APPLICATIONS ---- */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">📋 Заявки ({applications.length})</h2>
            {applications.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Заявок пока нет.</div>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="font-bold text-white text-lg">{app.nickname}</div>
                        <div className="text-xs text-gray-500">{app.date}</div>
                      </div>
                      <span className="px-3 py-1 bg-red-600/20 text-red-400 text-xs font-medium rounded-full">
                        {app.role === 'administrator' ? 'Администратор' : 'Лидер'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div><span className="text-gray-500">Имя:</span> <span className="text-white ml-1">{app.name}</span></div>
                      <div><span className="text-gray-500">Возраст:</span> <span className="text-white ml-1">{app.age}</span></div>
                      <div><span className="text-gray-500">Время:</span> <span className="text-white ml-1">{app.time}</span></div>
                      <div><span className="text-gray-500">Контакт:</span> <span className="text-red-400 ml-1">{app.contact}</span></div>
                    </div>
                    {app.experience && (
                      <div className="text-sm text-gray-400 bg-black/30 rounded-lg p-3">
                        <span className="text-gray-500">Опыт: </span>{app.experience}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-zinc-800">
          <button onClick={() => navigate('/')} className="text-sm text-gray-500 hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft size={14} /> На главную сайта
          </button>
        </div>
      </div>
    </div>
  );
}
