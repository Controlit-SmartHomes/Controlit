import { Facebook, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

type Lang = 'he' | 'ar' | 'en' | 'ru';

const t: Record<Lang, {
  tagline: string;
  whatsapp: string;
  quickLinks: string;
  home: string;
  followUs: string;
  rights: string;
}> = {
  he: {
    tagline: 'מובילים בתחום אינטגרציית בתים חכמים יוקרתיים. אנחנו הופכים את החזון שלכם למציאות עם טכנולוגיה מתקדמת ושירות ללא פשרות.',
    whatsapp: 'דברו איתנו בווטסאפ',
    quickLinks: 'קישורים מהירים',
    home: 'דף הבית',
    followUs: 'עקבו אחרינו',
    rights: ' 2026 Controlit © כל הזכויות שמורות',
  },
  ar: {
    tagline: 'رواد في مجال تكامل المنازل الذكية الفاخرة. نحول رؤيتك إلى واقع بتقنية متقدمة وخدمة لا تقبل المساومة.',
    whatsapp: 'تحدث معنا عبر واتساب',
    quickLinks: 'روابط سريعة',
    home: 'الصفحة الرئيسية',
    followUs: 'تابعنا',
    rights: '2026 Controlit © جميع الحقوق محفوظة',
  },
  en: {
    tagline: 'Leaders in luxury smart home integration. We turn your vision into reality with advanced technology and uncompromising service.',
    whatsapp: 'Chat with us on WhatsApp',
    quickLinks: 'Quick Links',
    home: 'Home',
    followUs: 'Follow Us',
    rights: '2026 Controlit © All rights reserved',
  },
  ru: {
    tagline: 'Лидеры в интеграции умных домов премиум-класса. Мы превращаем ваше видение в реальность с передовыми технологиями и безупречным сервисом.',
    whatsapp: 'Напишите нам в WhatsApp',
    quickLinks: 'Быстрые ссылки',
    home: 'Главная',
    followUs: 'Следите за нами',
    rights: '2026 Controlit © Все права защищены',
  },
};

export default function Footer() {
  const [language, setLanguage] = useState<Lang>('he');
  const [dir, setDir] = useState<'rtl' | 'ltr'>('rtl');

  useEffect(() => {
    // Sync with current doc dir on mount
    const syncDir = () => {
      setDir((document.documentElement.dir as 'rtl' | 'ltr') || 'rtl');
    };
    syncDir();

    const handler = (e: Event) => {
      const lang = (e as CustomEvent<Lang>).detail;
      if (lang) setLanguage(lang);
      // Dir is already updated on <html> by Header — just re-read it
      setTimeout(syncDir, 0);
    };

    window.addEventListener('languageChange', handler);
    return () => window.removeEventListener('languageChange', handler);
  }, []);

  const copy = t[language] ?? t.he;
  const isRTL = dir === 'rtl';

  // Shared social button style — matches Header badge DNA
  const socialBtn = `
    w-10 h-10 sm:w-11 sm:h-11 rounded-xl
    flex items-center justify-center
    bg-gradient-to-br from-primary/20 to-primary/8
    border border-primary/20
    shadow-[0_0_8px_rgba(0,191,255,0.06)]
    hover:from-primary/30 hover:to-primary/14
    hover:border-primary/38
    hover:shadow-[0_0_14px_rgba(0,191,255,0.18)]
    text-primary/60 hover:text-primary
    transition-all duration-200
    active:scale-95
  `;

  return (
    <footer
      dir={dir}
      className="relative w-full bg-background border-t border-white/10"
    >
      {/* Subtle top glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 mb-10 sm:mb-12">

          {/* ── Brand ── */}
          <div className={`md:col-span-5 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
              <span className="text-primary">Controlit</span>
            </h2>
            <p className="font-paragraph text-sm sm:text-base text-foreground/60 leading-relaxed mb-5 sm:mb-7 max-w-sm">
              {copy.tagline}
            </p>
            <button
              onClick={() => window.open('https://wa.me/972508280691', '_blank')}
              className="
                inline-flex items-center gap-2.5
                px-5 py-2.5 rounded-xl
                bg-[#25D366] from-primary/22 to-primary/8
                border border-primary/25
                shadow-[0_0_12px_rgba(0,191,255,0.1)]
                hover:from-primary/32 hover:to-primary/14
                hover:border-primary/40
                hover:shadow-[0_0_20px_rgba(0,191,255,0.22)]
                text-white font-paragraph text-sm font-semibold
                transition-all duration-200
                active:scale-[0.97]
              "
            >
              <FaWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" strokeWidth={1.8} />
              {copy.whatsapp}
            </button>
          </div>

          {/* ── Quick Links ── */}
          <div className={`md:col-span-3 ${isRTL ? 'md:col-start-7 text-right' : 'md:col-start-7 text-left'}`}>
            <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-5">
              {copy.quickLinks}
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {[
                { label: copy.home,    onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
              ].map(({ label, onClick }) => (
                <li key={label}>
                  <button
                    onClick={onClick}
                    className="
                      font-paragraph text-sm sm:text-base text-foreground/55
                      hover:text-primary transition-colors duration-200
                      relative after:absolute after:bottom-0
                      after:h-px after:bg-primary/50
                      after:w-0 hover:after:w-full
                      after:transition-all after:duration-300
                      after:left-0
                    "
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Social ── */}
          <div className={`md:col-span-4 ${isRTL ? 'md:col-start-10 text-right' : 'md:col-start-10 text-left'}`}>
            <h3 className="font-heading text-base sm:text-lg font-bold text-foreground mb-4 sm:mb-5">
              {copy.followUs}
            </h3>
            <div className={`flex gap-2.5 sm:gap-3 ${isRTL ? 'justify-start' : 'justify-start'}`}>
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/controlit_smart_homes', label: 'Instagram' },
              ].map(({ Icon, href, label }) => (
                <button
                  key={label}
                  onClick={() => window.open(href, '_blank')}
                  aria-label={label}
                  className={socialBtn}
                >
                  <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.7} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
          <div className={`
            flex flex-col gap-2 sm:gap-3
            items-center justify-center
          `}>
            <p className="font-paragraph text-xs text-center sm:text-sm text-foreground/45">
              {copy.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
