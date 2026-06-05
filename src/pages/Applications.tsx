import { useState } from 'react';
import { Send, User, UserCircle, Clock, Link2, Shield, Crown, Check } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

type Role = 'administrator' | 'leader';

const roles = [
  { key: 'administrator' as Role, label: 'Администратор', icon: Shield, desc: 'Управление сервером, решение вопросов игроков', color: 'from-red-600 to-red-800' },
  { key: 'leader' as Role, label: 'Лидер фракции', icon: Crown, desc: 'Управление фракцией, набор и обучение игроков', color: 'from-yellow-600 to-yellow-800' },
];

const timeOptions = ['1-2 часа в день', '3-5 часов в день', 'Более 5 часов в день', 'По настроению'];

export function Applications() {
  const { data } = useAdmin();
  const [form, setForm] = useState({
    nickname: '',
    name: '',
    age: '',
    role: '' as Role | '',
    time: '',
    contact: '',
    experience: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nickname.trim()) e.nickname = 'Введите никнейм';
    if (!form.name.trim()) e.name = 'Введите имя';
    if (!form.age.trim()) e.age = 'Введите возраст';
    else if (isNaN(Number(form.age)) || Number(form.age) < 14 || Number(form.age) > 99) e.age = 'Возраст должен быть от 14 до 99';
    if (!form.role) e.role = 'Выберите роль';
    if (!form.time) e.time = 'Укажите время';
    if (!form.contact.trim()) e.contact = 'Укажите контакт для связи';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const selectedRole = roles.find((r) => r.key === form.role);

    const message = `📋 <b>Новая заявка на роль!</b>\n\n` +
      `👤 <b>Никнейм:</b> ${form.nickname}\n` +
      `📝 <b>Имя:</b> ${form.name}\n` +
      `🎂 <b>Возраст:</b> ${form.age}\n` +
      `⭐ <b>Роль:</b> ${selectedRole?.label}\n` +
      `⏰ <b>Время:</b> ${form.time}\n` +
      `🔗 <b>Контакт:</b> ${form.contact}\n` +
      `💬 <b>Опыт:</b> ${form.experience || 'Не указан'}`;

    try {
      const chatIds = data.telegramChatIds && data.telegramChatIds.length > 0 
        ? data.telegramChatIds 
        : (data.telegramChatId ? [data.telegramChatId] : []);
        
      await Promise.all(
        chatIds.map(id => 
          fetch(`https://api.telegram.org/bot${data.telegramBotToken}/sendMessage?chat_id=${id}&text=${encodeURIComponent(message)}&parse_mode=HTML`, { mode: 'no-cors' }).catch(() => {})
        )
      );
    } catch {}

    // Store locally too
    const applications = JSON.parse(localStorage.getItem('tile-applications') || '[]');
    applications.unshift({ ...form, id: Date.now(), date: new Date().toLocaleString('ru-RU') });
    localStorage.setItem('tile-applications', JSON.stringify(applications.slice(0, 100)));

    setSubmitted(true);
    setSubmitting(false);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 bg-zinc-900 border rounded-xl text-white placeholder-gray-600 focus:outline-none transition-colors ${
      errors[field] ? 'border-red-500' : 'border-zinc-700 focus:border-red-600/50'
    }`;

  if (submitted) {
    return (
      <div className="py-20 bg-black min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Заявка отправлена!</h1>
          <p className="text-gray-400 mb-8">
            Мы рассмотрим вашу заявку и свяжемся с вами в ближайшее время через указанные контакты.
          </p>
          <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors">
            На главную
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-black min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-red-600/10 rounded-2xl mb-4">
            <Shield size={32} className="text-red-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Подать <span className="text-red-600">заявку</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            Хочешь стать частью команды TILE RUSSIA? Заполни форму ниже и мы рассмотрим твою кандидатуру!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <User size={14} /> Никнейм в игре
              </label>
              <input
                type="text"
                value={form.nickname}
                onChange={(e) => { setForm({ ...form, nickname: e.target.value }); setErrors({ ...errors, nickname: '' }); }}
                placeholder="Например: Ivan_Petrov"
                className={inputClass('nickname')}
              />
              {errors.nickname && <p className="text-red-500 text-xs mt-1">{errors.nickname}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                <UserCircle size={14} /> Ваше имя
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                placeholder="Например: Иван"
                className={inputClass('name')}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              🎂 Возраст
            </label>
            <input
              type="number"
              value={form.age}
              onChange={(e) => { setForm({ ...form, age: e.target.value }); setErrors({ ...errors, age: '' }); }}
              placeholder="Ваш возраст"
              min="14"
              max="99"
              className={inputClass('age')}
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-3">На какую роль претендуете?</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roles.map((role) => (
                <button
                  key={role.key}
                  type="button"
                  onClick={() => { setForm({ ...form, role: role.key }); setErrors({ ...errors, role: '' }); }}
                  className={`relative p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                    form.role === role.key
                      ? 'border-red-600 bg-red-600/10'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${role.color}`}>
                      <role.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-white">{role.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{role.desc}</div>
                    </div>
                  </div>
                  {form.role === role.key && (
                    <div className="absolute top-3 right-3">
                      <Check size={16} className="text-red-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <Clock size={14} /> Сколько времени готовы уделять?
            </label>
            <select
              value={form.time}
              onChange={(e) => { setForm({ ...form, time: e.target.value }); setErrors({ ...errors, time: '' }); }}
              className={`${inputClass('time')} cursor-pointer`}
            >
              <option value="" className="bg-zinc-900">Выберите вариант...</option>
              {timeOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-zinc-900">{opt}</option>
              ))}
            </select>
            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
              <Link2 size={14} /> Ссылки для связи
            </label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => { setForm({ ...form, contact: e.target.value }); setErrors({ ...errors, contact: '' }); }}
              placeholder="Telegram (@username), VK (vk.com/id...)"
              className={inputClass('contact')}
            />
            {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Почему именно вы? (опционально)
            </label>
            <textarea
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              placeholder="Расскажите о своём опыте, достижениях или почему вы хотите присоединиться к команде..."
              rows={4}
              className={`${inputClass('experience')} resize-none`}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/40 hover:shadow-red-900/60"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Отправка...
              </>
            ) : (
              <>
                <Send size={18} />
                Отправить заявку
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}