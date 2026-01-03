import React, { useMemo, useRef, useState } from "react";
import { preciousMetals } from "@/globals/js/lib";
import {
	estimateDimensionsQuarterCalibrated,
	type UploadedImage,
	type CvDebug,
	type RingDimensionsMm,
} from "./cv/detectQuarterAndRing";
import { fileToDataUrl } from "./cv/imageUtils";
import {
	estimateRingVolumeFromDimensions,
	priceFromVolume,
	type MetalType,
} from "./cv/volumePricing";

type MetalQuality = (typeof preciousMetals)[number];

function metalLabel(m: MetalType) {
	return m.charAt(0).toUpperCase() + m.slice(1);
}

// alloy mapping from your file:
// gold: alloy is karat (10..24) => purity = k/24
// silver: alloy 925/1000 etc => purity = alloy/1000
// platinum: alloy 900/1000 etc => purity = alloy/1000
function purityFromQuality(q: MetalQuality): number {
	if (q.metal === "gold") return q.alloy / 24;
	return q.alloy / 1000;
}

function OverlaySvg(props: {
	debug?: CvDebug["top"] | CvDebug["side"];
	containerRef: React.RefObject<HTMLDivElement>;
}) {
	const [geom, setGeom] = useState<{
		cw: number;
		ch: number;
		ox: number;
		oy: number;
		s: number;
	} | null>(null);

	React.useEffect(() => {
		const el = props.containerRef.current;
		if (!el || !props.debug) return;

		const ro = new ResizeObserver(() => {
			const rect = el.getBoundingClientRect();
			const cw = rect.width;
			const ch = rect.height;

			const cvW = props.debug!.canvasW;
			const cvH = props.debug!.canvasH;

			const s = Math.min(cw / cvW, ch / cvH);
			const rw = cvW * s;
			const rh = cvH * s;
			const ox = (cw - rw) / 2;
			const oy = (ch - rh) / 2;

			setGeom({ cw, ch, ox, oy, s });
		});

		ro.observe(el);
		return () => ro.disconnect();
	}, [props.containerRef, props.debug]);

	if (!props.debug || !geom) return null;

	const mapX = (x: number) => geom.ox + x * geom.s;
	const mapY = (y: number) => geom.oy + y * geom.s;
	const mapR = (r: number) => r * geom.s;

	const quarter = (props.debug as any).quarter as
		| { cx: number; cy: number; r: number }
		| undefined;
	const ringBox = (props.debug as any).ringBox as
		| { x: number; y: number; w: number; h: number }
		| undefined;
	const bandBox = (props.debug as any).bandBox as
		| { x: number; y: number; w: number; h: number }
		| undefined;
	const ringCenter = (props.debug as any).ringCenter as
		| { cx: number; cy: number }
		| undefined;

	return (
		<svg
			style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
			width={geom.cw}
			height={geom.ch}
		>
			{quarter ? (
				<>
					<circle
						cx={mapX(quarter.cx)}
						cy={mapY(quarter.cy)}
						r={mapR(quarter.r)}
						fill="none"
						stroke="rgba(13,110,253,0.95)"
						strokeWidth={2}
					/>
					<text
						x={mapX(quarter.cx)}
						y={mapY(quarter.cy - quarter.r) - 6}
						fontSize={12}
						textAnchor="middle"
						fill="rgba(13,110,253,0.95)"
					>
						Quarter
					</text>
				</>
			) : null}

			{ringBox ? (
				<>
					<rect
						x={mapX(ringBox.x)}
						y={mapY(ringBox.y)}
						width={ringBox.w * geom.s}
						height={ringBox.h * geom.s}
						fill="none"
						stroke="rgba(25,135,84,0.95)"
						strokeWidth={2}
					/>
					<text
						x={mapX(ringBox.x)}
						y={mapY(ringBox.y) - 6}
						fontSize={12}
						fill="rgba(25,135,84,0.95)"
					>
						Ring box
					</text>
				</>
			) : null}

			{bandBox ? (
				<>
					<rect
						x={mapX(bandBox.x)}
						y={mapY(bandBox.y)}
						width={bandBox.w * geom.s}
						height={bandBox.h * geom.s}
						fill="rgba(255,193,7,0.12)"
						stroke="rgba(255,193,7,0.95)"
						strokeWidth={2}
					/>
					<text
						x={mapX(bandBox.x)}
						y={mapY(bandBox.y) - 6}
						fontSize={12}
						fill="rgba(255,193,7,0.95)"
					>
						Band-only (B)
					</text>
				</>
			) : null}

			{ringCenter ? (
				<circle
					cx={mapX(ringCenter.cx)}
					cy={mapY(ringCenter.cy)}
					r={4}
					fill="rgba(214,51,132,0.95)"
				/>
			) : null}
		</svg>
	);
}

