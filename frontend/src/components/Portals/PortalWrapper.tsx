import React from 'react';
import ReactDOM from 'react-dom';
import type { PortalWrapperProps }from './Portals.types';

const PortalWrapper: React.FC<PortalWrapperProps> = ({ rootName, children }) => {
	const root = document.getElementById(rootName) as HTMLElement;
    return <>{ReactDOM.createPortal(<>{children}</>, root)}</>;
}

export default PortalWrapper;
