import { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { useDebounceEffect } from '@/hooks';
import { useImageMethods, aspectRatios } from ".";
import type { Crop } from 'react-image-crop';
import type {
	UseImageCrop,
	ImageState,
	SetImageState,
	ImageFormat,
	AspectRatio,
	UseImageCropResults
} from '../image-transformation.types';

const useImageCrop = ({
	setImageUpload,
	setImgSrc,
	setCrop
}: UseImageCrop): UseImageCropResults => {

	const { cropDebounceParams, generateDownload } = useImageMethods();

	const previewRef = useRef(null)
	const imageRef = useRef(null)

	const [image, setImage] = useState<ImageState>({
		scale: 1,
		rotate: 0,
		ratioID: 'ratio_1_1',
		aspectRatio: 1 / 1,
		completedCrop: null,
		isDownloaded: false,
		imageFormat: 'image/jpeg'
	})

	const imageFormats = useMemo(() => [
		{ _id: 'image/jpeg', label: 'JPEG', ext: 'jpg' },
		{ _id: 'image/png', label: 'PNG', ext: 'png' },
		{ _id: 'image/webp', label: 'WEBP', ext: 'webp' },
	] as ImageFormat[], [])

	const BASE = 40;

	const resetStates = useCallback(() => {
		!!setImageUpload && setImageUpload(false)
		setImgSrc('')
		previewRef.current = null
		imageRef.current = null
		setCrop(null as unknown as Crop)
		setImage({
			scale: 1,
			rotate: 0,
			ratioID: 'ratio_1_1',
			aspectRatio: 1 / 1,
			completedCrop: null,
			isDownloaded: false,
			imageFormat: 'image/jpeg'
		})
	}, [setCrop, setImgSrc, setImageUpload])

	useEffect(() => {
		let mounted = true;
		if (mounted) {
			const ratioData = aspectRatios(BASE).find(_ => _._id === image.ratioID) as AspectRatio
			setImage(prev => ({
				...prev,
				aspectRatio: ratioData?.value
			}))
		}
		return () => mounted = false as never;
	}, [aspectRatios, image.ratioID]);

	useEffect(() => {
		if (image.isDownloaded) {
			const timer = setTimeout(() => {
				resetStates();
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, [image.isDownloaded, resetStates])

	const onImageDownload = useCallback(() => {
		generateDownload({
			canvas: previewRef.current,
			crop: image?.completedCrop as Crop,
			setIsDownloaded: (bool: boolean) => setImage(prev => ({ ...prev, isDownloaded: bool })),
			format: image.imageFormat,
			ext: imageFormats.find(_ => _._id === image.imageFormat)?.ext || 'jpeg'
		})
	}, [generateDownload, image.imageFormat, imageFormats, image.completedCrop])

	const debounceParams = useMemo(() => cropDebounceParams({
		completedCrop: image?.completedCrop as Crop,
		previewRef,
		imageRef,
		scale: image.scale,
		rotate: image.rotate,
	}), [image.completedCrop, image.rotate, image.scale, cropDebounceParams])

	useDebounceEffect(debounceParams);

	const setCompletedCrop = useCallback((crop: Crop): void => {
		setImage(prev => ({ ...prev, completedCrop: crop })) as unknown as SetImageState
	}, []);

	const setRatioID = useCallback((id: string): void => {
		setImage(prev => ({ ...prev, ratioID: id })) as unknown as SetImageState
	}, []);

	const setScale = useCallback((scale: number): void => {
		setImage(prev => ({ ...prev, scale })) as unknown as SetImageState
	}, []);

	const setRotate = useCallback((rotate: number): void => {
		setImage(prev => ({ ...prev, rotate })) as unknown as SetImageState
	}, []);

	const setImageFormat = useCallback((format: string): void => {
		setImage(prev => ({ ...prev, imageFormat: format })) as unknown as SetImageState
	}, []);

	return {
		image,
		imageProps: {
			imageRef,
			setCompletedCrop
		},
		controlsProps: {
			aspectRatios,
			previewRef,
			setRatioID,
			setScale,
			setRotate,
			onImageDownload,
			resetStates,
			imageFormats,
			setImageFormat,
			BASE
		} as UseImageCropResults['controlsProps']
	};
};

export default useImageCrop;
