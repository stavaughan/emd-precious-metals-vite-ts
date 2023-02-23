import React from 'react'
import type { InputFileUploadProps, InputUploadType } from './components/input-components.types'

const InputFileUpload: React.FC<InputFileUploadProps> = (props) => {

	const inputProps = {
		...props?.multiple ? {
			multiple: props?.multiple
		} : {},
		className: 'hide',
		type: 'file',
		...props?.inputRef ? {
			ref: props?.inputRef
		} : {},
		autoComplete: 'off',
		'aria-describedby': 'fileUpload',
		'aria-label': 'Upload',
		tabIndex: -1,
		value: props?.value || '',
		onChange: props.onFileUpload,
		accept: props?.mimeType || 'image/*'
	} as InputUploadType

	return <input {...inputProps} />
}

export default InputFileUpload
