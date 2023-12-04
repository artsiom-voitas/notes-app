'use client';

import { Switch } from '@nextui-org/react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState<boolean>(false);
    const { theme, setTheme, resolvedTheme } = useTheme();

    const isThemeDark: boolean = resolvedTheme === 'dark';
    const setNewTheme = function () {
        if (theme === 'dark') {
            return setTheme('light');
        } else {
            return setTheme('dark');
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Switch
            defaultSelected
            size="lg"
            color="success"
            isSelected={isThemeDark}
            onClick={setNewTheme}
            startContent={<SunIcon />}
            endContent={<MoonIcon />}></Switch>
    );
}
