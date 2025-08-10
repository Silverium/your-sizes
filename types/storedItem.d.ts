export type StoredItemType =
	| string
	| boolean
	| number
	| any[]
	| object
	| Date;

export type StoredItem<T = StoredItemType> = {
	version: string;
	type: T;
	value: string; // always serialized
	date: string; // ISO timestamp
	name: string;
	meta?: Record<string, string>;
};
