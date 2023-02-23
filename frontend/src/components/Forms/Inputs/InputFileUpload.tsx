import React from 'react'
import type { InputFileUploadProps, InputUploadType } from './components/input-components.types'

const InputFileUpload: React.FC<InputFileUploadProps> = (props) => {

	const inputProps: InputUploadType = {
		...props?.multiple ? { multiple: props?.multiple } : {},
		...props?.inputRef ? { ref: props?.inputRef } : {},
		accept: props?.mimeType || 'image/*',
		'aria-describedby': 'fileUpload',
		onChange: props.onFileUpload,
		value: props?.value || '',
		'aria-label': 'Upload',
		autoComplete: 'off',
		className: 'hide',
		tabIndex: -1,
		type: 'file',
	};

	return <input {...inputProps} />
}

export default InputFileUpload
