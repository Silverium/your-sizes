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
	...rest
}: ThemedTextInputProps) {
	const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
	const backgroundColor = useThemeColor({ light: '#fff', dark: '#222' }, 'background');

	return (
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
		borderWidth: 1,
		borderColor: '#ccc',
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: '600',
		padding: 10,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		lineHeight: 32,
		padding: 10,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#ccc',
	},
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
		padding: 10,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#ccc',
	},
});