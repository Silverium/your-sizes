import { useThemeColor } from '@/hooks/useThemeColor';
import { Control, useController } from 'react-hook-form';
import { StyleProp, StyleSheet, TextInput, ViewStyle, type TextInputProps } from 'react-native';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export type ThemedTextInputProps = TextInputProps & {
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle';
	name?: string;
	defaultValue?: string | number;
	control?: Control<any>
	label?: string;
	wrapperStyle?: StyleProp<ViewStyle>;
};

export function ThemedTextInput({
	style,
	lightColor,
	darkColor,
	type = 'default',
	editable = true,
	name ='',
	defaultValue,
	control,
	label,
	wrapperStyle,
	...rest
}: ThemedTextInputProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const editableBackgroundColor = useThemeColor({ light: '#fff', dark: '#222' }, 'background');
	const backgroundColor = editable ? editableBackgroundColor : 'transparent';
	const { field, fieldState } = useController({ name, control, defaultValue });

	const borderStyle = editable ? styles.withBorder : styles.noBorder;

	return (
		<ThemedView style={[{ backgroundColor }, borderStyle, styles.inputWrapper, wrapperStyle ]}>
		{label &&<ThemedText type='formLabel'>{label}</ThemedText>}
		<TextInput
			style={[
				{ color, backgroundColor },
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				style,
			]}
			placeholderTextColor={color}
			editable={editable}
			{...rest}
			value={field.value}
			onChangeText={field.onChange}
		/>
		{fieldState.error?.message && (
			<ThemedText type='formError'>{fieldState.error.message}</ThemedText>
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
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '600',
		padding: 10,
		borderRadius: 6,
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 32,
		padding: 10,
		borderRadius: 6,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
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
		// justifyContent: 'space-between',
		padding: 4,
	},
});