function ImageUploader(props: {
	title: string;
	value: UploadedImage | null;
	onChange: (img: UploadedImage | null) => void;
	debug?: CvDebug["top"] | CvDebug["side"];
}) {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const previewRef = useRef<HTMLDivElement | null>(null);
	const [drag, setDrag] = useState(false);

	const accept = async (file: File) => {
		if (!file.type.startsWith("image/")) {
			alert("Please upload an image.");
			return;
		}
		const previewUrl = await fileToDataUrl(file);
		props.onChange({ file, previewUrl, confirmedQuarter: false });
	};

	return (
		<div className="card h-100">
			<div className="card-body">
				<div className="d-flex align-items-baseline justify-content-between">
					<h5 className="card-title mb-0">{props.title}</h5>
					<span className="badge text-bg-danger">required</span>
				</div>

				<div
					className={`mt-3 border rounded p-3 ${
						drag
							? "border-primary bg-light"
							: "border-secondary-subtle"
					}`}
					style={{ cursor: "pointer" }}
					onClick={() => inputRef.current?.click()}
					onDragEnter={(e) => {
						e.preventDefault();
						setDrag(true);
					}}
					onDragOver={(e) => {
						e.preventDefault();
						setDrag(true);
					}}
					onDragLeave={(e) => {
						e.preventDefault();
						setDrag(false);
					}}
					onDrop={(e) => {
						e.preventDefault();
						setDrag(false);
						const f = e.dataTransfer.files?.[0];
						if (f) void accept(f);
					}}
				>
					{!props.value ? (
						<>
							<div className="fw-semibold">
								Drag & drop or click to upload
							</div>
							<div className="text-muted small">
								Include a US quarter next to the ring (same
								plane).
							</div>
						</>
					) : (
						<>
							<div
								ref={previewRef}
								className="position-relative bg-dark rounded overflow-hidden border"
								style={{ height: 280 }}
								onClick={(e) => e.stopPropagation()}
							>
								<img
									src={props.value.previewUrl}
									alt=""
									style={{
										width: "100%",
										height: "100%",
										objectFit: "contain",
									}}
								/>
								<OverlaySvg
									debug={props.debug}
									containerRef={previewRef}
								/>
							</div>

							<div className="form-check mt-3">
								<input
									className="form-check-input"
									type="checkbox"
									id={`${props.title}-quarter`}
									checked={props.value.confirmedQuarter}
									onChange={(e) =>
										props.onChange({
											...props.value!,
											confirmedQuarter: e.target.checked,
										})
									}
								/>
								<label
									className="form-check-label"
									htmlFor={`${props.title}-quarter`}
								>
									I confirm a <strong>US quarter</strong> is
									visible next to the ring.
								</label>
							</div>

							<div className="d-flex gap-2 mt-3">
								<button
									type="button"
									className="btn btn-outline-secondary btn-sm"
									onClick={() => inputRef.current?.click()}
								>
									Replace
								</button>
								<button
									type="button"
									className="btn btn-outline-danger btn-sm"
									onClick={() => props.onChange(null)}
								>
									Remove
								</button>
							</div>
						</>
					)}

					<input
						ref={inputRef}
						type="file"
						accept="image/*"
						className="d-none"
						onChange={(e) => {
							const f = e.target.files?.[0];
							if (f) void accept(f);
						}}
					/>
				</div>
			</div>
		</div>
	);
}

