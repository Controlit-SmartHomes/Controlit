import { useTheme } from '@/hooks/useTheme';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe, Home, Moon, Sun } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [language, setLanguage] = useState('he');
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const languages = [
    { code: 'he', name: 'עברית', dir: 'rtl' },
    { code: 'ar', name: 'العربية', dir: 'rtl' },
    { code: 'en', name: 'English', dir: 'ltr' },
    { code: 'ru', name: 'Русский', dir: 'ltr' },
  ];

  const currentLang = languages.find((l) => l.code === language)!;
  const isRTL = currentLang.dir === 'rtl';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowLanguageMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLanguageChange = (code: string) => {
    setLanguage(code);
    setShowLanguageMenu(false);
    document.documentElement.dir = languages.find((l) => l.code === code)?.dir || 'rtl';
    window.dispatchEvent(new CustomEvent('languageChange', { detail: code }));
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const t = {
    contact: { he: 'צור קשר', ar: 'اتصل بنا', en: 'Contact', ru: 'Связаться' },
    services: { he: 'שירותים', ar: 'الخدمات', en: 'Services', ru: 'Услуги' },
  } as const;

  const label = (key: keyof typeof t) =>
    t[key][language as keyof (typeof t)[typeof key]];

  // Same visual DNA as the Home icon badge:
  // gradient from-primary/30→to-primary/10, border border-primary/25, soft glow shadow
  const badgeClass = `
    flex items-center justify-center gap-1.5
    h-9 px-3 rounded-xl
    bg-gradient-to-br from-primary/25 to-primary/8
    border border-primary/22
    shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.08)]
    hover:from-primary/35 hover:to-primary/15
    hover:border-primary/38
    hover:shadow-[0_0_18px_rgba(var(--color-primary-rgb),0.2)]
    text-primary/65 hover:text-primary
    font-paragraph text-sm font-medium
    transition-all duration-200
    active:scale-95
  `;

  const NavLinks = () => (
    <nav className="flex items-center gap-2">
      {[
        { lbl: label('services'), onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { lbl: label('contact'), onClick: scrollToContact },
      ].map(({ lbl, onClick }) => (
        <button key={lbl} onClick={onClick} className={`${badgeClass} px-4`}>
          {lbl}
        </button>
      ))}
    </nav>
  );

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      dir="ltr"
      className={`
        fixed top-0 inset-x-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-background/90 backdrop-blur-xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)] py-3'
          : 'bg-transparent py-5'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-6">


          {/* ── Logo ── */}
          <motion.div
            className="flex items-center gap-2.5 shrink-0 cursor-pointer select-none"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >

            <div className="
              w-9 h-9 rounded-xl
              bg-gradient-to-br from-primary/30 to-primary/10
              border border-primary/25
              flex items-center justify-center
              shadow-[0_0_12px_rgba(var(--color-primary-rgb),0.15)]
            ">
              <Home className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>


            <span className="font-heading text-xl font-bold tracking-tight leading-none">
              <span className="text-primary">Controlit</span>
            </span>


          </motion.div>




          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex flex-1 justify-center">
            <NavLinks />
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center gap-2 shrink-0">

            {/* Theme toggle */}
            {/* <button onClick={toggleTheme} aria-label="Toggle theme" className={`w-9 ${badgeClass}`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center"
                >
                  {theme === 'dark'
                    ? <Sun className="w-4 h-4" strokeWidth={1.8} />
                    : <Moon className="w-4 h-4" strokeWidth={1.8} />
                  }
                </motion.span>
              </AnimatePresence>
            </button> */}

            {/* Language selector */}
            <div className="relative" ref={menuRef}>
              <button onClick={() => setShowLanguageMenu((v) => !v)} className={badgeClass}>
                <Globe className="w-3.5 h-3.5 shrink-0" strokeWidth={1.8} />
                <span className="hidden xs:inline">{currentLang.name}</span>
                <motion.span
                  animate={{ rotate: showLanguageMenu ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="hidden xs:flex"
                >
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </motion.span>
              </button>

              <AnimatePresence>
                {showLanguageMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -6 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                    className={`
                      absolute top-[calc(100%+8px)]
                      right-0
                      min-w-[148px] py-1.5
                      bg-background/95 backdrop-blur-xl
                      border border-primary/15 rounded-xl overflow-hidden z-50
                      shadow-[0_8px_32px_rgba(0,0,0,0.3),0_0_0_1px_rgba(var(--color-primary-rgb),0.05)]
                    `}
                  >
                    {languages.map((lang, i) => (
                      <motion.button
                        key={lang.code}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`
                          w-full px-3.5 py-2.5 flex items-center gap-2.5
                          ${isRTL ? 'text-right' : 'text-left'}
                          font-paragraph text-sm
                          transition-all duration-150
                          ${language === lang.code
                            ? 'text-primary bg-gradient-to-r from-primary/15 to-primary/5'
                            : 'text-foreground/60 hover:text-primary hover:bg-primary/8'
                          }
                        `}
                      >
                        <span className={`
                          w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200
                          ${language === lang.code
                            ? 'bg-primary shadow-[0_0_6px_rgba(var(--color-primary-rgb),0.6)]'
                            : 'bg-primary/20'
                          }
                        `} />
                        {lang.name}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </motion.header>
  );
}
