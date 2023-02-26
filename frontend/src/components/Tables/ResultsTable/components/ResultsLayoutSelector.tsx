import React from 'react'
import clsx from 'clsx'
import { Button } from '@/components/Buttons'

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome'

const ResultsLayoutSelector: React.FC<{
	display?: string,
	setDisplay: React.Dispatch<React.SetStateAction<string>>,
	headContent?: React.ReactNode
}> = ({ display, setDisplay, headContent }) => {

	const buttonClass = 'btn badge bg-primary-soft btn-sm border-white border-1 border-top-0 border-bottom-0';

    return (
        <div role="group" className="d-flex flex-grow-0 flex-shrink-0 ps-2 btn-group align-items-center">
            {headContent ? headContent : (
                <>
                    <Button
                        type="button"
                        className={clsx(buttonClass, 'border-end border-start-0', display === 'lists' && 'active')}
						rest={{ onClick: () => setDisplay('lists') }}
                    >
                        <FAIcon icon="bars" className="fa-fw" />
                    </Button>
                    <Button
                        type="button"
                        className={clsx(buttonClass, 'border-end-0', display === 'images' && 'active')}
						rest={{ onClick: () => setDisplay('images') }}
                    >
                        <FAIcon icon="th-large" className="fa-fw" />
                    </Button>
                </>
            )}
        </div>
    )
}

export default ResultsLayoutSelector
