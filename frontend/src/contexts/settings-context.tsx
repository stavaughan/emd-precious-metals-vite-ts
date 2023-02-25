import { createContext } from 'react';
import { useScreenWidth, useFontSize } from '@/hooks';
import type { ScreenSize } from '@/hooks/hooks.types';
import type {
	FontSizeProps,
	SettingsContextType,
	SettingsContextProps
} from '@contexts/settings-context.types';

const SettingsContext = createContext<SettingsContextType>({
	screen: null,
	fontSize: null
});

export const SettingsContextProvider = (props: SettingsContextProps) => {

	const { screen }: { screen: ScreenSize; } = useScreenWidth();

	const fontSize = useFontSize({ isXSmall: screen.isXSmall }) as FontSizeProps;

	return (
		<SettingsContext.Provider
			value={{
				screen,
				fontSize
			} as SettingsContextType}
		>
			{props?.children}
		</SettingsContext.Provider>
	);
};

export default SettingsContext;
