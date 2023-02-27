import type { ScreenSize } from '@/hooks/hooks.types';

export type FontSizeProps = {
	smallText: 'text-xs' | 'text-sm';
	mediumText: 'text-sm' | 'text-base';
	largeText: 'text-base' | 'text-lg';
}

export type SettingsContextType = {
	screen: ScreenSize | null;
	fontSize?: FontSizeProps | null;
};

export type SettingsContextProps = {
	children?: React.ReactNode
};
