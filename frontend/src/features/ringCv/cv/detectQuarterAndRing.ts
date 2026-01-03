import {
	fileToCanvas,
	imageDataToGray,
	US_QUARTER_DIAMETER_MM,
} from "./imageUtils";
import { cannyLite } from "./cannyLite";
import type { Circle, Box } from "./geometry";
import { boxFromPoints } from "./geometry";

export type UploadedImage = {
	file: File;
	previewUrl: string;
	confirmedQuarter: boolean;
};

export type RingDimensionsMm = {
	outerDiameterMm?: number;
	innerDiameterMm?: number;
	bandWidthMm?: number; // B: band face width (shank only) from side view
	thicknessMm?: number; // approximate thickness from side view
	pixelsPerMmTop?: number;
	pixelsPerMmSide?: number;
	quarterDiameterPxTop?: number;
	quarterDiameterPxSide?: number;
};

export type CvDebug = {
	top?: {
		canvasW: number;
		canvasH: number;
		quarter?: Circle;
		ringCenter?: { cx: number; cy: number };
	};
	side?: {
		canvasW: number;
		canvasH: number;
		quarter?: Circle;
		ringBox?: Box;
		bandBox?: Box;
	};
};

type Component = {
	pixels: Array<[number, number]>;
	minX: number;
	minY: number;
	maxX: number;
	maxY: number;
	area: number;
	perimeter: number;
};

function neighbors8(w: number) {
	return [-w - 1, -w, -w + 1, -1, 1, w - 1, w, w + 1];
}

function findComponents(binary: Uint8Array, w: number, h: number): Component[] {
	const visited = new Uint8Array(w * h);
	const comps: Component[] = [];
	const nb = neighbors8(w);

	for (let i = 0; i < binary.length; i++) {
		if (!binary[i] || visited[i]) continue;

		const stack = [i];
		visited[i] = 1;

		const pixels: Array<[number, number]> = [];
		let minX = Infinity,
			minY = Infinity,
			maxX = -Infinity,
			maxY = -Infinity;
		let area = 0;
		let perimeter = 0;

		while (stack.length) {
			const idx = stack.pop()!;
			const y = Math.floor(idx / w);
			const x = idx - y * w;

			pixels.push([x, y]);
			area++;

			if (x < minX) minX = x;
			if (y < minY) minY = y;
			if (x > maxX) maxX = x;
			if (y > maxY) maxY = y;

			let edgeCount = 0;
			for (const d of nb) {
				const j = idx + d;
				if (j < 0 || j >= binary.length || !binary[j]) edgeCount++;
			}
			if (edgeCount > 0) perimeter++;

			for (const d of nb) {
				const j = idx + d;
				if (j < 0 || j >= binary.length) continue;
				if (!binary[j] || visited[j]) continue;
				visited[j] = 1;
				stack.push(j);
			}
		}

		comps.push({ pixels, minX, minY, maxX, maxY, area, perimeter });
	}

	return comps;
}

function circularity(comp: Component) {
	const p = Math.max(1, comp.perimeter);
	return (4 * Math.PI * comp.area) / (p * p);
}

function fitCircleFromBox(comp: Component): Circle {
	const cx = (comp.minX + comp.maxX) / 2;
	const cy = (comp.minY + comp.maxY) / 2;
	const r = Math.max(comp.maxX - comp.minX, comp.maxY - comp.minY) / 2;
	return { cx, cy, r };
}

function maskBox(binary: Uint8Array, w: number, h: number, box: Box, pad = 12) {
	const x0 = Math.max(0, Math.floor(box.x - pad));
	const y0 = Math.max(0, Math.floor(box.y - pad));
	const x1 = Math.min(w - 1, Math.ceil(box.x + box.w + pad));
	const y1 = Math.min(h - 1, Math.ceil(box.y + box.h + pad));
	for (let y = y0; y <= y1; y++) {
		for (let x = x0; x <= x1; x++) {
			binary[y * w + x] = 0;
		}
	}
}

function pickQuarterComponent(
	comps: Component[],
	w: number,
	h: number
): Component | null {
	const minSide = Math.min(w, h);

	const candidates = comps
		.map((c) => {
			const bw = c.maxX - c.minX;
			const bh = c.maxY - c.minY;
			const size = Math.max(bw, bh);
			const circ = circularity(c);
			const aspect =
				bw > 0 && bh > 0 ? Math.min(bw, bh) / Math.max(bw, bh) : 0;

			const score =
				circ * 2.2 +
				aspect * 1.2 +
				Math.min(1, size / (minSide * 0.25)) * 1.0;

			return { c, score, size, circ, aspect };
		})
		.filter(
			({ size, circ, aspect }) =>
				size > minSide * 0.05 &&
				size < minSide * 0.65 &&
				circ > 0.4 &&
				aspect > 0.7
		)
		.sort((a, b) => b.score - a.score);

	return candidates[0]?.c ?? null;
}

