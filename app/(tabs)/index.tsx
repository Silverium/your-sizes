import { Image, StyleSheet, Platform } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';
import { useI18nContext } from '@/src/i18n/i18n-react';
import { WrapTranslation } from '@/components/WrapTranslation';

export default function HomeScreen() {
  const { LL } = useI18nContext()
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{LL.appName()}</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer} lightColor='#c8d624' darkColor='#054d62'>
        <ThemedText>

          <ThemedText>
            <WrapTranslation
              message={LL.createdBy()}
              renderComponent={(infix) => <ExternalLink href='https://www.soldeplata.dev'><ThemedText type="link">{infix}</ThemedText></ExternalLink>} /> </ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
