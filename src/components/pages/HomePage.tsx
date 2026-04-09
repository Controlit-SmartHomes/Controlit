// HPI 1.9-G
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Image } from '@/components/ui/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, MapPin, Phone, Shield, Sparkles, User, Volume2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

interface ServiceItem { icon: React.ElementType; title: string; description: string; }
interface FormData { name: string; phone: string; city: string; }
interface TranslationEntry {
  title: string;
  description?: string;
  desc?: string;
}

interface Translations {
  [key: string]: {
    [key: string]: string | TranslationEntry[];
  }
}

const translations: Translations = {
  he: {
    heroTag: 'העתיד כבר כאן',
    heroTitle: 'החיים החכמים',
    heroTitleGradient: 'שתמיד חלמתם עליהם',
    heroDesc: 'אינטגרציה מושלמת של טכנולוגיות בית חכם מתקדמות. אנחנו הופכים את הבית שלכם למרחב חכם, מאובטח ונוח - עם התקנה מקצועית ותמיכה מלאה.',
    whatsapp: 'דברו איתנו בווטסאפ',
    discover: 'גלו עוד',
    servicesTitle: 'השירותים',
    servicesDesc: 'פתרונות טכנולוגיים מתקדמים המותאמים אישית לאורח החיים שלכם. כל פרט מתוכנן בקפידה ליצירת חוויה הוליסטית.',
    quote: '\"הטכנולוגיה הטובה ביותר היא זו שאינך מרגיש בקיומה, אך אינך יכול לחיות בלעדיה.\"',
    whiteGloveTitle: 'שירות White Glove',
    whiteGloveDesc: 'אנחנו לא רק מתקינים מערכות, אנחנו מעניקים שקט נפשי. הסטנדרט שלנו הוא שלמות.',
    contactTitle: 'בואו נתחיל',
    contactTitleSpan: 'לתכנן',
    contactDesc: 'השאירו פרטים ונחזור אליכם לשיחת ייעוץ ללא התחייבות',
    fullName: 'שם מלא',
    phone: 'טלפון',
    city: 'עיר מגורים',
    submit: 'שלחו פרטים',
    sending: 'שולח...',
    success: 'הפרטים נשלחו בהצלחה! נחזור אליכם בקרוב.',
    systemActive: 'מערכת פעילה',
    namePlaceholder: 'ישראל כהן',
    cityPlaceholder: 'תל אביב',
    services: [
      { title: 'תאורה ואווירה חכמה', description: 'שליטה מלאה בתאורה ובאווירה בבית שלכם. יצירת סצנות מותאמות אישית לכל רגע ביום.' },
      { title: 'אבטחה ושליטה מתקדמת', description: 'מערכות אבטחה חכמות עם שליטה מרחוק. הגנה מקסימלית ושקט נפשי 24/7.' },
      { title: 'חוויית קולנוע וסאונד', description: 'מערכות אודיו ווידאו מתקדמות. חוויה קולנועית ביתית ברמה מקצועית.' }
    ],
    whiteGloveItems: [
      { title: 'אמינות מוחלטת', desc: 'עבודה מקצועית עם ציוד מהשורה הראשונה ואחריות מלאה לטווח ארוך.' },
      { title: 'התקנה חלקה', desc: 'תהליך התקנה מסודר ונקי, ללא הפרעה לשגרת החיים שלכם. אנחנו משאירים את הבית נקי יותר ממה שמצאנו.' },
      { title: 'תמיכה 24/7', desc: 'מוקד תמיכה ייעודי ללקוחות VIP. זמינים עבורכם בכל שעה לכל שאלה או צורך.' }
    ]
  },
  ar: {
    heroTag: 'المستقبل هنا بالفعل',
    heroTitle: 'الحياة الذكية',
    heroTitleGradient: 'التي طالما حلمت بها',
    heroDesc: 'تكامل مثالي لتقنيات المنزل الذكي المتقدمة. نحن نحول منزلك إلى مساحة ذكية وآمنة ومريحة - مع التثبيت الاحترافي والدعم الكامل.',
    whatsapp: 'تحدث معنا عبر واتساب',
    discover: 'اكتشف المزيد',
    servicesTitle: 'الخدمات',
    servicesDesc: 'حلول تكنولوجية متقدمة مخصصة لنمط حياتك. كل التفاصيل مخطط لها بعناية لإنشاء تجربة شاملة.',
    quote: '\"أفضل التكنولوجيا هي التي لا تشعر بوجودها، لكن لا يمكنك العيش بدونها.\"',
    whiteGloveTitle: 'خدمة White Glove',
    whiteGloveDesc: 'نحن لا نثبت الأنظمة فقط، نحن نوفر راحة البال. معيارنا هو الكمال.',
    contactTitle: 'دعنا نبدأ',
    contactTitleSpan: 'التخطيط',
    contactDesc: 'اترك تفاصيلك وسنعود إليك لاستشارة بدون التزام',
    fullName: 'الاسم الكامل',
    phone: 'الهاتف',
    city: 'مدينة السكن',
    submit: 'إرسال التفاصيل',
    sending: 'جاري الإرسال...',
    success: 'تم إرسال التفاصيل بنجاح! سنعود إليك قريباً.',
    systemActive: 'النظام نشط',
    namePlaceholder: 'أحمد أبو علي',
    cityPlaceholder: 'الناصرة',
    services: [
      { title: 'الإضاءة والأجواء الذكية', description: 'تحكم كامل بالإضاءة والأجواء في منزلك. إنشاء مشاهد مخصصة لكل لحظة من اليوم.' },
      { title: 'الأمان والتحكم المتقدم', description: 'أنظمة أمان ذكية مع التحكم عن بعد. حماية قصوى وراحة بال 24/7.' },
      { title: 'تجربة السينما والصوت', description: 'أنظمة صوت وفيديو متقدمة. تجربة سينمائية منزلية بمستوى احترافي.' }
    ],
    whiteGloveItems: [
      { title: 'موثوقية مطلقة', desc: 'عمل احترافي مع معدات من الدرجة الأولى وضمان كامل طويل الأجل.' },
      { title: 'تثبيت سلس', desc: 'عملية تثبيت منظمة ونظيفة، بدون إزعاج لحياتك اليومية. نترك منزلك أنظف مما وجدناه.' },
      { title: 'دعم 24/7', desc: 'مركز دعم مخصص لعملاء VIP. متاحون لك في أي وقت لأي سؤال أو احتياج.' }
    ]
  },
  en: {
    heroTag: 'The Future is Here',
    heroTitle: 'Smart Living',
    heroTitleGradient: "You've Always Dreamed Of",
    heroDesc: 'Perfect integration of advanced smart home technologies. We transform your home into a smart, secure, and comfortable space - with professional installation and complete support.',
    whatsapp: 'Chat with us on WhatsApp',
    discover: 'Discover More',
    servicesTitle: 'Services',
    servicesDesc: 'Advanced technological solutions tailored to your lifestyle. Every detail is carefully planned to create a holistic experience.',
    quote: '"The best technology is the one you don\'t feel exists, but can\'t live without."',
    whiteGloveTitle: 'White Glove Service',
    whiteGloveDesc: "We don't just install systems, we provide peace of mind. Our standard is perfection.",
    contactTitle: "Let's Start",
    contactTitleSpan: 'Planning',
    contactDesc: "Leave your details and we'll get back to you for a consultation with no obligation",
    fullName: 'Full Name',
    phone: 'Phone',
    city: 'City',
    submit: 'Send Details',
    sending: 'Sending...',
    success: "Details sent successfully! We'll get back to you soon.",
    systemActive: 'System Active',
    namePlaceholder: 'David Levi',
    cityPlaceholder: 'Tel Aviv',
    services: [
      { title: 'Smart Lighting & Ambiance', description: 'Complete control over lighting and ambiance in your home. Create personalized scenes for every moment of the day.' },
      { title: 'Security & Advanced Control', description: 'Smart security systems with remote control. Maximum protection and peace of mind 24/7.' },
      { title: 'Cinema & Sound Experience', description: 'Advanced audio and video systems. Professional-grade home cinema experience.' }
    ],
    whiteGloveItems: [
      { title: 'Absolute Reliability', desc: 'Professional work with top-tier equipment and long-term warranty.' },
      { title: 'Smooth Installation', desc: 'Organized and clean installation process, without disrupting your daily life. We leave your home cleaner than we found it.' },
      { title: '24/7 Support', desc: 'Dedicated support center for VIP clients. Available to you anytime for any question or need.' }
    ]
  },
  ru: {
    heroTag: 'Будущее уже здесь',
    heroTitle: 'Умная жизнь',
    heroTitleGradient: 'О которой вы всегда мечтали',
    heroDesc: 'Идеальная интеграция передовых технологий умного дома. Мы превращаем ваш дом в умное, безопасное и комфортное пространство - с профессиональной установкой и полной поддержкой.',
    whatsapp: 'Напишите нам в WhatsApp',
    discover: 'Узнать больше',
    servicesTitle: 'Услуги',
    servicesDesc: 'Передовые технологические решения, адаптированные к вашему образу жизни. Каждая деталь тщательно спланирована для создания целостного опыта.',
    quote: '"Лучшая технология — это та, которую вы не замечаете, но не можете без неё жить."',
    whiteGloveTitle: 'Сервис White Glove',
    whiteGloveDesc: 'Мы не просто устанавливаем системы, мы дарим душевное спокойствие. Наш стандарт — совершенство.',
    contactTitle: 'Давайте начнём',
    contactTitleSpan: 'планировать',
    contactDesc: 'Оставьте свои данные, и мы свяжемся с вами для консультации без обязательств',
    fullName: 'Полное имя',
    phone: 'Телефон',
    city: 'Город',
    submit: 'Отправить данные',
    sending: 'Отправка...',
    success: 'Данные успешно отправлены! Мы скоро свяжемся с вами.',
    systemActive: 'Система активна',
    namePlaceholder: 'Михаил Левин',
    cityPlaceholder: 'Хайфа',
    services: [
      { title: 'Умное освещение и атмосфера', description: 'Полный контроль над освещением и атмосферой в вашем доме. Создавайте персонализированные сцены для каждого момента дня.' },
      { title: 'Безопасность и продвинутое управление', description: 'Умные системы безопасности с дистанционным управлением. Максимальная защита и спокойствие 24/7.' },
      { title: 'Кинотеатр и звуковой опыт', description: 'Передовые аудио и видео системы. Домашний кинотеатр профессионального уровня.' }
    ],
    whiteGloveItems: [
      { title: 'Абсолютная надежность', desc: 'Профессиональная работа с оборудованием высшего класса и долгосрочной гарантией.' },
      { title: 'Гладкая установка', desc: 'Организованный и чистый процесс установки без нарушения вашей повседневной жизни. Мы оставляем ваш дом чище, чем его нашли.' },
      { title: 'Поддержка 24/7', desc: 'Центр поддержки VIP-клиентов. Доступны для вас в любое время по любому вопросу или потребности.' }
    ]
  }
};

