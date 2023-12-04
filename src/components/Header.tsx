import { PenSquare } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

export default function Header() {
    return (
        <header className="mt-4 flex items-center justify-between">
            <div className="flex min-h-[40px] items-center justify-between gap-3">
                <PenSquare size={20} />
                <h2 className="text-2xl font-bold">Notes</h2>
            </div>
            <ThemeSwitcher />
        </header>
    );
}
