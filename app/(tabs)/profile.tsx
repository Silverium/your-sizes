import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedDropdown } from "@/components/ThemedDropdown";
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

const height = {
	min: 30,
	max: 250,
	default: 160,
};
const weight = {
	min: 15,
	max: 350,
	default: 60,
};
const waist = {
	min: 45,
	max: 150,
	default: 70,
};
const foot = {
	min: 10,
	max: 50,
	default: 20,
};
const head = {
	min: 40,
	max: 65,
	default: 54,
};
const hips = {
	min: 40,
	max: 300,
	default: 95,
};
const chest = {
	min: 30,
	max: 200,
	default: 85,
};
const sleeve = {
	min: 10,
	max: 100,
	default: 55,
};
const shoulder = {
	min: 10,
	max: 60,
	default: 40,
};
const thigh = {
	min: 20,
	max: 300,
	default: 55,
};
const inseam = {
	min: 15,
	max: 150,
	default: 75,
};

const userInitialState: UserProfileForm = {
	name: '',
	year: new Date().getFullYear() - 25,
	gender: 'female',
	height: height.default,
	weight: weight.default,
	waist: waist.default,
	foot: foot.default,
	head: head.default,
	hips: hips.default,
	chest: chest.default,
	sleeve: sleeve.default,
	shoulder: shoulder.default,
	thigh: thigh.default,
	inseam: inseam.default,
};

const userProfileSchema = z.object({
	name: z.string()
		.trim().nonempty({ error: i18n.t("fieldRequired") })
		.min(1, { error: i18n.t('stringMinLength', { count: 1 }) }).max(50, { error: i18n.t('stringMaxLength', { count: 50 }) }),
	year: z.coerce.number().min(1900).max(new Date().getFullYear()).optional().default(1900),
	gender: z.enum(['female', 'male']).optional().default('female'),
	height: z.coerce.number({ error: i18n.t('numberOnly') }).min(height.min).max(height.max).default(height.default).optional(),
	weight: z.coerce.number({ error: i18n.t('numberOnly') }).min(weight.min).max(weight.max).default(weight.default).optional(),
	waist: z.coerce.number({ error: i18n.t('numberOnly') }).min(waist.min).max(waist.max).default(waist.default).optional(),
	foot: z.coerce.number({ error: i18n.t('numberOnly') }).min(foot.min).max(foot.max).default(foot.default).optional(),
	head: z.coerce.number({ error: i18n.t('numberOnly') }).min(head.min).max(head.max).default(head.default).optional(),
	hips: z.coerce.number({ error: i18n.t('numberOnly') }).min(hips.min).max(hips.max).default(hips.default).optional(),
	chest: z.coerce.number({ error: i18n.t('numberOnly') }).min(chest.min).max(chest.max).default(chest.default).optional(),
	sleeve: z.coerce.number({ error: i18n.t('numberOnly') }).min(sleeve.min).max(sleeve.max).default(sleeve.default).optional(),
	shoulder: z.coerce.number({ error: i18n.t('numberOnly') }).min(shoulder.min).max(shoulder.max).default(shoulder.default).optional(),
	thigh: z.coerce.number({ error: i18n.t('numberOnly') }).min(thigh.min).max(thigh.max).default(thigh.default).optional(),
	inseam: z.coerce.number({ error: i18n.t('numberOnly') }).min(inseam.min).max(inseam.max).default(inseam.default).optional(),
}).required();

const getNumericOptions = (min: number, max: number, step: number = 1) => {
	return Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => {
		const value = min + i * step;
		return {
			label: String(value),
			value,
			key: String(value),
		};
	});
};

