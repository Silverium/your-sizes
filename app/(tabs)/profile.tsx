import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useI18nContext } from "@/src/i18n/i18n-react";

export default function ProfileTab() {
	  const { LL } = useI18nContext()

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
				<ThemedText type="title">{LL.profile()}</ThemedText>
			</ThemedView>
		</ParallaxScrollView>
	);
}