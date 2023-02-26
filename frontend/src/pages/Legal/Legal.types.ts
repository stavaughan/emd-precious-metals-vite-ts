export type LegalBusiness = {
	name?: string;
	siteName?: string;
	businessName?: string;
	streetAddress?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	phone?: string;
	email?: string;
	date?: string;
};

export type LegalContact = {
	name?: string;
	streetAddress?: string;
	cityStateZip?: string;
	phone?: string;
	email?: string;
};

export type ContentItem = {
	_id: string;
	title: string;
	content?: string;
	contact?: LegalContact | null;
	list?: string[];
}

export type Content = ContentItem[]
