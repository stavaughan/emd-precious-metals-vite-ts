import React from 'react'
import type { InputFileUploadProps } from './components/input-components.types'

const InputFileUpload: React.FC<InputFileUploadProps> = ({
	inputRef,
	onFileUpload,
	mimeType,
	multiple,
	value
}) => {

	return (
		<>
			<input
				{...multiple ? { multiple } : {}}
				className="hide"
				type="file"
				{...inputRef ? { ref: inputRef } : {}}
				autoComplete="off"
				aria-describedby="fileUpload"
				aria-label="Upload"
				tabIndex={-1}
				value={value || ''}
				onChange={onFileUpload}
				accept={mimeType || 'image/*'}
			/>
		</>
	)
}

export default InputFileUpload
