import React from 'react'
import { TrademarkSymbol } from '@/components/Blocks/Brand';
import type { TradeMarkName } from '../Blocks.types';

const TrademarkName: React.FC<TradeMarkName> = ({ name, mark }) => {
	if (!name) return null;
	return <>{name}<TrademarkSymbol mark={mark} /></>;
}

export default TrademarkName
