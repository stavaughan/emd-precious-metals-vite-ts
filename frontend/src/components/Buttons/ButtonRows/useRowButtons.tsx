import React, { useMemo } from 'react';
import { IconDropDown } from '@/components/DropDowns';
import { IconButton } from '@/components/Buttons/Type';
import type { RowButtonProps } from '../Buttons.types';
import { PrintComponent } from '@/services';
import { SiteData } from '@/data';

const useRowButtons = ({ btn, test, margin }: RowButtonProps) => {

	const modalID = SiteData.modalIDs[btn?.modalID as keyof typeof SiteData.modalIDs] as string;

	const today = new Date();
	const dateStr = today.getTime();

	const Buttons = useMemo(() => ([
		{
			type: 'modal',
			toolTip: btn?.toolTip,
			Elem: () => (
				<>
					{btn?.icon && (
						<IconButton
							icon={btn?.icon}
							mode="light"
							{...btn?.color && { color: btn?.color }}
							modalID={modalID}
							{...btn?.modalClick && {
								modalClick: btn.modalClick
							}}
							margin={margin}
						/>
					)}
				</>
			) as unknown as React.FC
		},
		{
			type: 'print',
			toolTip: `Print ${btn?.toolTip}`,
			noDisplay: !test,
			Elem: () => (
				<>
					{btn?.printRef && (
						<PrintComponent
							componentRef={btn?.printRef}
							documentTitle={`${btn.toolTip}_${dateStr}`}
							margin={margin}
						/>
					)}
				</>
			) as unknown as React.FC
		},
		{
			type: 'click',
			toolTip: btn?.toolTip,
			noDisplay: !test,
			Elem: () => (
				<>
					{btn?.icon && (
						<IconButton
							icon={btn?.icon}
							mode="light"
							onClick={btn?.onClick}
							color={btn?.color}
							loading={btn?.loading}
							margin={margin}
						/>
					)}
				</>
			) as unknown as React.FC
		},
		{
			type: 'dropdown',
			toolTip: btn?.toolTip,
			noDisplay: !test,
			Elem: () => (
				<>
					{(btn?.icon && !!btn?.setDDOption && !!btn?.ddOptions) ? (
						<IconDropDown
							setOption={btn?.setDDOption}
							options={btn?.ddOptions}
							margin={margin}
							icon={btn?.icon} />
					) : null}
				</>
			) as unknown as React.FC
		}
	]), [
		btn?.color,
		btn?.ddOptions,
		btn?.icon,
		btn?.modalClick,
		btn?.modalID,
		btn?.onClick,
		btn?.printRef,
		btn?.setDDOption,
		btn.toolTip,
		btn?.loading,
		btn?.setPrinting,
		margin,
		test,
		dateStr
	]);

	return { Buttons }
}

export default useRowButtons
