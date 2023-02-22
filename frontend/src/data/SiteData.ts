type Disclosure = {
	_id: string;
	title: string;
	content?: string;
	list?: string[];
}

type Business = {
	name: string;
	streetAddress: string;
	city: string;
	state: string;
	zipCode: string;
	phone: string;
	email: string;
}

type Disclosures = {
	termsOfUse: (siteName: string, businessName: string) => Disclosure[];
	privacyPolicy: (siteName: string, business: Business) => Disclosure[];
}

type ModalIDs = {
	displayFile: string;
	displayImage: string;
	spreadInfo: string;
	metalssettings: string;
	imageUploadCrop: string;
}

interface SiteDataTypes {
	disclosures: Disclosures;
	modalIDs: ModalIDs;
	editMessages: object;
	icons: object;
	socialMedia: object[];
}

const SiteData: SiteDataTypes = {
	disclosures: {
		termsOfUse: (siteName, businessName) => ([
			{
				_id: '1',
				title: '1. Acceptance of Terms',
				content: `By using ${siteName}, creating, or accessing your ${siteName} account, including by signing in with a third-party service or partner (such as Google, Yahoo, ADP or RBC), or by otherwise using the Services we offer, you are agreeing to be bound by the Agreement without any modification or qualification. IF YOU ARE DISSATISFIED WITH THE AGREEMENT, OUR RULES, POLICIES, GUIDELINES OR PRACTICES, OR OUR OPERATION OF THE ${siteName.toUpperCase()} WEBSITE OR THE SERVICES, YOUR SOLE AND EXCLUSIVE REMEDY IS TO DISCONTINUE USING THE ${siteName.toUpperCase()} WEBSITE AND/OR OUR SERVICES, UNLESS ANOTHER REMEDY IS EXPRESSLY SET OUT IN THIS AGREEMENT. If for any reason you are unable to meet all the conditions set forth in this Agreement or if you breach this Agreement, your permission to access or use our Services, any materials downloaded or printed by you, and ${siteName.toUpperCase()} immediately lapses.`,
			},
			{
				_id: '2',
				title: '2. Additional Services',
				content: `We offer a number of additional services (collectively, the “Additional Services” each with their own additional terms of service (“Specific Additional Service Terms”) in addition to this Agreement. When you use an Additional Service, you will also be subject to the Specific Additional Service Terms. Note that if this Agreement is inconsistent with the Specific Additional Service Terms, those Specific Additional Service Terms will control.`,
			},
			{
				_id: '3',
				title: '3. Entire Agreement',
				content: `This Agreement, including any applicable Specific Additional Service Terms, is the entire agreement between you and us, and supersede all previous communications, representations, or agreements, either oral or written between you and us with respect to this subject matter.`,
			},
			{
				_id: '4',
				title: '4. Modification of Agreement',
				content: `We reserve the right to modify or change the Agreement at any time by posting a new or revised Agreement to the Site. Your use of ${siteName} or the creation or access to your ${siteName} account is subject to the most current Agreement posted on the Site. The most current version of the Agreement can be reviewed by clicking the “Terms of Use” hyperlink at the bottom of our Site. You may not modify or amend this Agreement in whole or in part without the written consent of one of our authorized representatives`,
			},
			{
				_id: '5',
				title: '5. Privacy Policy',
				content: `This privacy policy sets out how ${businessName} uses and protects any information that you give ${businessName} when you use this website. ${businessName} is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using this website, then you can be assured that it will only be used in accordance with this privacy statement. ${businessName} may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from 1/1/2023. We may collect the following information: name and job title contact information including email address demographic information such as postcode, preferences and interests other information relevant to customer surveys and/or offers What we do with the information we gather We require this information to understand your needs and provide you with a better service, and in particular for the following reasons: Internal record keeping. We may use the information to improve our products and services. We may periodically send promotional emails about new products, special offers or other information which we think you may find interesting using the email address which you have provided. From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone, fax or mail. We may use the information to customize the website`,
			},
			{
				_id: '6',
				title: '6. Intellectual Property',
				content: `The Site and all of its content, including, but not limited to, text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, and the compilation thereof (collectively, the “Content”), are the property of ${businessName} or its content suppliers and protected by United States and international copyright laws. The trademarks, logos, and service marks (collectively the “Trademarks”) displayed on the Site are registered and unregistered trademarks of ${businessName} and others. Nothing contained on the Site should be construed as granting, by implication, estoppel, or otherwise, any license or right to use any Trademark displayed on the Site without the written permission of ${businessName} or such third party that may own the Trademarks displayed on the Site. Your use of the Trademarks displayed on the Site, or any other content on the Site, except as provided in this Agreement, is strictly prohibited. You are also advised that ${businessName} will aggressively enforce its intellectual property rights to the fullest extent of the law, including the seeking of criminal prosecution.`,
			},
			{
				_id: '7',
				title: '7. User Content',
				content: `You are solely responsible for any and all of your User Content. You represent and warrant that you own or otherwise control all of the rights to the User Content that you post; that the User Content is accurate; that use of the User Content you supply does not violate this Agreement and will not cause injury to any person or entity; and that you will indemnify ${businessName} for all claims resulting from User Content you supply. ${businessName} has the right but not the obligation to monitor and edit or remove any activity or content. ${businessName} takes no responsibility and assumes no liability for any User Content posted by you or any third party.`,
			},
			{
				_id: '8',
				title: '8. User Conduct',
				content: `You agree not to use the Site to: upload, post, email, transmit, or otherwise make available any User Content that is unlawful, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, invasive of another’s privacy, hateful, or racially, ethnically, or otherwise objectionable; harm minors in any way; impersonate any person or entity, including, but not limited to, a ${businessName} official, forum leader, guide or host, or falsely state or otherwise misrepresent your affiliation with a person or entity; forge headers or otherwise manipulate identifiers in order to disguise the origin of any User Content transmitted through the Site; upload, post, email, transmit, or otherwise make available any User Content that you do not have a right to make available under any law or under contractual or fiduciary relationships; upload, post, email, transmit, or otherwise make available any User Content that infringes any patent, trademark, trade secret, copyright or other proprietary rights (“Rights”) of any party; upload, post, email, transmit, or otherwise make available any unsolicited or unauthorized advertising, promotional materials, “junk mail,” “spam,” “chain letters,” “pyramid schemes,” or any other form of solicitation, except in those areas that may be designated for such purpose; upload, post, email, transmit, or otherwise make available any material that contains software viruses or any other computer code, files, or programs designed to interrupt, destroy, or limit the functionality of any computer software or hardware or telecommunications equipment; disrupt the normal flow of dialogue, cause a screen to “scroll” faster than other users of the Site are able to type, or otherwise act in a manner that negatively affects other users’ ability to engage in real time exchanges; interfere with or disrupt the Site or servers or networks connected to the Site, or disobey any requirements, procedures, policies or regulations of networks connected to the Site; intentionally or unintentionally violate any applicable local, state, national, or international law, including, but not limited to, regulations promulgated by the U.S. Securities and Exchange Commission, any rules of any national or other securities exchange, including, without limitation, the New York Stock Exchange, the American Stock Exchange or the NASDAQ, and any regulations having the force of law; “stalk” or otherwise harass another; collect or store personal data about other users; or falsify your age or date of birth.`,
			}
		]),
		privacyPolicy: (siteName, business) => ([
			{
				_id: '1',
				title: '1. Introduction',
				content: `This Privacy Policy governs the manner in which ${business.name.toUpperCase()} collects, uses, maintains and discloses information collected from users (each, a “User”) of the ${siteName.toUpperCase()} website (“Site”). This privacy policy applies to the Site and all products and services offered by ${business.name.toUpperCase()}.`,
			},
			{
				_id: '2',
				title: '2. Personal identification information',
				content: `We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter, respond to a survey, fill out a form, and in connection with other activities, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number. Users may, however, visit our Site anonymously. We will collect personal identification information from Users only if they voluntarily submit such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.`,
			},
			{
				_id: '3',
				title: '3. Non-personal identification information',
				content: `We may collect non-personal identification information about Users whenever they interact with our Site. Non-personal identification information may include the browser name, the type of computer and technical information about Users means of connection to our Site, such as the operating system and the Internet service providers utilized and other similar information.`,
			},
			{
				_id: '4',
				title: '4. Web browser cookies',
				content: `Our Site may use “cookies” to enhance User experience. User’s web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them. User may choose to set their web browser to refuse cookies, or to alert you when cookies are being sent. If they do so, note that some parts of the Site may not function properly.`,
			},
			{
				_id: '5',
				title: '5. How we use collected information',
				content: `${business.name} may collect and use Users personal information for the following purposes:`,
				list: [
					`- To improve customer service`,
					`- Information you provide helps us respond to your customer service requests and support needs more efficiently.`,
					`- To personalize user experience`,
					`- We may use information in the aggregate to understand how our Users as a group use the services and resources provided on our Site.`,
					`- To improve our Site`,
					`- We may use feedback you provide to improve our products and services.`,
					`- To process payments`,
					`- We may use the information Users provide about themselves when placing an order only to provide service to that order. We do not share this information with outside parties except to the extent necessary to provide the service.`,
					`- To run a promotion, contest, survey or other Site feature`,
					`- To send Users information they agreed to receive about topics we think will be of interest to them.`,
					`- To send periodic emails`,
					`- We may use the email address to send User information and updates pertaining to their order. It may also be used to respond to their inquiries, questions, and/or other requests. If User decides to opt-in to our mailing list, they will receive emails that may include company news, updates, related product or service information, etc. If at any time the User would like to unsubscribe from receiving future emails, we include detailed unsubscribe instructions at the bottom of each email.`,
				],
			},
			{
				_id: '6',
				title: '6. How we protect your information',
				content: `We adopt appropriate data collection, storage and processing practices and security measures to protect against unauthorized access, alteration, disclosure or destruction of your personal information, username, password, transaction information and data stored on our Site.`,
			},
			{
				_id: '7',
				title: '7. Sharing your personal information',
				content: `We do not sell, trade, or rent Users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates and advertisers for the purposes outlined above. We may use third party service providers to help us operate our business and the Site or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.`,
			},
			{
				_id: '8',
				title: '8. Third party websites',
				content: `Users may find advertising or other content on our Site that link to the sites and services of our partners, suppliers, advertisers, sponsors, licensors and other third parties. We do not control the content or links that appear on these sites and are not responsible for the practices employed by websites linked to or from our Site. In addition, these sites or services, including their content and links, may be constantly changing. These sites and services may have their own privacy policies and customer service policies. Browsing and interaction on any other website, including websites which have a link to our Site, is subject to that website’s own terms and policies.`,
			},
			{
				_id: '9',
				title: '9. Advertising',
				content: `Ads appearing on our site may be delivered to Users by advertising partners, who may set cookies. These cookies allow the ad server to recognize your computer each time they send you an online advertisement to compile non personal identification information about you or others who use your computer. This information allows ad networks to, among other things, deliver targeted advertisements that they believe will be of most interest to you. This privacy policy does not cover the use of cookies by any advertisers.`,
			},
			{
				_id: '10',
				title: '10. Google Adsense',
				content: `Some of the ads may be served by Google. Google’s use of the DART cookie enables it to serve ads to Users based on their visit to our Site and other sites on the Internet. DART uses “non personally identifiable information” and does NOT track personal information about you, such as your name, email address, physical address, etc. You may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at https://www.google.com/privacy_ads.html`,
			},
			{
				_id: '11',
				title: '11. Changes to this privacy policy',
				content: `${business.name} has the discretion to update this privacy policy at any time. When we do, we will post a notification on the main page of our Site. We encourage Users to frequently check this page for any changes to stay informed about how we are helping to protect the personal information we collect. You acknowledge and agree that it is your responsibility to review this privacy policy periodically and become aware of modifications.`,
			},
			{
				_id: '12',
				title: '12. Your acceptance of these terms',
				content: `By using this Site, you signify your acceptance of this policy and [terms of service]. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.`,
			},
			{
				_id: '13',
				title: '13. Contacting us',
				content: `If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us at:`,
				list: [
					`${business.name}`,
					`${business.streetAddress}`,
					`${business.city}, ${business.state} ${business.zipCode}`,
					`${business.phone}`,
					`${business.email}`,
				],
			},
			{
				_id: '14',
				title: '14. This document was last updated on February 1, 2023'
			},
		]),
	},
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
		],
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
		]
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
	]
};

export default SiteData;
