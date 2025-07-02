'use client';
import React from 'react';
import ThemeProvider from './ThemeToggle/theme-provider';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { Provider } from 'react-redux';
import store from '@/store/store';
export default function Providers({
  session,
  children
}: {
  session: SessionProviderProps['session'];
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </Provider>
  );
}