// ── Scroll progress bar ──
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[60]" style={{ scaleX }} />;
};

// ── Ambient glow orb ──
const GlowingOrb = ({ className }: { className?: string }) => (
  <div className={`absolute rounded-full blur-[120px] opacity-30 pointer-events-none ${className}`} />
);

// ── Section number — large, styled, visually striking ──
const SectionNumber = ({ n }: { n: string }) => (
  <span className="section-number">{n}</span>
);

export default function HomePage() {
  const [language, setLanguage] = useState('he');
  const [formData, setFormData] = useState<FormData>({ name: '', phone: '', city: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handler = (e: CustomEvent) => setLanguage(e.detail);
    window.addEventListener('languageChange' as any, handler);
    return () => window.removeEventListener('languageChange' as any, handler);
  }, []);

  const t = translations[language] || translations.he;
  const isRTL = language === 'he' || language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', phone: '', city: '' });
    setTimeout(() => setSubmitSuccess(false), 4000);
  };

  const services: ServiceItem[] = [
    { icon: Sparkles, title: (t.services[0] as any).title, description: (t.services[0] as any).description },
    { icon: Shield,   title: (t.services[1] as any).title, description: (t.services[1] as any).description },
    { icon: Volume2,  title: (t.services[2] as any).title, description: (t.services[2] as any).description },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const heroY       = useTransform(scrollYProgress, [0, 0.2], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  // Icon badge — same visual DNA as Header logo badge
  const iconBadge = `
    w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 flex items-center justify-center
    bg-gradient-to-br from-primary/25 to-primary/8
    border border-primary/25
    shadow-[0_0_10px_rgba(0,191,255,0.08)]
    group-hover:from-primary/35 group-hover:to-primary/15
    group-hover:border-primary/40
    group-hover:shadow-[0_0_20px_rgba(0,191,255,0.2)]
    transition-all duration-300
  `;

  return (
    <div
      ref={containerRef}
      dir={dir}
      className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-clip"
    >
      <style>{`
        /* ── Section number styling ── */
        .section-number {
          display: inline-block;
          font-family: var(--font-mono, 'Courier New', monospace);
          font-size: clamp(2rem, 5vw, 3.5rem);
          font-weight: 800;
          line-height: 1;
          margin-inline-end: 0.35em;
          /* Gradient fill matching primary */
          background: linear-gradient(135deg, #00BFFF 0%, rgba(0,191,255,0.4) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          /* Subtle outline for depth */
          filter: drop-shadow(0 0 12px rgba(0,191,255,0.35));
          /* Prevent number from wrapping with title */
          white-space: nowrap;
          vertical-align: baseline;
        }

        /* ── Glass panel — token-driven, no !important brawls ── */
        .glass-panel {
          background: var(--glass-bg, rgba(14,14,20,0.65));
          border: 1px solid var(--glass-border, rgba(255,255,255,0.07));
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: background 0.35s ease, border-color 0.35s ease;
        }

        .glass-card-hover {
          transition: background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }
        .glass-card-hover:hover {
          background: var(--glass-hover-bg, rgba(0,191,255,0.04));
          border-color: var(--glass-hover-border, rgba(0,191,255,0.25)) !important;
          box-shadow: var(--glass-hover-shadow, 0 0 40px rgba(0,191,255,0.1));
        }

        /* ── Text effects ── */
        .text-glow { text-shadow: 0 0 40px rgba(0,191,255,0.4); }

        /* ── Hero gradient — adapts to theme via CSS var ── */
        .hero-gradient {
          background: linear-gradient(
            to left,
            #00BFFF,
            rgb(var(--foreground, 224 224 232) / 0.94),
            rgb(var(--foreground, 224 224 232) / 0.94)
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── CTA outline button — needs explicit themed border ── */
        .btn-outline-themed {
          border: 1px solid rgb(var(--foreground, 224 224 232) / 0.18);
          color: rgb(var(--foreground, 224 224 232) / 0.85);
          background: transparent;
        }
        .btn-outline-themed:hover {
          border-color: rgba(0,191,255,0.35);
          background: rgba(0,191,255,0.06);
          color: rgb(var(--foreground, 224 224 232));
        }

        /* ── Primary button text — always white, never inherits background color ── */
        .btn-primary-safe {
          color: #ffffff !important;
        }
        html.light .btn-primary-safe {
          color: #ffffff !important;
        }

        /* ── Input fields — themed ── */
        .input-themed {
          background: var(--input-bg, rgba(255,255,255,0.04)) !important;
          border-color: var(--input-border, rgba(255,255,255,0.1)) !important;
          color: rgb(var(--foreground, 224 224 232)) !important;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .input-themed::placeholder {
          color: rgb(var(--foreground, 224 224 232) / 0.35) !important;
        }
        .input-themed:focus {
          border-color: rgba(0,191,255,0.55) !important;
          box-shadow: 0 0 0 3px rgba(0,191,255,0.12) !important;
          outline: none !important;
        }
      `}</style>

      <ScrollProgress />
      <Header />
      <FloatingWhatsApp />

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 sm:pt-0 sm:pb-0">
        {/* Parallax bg */}
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/587d7d_c626f44792514b019653e6ca1cd34c12~mv2.png?originWidth=1920&originHeight=1024"
            alt="Luxury Smart Home Interior"
            className="w-full h-full object-cover scale-110"
            width={1920}
          />
          {/* Dark mode overlay — deep fade */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/55 to-background" />
          {/* Light mode overlay — softer, keeps image visible but legible */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white opacity-0 [html.light_&]:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(0,191,255,0.08),transparent)]" />
        </motion.div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className={`flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'} max-w-4xl`}>

            {/* Tag pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-primary/20 mb-6 sm:mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="font-paragraph text-xs sm:text-sm tracking-widest text-primary uppercase">{t.heroTag as string}</span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.08] mb-5 sm:mb-7 tracking-tight"
            >
              {t.heroTitle as string}
              <br />
              <span className="hero-gradient text-glow">{t.heroTitleGradient as string}</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`font-paragraph text-base sm:text-lg md:text-xl text-foreground/70  mb-8 sm:mb-12 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}
            >
              {t.heroDesc as string}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              {/* Primary — always white text on primary bg */}
              <button
                onClick={() => window.open('https://wa.me/972501234567', '_blank')}
                className="btn-primary-safe group inline-flex items-center justify-center gap-3 h-12 sm:h-14 px-6 sm:px-8 bg-primary hover:bg-primary/85 font-heading text-sm sm:text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_36px_rgba(0,191,255,0.35)] active:scale-[0.98]"
              >
                {t.whatsapp as string}
                {isRTL
                  ? <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 shrink-0" />
                  : <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 shrink-0" />
                }
              </button>

              {/* Outline — themed border + text */}
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline-themed inline-flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 font-heading text-sm sm:text-base font-medium rounded-xl transition-all duration-300"
              >
                {t.discover as string}
              </button>
            </motion.div>
          </div>
        </div>

        <GlowingOrb className="top-1/4 -right-20 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-primary/15" />
        <GlowingOrb className="bottom-0 -left-20 w-[400px] h-[400px] sm:w-[700px] sm:h-[700px] bg-sky-900/20" />
      </section>

      {/* ════════════════════════════════════════
          SERVICES
      ════════════════════════════════════════ */}
      <section id="services" className="relative w-full py-20 sm:py-28 md:py-36 bg-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.025]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className={`flex flex-col ${isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20`}>

            {/* Sticky title col */}
            <div className="lg:w-[38%] shrink-0">
              <div className="lg:sticky lg:top-32">
                <motion.div
                  initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={isRTL ? 'text-right' : 'text-left'}
                >
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold mb-4 sm:mb-5 leading-tight flex items-baseline flex-wrap gap-1">
                    <SectionNumber n="01" />{t.servicesTitle as string}
                  </h2>
                  <div className={`h-[2px] w-20 bg-gradient-to-r from-primary to-primary/0 mb-6 sm:mb-8 ${isRTL ? 'ms-auto lg:ms-0' : ''}`} />
                  <p className="font-paragraph text-base sm:text-lg text-foreground/60 leading-relaxed">
                    {t.servicesDesc as string}
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Cards grid */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`group relative overflow-hidden glass-panel rounded-2xl glass-card-hover p-6 sm:p-7 ${i === 2 ? 'md:col-span-2' : ''}`}
                >
                  <div className={`absolute -bottom-3 opacity-[0.04] group-hover:opacity-[0.08] group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-700 pointer-events-none ${isRTL ? '-left-3' : '-right-3'}`}>
                    <service.icon className="w-36 h-36 text-primary stroke-[0.6px]" />
                  </div>
                  <div className="relative z-10">
                    <div className={`${iconBadge} mb-5 sm:mb-6 ${isRTL ? 'ms-auto' : ''}`}>
                      <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" strokeWidth={1.6} />
                    </div>
                    <h3 className={`font-heading text-lg sm:text-xl font-bold mb-2.5 group-hover:text-primary transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {service.title}
                    </h3>
                    <p className={`font-paragraph text-sm sm:text-[0.9rem] text-foreground/55 group-hover:text-foreground/75 leading-relaxed transition-colors duration-300 ${isRTL ? 'text-right' : 'text-left'}`}>
                      {service.description}
                    </p>
                    <div className={`mt-5 h-px w-0 group-hover:w-16 bg-gradient-to-r from-primary/60 to-transparent transition-all duration-500 ease-out ${isRTL ? 'ms-auto' : ''}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          QUOTE BREATHER
      ════════════════════════════════════════ */}
      <section className="relative w-full h-[45vh] sm:h-[55vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://static.wixstatic.com/media/587d7d_73967c8626d14de9b213035931751fd8~mv2.png?originWidth=1920&originHeight=512"
            alt="Atmospheric Smart Home"
            className="w-full h-full object-cover opacity-35"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background" />
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`relative z-10 max-w-3xl mx-auto px-6 sm:px-10 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <div className={`text-7xl sm:text-9xl leading-none text-primary/15 font-serif mb-2 select-none`} aria-hidden>
            {isRTL ? '„' : '"'}
          </div>
          <h3 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-snug text-foreground/85">
            {(t.quote as string).replace(/^["„""]|["„""]$/g, '')}
          </h3>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════
          WHITE GLOVE
      ════════════════════════════════════════ */}
      <section className="relative w-full py-20 sm:py-28 md:py-36 bg-background overflow-hidden">
        <GlowingOrb className="top-1/2 -translate-y-1/2 -left-40 w-[500px] h-[500px] bg-primary/8" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Image col */}
            <div className={`${isRTL ? 'lg:order-2' : 'lg:order-1'} order-2`}>
              <div className="lg:sticky lg:top-32 w-full h-[320px] sm:h-[500px] lg:h-[580px] rounded-2xl overflow-hidden border border-white/8 group shadow-[0_24px_64px_-16px_rgba(0,0,0,0.5)]">
                <Image
                  src="https://static.wixstatic.com/media/587d7d_aece0cdd67f94a50b926ab07112ee028~mv2.png?originWidth=960&originHeight=576"
                  alt="White Glove Service"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  width={960}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                <div className={`absolute bottom-5 ${isRTL ? 'left-5' : 'right-5'} glass-panel px-4 py-3 rounded-xl`}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                    <span className="font-paragraph text-xs sm:text-sm font-semibold text-foreground/90">{t.systemActive as string}</span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] text-foreground/40 tracking-wider">STATUS: OPTIMAL</div>
                </div>
              </div>
            </div>

            {/* Content col */}
            <div className={`${isRTL ? 'lg:order-1' : 'lg:order-2'} order-1`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={isRTL ? 'text-right' : 'text-left'}
              >
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold mb-4 sm:mb-5 leading-tight flex items-baseline flex-wrap gap-1">
                  <SectionNumber n="02" />{t.whiteGloveTitle as string}
                </h2>
                <div className={`h-[2px] w-20 bg-gradient-to-r from-primary to-primary/0 mb-6 sm:mb-8 ${isRTL ? 'ms-auto lg:ms-0' : ''}`} />
                <p className="font-paragraph text-base sm:text-lg text-foreground/60 mb-10 sm:mb-14 leading-relaxed">
                  {t.whiteGloveDesc as string}
                </p>

                <div className="space-y-7 sm:space-y-9">
                  {(t.whiteGloveItems as any[]).map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.55, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                      className={`flex gap-4 sm:gap-5 group ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={iconBadge}>
                        {idx === 0 && <Shield   className="w-5 h-5 text-primary" strokeWidth={1.6} />}
                        {idx === 1 && <Sparkles className="w-5 h-5 text-primary" strokeWidth={1.6} />}
                        {idx === 2 && <Phone    className="w-5 h-5 text-primary" strokeWidth={1.6} />}
                      </div>
                      <div className="flex-1 pt-1">
                        <h3 className={`font-heading text-base sm:text-lg font-bold mb-1.5 ${isRTL ? 'text-right' : 'text-left'}`}>{item.title}</h3>
                        <p className={`font-paragraph text-sm sm:text-[0.9rem] text-foreground/55 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
      {/* <section id="contact" className="relative w-full py-20 sm:py-28 md:py-36 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-primary/[0.04] pointer-events-none" />
        <GlowingOrb className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[900px] sm:h-[900px] bg-primary/6" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className={`mb-10 sm:mb-14 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-3 sm:mb-4">
              {t.contactTitle as string}{' '}
              <span className="text-primary">{t.contactTitleSpan as string}</span>
            </h2>
            <p className="font-paragraph text-base sm:text-lg text-foreground/55 max-w-lg">
              {t.contactDesc as string}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative glass-panel rounded-3xl shadow-[0_24px_80px_-16px_rgba(0,0,0,0.45)] overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-20 sm:h-20 border-b-2 border-l-2 border-primary/20 rounded-bl-3xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />

            <form
              onSubmit={handleSubmit}
              dir={dir}
              className="relative z-10 p-6 sm:p-8 md:p-12 space-y-5 sm:space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-paragraph text-sm text-foreground/65 font-medium">
                    {t.fullName as string}
                  </Label>
                  <div className="relative group">
                    <Input
                      id="name" type="text" required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder as string}
                      className={`input-themed h-12 rounded-xl text-sm ${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
                    />
                    <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-primary transition-colors duration-200 pointer-events-none ${isRTL ? 'right-3.5' : 'left-3.5'}`} strokeWidth={1.7} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-paragraph text-sm text-foreground/65 font-medium">
                    {t.phone as string}
                  </Label>
                  <div className="relative group">
                    <Input
                      id="phone" type="tel" required dir="ltr"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="050-000-0000"
                      className={`input-themed h-12 rounded-xl text-sm ${isRTL ? 'pr-10' : 'pl-10'}`}
                    />
                    <Phone className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-primary transition-colors duration-200 pointer-events-none ${isRTL ? 'right-3.5' : 'left-3.5'}`} strokeWidth={1.7} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city" className="font-paragraph text-sm text-foreground/65 font-medium">
                  {t.city as string}
                </Label>
                <div className="relative group">
                  <Input
                    id="city" type="text" required
                    value={formData.city}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder={t.cityPlaceholder as string}
                    className={`input-themed h-12 rounded-xl text-sm ${isRTL ? 'pr-10 text-right' : 'pl-10'}`}
                  />
                  <MapPin className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-primary transition-colors duration-200 pointer-events-none ${isRTL ? 'right-3.5' : 'left-3.5'}`} strokeWidth={1.7} />
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary-safe w-full h-12 sm:h-14 bg-primary hover:bg-primary/85 font-heading text-sm sm:text-base font-semibold tracking-wide rounded-xl transition-all duration-300 hover:shadow-[0_0_32px_rgba(0,191,255,0.3)] active:scale-[0.98] disabled:opacity-55 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.sending as string}
                    </>
                  ) : (
                    t.submit as string
                  )}
                </button>
              </div>

              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-center gap-2.5 text-green-500 font-paragraph text-sm bg-green-500/8 border border-green-500/20 px-4 py-3 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                    <span>{t.success as string}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}
