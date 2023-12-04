'use client';

import { persistor, store } from '@/redux/store';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NextUIProvider>
                    <NextThemesProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem={true}>
                        {children}
                    </NextThemesProvider>
                </NextUIProvider>
            </PersistGate>
        </Provider>
    );
}
