export type Circle = { cx: number; cy: number; r: number };
export type Box = { x: number; y: number; w: number; h: number };

export function boxFromPoints(points: Array<[number, number]>): Box | null {
	if (!points.length) return null;
	let minX = Infinity,
		minY = Infinity,
		maxX = -Infinity,
		maxY = -Infinity;
	for (const [x, y] of points) {
		if (x < minX) minX = x;
		if (y < minY) minY = y;
		if (x > maxX) maxX = x;
		if (y > maxY) maxY = y;
	}
	return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
}
