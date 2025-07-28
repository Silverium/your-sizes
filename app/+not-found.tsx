import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useI18nContext } from '@/src/i18n/i18n-react';

export default function NotFoundScreen() {
  const { LL } = useI18nContext()

  return (
    <>
      <Stack.Screen options={{ title: LL.oops() }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">{LL.screenDoesNotExist()}</ThemedText>
        <Link href="/" style={styles.link}>
          <ThemedText type="link">{LL.goHome()}</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
