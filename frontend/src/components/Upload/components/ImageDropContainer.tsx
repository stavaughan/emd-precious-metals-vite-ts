import React from 'react';
import clsx from 'clsx';
import { InputFileUpload } from '@/components/Forms/Inputs';
import { DropLabel } from '.';

import type { ImageDropContainerProps } from '@/components/Forms/Inputs/components/input-components.types';

import Classes from '../styles/Upload.module.css';

const ImageDropContainer: React.FC<ImageDropContainerProps> = (props) => {

	return (
		<div
			tabIndex={0}
			className={clsx(
				Classes.dropzone,
				'rounded-2 position-relative',
				!props?.noLabel && 'mb-4'
			)}
			{...props?.style && { style: props?.style }}
			{...props?.handleClick && { onClick: props?.handleClick }}
			{...props?.onDropHandler && { onDrop: props?.onDropHandler }}
		>
			<DropLabel
				noLabel={props?.noLabel}
				type={props?.type}
				maxSize={props?.maxSize}
			/>
			<InputFileUpload
				inputRef={props?.inputRef}
				onFileUpload={props?.onFileUpload}
				value={props?.inputValue || ''}
				mimeType={props?.mimeType}
				multiple={props?.multiple || false}
			/>
		</div>
	)
}

export default ImageDropContainer
