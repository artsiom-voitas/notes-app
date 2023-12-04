import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function Home() {
    return (
        <main className="h-screen">
            <ThemeSwitcher />
            <div className="flex h-full flex-col items-center justify-center text-4xl font-bold">
                Next.js 14 playground.
            </div>
        </main>
    );
}
