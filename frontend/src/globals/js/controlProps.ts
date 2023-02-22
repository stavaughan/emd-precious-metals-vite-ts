const controlProps = {
    modalOpen: (modalID: string) => ({
        'data-bs-toggle': 'modal',
        'data-bs-target': `#${modalID}`
    }),
    collapse: (cid: string, bool: boolean) => ({
        'data-bs-toggle': 'collapse',
        'data-bs-target': `#${cid}`,
        'aria-expanded': bool,
        'aria-controls': cid
    }),
    dropdown: () => ({
        'data-bs-toggle': 'dropdown',
        'aria-expanded': false
    }),
    tabs: () => ({
        'data-bs-toggle': 'tab',
        'aria-expanded': false
    }),
	newTab: (url: string) => ({
		'href': url,
		'target': '_blank',
		'rel': 'noopener noreferrer nofollow'
	})
};

export default controlProps;
