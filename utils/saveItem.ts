import AsyncStorage from "@react-native-async-storage/async-storage";

function detectType(value: any): StoredItemType {
	if (value === null) return "null";
	if (Array.isArray(value)) return "array";
	if (value instanceof Date) return "date";
	switch (typeof value) {
		case "boolean":
			return "boolean";
		case "number":
			return "number";
		case "string":
			return "string";
		case "object":
			return "object";
		default:
			throw new Error(`Unsupported type: ${typeof value}`);
	}
}

const serializeValue = (value: any, type: StoredItemType): string => {
	if (type === "date") return value.toISOString();
	return value;
};

export async function saveItem(
	name: string,
	value: any,
	meta?: Record<string, any>
) {
	const type = detectType(value);
	const item: StoredItem = {
		type,
		value: serializeValue(value, type),
		date: new Date().toISOString(),
		name,
		meta,
	};
	const serializedItem = JSON.stringify(item);
	await AsyncStorage.setItem(name, serializedItem);
	return item;
}
