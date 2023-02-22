import { useCallback } from 'react';
import { centerCrop, makeAspectCrop } from 'react-image-crop';
import { toast } from 'react-toastify';
import type { Crop } from 'react-image-crop';
import type {
	CanvasPreview,
	SetImageSrc,
	ImageDimensions,
	PreviewRef,
	ImageRef,
	SetCrop,
} from '../image-transformation.types';

const useImageMethods = () => {

	const canvasPreview = useCallback(({
		image,
		canvas,
		crop,
		scale = 1,
		rotate = 0
	}: CanvasPreview) => {

		const TO_RADIANS = Math.PI / 180

		const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D

		if (!ctx) {
			toast.error('Canvas context is not available')
		}

		const scaleX = image.naturalWidth / image.width
		const scaleY = image.naturalHeight / image.height
		// devicePixelRatio slightly increases sharpness on retina devices
		// at the expense of slightly slower render times and needing to
		// size the image back down if you want to download/upload and be
		// true to the images natural size.
		const pixelRatio = window.devicePixelRatio || 1

		canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
		canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

		ctx.scale(pixelRatio, pixelRatio)
		ctx.imageSmoothingQuality = 'high'

		const cropX = crop.x * scaleX
		const cropY = crop.y * scaleY

		const rotateRads = rotate * TO_RADIANS
		const centerX = image.naturalWidth / 2
		const centerY = image.naturalHeight / 2

		ctx.save()

		// 5 - Move the crop origin to the canvas origin (0,0)
		ctx.translate(-cropX, -cropY)
		// 4 - Move the origin to the center of the original position
		ctx.translate(centerX, centerY)
		// 3 - Rotate around the origin
		ctx.rotate(rotateRads)
		// 2 - Scale the image
		ctx.scale(scale, scale)
		// 1 - Move the center of the image to the origin (0,0)
		ctx.translate(-centerX, -centerY)
		ctx.drawImage(
			image,
			0,
			0,
			image.naturalWidth,
			image.naturalHeight,
			0,
			0,
			image.naturalWidth,
			image.naturalHeight,
		)
		ctx.restore()
	}, []);

	const onSelectImage = useCallback(({
		setCrop,
		setImgSrc,
		file
	}: {
		setCrop: SetCrop;
		setImgSrc: SetImageSrc;
		file: File;
	}) => {
		setCrop(undefined)
		const reader = new FileReader()
		reader.addEventListener('load', () => setImgSrc(reader?.result?.toString() || ''))
		reader.readAsDataURL(file)
	}, []);

	const onLoadImage = useCallback(({
		currentTarget,
		imageRef,
		aspectRatio,
		setCrop
	}: {
		currentTarget: ImageDimensions;
		imageRef: ImageRef;
		aspectRatio: number;
		setCrop: SetCrop;
	}) => {
		imageRef.current = currentTarget as HTMLImageElement
		const { width, height } = currentTarget
		const crop = centerCrop(
			makeAspectCrop({ unit: '%', width: 70 }, aspectRatio, width, height),
			width,
			height
		)
		setCrop(crop)
	}, []);

	const cropDebounceParams = useCallback(({
		completedCrop,
		previewRef,
		imageRef,
		scale,
		rotate
	}: {
		completedCrop: Crop | undefined;
		previewRef: PreviewRef;
		imageRef: ImageRef;
		scale: number;
		rotate: number;
	}) => ({
		fn: async () => {
			if (completedCrop?.width && completedCrop?.height && imageRef.current && previewRef.current) {
				canvasPreview({
					image: imageRef?.current,
					canvas: previewRef.current,
					crop: completedCrop,
					scale,
					rotate
				})
			}
		},
		waitTime: 100,
		deps: [completedCrop, scale, rotate]
	}), [canvasPreview]);

	const createFileName = useCallback((
		previewUrl: string,
		extension: string
	) => {
		const previewSections = previewUrl.split('/')
		const fileName = previewSections[previewSections.length - 1]
		return `${fileName}.${extension}`
	}, []);

	const generateDownload = useCallback(({
		canvas,
		crop,
		setIsDownloaded,
		format = 'image/jpeg',
		ext = 'jpg'
	}: {
		canvas: HTMLCanvasElement | null;
		crop: Crop | undefined;
		setIsDownloaded: (isDownloaded: boolean) => void;
		format?: string;
		ext?: string;
	}) => {
		if (!crop || !canvas) {
			return
		}

		const imageToBlob = (blob: Blob): void => {

			// Create preview Url
			const url = URL.createObjectURL(blob);

			// create a <a> element
			const a = document.createElement('a');

			// create a file name
			const fileName = createFileName(url, ext);

			// set <a> element download attribute
			a.download = fileName;

			// set preview to anchor tag;
			a.href = url;

			// trigger synthetic click on the element
			a.click();

			if(url) {
				setIsDownloaded(true)
			}

			// Say 'No' to memory leaks
			URL.revokeObjectURL(url);
		}

		return crop && !!canvas
			? canvas.toBlob(
				imageToBlob as BlobCallback,
				format,
				.95
			)
			: null;
	}, [createFileName]);

	return {
		cropDebounceParams,
		generateDownload,
		onLoadImage,
		onSelectImage
	}
}

export default useImageMethods;
