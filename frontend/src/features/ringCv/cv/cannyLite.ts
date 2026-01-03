import type { GrayImage } from "./imageUtils";

const K = [0.0625, 0.25, 0.375, 0.25, 0.0625]; // sums to 1

function convolve1DHorizontal(src: GrayImage): GrayImage {
	const { w, h, data } = src;
	const out = new Float32Array(w * h);
	for (let y = 0; y < h; y++) {
		const row = y * w;
		for (let x = 0; x < w; x++) {
			let v = 0;
			for (let k = -2; k <= 2; k++) {
				const xx = Math.min(w - 1, Math.max(0, x + k));
				v += data[row + xx] * K[k + 2];
			}
			out[row + x] = v;
		}
	}
	return { w, h, data: out };
}

function convolve1DVertical(src: GrayImage): GrayImage {
	const { w, h, data } = src;
	const out = new Float32Array(w * h);
	for (let y = 0; y < h; y++) {
		for (let x = 0; x < w; x++) {
			let v = 0;
			for (let k = -2; k <= 2; k++) {
				const yy = Math.min(h - 1, Math.max(0, y + k));
				v += data[yy * w + x] * K[k + 2];
			}
			out[y * w + x] = v;
		}
	}
	return { w, h, data: out };
}

export function gaussianBlur(gray: GrayImage): GrayImage {
	return convolve1DVertical(convolve1DHorizontal(gray));
}

export function sobelGradients(gray: GrayImage): {
	mag: Float32Array;
	dir: Float32Array;
} {
	const { w, h, data } = gray;
	const mag = new Float32Array(w * h);
	const dir = new Float32Array(w * h);

	for (let y = 1; y < h - 1; y++) {
		for (let x = 1; x < w - 1; x++) {
			const idx = y * w + x;

			const a = data[(y - 1) * w + (x - 1)];
			const b = data[(y - 1) * w + x];
			const c = data[(y - 1) * w + (x + 1)];
			const d = data[y * w + (x - 1)];
			const f = data[y * w + (x + 1)];
			const g = data[(y + 1) * w + (x - 1)];
			const h1 = data[(y + 1) * w + x];
			const i1 = data[(y + 1) * w + (x + 1)];

			const gx = -a + c - 2 * d + 2 * f - g + i1;
			const gy = -a - 2 * b - c + g + 2 * h1 + i1;

			mag[idx] = Math.hypot(gx, gy);
			dir[idx] = Math.atan2(gy, gx);
		}
	}
	return { mag, dir };
}

export function nonMaxSuppression(
	w: number,
	h: number,
	mag: Float32Array,
	dir: Float32Array
): Float32Array {
	const out = new Float32Array(w * h);

	const sector = (a: number) => {
		let deg = (a * 180) / Math.PI;
		if (deg < 0) deg += 180;
		if (deg < 22.5 || deg >= 157.5) return 0;
		if (deg < 67.5) return 45;
		if (deg < 112.5) return 90;
		return 135;
	};

	for (let y = 1; y < h - 1; y++) {
		for (let x = 1; x < w - 1; x++) {
			const idx = y * w + x;
			const m = mag[idx];
			const s = sector(dir[idx]);

			let m1 = 0,
				m2 = 0;
			if (s === 0) {
				m1 = mag[idx - 1];
				m2 = mag[idx + 1];
			} else if (s === 45) {
				m1 = mag[(y - 1) * w + (x + 1)];
				m2 = mag[(y + 1) * w + (x - 1)];
			} else if (s === 90) {
				m1 = mag[(y - 1) * w + x];
				m2 = mag[(y + 1) * w + x];
			} else {
				m1 = mag[(y - 1) * w + (x - 1)];
				m2 = mag[(y + 1) * w + (x + 1)];
			}

			out[idx] = m >= m1 && m >= m2 ? m : 0;
		}
	}
	return out;
}

export function hysteresisThreshold(
	w: number,
	h: number,
	nms: Float32Array,
	low: number,
	high: number
): Uint8Array {
	const out = new Uint8Array(w * h);
	const strong: number[] = [];

	for (let i = 0; i < nms.length; i++) {
		const v = nms[i];
		if (v >= high) {
			out[i] = 255;
			strong.push(i);
		} else if (v >= low) out[i] = 128;
	}

	const nb = [-w - 1, -w, -w + 1, -1, 1, w - 1, w, w + 1];

	while (strong.length) {
		const idx = strong.pop()!;
		for (const d of nb) {
			const j = idx + d;
			if (j < 0 || j >= out.length) continue;
			if (out[j] === 128) {
				out[j] = 255;
				strong.push(j);
			}
		}
	}

	for (let i = 0; i < out.length; i++) out[i] = out[i] === 255 ? 255 : 0;
	return out;
}

export function cannyLite(gray: GrayImage): Uint8Array {
	const blurred = gaussianBlur(gray);
	const { mag, dir } = sobelGradients(blurred);

	const sample: number[] = [];
	for (let i = 0; i < mag.length; i += 97) sample.push(mag[i]);
	sample.sort((a, b) => a - b);
	const p90 = sample[Math.floor(sample.length * 0.9)] ?? 0;

	const high = Math.max(30, p90);
	const low = high * 0.4;

	const nms = nonMaxSuppression(gray.w, gray.h, mag, dir);
	return hysteresisThreshold(gray.w, gray.h, nms, low, high);
}
