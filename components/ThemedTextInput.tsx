import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextInputProps = TextInputProps & {
	lightColor?: string;
	darkColor?: string;
	type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle';
};

export function ThemedTextInput({
	style,
	lightColor,
	darkColor,
	type = 'default',
	editable = true,
	...rest
}: ThemedTextInputProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const editableBackgroundColor = useThemeColor({ light: '#fff', dark: '#222' }, 'background');
	const backgroundColor = editable ? editableBackgroundColor : 'transparent';

	const borderStyle = editable ? styles.withBorder : styles.noBorder;

	return (
		<TextInput
			style={[
				{ color, backgroundColor },
				type === 'default' ? styles.default : undefined,
				type === 'title' ? styles.title : undefined,
				type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
				type === 'subtitle' ? styles.subtitle : undefined,
				borderStyle,
				style,
			]}
			placeholderTextColor={color}
			editable={editable}
			{...rest}
		/>
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
	},
	noBorder: {
		borderWidth: 1,
		borderColor: 'transparent',
	},
});