type UserProfileForm = z.infer<typeof userProfileSchema>;
const yearOptions = getNumericOptions(new Date().getFullYear() - 120, new Date().getFullYear());
const heightOptions = getNumericOptions(height.min, height.max);
const weightOptions = getNumericOptions(weight.min, weight.max);
const waistOptions = getNumericOptions(waist.min, waist.max);
const footOptions = getNumericOptions(foot.min, foot.max, 0.5);
const headOptions = getNumericOptions(head.min, head.max);
const hipsOptions = getNumericOptions(hips.min, hips.max);
const chestOptions = getNumericOptions(chest.min, chest.max);
const sleeveOptions = getNumericOptions(sleeve.min, sleeve.max);
const shoulderOptions = getNumericOptions(shoulder.min, shoulder.max);
const thighOptions = getNumericOptions(thigh.min, thigh.max);
const inseamOptions = getNumericOptions(inseam.min, inseam.max);

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
			<ThemedDropdown items={[
				{ label: i18n.t('male'), value: 'male' },
				{ label: i18n.t('female'), value: 'female' },
			]}
			label={i18n.t('gender')}
				control={control}
				name={UserKeys.Gender}
				editable={isEditing}
			/>
			<ThemedDropdown
				name={UserKeys.Height}
				items={heightOptions}
				placeholder={{label: i18n.t('enterHeight'), value: ''}}
				label={i18n.t('height')}
				editable={isEditing}
				control={control}
			/>
			<ThemedDropdown
				name={UserKeys.Year}
				items={yearOptions}
				placeholder={{label: i18n.t('enterYear'), value: ''}}
				label={i18n.t('year')}
				editable={isEditing}
				control={control}
			/>

			<ThemedDropdown
				name={UserKeys.Weight}
				items={weightOptions}
				placeholder={{label: i18n.t('enterWeight'), value: ''}}
				label={i18n.t('weight')}
				editable={isEditing}
				control={control}
			/>
			<ThemedDropdown
				name={UserKeys.Waist}
				items={waistOptions}
				placeholder={{label: i18n.t('enterWaist'), value: ''}}
				label={i18n.t('waist')}
				editable={isEditing}
				control={control}
			/>
			<ThemedDropdown
				name={UserKeys.Foot}
				items={footOptions}
				placeholder={{label: i18n.t('enterFoot'), value: ''}}
				label={i18n.t('foot')}
				editable={isEditing}
				control={control}
			/>
			<ThemedDropdown
				name={UserKeys.Head}
				items={headOptions}
				placeholder={{label: i18n.t('enterHead'), value: ''}}
				label={i18n.t('head')}
				editable={isEditing}
				control={control}
			/>
			<ThemedDropdown
				name={UserKeys.Hips}
				items={hipsOptions}
				placeholder={{label: i18n.t('enterHips'), value: ''}}
				label={i18n.t('hips')}
				editable={isEditing}
				control={control}

			/>
			<ThemedDropdown
				name={UserKeys.Chest}
				items={chestOptions}
				placeholder={{label: i18n.t('enterChest'), value: ''}}
				label={i18n.t('chest')}
				editable={isEditing}
				control={control}

				/>
			<ThemedDropdown
				name={UserKeys.Sleeve}
				items={sleeveOptions}
				placeholder={{label: i18n.t('enterSleeve'), value: ''}}
				label={i18n.t('sleeve')}
				editable={isEditing}
				control={control}
			/>
			<ThemedDropdown
				name={UserKeys.Shoulder}
				items={shoulderOptions}
				placeholder={{label: i18n.t('enterShoulder'), value: ''}}
				label={i18n.t('shoulder')}
				editable={isEditing}
				control={control}
			/>
			<ThemedDropdown
				name={UserKeys.Thigh}
				items={thighOptions}
				placeholder={{label: i18n.t('enterThigh'), value: ''}}
				label={i18n.t('thigh')}
				editable={isEditing}
				control={control}
			/>
			<ThemedDropdown
				name={UserKeys.Inseam}
				items={inseamOptions}
				placeholder={{label: i18n.t('enterInseam'), value: ''}}
				label={i18n.t('inseam')}
				editable={isEditing}
				control={control}
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