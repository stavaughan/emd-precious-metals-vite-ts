import React, { useMemo } from 'react';
import { ToolTip } from '@/components/ToolTip';
import { useRowButtons } from '.';
import type { RowButtonProps, ButtonObjectProps } from '../Buttons.types';

const RowButton: React.FC<RowButtonProps> = ({ btn, test, margin }) => {

	const { Buttons } = useRowButtons({ btn, test, margin });

	const ButtonObject = useMemo(() => {
		return Buttons.find(_ => _.type === btn.type);
	}, [Buttons, btn.type]) as unknown as ButtonObjectProps;

	if (ButtonObject?.noDisplay) {
		return <></>
	}

	return (
		<ToolTip tip={ButtonObject.toolTip} span>
			<ButtonObject.Elem />
		</ToolTip>
	)
}

export default RowButton
