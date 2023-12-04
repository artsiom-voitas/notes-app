'use client';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeSwitcher() {
    const [mounted, setMounted] = useState<boolean>(false);
    const { theme, themes, setTheme, resolvedTheme } = useTheme();
    const [selectedKeys, setSelectedKeys] = useState<any>(new Set([`${theme}`]));

    const isThemeDark: boolean = resolvedTheme === 'dark';
    const Icon: JSX.Element = isThemeDark ? <Moon /> : <Sun />;

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Dropdown>
            <DropdownTrigger className="min-w-[20px]">
                <Button variant="bordered">{Icon}</Button>
            </DropdownTrigger>
            <DropdownMenu
                aria-label="Theme selection"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}>
                {themes.map((theme) => (
                    <DropdownItem
                        key={theme}
                        onClick={() => setTheme(theme)}
                        className="capitalize">
                        {theme}
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
}
