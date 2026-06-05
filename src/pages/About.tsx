import { useAdmin } from '../context/AdminContext';
import { iconMap } from '../utils/iconMap';

const factionColors = ['from-blue-600 to-blue-800', 'from-green-700 to-green-900', 'from-red-700 to-red-950', 'from-yellow-600 to-yellow-800'];

const aboutFeatures = [
  { icon: 'Car', title: '200+ автомобилей', desc: 'Огромный автопарк: от советской классики до премиальных спорткаров.' },
  { icon: 'Map', title: 'Огромная карта', desc: 'Детально проработанная карта с десятками городов и посёлков.' },
  { icon: 'Coins', title: 'Экономика', desc: 'Реалистичная экономическая система с работой, бизнесом и торговлей.' },
  { icon: 'Crown', title: 'VIP-система', desc: 'Привилегии для донатеров: уникальные скины, дома и автомобили.' },
];

export function About() {
  const { data } = useAdmin();
  const { factions } = data;

  return (
    <div className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            О <span className="text-red-600">TILE RUSSIA</span>
          </h1>
          <p className="text-gray-500 max-w-3xl mx-auto leading-relaxed">
            TILE RUSSIA — это уникальный RolePlay сервер, созданный для настоящих ценителей жанра.
            Мы объединили лучшие механики, продуманную экономику и захватывающий геймплей,
            чтобы подарить вам незабываемые эмоции от игры.
          </p>
        </div>

        {/* Factions */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Игровые <span className="text-red-600">фракции</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {factions.map((f, i) => {
              const IconComp = iconMap[f.icon] || iconMap['Users'];
              const color = factionColors[i % factionColors.length];
              return (
                <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center hover:border-red-900/30 transition-all duration-300 hover:-translate-y-1">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${color} mb-4`}>
                    <IconComp size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{f.name}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            Что мы <span className="text-red-600">предлагаем</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutFeatures.map((f, i) => {
              const IconComp = iconMap[f.icon] || iconMap['Star'];
              return (
                <div key={i} className="flex flex-col items-center text-center p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-2xl">
                  <div className="p-3 bg-red-600/10 rounded-xl mb-4">
                    <IconComp size={24} className="text-red-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
