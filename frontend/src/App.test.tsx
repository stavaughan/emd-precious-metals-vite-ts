import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from '@/App';

test("renders 'Site loaded...' text", () => {
	const { getByText } = render(<App />);
	const divElement = getByText(/Site loaded.../i);
	expect(divElement).toBeInTheDocument();
});

test("does not render 'Site not loaded...' text", () => {
	const { queryByText } = render(<App />);
	const linkElement = queryByText(/Site not loaded.../i);
	expect(linkElement).not.toBeInTheDocument();
});
