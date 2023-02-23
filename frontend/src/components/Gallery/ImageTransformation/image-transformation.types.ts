import React from 'react';
import type { Crop, PercentCrop, ReactCropProps } from 'react-image-crop';

export type SetImageSrc = React.Dispatch<React.SetStateAction<string>>;
export type SetCrop = React.Dispatch<React.SetStateAction<Crop | undefined>>;
export type SetPercentCrop = React.Dispatch<React.SetStateAction<PercentCrop>>;
export type SetCompletedCrop = ReactCropProps["onComplete"];
export type SetUploadedImage = React.Dispatch<React.SetStateAction<File>>;
export type ImageRef = React.MutableRefObject<null | HTMLImageElement>;
export type PreviewRef = React.MutableRefObject<null | HTMLCanvasElement>;
export type CompletedCrop = Crop | null;
export type SetImageFormat = React.Dispatch<React.SetStateAction<string>>;
export type SetImageState = React.Dispatch<React.SetStateAction<ImageState>>;
export type SetScale = (scale: number) => void;
export type SetRatioID = (id: string) => void;
export type SetImageUpload = (value: boolean) => void;

export interface CanvasCrop {
	canvas: HTMLCanvasElement;
	crop: Crop;
}

export interface TransformParams {
	scale: number;
	rotate: number;
}

export interface CanvasPreview extends CanvasCrop, TransformParams {
	image: HTMLImageElement;
};

export interface ImageDimensions {
	width: number;
	height: number;
}

export interface UseImageCrop {
	setImageUpload: SetImageUpload;
	setImgSrc: SetImageSrc;
	setCrop: SetCrop;
}

export type ImageState = {
	ratioID: string;
	aspectRatio: number;
	completedCrop: CompletedCrop;
	isDownloaded: boolean;
	imageFormat: string;
} & TransformParams;

export interface ControlsProps {
	aspectRatios: (base: number) => AspectRatio[],
	previewRef: PreviewRef;
	ratioID: string;
	setRatioID: SetRatioID;
	completedCrop: CompletedCrop;
	setScale: SetScale;
	setRotate: (rotate: number) => void;
	onImageDownload: () => void;
	resetStates: () => void;
	imageFormat: string;
	imageFormats: ImageFormat[];
	setImageFormat: SetImageFormat;
	BASE: number;
}

export interface ImageInputsProps {
	scale: number;
	setScale: SetScale;
	ratioID: string;
	setRatioID: SetRatioID;
	imageFormat?: string;
	imageFormats: ImageFormat[];
	setImageFormat: SetImageFormat;
	base: number;
}

export type ImageProps = {
	imageRef: ImageRef;
	setCompletedCrop: SetCompletedCrop;
}

export type UseImageCropResults = {
	image: ImageState;
	imageProps: ImageProps;
	controlsProps: ControlsProps;
}

export interface HiddenFileInputType {
	click: () => void;
	drop: () => void;
}

export type HiddenFileRefType = React.MutableRefObject<null | HiddenFileInputType>;

export type ImageFormat = {
	_id: string;
	label: string;
	ext: string;
}

export interface DropzoneWrapperProps {
	handleClick?: () => void;
	onDropHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
	imageSelected?: boolean;
	onFileUpload?: React.ChangeEventHandler<HTMLInputElement>;
	inputValue?: string;
	noLabel?: boolean;
	inputRef?: React.RefObject<HTMLInputElement>;
	multiple?: boolean;
	mimeType?: string;
	maxSize?: string;
	children?: React.ReactNode;
	style: React.CSSProperties;
	type?: string;
}

export interface CanvasProps extends CanvasCrop, TransformParams {
	image: HTMLImageElement;
}

export interface LoadImageParams {
	currentTarget: ImageDimensions;
	imageRef: ImageRef;
	aspectRatio?: number;
	setCrop?: SetCrop;
}

export interface CropDebounceParams extends TransformParams {
	completedCrop: Crop;
	previewRef: PreviewRef;
	imageRef: ImageRef;
}

export interface GenerateDownloadParams extends CanvasCrop {
	setIsDownloaded: () => void;
	imageFormat: string;
}

interface RatioIDType {
	ratioID: string;
	setRatioID: SetRatioID;
}

export interface SelectAspectRatioProps extends RatioIDType {
	base: number;
}

export interface AspectRatio extends ImageDimensions {
	_id: string;
	label: string;
	value: number;
}

export interface AspectRatioProps extends RatioIDType, ImageDimensions {
	ratio: AspectRatio;
};

export interface DownloadProps extends CanvasCrop {
	setIsDownloaded: () => void;
	format: string;
	ext: string;
}

export interface PreviewParams extends TransformParams {
	image: HTMLImageElement;
	ctx: CanvasRenderingContext2D;
	crop: Crop;
	pixelRatio: number;
	scaleX: number;
	scaleY: number;
}

export type LoadImage = {
	imageRef: ImageRef;
	currentTarget: ImageDimensions;
	aspectRatio: number;
	setCrop: SetCrop;
}

export type SelectImageParams = {
	setCrop: SetPercentCrop;
	setImgSrc: SetImageSrc;
	file: File;
}

export interface ImageCropProps {
	setImageUpload?: SetImageUpload;
	setImageID?: () => void;
	submitLabel?: string;
}

export interface ImageCropContainerProps extends ImageCropProps {
	setImgSrc: SetImageSrc;
	crop?: Crop;
	imgSrc: string;
	setCrop: SetCrop;
}

export interface ImageCropWrapperTypes extends ImageCropContainerProps {
	onLoadImage: (loadImage: LoadImage) => void;
}

export interface CropControlsTypes {
	image: ImageState;
	controlsProps: ControlsProps;
	previewRef: PreviewRef;
	setImageID?: () => void;
	submitLabel?: string;
}

export interface PreviewStyle extends ImageDimensions {
	border: string;
	objectFit: string;
}

export interface ImageCropComponentTypes {
	image: ImageState;
	imageProps: ImageProps;
	crop?: Crop;
	setCrop: SetCrop;
	imgSrc: string;
	onLoadImage?: (loadImage: LoadImage) => void;
};
