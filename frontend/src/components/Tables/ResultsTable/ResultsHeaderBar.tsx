import React from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { ResultsLayoutSelector } from './components'
import { useMobile } from '@/hooks';
import clsx from 'clsx';

import Classes from './styles/ResultsTable.module.css'

type ResultsHeaderProps = {
	display?: string;
	setDisplay?: Dispatch<SetStateAction<string>>;
	quantity: number;
	headContent?: React.ReactNode;
}

const ResultsHeaderBar: React.FC<ResultsHeaderProps> = ({
	display,
	setDisplay,
	quantity,
	headContent
}) => {

	const { isXSmall } = useMobile();

    const hrTest = !!setDisplay || !!headContent;

	const setResDisplay = setDisplay || (() => {});

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className={clsx(
				hrTest ? Classes['hr-text'] : 'd-flex text-center align-items-center',
				'flex-shrink-1 flex-grow-1'
			)}>
                <div className={clsx(
					isXSmall ? 'text-xxs' : 'text-xs',
					"px-2 text-slate-500"
				)}>
                    results
                    <div className="ms-2 badge bg-primary-soft">
                        {quantity}
                    </div>
                </div>
            </div>
            {hrTest && (
                <ResultsLayoutSelector
                    display={display}
                    setDisplay={setResDisplay}
                    headContent={headContent}
                />
            )}
        </div>
    )
}

export default ResultsHeaderBar
