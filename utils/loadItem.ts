import AsyncStorage from "@react-native-async-storage/async-storage";
function deserializeValue<T>(value: any, type: StoredItemType): T {
	switch (type) {
		case "date":
			return new Date(value) as unknown as T;
		default:
			return value as T;
	}
}
export async function loadItem<T extends StoredItemType>(
	name: string
): Promise<T | null> {
	const raw = await AsyncStorage.getItem(name);
	if (!raw) return null;

	try {
		const item = JSON.parse(raw) as unknown as StoredItem<T>;
		return deserializeValue<T>(item.value, item.type);
	} catch (error) {
		console.error("Error loading item:", error);
	}
	return null;
}
