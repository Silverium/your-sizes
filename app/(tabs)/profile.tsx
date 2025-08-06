import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import i18n from '@/src/i18n';

export default function ProfileTab() {

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
			headerImage={
				<IconSymbol
					size={310}
					color="#808080"
					name="person.crop.circle"
				/>
			}>
			<ThemedView>
				<ThemedText type="title">{i18n.t('profile')}</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	);
}