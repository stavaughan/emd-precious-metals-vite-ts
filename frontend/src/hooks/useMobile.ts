import { useContext } from "react";
import { SettingsContext } from "@/contexts";
import type { ScreenSize } from "./hooks.types";

const useMobile = () => {
	const { isXSmall } = useContext(SettingsContext).screen as ScreenSize;
	return { isXSmall };
}

export default useMobile