export default function RingPhotoCvPage() {
	const [topView, setTopView] = useState<UploadedImage | null>(null);
	const [sideView, setSideView] = useState<UploadedImage | null>(null);

	const [metal, setMetal] = useState<MetalType>("gold");
	const [qualityId, setQualityId] = useState<string>("");

	const [busy, setBusy] = useState(false);
	const [err, setErr] = useState<string | null>(null);

	const [dims, setDims] = useState<RingDimensionsMm | null>(null);
	const [debug, setDebug] = useState<CvDebug | null>(null);
	const [notes, setNotes] = useState<string[]>([]);
	const [price, setPrice] = useState<{
		volumeCm3: number;
		weightGrams: number;
		estimatedUsd: number;
	} | null>(null);

	const qualities = useMemo(
		() => preciousMetals.filter((q) => q.metal === metal),
		[metal]
	);
	const quality = useMemo(
		() => qualities.find((q) => q._id === qualityId) ?? null,
		[qualities, qualityId]
	);

	const bothUploaded = !!topView && !!sideView;
	const quarterConfirmed =
		!!topView?.confirmedQuarter && !!sideView?.confirmedQuarter;

	const canCalculate = bothUploaded && quarterConfirmed && !!quality && !busy;

	const description = useMemo(() => {
		if (!bothUploaded) return "";
		const q = quality?.display ? `${quality.display} ` : "";
		return `${q}${metalLabel(metal)} ring (auto-description later)`;
	}, [bothUploaded, quality, metal]);

	const onCalculate = async () => {
		setErr(null);
		setNotes([]);
		setDims(null);
		setDebug(null);
		setPrice(null);

		if (!topView || !sideView) return setErr("Upload both images.");
		if (!topView.confirmedQuarter || !sideView.confirmedQuarter)
			return setErr("Confirm the quarter is visible in BOTH photos.");
		if (!quality) return setErr("Select a metal quality.");

		setBusy(true);
		try {
			const cv = await estimateDimensionsQuarterCalibrated({
				topView,
				sideView,
			});

			const vol = estimateRingVolumeFromDimensions(cv.dims);
			const purity = purityFromQuality(quality);
			const priced = priceFromVolume({
				volumeCm3: vol.volumeCm3,
				metal,
				purityFraction: purity,
			});

			const allNotes = [...cv.notes, ...vol.notes];
			if (
				!cv.dims.quarterDiameterPxTop ||
				!cv.dims.quarterDiameterPxSide
			) {
				allNotes.unshift(
					"Warning: quarter detection failed in one or both photos; scale may be inaccurate."
				);
			}

			setDims(cv.dims);
			setDebug(cv.debug);
			setNotes(allNotes);
			setPrice({
				volumeCm3: vol.volumeCm3,
				weightGrams: priced.weightGrams,
				estimatedUsd: priced.estimatedUsd,
			});
		} catch (e: any) {
			setErr(e?.message ?? "Calculation failed.");
		} finally {
			setBusy(false);
		}
	};

	return (
		<div className="container py-4">
			<div className="mb-3">
				<h2 className="mb-1">Ring Photo CV Estimator</h2>
				<div className="text-muted">
					Upload top + side view with a <strong>US quarter</strong>{" "}
					for scale. Debug overlays show what CV detected.
				</div>
			</div>

			<div className="row g-3">
				<div className="col-12 col-lg-6">
					<ImageUploader
						title="Top View"
						value={topView}
						onChange={setTopView}
						debug={debug?.top}
					/>
				</div>
				<div className="col-12 col-lg-6">
					<ImageUploader
						title="Side View"
						value={sideView}
						onChange={setSideView}
						debug={debug?.side}
					/>
				</div>
			</div>

			<div className="card mt-3">
				<div className="card-body">
					<div className="row g-3">
						<div className="col-12 col-md-6">
							<label className="form-label fw-semibold">
								Metal Type
							</label>
							<select
								className="form-select"
								value={metal}
								onChange={(e) => {
									setMetal(e.target.value as MetalType);
									setQualityId("");
								}}
							>
								<option value="gold">Gold</option>
								<option value="silver">Silver</option>
								<option value="platinum">Platinum</option>
							</select>
						</div>

						<div className="col-12 col-md-6">
							<label className="form-label fw-semibold">
								Metal Quality
							</label>
							<select
								className="form-select"
								value={qualityId}
								onChange={(e) => setQualityId(e.target.value)}
							>
								<option value="" disabled>
									Select…
								</option>
								{qualities.map((q) => (
									<option key={q._id} value={q._id}>
										{q.label}
									</option>
								))}
							</select>
						</div>
					</div>

					{bothUploaded ? (
						<div className="mt-3 p-3 bg-light border rounded">
							<div className="fw-semibold">Description</div>
							<div>{description}</div>
						</div>
					) : null}

					<div className="d-flex flex-wrap gap-2 align-items-center mt-3">
						<button
							className="btn btn-primary"
							disabled={!canCalculate}
							onClick={onCalculate}
						>
							{busy ? "Calculating…" : "Calculate"}
						</button>

						{!quarterConfirmed && bothUploaded ? (
							<span className="text-danger small fw-semibold">
								Confirm quarter in BOTH photos to enable
								Calculate.
							</span>
						) : null}

						{err ? (
							<span className="text-danger small fw-semibold">
								{err}
							</span>
						) : null}
					</div>
				</div>
			</div>

			{price && dims ? (
				<div className="card mt-3">
					<div className="card-body">
						<div className="row g-3">
							<div className="col-12 col-md-4">
								<div className="text-muted small">
									Estimated value
								</div>
								<div className="fs-3 fw-bold">
									${price.estimatedUsd.toFixed(2)}
								</div>
							</div>
							<div className="col-12 col-md-4">
								<div className="text-muted small">Weight</div>
								<div className="fw-semibold">
									{price.weightGrams.toFixed(2)} g
								</div>
							</div>
							<div className="col-12 col-md-4">
								<div className="text-muted small">Volume</div>
								<div className="fw-semibold">
									{price.volumeCm3.toFixed(4)} cm³
								</div>
							</div>
						</div>

						<hr />

						<div className="row g-2">
							<div className="col-6 col-lg-3">
								<span className="text-muted small">
									Outer D
								</span>
								<div className="fw-semibold">
									{dims.outerDiameterMm?.toFixed(2) ?? "—"} mm
								</div>
							</div>
							<div className="col-6 col-lg-3">
								<span className="text-muted small">
									Inner D
								</span>
								<div className="fw-semibold">
									{dims.innerDiameterMm?.toFixed(2) ?? "—"} mm
								</div>
							</div>
							<div className="col-6 col-lg-3">
								<span className="text-muted small">
									Band width (B)
								</span>
								<div className="fw-semibold">
									{dims.bandWidthMm?.toFixed(2) ?? "—"} mm
								</div>
							</div>
							<div className="col-6 col-lg-3">
								<span className="text-muted small">
									Thickness
								</span>
								<div className="fw-semibold">
									{dims.thicknessMm?.toFixed(2) ?? "—"} mm
								</div>
							</div>
						</div>

						<div className="mt-3">
							<div className="text-muted small fw-semibold">
								Calculation notes
							</div>
							<ul className="small mb-0">
								{notes.map((n, i) => (
									<li key={i}>{n}</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
