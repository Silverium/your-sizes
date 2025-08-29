import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import i18n from '@/src/i18n';
import { loadItem } from "@/utils/loadItem";
import { saveItem } from "@/utils/saveItem";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { StyleSheet } from "react-native";
import { z } from "zod";

const userProfileKey = 'userProfile'

export enum UserKeys {
	Name = 'name',
	Gender = 'gender',
	Year = 'year',
	Height = 'height',
	Weight = 'weight',
	Waist = 'waist',
	Foot = 'foot',
	Head = 'head',
	Hips = 'hips',
	Chest = 'chest',
	Sleeve = 'sleeve',
	Shoulder = 'shoulder',
	Thigh = 'thigh',
	Inseam = 'inseam',
}

const userInitialState: UserProfileForm = {
	name: '',
	year: 1900,
	gender: 'female',
	height: 0,
	weight: 0,
	waist: 0,
	foot: 0,
	head: 0,
	hips: 0,
	chest: 0,
	sleeve: 0,
	shoulder: 0,
	thigh: 0,
	inseam: 0,
};
const userProfileSchema = z.object({
	name: z.string()
		.trim().nonempty({ error: i18n.t("fieldRequired") })
		.min(1, { error: i18n.t('stringMinLength', { count: 1 }) }).max(50, { error: i18n.t('stringMaxLength', { count: 50 }) }),
	year: z.coerce.number().min(1900).max(new Date().getFullYear()).optional().default(1900),
	gender: z.enum(['female', 'male']).optional().default('female'),
	height: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	weight: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	waist: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	foot: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	head: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	hips: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	chest: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	sleeve: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	shoulder: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	thigh: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
	inseam: z.coerce.number({ error: i18n.t('numberOnly') }).min(0).optional(),
}).required();

type UserProfileForm = z.infer<typeof userProfileSchema>;
export default function ProfileTab() {
	const {
		control,
		handleSubmit,
		reset,

	} = useForm({
		defaultValues: userInitialState, resolver: zodResolver(userProfileSchema),
		mode: "onChange",       // 🔑 validate on each keystroke
		reValidateMode: "onChange", // 🔑 re-validate when input changes
	});
	const [isEditing, setIsEditing] = useState(false);

	const loadUserProfile = async () => {
		const userProfile = await loadItem<UserProfileForm>(userProfileKey);
		if (userProfile) {
			reset(userProfile, { keepErrors: false });
		}
	};
	useEffect(() => {
		loadUserProfile();
	}, []);
	const onSubmitForm = handleSubmit(data => {
		saveItem(userProfileKey, data).then(savedData => {
			console.debug('User profile saved:', savedData);
			setIsEditing(false);
		})
	},
		errors => {
			console.error('User profile save failed:', { errors, control });
		}
	);

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
			<ThemedText type="title">{i18n.t('profile')}</ThemedText>
			<ThemedTextInput
				name={UserKeys.Name}
				label={i18n.t('name')}
				placeholder={i18n.t('enterName')}
				editable={isEditing}
				control={control}
			/>
			<ThemedTextInput
				name={UserKeys.Height}
				placeholder={i18n.t('enterHeight')}
				label={i18n.t('height')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Weight}
				placeholder={i18n.t('enterWeight')}
				label={i18n.t('weight')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Waist}
				placeholder={i18n.t('enterWaist')}
				label={i18n.t('waist')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Foot}
				placeholder={i18n.t('enterFoot')}
				label={i18n.t('foot')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Head}
				placeholder={i18n.t('enterHead')}
				label={i18n.t('head')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Hips}
				placeholder={i18n.t('enterHips')}
				label={i18n.t('hips')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Chest}
				placeholder={i18n.t('enterChest')}
				label={i18n.t('chest')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Sleeve}
				placeholder={i18n.t('enterSleeve')}
				label={i18n.t('sleeve')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Shoulder}
				placeholder={i18n.t('enterShoulder')}
				label={i18n.t('shoulder')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Thigh}
				placeholder={i18n.t('enterThigh')}
				label={i18n.t('thigh')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedTextInput
				name={UserKeys.Inseam}
				placeholder={i18n.t('enterInseam')}
				label={i18n.t('inseam')}
				editable={isEditing}
				control={control}
				inputMode="numeric"
				keyboardType="numeric"
			/>
			<ThemedView style={styles.buttonsContainer}>
				{isEditing ? (
					<>
						<ThemedButton style={styles.successButton} title={i18n.t('submit')} onPress={() => {
							onSubmitForm();
						}} />
						<ThemedButton
							style={styles.cancelButton}
							title={i18n.t('cancel')}
							onPress={async () => {
								const userProfile = await loadItem<UserProfileForm>(userProfileKey);
								if (userProfile) {
									setIsEditing(false);
									reset(userProfile);
								}
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
		maxWidth: 900,
		gap: 8,
		marginBottom: 8,
		alignItems: 'flex-start',
		alignSelf: 'center',
		maxHeight: '100%',
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: 'absolute',
	},
});