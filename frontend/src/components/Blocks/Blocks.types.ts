import type { SettingsData, MarkType } from '@/features/settings/settings.types';

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

export interface CenteredBrandProps extends SettingsData {
	isSmall?: boolean;
	loading: boolean;
}

export interface BrandComponentProps extends TrademarkProps {
	baseName?: string;
	subName?: string;
	color?: boolean;
	small?: boolean;
}
