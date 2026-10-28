/**
 * OMER DESIGN — Central Configuration
 * Single source of truth for site-wide settings.
 * Do not hard-code these values elsewhere.
 */

export const SITE = {
  name: 'OMER DESIGN',
  tagline: 'حلول رقمية متكاملة للمواقع',
  description: 'تصميم وتطوير المواقع، النطاقات، الاستضافة، البريد الاحترافي، وكل ما تحتاجه لإطلاق موقعك وإدارته باحتراف.',
  url: 'https://omdesign.netlify.app',
  lang: 'ar',
  dir: 'rtl',
};

export const CONTACT = {
  email: 'info@omdesign.netlify.app', // Update to real business email when available
  whatsapp: {
    number: '967772834168', // Without + or spaces
    message: 'مرحبًا، أريد الاستفسار عن خدمات تصميم وتطوير المواقع.',
  },
};

export const SOCIAL = {
  // Add only real accounts when available
  // twitter: '',
  // instagram: '',
  // linkedin: '',
};

export const NAV = [
  {
    label: 'الخدمات',
    href: '/services.html',
    children: [
      { label: 'تصميم المواقع', href: '/web-design.html' },
      { label: 'تطوير المواقع', href: '/web-development.html' },
      { label: 'نشر المواقع', href: '/deployment.html' },
      { label: 'الاستضافة', href: '/hosting.html' },
      { label: 'النطاقات', href: '/domains.html' },
      { label: 'البريد الاحترافي', href: '/business-email.html' },
      { label: 'SSL والحماية', href: '/ssl.html' },
      { label: 'الصيانة والدعم', href: '/maintenance.html' },
    ],
  },
  { label: 'أعمالنا', href: '/portfolio.html' },
  { label: 'الاستضافة', href: '/hosting.html' },
  { label: 'النطاقات', href: '/domains.html' },
  { label: 'البريد الاحترافي', href: '/business-email.html' },
  { label: 'من نحن', href: '/about.html' },
  { label: 'الأسئلة الشائعة', href: '/faq.html' },
  { label: 'تواصل معنا', href: '/contact.html' },
];

export const SERVICES = [
  {
    id: 'web-design',
    number: '01',
    title: 'تصميم المواقع',
    short: 'واجهات احترافية متجاوبة تعكس هوية علامتك التجارية.',
    href: '/web-design.html',
    icon: 'design',
  },
  {
    id: 'web-development',
    number: '02',
    title: 'تطوير المواقع',
    short: 'مواقع سريعة، قابلة للتوسع، وجاهزة لمحركات البحث.',
    href: '/web-development.html',
    icon: 'code',
  },
  {
    id: 'deployment',
    number: '03',
    title: 'نشر المواقع',
    short: 'إطلاق الموقع وربطه بالنطاق وتفعيل HTTPS.',
    href: '/deployment.html',
    icon: 'rocket',
  },
  {
    id: 'hosting',
    number: '04',
    title: 'الاستضافة',
    short: 'استضافة موثوقة بأداء عالٍ ونسخ احتياطي ودعم فني.',
    href: '/hosting.html',
    icon: 'server',
  },
  {
    id: 'domains',
    number: '05',
    title: 'النطاقات',
    short: 'تسجيل ونقل وإدارة النطاقات وربطها بالاستضافة.',
    href: '/domains.html',
    icon: 'globe',
  },
  {
    id: 'business-email',
    number: '06',
    title: 'البريد الاحترافي',
    short: 'بريد إلكتروني باسم نطاقك: info@شركتك.com',
    href: '/business-email.html',
    icon: 'mail',
  },
  {
    id: 'ssl',
    number: '07',
    title: 'SSL والحماية',
    short: 'شهادات SSL وتأمين الاتصال وحماية أساسية للموقع.',
    href: '/ssl.html',
    icon: 'shield',
  },
  {
    id: 'maintenance',
    number: '08',
    title: 'الصيانة والدعم',
    short: 'تحديثات، نسخ احتياطي، إصلاح أخطاء ودعم فني مستمر.',
    href: '/maintenance.html',
    icon: 'tools',
  },
];
