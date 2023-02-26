import { SiteDataTypes, SocialIcon, AlertIcon } from './SiteData.types';

const SiteData: SiteDataTypes = {
	footerLinks: [
		{
			_id: 'terms',
			path: 'legal/terms-of-use',
			label: 'Terms of Use'
		},
		{
			_id: 'privacy',
			path: 'legal/privacy-policy',
			label: 'Privacy Policy'
		}
	],
	modalIDs: {
		displayFile: "displayFile",
		displayImage: "displayImage",
		spreadInfo: "spreadInfo",
		metalssettings: "metalssettings",
		imageUploadCrop: "imageUploadCrop"
	},
	editMessages: {
		onEdit: 'Make your changes now',
		onChange: "Click 'Save update' to save changes",
		onDelete: "Are you sure you want to delete this item?",
		onSave: `Saving changes...`,
		onCancel: 'Canceling...'
	},
	icons: {
		social: [
			{
				id: 'facebook',
				name: 'Facebook',
				color: "#4267B2",
				lib: 'fab',
				icon: 'facebook',
				baseLink: "https://www.facebook.com/"
			},
			{
				id: 'linkedin',
				name: 'LinkedIn',
				color: "#0077b5",
				lib: 'fab',
				icon: 'linkedin',
				baseLink: "https://www.linkedin.com/in/"
			},
			{
				id: 'twitter',
				name: 'Twitter',
				color: "#1DA1F2",
				lib: 'fab',
				icon: 'twitter',
				baseLink: "https://twitter.com/"
			},
			{
				id: 'google',
				name: 'Google',
				color: "#DB4437",
				lib: 'fab',
				icon: 'google',
				baseLink: "https://google.com/"
			},
			{
				id: 'github',
				name: 'GitHub',
				color: "#333",
				lib: 'fab',
				icon: 'github',
				baseLink: "https://github.com/"
			},
			{
				id: 'instagram',
				name: 'Instagram',
				color: "#c9510c",
				lib: 'fab',
				icon: 'instagram-square',
				baseLink: "https://www.instagram.com/"
			},
			{
				id: 'pinterest',
				name: 'Pinterest',
				color: "#E60023",
				lib: 'fab',
				icon: 'pinterest-square',
				baseLink: "https://www.pinterest.com/"
			}
		] as SocialIcon[],
		alerts: [
			{
				type: 'error',
				lib: 'fas',
				icon: 'exclamation-triangle',
				className: 'danger'
			},
			{
				type: 'warning',
				lib: 'fas',
				icon: 'exclamation-triangle',
				className: 'warning'
			},
			{
				type: 'notice',
				lib: 'fas',
				icon: 'exclamation-circle',
				className: 'info'
			},
			{
				type: 'check',
				lib: 'fas',
				icon: 'check-circle',
				className: 'primary'
			},
			{
				type: 'success',
				lib: 'fas',
				icon: 'check-circle',
				className: 'success'
			},
			{
				type: 'alert',
				lib: 'far',
				icon: 'bell',
				className: 'primary'
			},
			{
				type: 'info',
				lib: 'fas',
				icon: 'info-circle',
				className: 'info'
			}
		] as AlertIcon[],
	},
	socialMedia: [
		{
			id: 'facebook',
			name: 'Facebook',
			color: "#4267B2",
			lib: 'fab',
			icon: 'facebook',
			baseLink: "https://www.facebook.com/",
			prob: 0.7
		},
		{
			id: 'linkedin',
			name: 'LinkedIn',
			color: "#0077b5",
			lib: 'fab',
			icon: 'linkedin',
			baseLink: "https://www.linkedin.com/in/",
			prob: 0.7
		},
		{
			id: 'twitter',
			name: 'Twitter',
			color: "#1DA1F2",
			lib: 'fab',
			icon: 'twitter',
			baseLink: "https://twitter.com/",
			prob: 0.5
		},
		{
			id: 'google',
			name: 'Google',
			color: "#DB4437",
			lib: 'fab',
			icon: 'google',
			baseLink: "https://google.com/",
			prob: 0.1
		},
		{
			id: 'github',
			name: 'GitHub',
			color: "#333",
			lib: 'fab',
			icon: 'github',
			baseLink: "https://github.com/",
			prob: 0.3
		},
		{
			id: 'instagram',
			name: 'Instagram',
			color: "#E1306C",
			lib: 'fab',
			icon: 'instagram-square',
			baseLink: "https://www.instagram.com/",
			prob: 0.4
		},
		{
			id: 'pinterest',
			name: 'Pinterest',
			color: "#E60023",
			lib: 'fab',
			icon: 'pinterest-square',
			baseLink: "https://www.pinterest.com/",
			prob: 0.2
		}
	] as SocialIcon[],
};

export default SiteData;
