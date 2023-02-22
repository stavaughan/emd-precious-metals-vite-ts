export type Image = object & {
	isImage?: boolean;
	name?: string;
	url?: string;
}

export type ResultsItem = {
	_id: string;
	image: Image | null;
	content: string[] | [];
}

export type Results = ResultsItem[] | [];

export type SetResults = React.Dispatch<React.SetStateAction<Results>>;
