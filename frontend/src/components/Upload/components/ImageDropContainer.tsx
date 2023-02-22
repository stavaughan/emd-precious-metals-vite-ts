import React from 'react';
import clsx from 'clsx';
import { InputFileUpload } from '@/components/Forms/Inputs';
import { DropLabel } from '.';

import type { HiddenFileRefType, OnFileUploadType } from '@/components/Forms/Inputs/components/input-components.types';

import Classes from '../styles/Upload.module.css';

export type ImageDropContainerProps = {
	handleClick?: () => void;
	onDropHandler?: () => void;
	onFileUpload?: OnFileUploadType;
	inputValue?: string;
	noLabel?: boolean;
	inputRef: HiddenFileRefType;
	multiple?: boolean;
	mimeType?: string;
	maxSize?: string;
	style?: React.CSSProperties;
	type?: string;
};

const ImageDropContainer: React.FC<ImageDropContainerProps> = ({
	handleClick,
	onDropHandler,
	onFileUpload,
	inputValue,
	noLabel,
	inputRef,
	multiple,
	mimeType,
	maxSize,
	style,
	type
}) => {
	return (
		<div
			tabIndex={0}
			className={clsx(
				Classes.dropzone,
				'rounded-2 position-relative',
				!noLabel && 'mb-4'
			)}
			{...style && { style }}
			{...handleClick && { onClick: handleClick }}
			{...onDropHandler && { onDrop: onDropHandler }}
		>
			<DropLabel
				noLabel={noLabel}
				type={type}
				maxSize={maxSize}
			/>
			<InputFileUpload
				inputRef={inputRef}
				onFileUpload={onFileUpload}
				value={inputValue || ''}
				mimeType={mimeType}
				multiple={multiple || false}
			/>
		</div>
	)
}

export default ImageDropContainer