function estimateRingDiametersFromEdges(
	edgeBinary: Uint8Array,
	w: number,
	h: number,
	cx: number,
	cy: number,
	pxPerMm: number
) {
	const radii: number[] = [];
	for (let i = 0; i < edgeBinary.length; i++) {
		if (!edgeBinary[i]) continue;
		const y = Math.floor(i / w);
		const x = i - y * w;
		radii.push(Math.hypot(x - cx, y - cy));
	}
	if (radii.length < 200) return null;

	const maxR = Math.max(...radii);
	const bins = new Uint32Array(Math.ceil(maxR) + 1);
	for (const r of radii) bins[Math.min(bins.length - 1, Math.floor(r))]++;

	const smooth = new Float32Array(bins.length);
	for (let i = 1; i < bins.length - 1; i++)
		smooth[i] = (bins[i - 1] + bins[i] + bins[i + 1]) / 3;

	let outerIdx = 0;
	for (let i = 0; i < smooth.length; i++)
		if (smooth[i] > smooth[outerIdx]) outerIdx = i;

	const minInner = Math.max(3, Math.floor(outerIdx * 0.35));
	let innerIdx = minInner;
	for (let i = minInner; i < outerIdx - 6; i++)
		if (smooth[i] > smooth[innerIdx]) innerIdx = i;

	if (innerIdx <= 0 || outerIdx <= innerIdx + 2) return null;

	return {
		outerDiameterMm: (outerIdx * 2) / pxPerMm,
		innerDiameterMm: (innerIdx * 2) / pxPerMm,
	};
}

