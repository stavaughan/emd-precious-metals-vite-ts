import type { RingDimensionsMm } from "./detectQuarterAndRing";

export type MetalType = "gold" | "silver" | "platinum";

export type VolumeEstimate = {
	volumeCm3: number;
	confidence: "low" | "medium" | "high";
	notes: string[];
};

export const SPOT_USD_PER_OZ: Record<MetalType, number> = {
	gold: 4330.3,
	silver: 72.77,
	platinum: 2144,
};

const DENSITY_G_PER_CM3_PURE: Record<MetalType, number> = {
	gold: 19.32,
	silver: 10.49,
	platinum: 21.45,
};

const GRAMS_PER_TROY_OZ = 31.1034768;

export function estimateRingVolumeFromDimensions(
	d: RingDimensionsMm
): VolumeEstimate {
	const notes: string[] = [];

	const outerD = d.outerDiameterMm ?? 22;
	const innerD = d.innerDiameterMm ?? 18;

	// Band width from side view (B). If missing, fallback.
	const bandWidth = d.bandWidthMm ?? 6;

	const radialThick = Math.max(0.2, (outerD - innerD) / 2);
	const areaMm2 = radialThick * bandWidth;
	const circumferenceMm = Math.PI * innerD;
	const volumeMm3 = areaMm2 * circumferenceMm;
	const volumeCm3 = volumeMm3 / 1000;

	notes.push(
		`Volume model: radialThick(${radialThick.toFixed(
			2
		)}mm)×bandWidth(${bandWidth.toFixed(2)}mm)×π×innerD(${innerD.toFixed(
			2
		)}mm).`
	);

	return { volumeCm3, confidence: "medium", notes };
}

export function priceFromVolume(args: {
	volumeCm3: number;
	metal: MetalType;
	purityFraction: number; // 0..1
}) {
	if (!(args.purityFraction > 0 && args.purityFraction <= 1))
		throw new Error("Invalid purity fraction.");

	const densityGPerCm3 =
		DENSITY_G_PER_CM3_PURE[args.metal] * args.purityFraction;
	const weightGrams = args.volumeCm3 * densityGPerCm3;
	const weightTroyOz = weightGrams / GRAMS_PER_TROY_OZ;
	const spotUsdPerOz = SPOT_USD_PER_OZ[args.metal];
	const estimatedUsd = weightTroyOz * spotUsdPerOz;

	return {
		densityGPerCm3,
		weightGrams,
		weightTroyOz,
		spotUsdPerOz,
		estimatedUsd,
	};
}
