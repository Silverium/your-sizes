import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import i18n from '@/src/i18n';
import { useState } from "react";

import { loadItem } from "@/utils/loadItem";
import { saveItem } from "@/utils/saveItem";
import { useEffect } from "react";
import { StyleSheet } from "react-native";
const mainUserNameKey = 'mainUserName'

export default function ProfileTab() {
	const [newUserName, setNewUserName] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		const loadUserName = async () => {
			const userName = await loadItem<string>(mainUserNameKey);
			if (userName) {
				setNewUserName(userName);
			}
		};
		loadUserName();
	}, []);

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
				<ThemedTextInput
					value={newUserName}
					onChangeText={setNewUserName}
					placeholder={i18n.t('enterName')}
					editable={isEditing}
				/>
				<ThemedView style={styles.buttonsContainer}>
					{isEditing ? (
						<>
							<ThemedButton style={styles.successButton} title={i18n.t('submit')} onPress={() => {
								saveItem(mainUserNameKey, newUserName)
									.catch((error) => {
										console.error('Error saving name:', error);
									});
									setIsEditing(false);
							}} />
							<ThemedButton
								style={styles.cancelButton}
								title={i18n.t('cancel')}
								onPress={() => {
									// Optionally reset the input or revert changes
									loadItem<string>(mainUserNameKey).then((userName) => {
										if (userName) setNewUserName(userName);
									}).finally(() => {
										setIsEditing(false);
									});
								}}
							/>
						</>
					) : (
						<ThemedButton
							title={i18n.t('edit')}
							onPress={() => {
								setIsEditing(true);
							}}
						/>
					)}

				</ThemedView>

			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	buttonsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		gap: 8,
	},
	successButton: {
		backgroundColor: '#28a745',
	},
	cancelButton: {
		backgroundColor: '#dc3545',
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