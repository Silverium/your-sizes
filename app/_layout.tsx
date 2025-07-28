import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { getLocales } from 'expo-localization';
import { loadLocale } from '@/src/i18n/i18n-util.sync';
import TypesafeI18n from '@/src/i18n/i18n-react'
import { useColorScheme } from '@/hooks/useColorScheme';
import { Locales } from '@/src/i18n/i18n-types';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const locale: Locales = getLocales()[0]?.languageCode as Locales ?? 'es';
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  // Load locales
  // (Use a data fetching solution that you prefer)
  const [localesLoaded, setLocalesLoaded] = useState(false)
  useEffect(() => {
    console.log(`%clocale ${locale}`, 'background-color: gold;');
    loadLocale(locale)
    setLocalesLoaded(true)
  }, [locale])


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !localesLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <TypesafeI18n locale={locale}>

        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </TypesafeI18n>
    </ThemeProvider>
  );
}
