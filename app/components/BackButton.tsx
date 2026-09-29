'use client';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();

  // Hidden on home ("/")
  if (!pathname || pathname === '/' || pathname === '') {
    return null;
  }

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <button
      onClick={handleBack}
      className="back-btn focus-ring"
      aria-label={t('nav.back')}
    >
      <ArrowLeft size={15} style={{ verticalAlign: 'middle' }} />
      <span>{t('nav.back')}</span>
    </button>
  );
}
