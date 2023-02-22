import './custom.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from '@/app/store';
import App from '@/App';

import 'react-toastify/dist/ReactToastify.css';

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			<ToastContainer
				autoClose={3000}
				position="top-center"
				newestOnTop={true}
			/>
		</Provider>
	</React.StrictMode>
);
