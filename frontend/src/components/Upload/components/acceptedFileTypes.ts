const ERROR_FILE = `Not accepted file format. Accepted formats include 'pdf', 'doc', 'docx', 'csv' and 'zip'.`;
const ERROR_IMAGE = `Not accepted image format. Accepted formats include 'avif', 'jpeg', 'jpg', 'png' and 'webp'.`;

const acceptedFileTypes = [
	{
		_id: 'pdf',
		types: ['application/pdf'],
		lib: 'fas',
		icon: 'file-pdf',
		exts: ['.pdf'],
		regex: /application\/pdf/i,
		onError: ERROR_FILE
	},
	{
		_id: 'zip',
		types: ['application/zip'],
		lib: 'fas',
		icon: 'file-zipper',
		exts: ['.zip'],
		regex: /application\/zip/i,
		onError: ERROR_FILE
	},
	{
		_id: 'csv',
		types: ['text/csv'],
		lib: 'fas',
		icon: 'file-csv',
		exts: ['.csv'],
		regex: /text\/csv/i,
		onError: ERROR_FILE
	},
	{
		_id: 'doc',
		types: ['application/msword', 'application/vnd.openxmlformats'],
		lib: 'fas',
		icon: 'file-word',
		exts: ['.doc', '.docx'],
		regex: /application\/(msword|vnd.openxmlformats)/i,
		onError: ERROR_FILE
	},
	{
		_id: 'image',
		types: ['image/png', 'image/jpeg', 'image/jpg', 'image/*', 'image/webp', 'image/avif'],
		lib: 'far',
		icon: 'file-image',
		exts: ['.png', '.jpeg', '.jpg', '.webp', '.avif'],
		regex: /image\/(png|jpeg|jpg|webp|avif)/i,
		onError: ERROR_IMAGE
	}
]

export default acceptedFileTypes
