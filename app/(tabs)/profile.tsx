import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import i18n from '@/src/i18n';
import { useState } from "react";

export default function ProfileTab() {
	const [newUserName, setNewUserName] = useState('');

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
				<ThemedText type="default">{newUserName}</ThemedText>
				<ThemedTextInput
					value={newUserName}
					onChangeText={setNewUserName}
					placeholder={i18n.t('enterName')}
				/>

				<ThemedButton title={i18n.t('submit')} onPress={() => {
					// TODO: save name locally
				}} />
			</ThemedView>
		</ParallaxScrollView>
	);
}