import { Route, Routes } from 'react-router-dom';
import {
	Calculators,
	NotFound,
	Unauthorized,
	TermsOfService,
	PrivacyPolicy,
} from '@/pages';
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
				<Route path='/legal/terms-of-use' element={<TermsOfService />} />
				<Route path='/legal/privacy-policy' element={<PrivacyPolicy />} />
			</Routes>
		</SettingsContextProvider>
	);
};

export default App;
