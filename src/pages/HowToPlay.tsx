import { Download, ArrowRight, Check, MousePointer, Gamepad2 } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { iconMap } from '../utils/iconMap';

export function HowToPlay() {
  const { data } = useAdmin();
  const { steps, requirements } = data;

  return (
    <div className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Как <span className="text-red-600">начать играть</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Всего несколько простых шагов отделяют вас от увлекательного мира RolePlay. Следуйте инструкции!
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-8 mb-20">
          {steps.map((step, i) => {
            const IconComp = iconMap[step.icon] || iconMap['Play'];
            return (
              <div
                key={i}
                className="relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-red-900/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-red-600 to-red-900">
                      <IconComp size={32} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-400 mb-4">{step.desc}</p>
                    <ul className="space-y-2">
                      {step.details.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-500">
                          <Check size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="hidden sm:block text-8xl font-black text-red-600/10 select-none">
                    {i + 1}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* System Requirements */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Системные <span className="text-red-600">требования</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <MousePointer size={20} className="text-gray-400" />
                <h3 className="text-lg font-semibold text-gray-400">Минимальные</h3>
              </div>
              <ul className="space-y-2">
                {requirements.min.map((req, i) => (
                  <li key={i} className="text-sm text-gray-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600 flex-shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-zinc-900/50 border border-red-900/30 rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-transparent" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                  <Gamepad2 size={20} className="text-red-500" />
                  <h3 className="text-lg font-semibold text-red-400">Рекомендуемые</h3>
                </div>
                <ul className="space-y-2">
                  {requirements.rec.map((req, i) => (
                    <li key={i} className="text-sm text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-10 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-red-900/40"
          >
            <Download size={20} />
            Скачать лаунчер
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
