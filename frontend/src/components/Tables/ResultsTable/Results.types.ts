import React from 'react';

type SetID = React.Dispatch<React.SetStateAction<string>>;
type SetEditData = React.Dispatch<React.SetStateAction<object | null>>;
type OnDelete = (id: string) => void;
type StrArray = string[] | [];

export type FileImage = object & {
	isImage?: boolean;
	name?: string;
	url?: string;
	file?: File;
	lastModified?: number;
}

export type ImageIDContent = {
	_id?: string;
	image?: FileImage | null;
	content: StrArray;
}

export type ResultsContent = {
	file?: File | string | ArrayBuffer | null;
	url?: string;
	name?: string;
	date?: string;
	isImage?: boolean;
}

export type ResultsItem<T> = ResultsContent & ImageIDContent & T;

export type Results<T> = ResultsItem<T>[] | [];

export type SetResult<T> = React.Dispatch<React.SetStateAction<ResultsItem<T>>>;

export type SetResults<T> = React.Dispatch<React.SetStateAction<Results<T>>>;

export type ImageRowProps<T> = {
	item: ResultsItem<T>;
	upload?: boolean;
	setResults?: SetResults<T>;
};

interface EventTypes<T> {
	setID?: SetID;
	onDelete?: OnDelete;
	loading?: boolean;
	deleteId?: string;
	setResults?: SetResults<T>;
	setEditData?: SetEditData;
	editDone?: boolean;
}

export type ResultsStateProps<T> = {
	results: Results<T>;
	setFiles: SetResults<T>;
};

export interface ResultsTableWrapperTypes<T> extends EventTypes<T> {
	results: Results<T>;
	headItems: StrArray;
	colClasses: StrArray;
	footerContent?: string[] | JSX.Element[] | [];
	upload?: boolean;
	sticky?: boolean
}

export interface RowActionColProps<T> extends EventTypes<T> {
	item?: ResultsItem<T>;
	image?: FileImage | null;
	itemID?: string;
};

export interface ResultsTableRowProps<T> extends EventTypes<T> {
	item: ResultsItem<T>;
	upload?: boolean;
	colClasses: StrArray;
}
