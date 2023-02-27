type ModalIDs = {
	displayFile: string;
	displayImage: string;
	spreadInfo: string;
	metalssettings: string;
	imageUploadCrop: string;
}

export type SocialIcon = {
	id: string;
	name?: string;
	baseLink?: string;
	color?: string;
	lib?: string;
	icon: string;
	prob?: number;
}

export type AlertIcon = {
	type: string;
	lib: string;
	icon: string;
	className: string;
}

type Icons = {
	social: SocialIcon[];
	alerts: AlertIcon[];
}

export type FooterLinkType = {
	_id?: string;
	path: string;
	label: string;
	isSmall?: boolean;
	idx: number;
};

export type FooterLinksType = FooterLinkType[];

export interface SiteDataTypes {
	footerLinks: FooterLinksType;
	modalIDs: ModalIDs;
	editMessages: object;
	icons: Icons;
	socialMedia: SocialIcon[];
}
