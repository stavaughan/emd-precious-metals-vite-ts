import clsx from 'clsx';
import { SiteData } from '@/data';
import React, { useCallback, useEffect, useState, useMemo, useContext } from 'react';
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { toast } from 'react-toastify';
import { InfoAlert } from '@/components/Alerts';
import { LoaderButton } from '@/components/Buttons';
import { ModalButton } from '@/components/Buttons/Type';
import { QuantitySelector } from '@/components/Forms/Inputs/components';
import { ToolTip } from '@/components/ToolTip';
import { getMetals } from '@/features/metals/metalsSlice';
import { useMobile } from '@/hooks';
import { themeClasses } from '@/theme';
import { SpreadInfoTip } from '.';
import { MetalsContext } from '@/contexts';
import type { MetalsContextType } from '@/contexts/metals-context.types';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const FetchPricesButton: React.FC = () => {

	const {
		currentMetalPrices,
		setSpread,
		setUpdate,
		spread
	} = useContext(MetalsContext) as MetalsContextType;

	const spreadMessage = useMemo(() => <SpreadInfoTip />, []);

	const { isXSmall } = useMobile();

	const [ready, setReady] = useState(false);
	const [syntheticLoading, setSyntheticLoading] = useState(false);

	const { metalsRes, isLoading, isError, message } = useAppSelector((state) => state.metal);
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (metalsRes?.rates) {
			currentMetalPrices(metalsRes?.rates)
		}
	}, [metalsRes?.rates, currentMetalPrices])

	useEffect(() => {
		if (ready && isError) {
			toast.error(message)
		}
		const timer = setTimeout(() => {
			setReady(false)
		}, 800)
		return () => clearTimeout(timer)
	}, [isError, message, ready])

	const onFetchMetals = useCallback(() => {
		setReady(true)
		dispatch(getMetals({
			selSymbols: "XAU,XAG,XPT",
		}))
	}, [dispatch])

	useEffect(() => {
		if (syntheticLoading) {
			const timer = setTimeout(() => {
				setSyntheticLoading(false);
			}, 200);
			return () => clearTimeout(timer);
		}
	}, [syntheticLoading]);

	const onSetSpread = (value: number) => {
		setSyntheticLoading(true);
		const qty = value ? Math.abs(value) : 0;
		setSpread(qty);
		setUpdate(prev => ({ ...prev, spread: true }))
	};

	return (
		<div className={clsx(
			'd-flex',
			isXSmall ? 'flex-column mt-3 ps-4 gap-3' : 'justify-content-end align-items-center'
		)}>
			{isXSmall && (
				<div className="d-flex justify-content-start align-items-center">
					<div className="me-2 text-xs">Update metal prices</div>
					<LoaderButton
						className={themeClasses.button.icon.light}
						loading={isLoading}
						disabled={isLoading}
						icon="sync-alt"
						setOnclick={onFetchMetals}
					/>
				</div>
			)}
			<div className="d-flex justify-content-start align-items-center me-4">
				<label className="me-2 text-xs">Buyer spread</label>
				{!isXSmall && (
					<InfoAlert
						message={spreadMessage}
						className="me-2"
						interactive
					/>
				)}
				<QuantitySelector
					qty={spread}
					loading={syntheticLoading}
					setData={onSetSpread}
					suffix="%"
				/>
				{isXSmall && (
					<ModalButton
						className="p-0 ms-3"
						modalID={SiteData.modalIDs.spreadInfo}
					>
						<FAIcon icon="info-circle" className="text-info" />
					</ModalButton>
				)}
			</div>
			{!isXSmall && (
				<ToolTip tip="Update metal prices">
					<LoaderButton
						className={themeClasses.button.icon.light}
						loading={isLoading}
						disabled={isLoading}
						icon="sync-alt"
						setOnclick={onFetchMetals}
					/>
				</ToolTip>
			)}
		</div>

	)
}

export default FetchPricesButton
