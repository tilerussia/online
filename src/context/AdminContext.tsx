import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export interface Feature { icon: string; title: string; desc: string; }
export interface Faction { icon: string; name: string; desc: string; }
export interface NewsItem { id: number; title: string; date: string; category: string; excerpt: string; image?: string; }
export interface StepItem { icon: string; title: string; desc: string; details: string[]; }
export interface FaqItem { question: string; answer: string; }
export interface ButtonVisibility { id: string; label: string; enabled: boolean; }
export interface PageContent { id: string; title: string; content: string; }
export interface SiteData {
  projectName: string;
  onlineCount: number;
  maxSlots: number;
  telegramBotToken: string;
  telegramChatId: string;
  features: Feature[];
  factions: Faction[];
  news: NewsItem[];
  steps: StepItem[];
  requirements: { min: string[]; rec: string[]; };
  faq: FaqItem[];
  buttonVisibility: ButtonVisibility[];
  pages: PageContent[];
  launcherDownloadUrl: string;
  launcherVersion: string;
  launcherFileName: string;
  launcherSize: string;
}

const defaultData: SiteData = {
  projectName: 'TILE RUSSIA',
  onlineCount: 1847,
  maxSlots: 5000,
  telegramBotToken: '8367451122:AAFfiN-nr7KtLRCzY2CW1atjN9bJPq3KO0Y',
  telegramChatId: '8388066117',
  features: [
    { icon: 'Users', title: 'Уникальная система фракций', desc: 'Вступайте в полицию, армию, мафию или создайте свою банду. Полная свобода действий!' },
    { icon: 'Server', title: 'Мощные сервера', desc: 'Высокопроизводительные сервера с минимальным пингом и защитой от DDoS-атак.' },
    { icon: 'Shield', title: 'Античит и защита', desc: 'Современная система защиты от читеров. Честная игра для всех участников.' },
    { icon: 'Star', title: 'Эксклюзивный контент', desc: 'Уникальные автомобили, скины, одежда и дома которых нет нигде больше.' },
    { icon: 'Sparkles', title: 'Регулярные обновления', desc: 'Новые квесты, ивенты и контент каждую неделю. Игра не надоедает!' },
    { icon: 'Users', title: 'Активное сообщество', desc: 'Тысячи игроков онлайн, форум, Discord. Найди друзей и начни своё приключение.' },
  ],
  factions: [
    { icon: 'Shield', name: 'Полиция', desc: 'Следите за порядком на улицах города, ловите преступников и защищайте граждан.' },
    { icon: 'Sword', name: 'Армия', desc: 'Служите в вооружённых силах, защищайте государство и участвуйте в спецоперациях.' },
    { icon: 'Users', name: 'Мафия', desc: 'Контролируйте чёрный рынок, занимайтесь рэкетом и расширяйте зону влияния.' },
    { icon: 'Building2', name: 'Бизнес', desc: 'Открывайте свой бизнес: от маленького магазина до крупной корпорации.' },
  ],
  news: [
    { id: 1, title: 'Глобальное обновление 5.0 — Новая карта и фракции!', date: '15 декабря 2025', category: 'Обновление', excerpt: 'Мы полностью переработали карту, добавили 3 новые фракции и 50+ новых автомобилей.', image: '' },
    { id: 2, title: 'Новогодний ивент 2026 — Подарки для всех!', date: '28 декабря 2025', category: 'Ивент', excerpt: 'Приготовьтесь к самому масштабному новогоднему ивенту! Уникальные квесты и награды.', image: '' },
    { id: 3, title: 'Турнир по дрэг-рейсингу — Призовой фонд 1 000 000$', date: '22 декабря 2025', category: 'Турнир', excerpt: 'Самые быстрые гонщики сервера сразятся за главный приз. Регистрация уже открыта!', image: '' },
    { id: 4, title: 'Античит обновлён — Zero Tolerance к читерам', date: '18 декабря 2025', category: 'Безопасность', excerpt: 'Мы внедрили новую систему обнаружения читов. Нарушители будут забанены моментально.', image: '' },
    { id: 5, title: 'Открытие нового казино в Лас-Вентурасе', date: '10 декабря 2025', category: 'Контент', excerpt: 'Роскошное казино с рулеткой, покером и игровыми автоматами открывает свои двери.', image: '' },
    { id: 6, title: 'Система домов — Покупай, обставляй, живи!', date: '5 декабря 2025', category: 'Обновление', excerpt: 'Теперь вы можете покупать дома, обставлять их мебелью и приглашать друзей.', image: '' },
  ],
  steps: [
    { icon: 'Download', title: 'Шаг 1: Скачайте лаунчер', desc: 'Загрузите наш фирменный лаунчер с официального сайта. Быстрая установка и автоматические обновления.', details: ['Скачайте установщик с сайта', 'Запустите установку (1-2 минуты)', 'Лаунчер автоматически скачает все файлы игры'] },
    { icon: 'UserPlus', title: 'Шаг 2: Зарегистрируйтесь', desc: 'Создайте аккаунт в лаунчере или на форуме. Выберите уникальный никнейм и настройте профиль.', details: ['Придумайте уникальный никнейм', 'Укажите действующий email', 'Подтвердите регистрацию через почту'] },
    { icon: 'Monitor', title: 'Шаг 3: Настройте игру', desc: 'Выберите сервер, настройте графику под ваш компьютер и приготовьтесь к погружению.', details: ['Выберите сервер из списка', 'Настройте графику под ваше железо', 'Ознакомьтесь с управлением'] },
    { icon: 'Play', title: 'Шаг 4: Начните играть!', desc: 'Подключайтесь к серверу, создавайте персонажа и начинайте своё приключение в мире TILE RUSSIA!', details: ['Создайте персонажа', 'Пройдите обучение', 'Выберите свою фракцию или начните с нуля'] },
  ],
  requirements: {
    min: ['ОС: Windows 10 (64-bit)', 'Процессор: Intel Core i3 / AMD Ryzen 3', 'ОЗУ: 8 GB RAM', 'Видеокарта: NVIDIA GTX 750 Ti / AMD Radeon R7 260X', 'DirectX: Версия 11', 'Место на диске: 20 GB'],
    rec: ['ОС: Windows 11 (64-bit)', 'Процессор: Intel Core i5 / AMD Ryzen 5', 'ОЗУ: 16 GB RAM', 'Видеокарта: NVIDIA GTX 1060 / AMD RX 580', 'DirectX: Версия 12', 'Место на диске: 30 GB SSD'],
  },
  faq: [
    { question: 'Как установить игру?', answer: 'Скачайте лаунчер с нашего официального сайта, запустите установщик и следуйте инструкциям. Лаунчер автоматически загрузит все необходимые файлы.' },
    { question: 'Бесплатная ли игра?', answer: 'Да, TILE RUSSIA полностью бесплатен! Вы можете скачать лаунчер, создать аккаунт и начать играть без каких-либо затрат.' },
    { question: 'Как вступить во фракцию?', answer: 'Чтобы вступить во фракцию (полиция, армия, мафия и др.), вам нужно подать заявку через форум или напрямую в игре. Каждая фракция имеет свои требования.' },
    { question: 'Что делать если меня забанили?', answer: 'Если вы считаете, что бан был выдан ошибочно, вы можете подать апелляцию на форуме в разделе "Жалобы и апелляции". Администрация рассмотрит заявку в течение 24-48 часов.' },
    { question: 'Как работает система домов?', answer: 'Вы можете купить дом через аукцион или напрямую у застройщика. После покупки дом становится вашей собственностью: обставляйте мебелью, меняйте интерьер.' },
    { question: 'Как заработать игровую валюту?', answer: 'Существует множество способов: работа (таксист, механик), бизнес (магазины, АЗС), торговля с игроками, участие в ивентах и турнирах, выполнение квестов.' },
    { question: 'Есть ли голосовой чат в игре?', answer: 'Да, в игре встроен голосовой чат с реалистичной системой распространения звука. Также есть рация для общения внутри фракции.' },
    { question: 'Как сообщить о нарушителе?', answer: 'Используйте команду /report в игре или создайте тему на форуме. Приложите скриншоты/видео, укажите никнейм нарушителя и время инцидента.' },
    { question: 'Как часто выходят обновления?', answer: 'Крупные обновления выходят раз в 2-3 месяца. Патчи с исправлениями — регулярно. Следите за новостями на сайте и в Discord!' },
  ],
  buttonVisibility: [
    { id: 'start-playing', label: 'Кнопка «Начать играть»', enabled: true },
    { id: 'download', label: 'Кнопка «Скачать лаунчер»', enabled: true },
    { id: 'about', label: 'Кнопка «О проекте»', enabled: true },
    { id: 'applications', label: 'Кнопка «Заявки»', enabled: true },
  ],
  pages: [
    {
      id: 'rules',
      title: 'Правила проекта',
      content: `Правила проекта TILE RUSSIA

1. Общие положения

1.1. Настоящие правила регулируют поведение игроков на всех серверах проекта TILE RUSSIA.
1.2. Регистрируясь на проекте, игрок автоматически соглашается соблюдать данные правила.
1.3. Незнание правил не освобождает от ответственности.
1.4. Администрация оставляет за собой право изменять правила без предварительного уведомления.

2. Запрещено

2.1. Использование читов, багов, эксплойтов и стороннего ПО дающего преимущество.
2.2. Оскорбления игроков, администрации, упоминание родителей в негативном контексте.
2.3. Спам, флуд, капс в чате, реклама сторонних проектов.
2.4. Разглашение личных данных других игроков.
2.5. Провокации, розжиг межнациональной розни.
2.6. Обман администрации, предоставление ложной информации.
2.7. Продажа/покупка игровых ценностей за реальные деньги вне официального магазина.
2.8. Использование багов для получения выгоды.
2.9. Уход от RolePlay ситуации (RK, PG, MG, DM, DB и т.д.).
2.10. Создание мультиаккаунтов для обхода наказаний.

3. RolePlay правила

3.1. Игрок обязан отыгрывать своего персонажа реалистично.
3.2. Запрещено PowerGaming (нереалистичные действия).
3.3. Запрещено MetaGaming (использование OOC информации в IC).
3.4. Запрещено DeathMatch без причины.
3.5. Запрещено RevengeKill (убийство сразу после смерти).
3.6. Все крупные криминальные действия должны быть согласованы с администрацией.

4. Наказания

4.1. Предупреждение — за незначительные нарушения.
4.2. Мут чата — от 30 минут до 7 дней.
4.3. Бан аккаунта — от 1 дня до перманентного.
4.4. Вайп имущества — за серьёзные экономические нарушения.
4.5. Обнуление уровня и статистики.

5. Обжалование

5.1. Жалобы подаются на форуме в соответствующем разделе.
5.2. Срок рассмотрения — до 48 часов.
5.3. Решение администрации окончательно и обжалованию не подлежит.

6. Донат

6.1. Все пожертвования добровольны.
6.2. Возврат средств не предусмотрен.
6.3. Привилегии не дают игрового преимущества в RP ситуациях.

7. Заключительные положения

7.1. Администрация не несёт ответственности за потерю данных.
7.2. Проект предоставляется «как есть».
7.3. Администрация вправе отказать в обслуживании без объяснения причин.

Дата последнего обновления: 01.01.2026`,
    },
    {
      id: 'privacy',
      title: 'Политика конфиденциальности',
      content: `Политика конфиденциальности TILE RUSSIA

1. Общие положения

1.1. Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей проекта TILE RUSSIA.
1.2. Используя наш сервис, вы соглашаетесь с условиями данной политики.
1.3. Мы уважаем вашу конфиденциальность и обязуемся защищать ваши данные.

2. Какие данные мы собираем

2.1. Игровой никнейм и пароль (в зашифрованном виде).
2.2. IP-адрес и технические данные устройства.
2.3. Игровая статистика, достижения, имущество.
2.4. История входов и действий в игре.
2.5. Данные из заявок (возраст, контакты для связи).
2.6. Логи чатов и голосового общения (хранятся 30 дней).

3. Цели сбора данных

3.1. Предоставление игровых услуг и технической поддержки.
3.2. Обеспечение безопасности и предотвращение читерства.
3.3. Улучшение качества сервиса и разработка новых функций.
3.4. Связь с пользователями по вопросам модерации.
3.5. Анализ статистики для балансировки игры.

4. Хранение данных

4.1. Данные хранятся на защищённых серверах в России.
4.2. Пароли хранятся в зашифрованном виде (bcrypt).
4.3. Срок хранения — до удаления аккаунта + 90 дней.
4.4. Логи чатов удаляются автоматически через 30 дней.

5. Передача третьим лицам

5.1. Мы НЕ продаём ваши данные третьим лицам.
5.2. Данные могут быть переданы правоохранительным органам по официальному запросу.
5.3. Обезличенная статистика может использоваться для аналитики.

6. Ваши права

6.1. Право на доступ к своим данным.
6.2. Право на исправление неточных данных.
6.3. Право на удаление аккаунта и данных.
6.4. Право отозвать согласие на обработку.

7. Cookies и технологии отслеживания

7.1. Мы используем cookies для сохранения сессии.
7.2. LocalStorage используется для настроек интерфейса.
7.3. Вы можете отключить cookies в браузере, но это ограничит функционал.

8. Безопасность

8.1. Используем шифрование HTTPS/TLS.
8.2. Регулярно обновляем системы безопасности.
8.3. Доступ к данным имеют только авторизованные сотрудники.
8.4. Проводим аудиты безопасности.

9. Дети

9.1. Сервис предназначен для лиц старше 14 лет.
9.2. Мы не собираем данные детей младше 14 лет намеренно.
9.3. Если вы родитель и обнаружили аккаунт ребёнка — свяжитесь с нами.

10. Изменения политики

10.1. Мы можем обновлять политику. Дата изменения указана внизу.
10.2. Существенные изменения будут анонсированы на сайте.
10.3. Продолжение использования = согласие с новой версией.

11. Контакты

По вопросам конфиденциальности: privacy@tile-russia.ru
Telegram: @tile_support

Дата вступления в силу: 01.01.2026
Последнее обновление: 15.01.2026`,
    },
    {
      id: 'license',
      title: 'Лицензионное соглашение',
      content: `Лицензионное соглашение TILE RUSSIA

1. Предмет соглашения

1.1. Настоящее соглашение заключается между Tile Russia Games Studio (далее — «Правообладатель») и пользователем (далее — «Лицензиат»).
1.2. Правообладатель предоставляет Лицензиату неисключительное право использования игрового клиента и сервисов проекта TILE RUSSIA.
1.3. Соглашение вступает в силу с момента установки лаунчера или регистрации аккаунта.

2. Права и ограничения

2.1. Лицензиату предоставляется право:
• Устанавливать и использовать игровой клиент на личных устройствах.
• Создавать один игровой аккаунт (мультиаккаунты запрещены).
• Участвовать в игровом процессе согласно правилам проекта.

2.2. Лицензиату ЗАПРЕЩЕНО:
• Декомпилировать, дизассемблировать, модифицировать клиент.
• Создавать производные продукты на основе игры.
• Извлекать ресурсы (модели, текстуры, звуки) из клиента.
• Создавать приватные/пиратские сервера.
• Обходить технические средства защиты.
• Использовать автоматизацию (боты, макросы).
• Продавать аккаунты третьим лицам.

3. Интеллектуальная собственность

3.1. Все права на игру, код, дизайн, тексты, музыку принадлежат Правообладателю.
3.2. Торговые марки «TILE RUSSIA», логотип, персонажи защищены авторским правом.
3.3. Пользовательский контент (скриншоты, видео) может использоваться Правообладателем в промо-материалах.

4. Донат и виртуальные товары

4.1. Все платежи являются добровольными пожертвованиями.
4.2. Виртуальные товары не имеют реальной стоимости.
4.3. Правообладатель вправе изменять характеристики предметов.
4.4. Возврат средств не осуществляется, кроме случаев, предусмотренных законом.
4.5. При блокировке аккаунта донат-товары не компенсируются.

5. Ответственность

5.1. Сервис предоставляется «КАК ЕСТЬ», без гарантий.
5.2. Правообладатель не несёт ответственности за:
• Потерю игрового прогресса из-за сбоев.
• Действия других игроков.
• Временные недоступности сервиса.
• Ущерб от использования читов третьими лицами.

5.3. Максимальная ответственность ограничена суммой пожертвований за последние 6 месяцев.

6. Прекращение действия

6.1. Соглашение действует до удаления аккаунта.
6.2. Правообладатель вправе заблокировать доступ при нарушении правил.
6.3. При прекращении действия лицензии вы обязаны удалить клиент.

7. Обновления

7.1. Правообладатель вправе выпускать обновления, обязательные к установке.
7.2. Отказ от обновления = невозможность использования сервиса.

8. Применимое право

8.1. Соглашение регулируется законодательством Российской Федерации.
8.2. Споры решаются в суде по месту нахождения Правообладателя.

9. Заключительные положения

9.1. Если какое-либо положение признано недействительным, остальные сохраняют силу.
9.2. Бездействие Правообладателя не означает отказ от прав.
9.3. Это полное соглашение, заменяющее все предыдущие договорённости.

Контакты Правообладателя:
Tile Russia Games Studio
ИНН: 7700000000
Email: legal@tile-russia.ru

Дата принятия: 01.01.2026
Версия: 2.1`,
    },
    {
      id: 'eula',
      title: 'EULA — End User License Agreement',
      content: `END USER LICENSE AGREEMENT (EULA) — TILE RUSSIA

IMPORTANT: PLEASE READ THIS AGREEMENT CAREFULLY BEFORE USING THE SOFTWARE.

1. GRANT OF LICENSE

1.1. Subject to the terms of this EULA, Tile Russia Games Studio grants you a limited, non-exclusive, non-transferable, revocable license to use the TILE RUSSIA game client and services for personal, non-commercial entertainment purposes only.

1.2. This license does NOT grant you ownership of the software. All rights, title and interest remain with Tile Russia Games Studio.

2. RESTRICTIONS

You may NOT:

2.1. Copy, modify, adapt, translate, reverse engineer, decompile, disassemble or create derivative works.
2.2. Rent, lease, sell, sublicense, or distribute the software.
2.3. Remove or alter any copyright notices or trademarks.
2.4. Use cheats, bots, hacks, or any unauthorized third-party software.
2.5. Exploit bugs or glitches for personal gain.
2.6. Create private servers or emulate server software.
2.7. Data mine or scrape game content.
2.8. Use the software for commercial purposes without written consent.

3. USER GENERATED CONTENT

3.1. You retain ownership of content you create (screenshots, videos).
3.2. By posting content, you grant us a worldwide, royalty-free license to use it for promotional purposes.
3.3. You are responsible for ensuring your content does not infringe third-party rights.

4. VIRTUAL ITEMS

4.1. Virtual currency and items have no real-world value.
4.2. We may modify, delete, or discontinue virtual items at any time.
4.3. Virtual items are non-refundable and non-transferable.
4.4. Loss of virtual items due to account termination is not compensated.

5. PRIVACY AND DATA COLLECTION

5.1. We collect gameplay data, IP addresses, device information, and chat logs.
5.2. Data is used for anti-cheat, support, and service improvement.
5.3. See our Privacy Policy for full details.
5.4. By using the service, you consent to data collection.

6. TERMINATION

6.1. We may terminate your license immediately for violation of this EULA or Rules.
6.2. Upon termination, you must cease use and delete the software.
6.3. Provisions regarding intellectual property, disclaimers, and limitations survive termination.

7. DISCLAIMER OF WARRANTIES

7.1. THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND.
7.2. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
7.3. WE DO NOT WARRANT THAT THE SOFTWARE WILL BE UNINTERRUPTED OR ERROR-FREE.

8. LIMITATION OF LIABILITY

8.1. TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
8.2. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID IN THE 6 MONTHS PRIOR TO THE CLAIM.
8.3. SOME JURISDICTIONS DO NOT ALLOW LIMITATIONS, SO THESE MAY NOT APPLY TO YOU.

9. INDEMNIFICATION

You agree to indemnify and hold harmless Tile Russia Games Studio from any claims arising from your use of the software or violation of this EULA.

10. GOVERNING LAW

10.1. This EULA is governed by the laws of the Russian Federation.
10.2. Any disputes shall be resolved in the courts of Moscow, Russia.

11. UPDATES

11.1. We may update this EULA. Continued use constitutes acceptance.
11.2. Material changes will be notified via website or launcher.

12. CONTACT

Tile Russia Games Studio
Email: legal@tile-russia.ru
Address: Moscow, Russia

Last Updated: January 15, 2026
Version: 2.1

BY CLICKING "ACCEPT" OR USING THE SOFTWARE, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THIS EULA.`,
    },
  ],
  launcherDownloadUrl: 'https://github.com/TileRussia/launcher/releases/latest/download/TILE_RUSSIA_Launcher.exe',
  launcherVersion: '2.4.1',
  launcherFileName: 'TILE_RUSSIA_Launcher.exe',
  launcherSize: '48 MB',
};

