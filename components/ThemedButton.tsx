import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import * as Haptics from 'expo-haptics';
import { ReactNode } from 'react';

export type ThemedButtonProps = {
	title?: string;
	onPress?: () => void;
	style?: ViewStyle;
	textStyle?: TextStyle;
	children?: ReactNode;
	disabled?: boolean;
	loading?: boolean;
	lightColor?: string;
	darkColor?: string;
};

export function ThemedButton({
	title,
	onPress,
	style,
	textStyle,
	children,
	disabled,
	loading,
	lightColor,
	darkColor,
}: ThemedButtonProps) {
	const backgroundColor = useThemeColor({ light: lightColor ?? '#007AFF', dark: darkColor ?? '#0A84FF' }, 'background');
	const textColor = useThemeColor({ light: '#fff', dark: '#fff' }, 'text');

	const handlePress = async () => {
		if (!disabled && !loading) {
			await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
			onPress?.();
		}
	};

	return (
		<Pressable
			style={({ pressed }) => [
				styles.button,
				{ backgroundColor: disabled ? '#ccc' : backgroundColor, opacity: pressed || disabled ? 0.7 : 1 },
				style,
			]}
			onPress={handlePress}
			disabled={disabled || loading}
			accessibilityRole="button"
		>
			{loading ? (
				<ActivityIndicator color={textColor} />
			) : children ? (
				children
			) : (
				<Text style={[styles.text, { color: textColor }, textStyle]}>{title}</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		paddingHorizontal: 20,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 44,
	},
	text: {
		fontSize: 16,
		fontWeight: '600',
	},
});