export async function estimateDimensionsQuarterCalibrated(args: {
	topView: UploadedImage;
	sideView: UploadedImage;
}): Promise<{ dims: RingDimensionsMm; debug: CvDebug; notes: string[] }> {
	const notes: string[] = [];
	const debug: CvDebug = {};
	const dims: RingDimensionsMm = {};

	// TOP
	const topCanvas = await fileToCanvas(args.topView.file, 900);
	debug.top = { canvasW: topCanvas.width, canvasH: topCanvas.height };

	const topCtx = topCanvas.getContext("2d")!;
	const topGray = imageDataToGray(
		topCtx.getImageData(0, 0, topCanvas.width, topCanvas.height)
	);
	const topEdges = cannyLite(topGray);

	const topComps = findComponents(topEdges, topGray.w, topGray.h);
	const qTopComp = pickQuarterComponent(topComps, topGray.w, topGray.h);

	if (qTopComp) {
		const qCircle = fitCircleFromBox(qTopComp);
		debug.top.quarter = qCircle;
		dims.quarterDiameterPxTop = qCircle.r * 2;
		dims.pixelsPerMmTop = (qCircle.r * 2) / US_QUARTER_DIAMETER_MM;
		notes.push(
			`Top: quarter found → ${dims.pixelsPerMmTop.toFixed(3)} px/mm.`
		);

		maskBox(
			topEdges,
			topGray.w,
			topGray.h,
			{
				x: qTopComp.minX,
				y: qTopComp.minY,
				w: qTopComp.maxX - qTopComp.minX,
				h: qTopComp.maxY - qTopComp.minY,
			},
			18
		);
	} else {
		dims.pixelsPerMmTop = 10;
		notes.push("Top: quarter NOT found; using fallback scale.");
	}

	const topAfter = findComponents(topEdges, topGray.w, topGray.h)
		.filter(
			(c) =>
				c.maxX - c.minX > topGray.w * 0.05 &&
				c.maxY - c.minY > topGray.h * 0.05
		)
		.sort((a, b) => b.area - a.area);

	if (topAfter[0]) {
		const c = topAfter[0];
		const rcx = (c.minX + c.maxX) / 2;
		const rcy = (c.minY + c.maxY) / 2;
		debug.top.ringCenter = { cx: rcx, cy: rcy };

		const pxPerMm = dims.pixelsPerMmTop || 10;
		const diam = estimateRingDiametersFromEdges(
			topEdges,
			topGray.w,
			topGray.h,
			rcx,
			rcy,
			pxPerMm
		);

		if (diam) {
			dims.outerDiameterMm = diam.outerDiameterMm;
			dims.innerDiameterMm = diam.innerDiameterMm;
			notes.push(
				`Top: ring diameters outer≈${dims.outerDiameterMm.toFixed(
					2
				)}mm inner≈${dims.innerDiameterMm.toFixed(2)}mm.`
			);
		} else {
			dims.outerDiameterMm = 22;
			dims.innerDiameterMm = 18;
			notes.push("Top: ring histogram failed; using fallback diameters.");
		}
	} else {
		dims.outerDiameterMm = 22;
		dims.innerDiameterMm = 18;
		notes.push("Top: ring not isolated; using fallback diameters.");
	}

	// SIDE
	const sideCanvas = await fileToCanvas(args.sideView.file, 900);
	debug.side = { canvasW: sideCanvas.width, canvasH: sideCanvas.height };

	const sideCtx = sideCanvas.getContext("2d")!;
	const sideGray = imageDataToGray(
		sideCtx.getImageData(0, 0, sideCanvas.width, sideCanvas.height)
	);
	const sideEdges = cannyLite(sideGray);

	const sideComps = findComponents(sideEdges, sideGray.w, sideGray.h);
	const qSideComp = pickQuarterComponent(sideComps, sideGray.w, sideGray.h);

	if (qSideComp) {
		const qCircle = fitCircleFromBox(qSideComp);
		debug.side.quarter = qCircle;
		dims.quarterDiameterPxSide = qCircle.r * 2;
		dims.pixelsPerMmSide = (qCircle.r * 2) / US_QUARTER_DIAMETER_MM;
		notes.push(
			`Side: quarter found → ${dims.pixelsPerMmSide.toFixed(3)} px/mm.`
		);

		maskBox(
			sideEdges,
			sideGray.w,
			sideGray.h,
			{
				x: qSideComp.minX,
				y: qSideComp.minY,
				w: qSideComp.maxX - qSideComp.minX,
				h: qSideComp.maxY - qSideComp.minY,
			},
			20
		);
	} else {
		dims.pixelsPerMmSide = 10;
		notes.push("Side: quarter NOT found; using fallback scale.");
	}

	const sideAfter = findComponents(sideEdges, sideGray.w, sideGray.h)
		.filter(
			(c) =>
				c.maxX - c.minX > sideGray.w * 0.04 &&
				c.maxY - c.minY > sideGray.h * 0.04
		)
		.sort((a, b) => b.area - a.area);

	const ringComp = sideAfter[0];
	if (!ringComp) {
		dims.thicknessMm = 1.8;
		dims.bandWidthMm = 6.0;
		notes.push("Side: ring not isolated; using fallback dims.");
		return { dims, debug, notes };
	}

	const pxPerMm = dims.pixelsPerMmSide || 10;
	const fullBox = boxFromPoints(ringComp.pixels);

	if (!fullBox) {
		dims.thicknessMm = 1.8;
		dims.bandWidthMm = 6.0;
		notes.push("Side: ring box failed; using fallback dims.");
		return { dims, debug, notes };
	}

	debug.side.ringBox = fullBox;
	dims.thicknessMm = fullBox.w / pxPerMm;

	// --- Band-only (B): remove head/stone by trimming top portion by Y-percentile
	const ys = ringComp.pixels.map(([, y]) => y).sort((a, b) => a - b);

	const cutoffIndex = Math.floor(ys.length * 0.35); // tunable
	const yCut = ys[cutoffIndex] ?? fullBox.y;

	const bandPixels = ringComp.pixels.filter(([, y]) => y >= yCut);
	let bandBox = boxFromPoints(bandPixels);

	if (!bandBox || bandBox.h < fullBox.h * 0.18) {
		const cutoffIndex2 = Math.floor(ys.length * 0.2);
		const yCut2 = ys[cutoffIndex2] ?? fullBox.y;
		const bandPixels2 = ringComp.pixels.filter(([, y]) => y >= yCut2);
		bandBox = boxFromPoints(bandPixels2) ?? fullBox;
		notes.push("Side: band isolation weak; used less aggressive cutoff.");
	}

	debug.side.bandBox = bandBox;
	dims.bandWidthMm = bandBox.h / pxPerMm;

	notes.push(
		`Side: thickness≈${dims.thicknessMm.toFixed(
			2
		)}mm, bandWidth(B)≈${dims.bandWidthMm.toFixed(2)}mm.`
	);
	return { dims, debug, notes };
}
