import { Route, Routes } from 'react-router-dom';
import { Calculators, NotFound, Unauthorized } from '@/pages';
import { SettingsContextProvider } from '@/contexts/settings-context';
import { useLoadSettings } from '@/hooks';
import { faIconList } from '@/theme';

import 'react-loading-skeleton/dist/skeleton.css';
import 'react-toastify/dist/ReactToastify.css';

faIconList();

const App = () => {

	useLoadSettings();

	return (
		<SettingsContextProvider>
			<Routes>
				<Route path="/" element={<Calculators />} />
				<Route path="/api/*" element={<Unauthorized />} />
				<Route path='/*' element={<NotFound />} />
			</Routes>
		</SettingsContextProvider>
	);
};

export default App;
