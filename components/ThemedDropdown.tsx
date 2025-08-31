import { useThemeColor } from '@/hooks/useThemeColor';
import { Control, useController } from 'react-hook-form';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import RNPickerSelect, { PickerSelectProps } from 'react-native-picker-select';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export type ThemedDropdownProps = Omit<PickerSelectProps, 'onValueChange' | 'items'> & {
	name: string;
	control: Control<any>;
	label?: string;
	items: { label: string; value: any }[];
	wrapperStyle?: StyleProp<ViewStyle>;
	lightColor?: string;
	darkColor?: string;
	editable?: boolean;
};

export function ThemedDropdown({
	name,
	control,
	label,
	items,
	wrapperStyle,
	lightColor,
	darkColor,
	editable = true,
	...rest
}: ThemedDropdownProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const editableBackgroundColor = useThemeColor({ light: '#fff', dark: '#222' }, 'background');
	const backgroundColor = editable ? editableBackgroundColor : 'transparent';
	const borderStyle = editable ? styles.withBorder : styles.noBorder;
	const { field, fieldState } = useController({ name, control });

	return (
		<ThemedView style={[{ backgroundColor }, borderStyle, styles.inputWrapper, wrapperStyle]}>
			{label && <ThemedText type="formLabel">{label}</ThemedText>}
			<RNPickerSelect
				items={items}
				value={field.value}
				onValueChange={field.onChange}
				disabled={!editable}
				style={{
					inputIOS: {
						...styles.default,
						color,
						backgroundColor,
					},
					inputAndroid: {
						...styles.default,
						color,
						backgroundColor,
					},
					inputIOSContainer: { pointerEvents: "none" },
					placeholder: {
						color: '#888',
					},
				}}
				{...rest}
			/>
			{fieldState.error?.message && (
				<ThemedText type="formError">{fieldState.error.message}</ThemedText>
			)}
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
		padding: 10,
		borderRadius: 6,
	},
	withBorder: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 6,
	},
	noBorder: {
		borderWidth: 1,
		borderColor: 'transparent',
	},
	inputWrapper: {
		flexDirection: 'column',
		alignItems: 'flex-start',
		padding: 4,
	},
});