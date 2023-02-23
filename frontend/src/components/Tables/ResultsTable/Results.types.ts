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
	content?: StrArray;
}

export type ResultsContent = {
	file?: File | string | ArrayBuffer | null;
	url?: string;
	name?: string;
	date?: string;
	isImage?: boolean;
}

export type ResultsItem = {
	_id?: string;
	image?: FileImage | null;
	content: StrArray;
	file?: File | string | ArrayBuffer | null;
	url?: string;
	name?: string;
	date?: string;
	isImage?: boolean;
};

export type Results = ResultsItem[] | [];

export type SetResult = React.Dispatch<React.SetStateAction<ResultsItem | null>>;

export type SetResults = React.Dispatch<React.SetStateAction<Results>>;

export type ImageRowProps = {
	item: ResultsItem;
	upload?: boolean;
	setResults?: SetResults;
};

interface EventTypes {
	setID?: SetID;
	onDelete?: OnDelete;
	loading?: boolean;
	deleteId?: string;
	setResults?: SetResults;
	setEditData?: SetEditData;
	editDone?: boolean;
}

export type ResultsStateProps = {
	results: Results;
	setFiles: SetResults;
};

export interface ResultsTableWrapperTypes extends EventTypes {
	results: Results;
	headItems: StrArray;
	colClasses: StrArray;
	footerContent?: string[] | JSX.Element[] | [];
	upload?: boolean;
	sticky?: boolean
}

export interface RowActionColProps extends EventTypes {
	item?: ResultsItem;
	image?: FileImage | null;
	itemID?: string;
};

export interface ResultsTableRowProps extends EventTypes {
	item: ResultsItem;
	upload?: boolean;
	colClasses: StrArray;
}
