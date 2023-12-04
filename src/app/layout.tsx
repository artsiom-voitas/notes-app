import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: 'Notes',
    description: 'Take your notes in a simple way'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={`${GeistSans.className} container mx-auto min-h-screen`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
