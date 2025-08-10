
declare global {
	type StoredItemType = import("@/types/storedItem").StoredItemType;
	type StoredItem<T = StoredItemType, M = Record<string, any>> = import("@/types/storedItem").StoredItem<T, M>;
}
export {};