interface AdminContextType {
  data: SiteData;
  updateData: (partial: Partial<SiteData>) => void;
  updateOnlineCount: (count: number) => void;
  updateMaxSlots: (slots: number) => void;
  updateNews: (news: NewsItem[]) => void;
  updateFaq: (faq: FaqItem[]) => void;
  updateFeatures: (features: Feature[]) => void;
  updateFactions: (factions: Faction[]) => void;
  updateSteps: (steps: StepItem[]) => void;
  updateRequirements: (reqs: { min: string[]; rec: string[] }) => void;
  updateButtons: (buttons: ButtonVisibility[]) => void;
  updatePages: (pages: PageContent[]) => void;
  updateTelegram: (token: string, chatId: string) => void;
  updateLauncher: (url: string, version: string, fileName: string, size: string) => void;
  resetToDefaults: () => void;
  isButtonEnabled: (id: string) => boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('tile-russia-site-data');
      if (saved) return { ...defaultData, ...JSON.parse(saved) };
    } catch {}
    return defaultData;
  });

  useEffect(() => {
    localStorage.setItem('tile-russia-site-data', JSON.stringify(data));
  }, [data]);

  const updateData = (partial: Partial<SiteData>) => setData((prev) => ({ ...prev, ...partial }));
  const updateOnlineCount = (count: number) => setData((prev) => ({ ...prev, onlineCount: count }));
  const updateMaxSlots = (slots: number) => setData((prev) => ({ ...prev, maxSlots: slots }));
  const updateNews = (news: NewsItem[]) => setData((prev) => ({ ...prev, news }));
  const updateFaq = (faq: FaqItem[]) => setData((prev) => ({ ...prev, faq }));
  const updateFeatures = (features: Feature[]) => setData((prev) => ({ ...prev, features }));
  const updateFactions = (factions: Faction[]) => setData((prev) => ({ ...prev, factions }));
  const updateSteps = (steps: StepItem[]) => setData((prev) => ({ ...prev, steps }));
  const updateRequirements = (requirements: { min: string[]; rec: string[] }) => setData((prev) => ({ ...prev, requirements }));
  const updateButtons = (buttonVisibility: ButtonVisibility[]) => setData((prev) => ({ ...prev, buttonVisibility }));
  const updatePages = (pages: PageContent[]) => setData((prev) => ({ ...prev, pages }));
  const updateTelegram = (token: string, chatId: string) => setData((prev) => ({ ...prev, telegramBotToken: token, telegramChatId: chatId }));
  const updateLauncher = (url: string, version: string, fileName: string, size: string) => 
    setData((prev) => ({ ...prev, launcherDownloadUrl: url, launcherVersion: version, launcherFileName: fileName, launcherSize: size }));
  const resetToDefaults = () => setData(defaultData);
  const isButtonEnabled = (id: string) => data.buttonVisibility.find((b) => b.id === id)?.enabled ?? true;

  return (
    <AdminContext.Provider value={{ data, updateData, updateOnlineCount, updateMaxSlots, updateNews, updateFaq, updateFeatures, updateFactions, updateSteps, updateRequirements, updateButtons, updatePages, updateTelegram, updateLauncher, resetToDefaults, isButtonEnabled }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextType {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
