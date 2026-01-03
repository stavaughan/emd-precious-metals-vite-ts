export const US_QUARTER_DIAMETER_MM = 24.26;

export type GrayImage = { w: number; h: number; data: Float32Array };

export async function fileToDataUrl(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const r = new FileReader();
		r.onerror = () => reject(new Error("Failed to read file."));
		r.onload = () => resolve(String(r.result));
		r.readAsDataURL(file);
	});
}

export async function fileToCanvas(
	file: File,
	maxSide = 900
): Promise<HTMLCanvasElement> {
	const url = await fileToDataUrl(file);

	const img = new Image();
	img.crossOrigin = "anonymous";
	await new Promise<void>((resolve, reject) => {
		img.onload = () => resolve();
		img.onerror = () => reject(new Error("Failed to decode image."));
		img.src = url;
	});

	const c = document.createElement("canvas");
	c.width = img.naturalWidth || img.width;
	c.height = img.naturalHeight || img.height;
	c.getContext("2d")!.drawImage(img, 0, 0);

	const scale = Math.min(1, maxSide / Math.max(c.width, c.height));
	if (scale === 1) return c;

	const d = document.createElement("canvas");
	d.width = Math.round(c.width * scale);
	d.height = Math.round(c.height * scale);
	d.getContext("2d")!.drawImage(c, 0, 0, d.width, d.height);
	return d;
}

export function imageDataToGray(img: ImageData): GrayImage {
	const { width: w, height: h, data } = img;
	const out = new Float32Array(w * h);
	for (let i = 0, p = 0; i < out.length; i++, p += 4) {
		out[i] = 0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2];
	}
	return { w, h, data: out };
}
