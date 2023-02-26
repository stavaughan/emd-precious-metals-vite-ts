import type { Settings, MarkType } from '@/features/settings/settings.types';

export type TitleBlockProps = {
	title: string;
	gradient?: boolean;
}

export interface TradeMarkName {
	name?: string;
	mark?: MarkType;
}

export interface TrademarkProps extends TradeMarkName {
	isLoading?: boolean;
}

export interface BrandLogoProps {
	color?: boolean;
	width?: string;
}

export interface CenteredBrandProps {
	isSmall?: boolean;
	loading: boolean;
	settings: Settings;
}

export interface BrandComponentProps extends TrademarkProps {
	baseName?: string;
	subName?: string;
	color?: boolean;
	small?: boolean;
}
