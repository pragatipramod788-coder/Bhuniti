import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BhuNiti — Evidence for Every Acre',
  description: 'National digital platform for research, policy innovation and evidence-based land governance.',
  icons: { icon: '/icon.svg' },
  openGraph: { title: 'BhuNiti — Evidence for Every Acre', description: 'Land intelligence for better policy.', type: 'website' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <div className="national-strip" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
