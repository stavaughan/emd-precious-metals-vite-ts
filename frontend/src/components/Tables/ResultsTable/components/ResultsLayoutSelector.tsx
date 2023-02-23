import React from 'react'
import clsx from 'clsx'
import { Button } from '@/components/Buttons'

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome'

const ResultsLayoutSelector: React.FC<{
	display?: string,
	setDisplay: React.Dispatch<React.SetStateAction<string>>,
	headContent?: React.ReactNode
}> = ({
	display,
	setDisplay,
	headContent
}) => {

    return (
        <div role="group" className="d-flex flex-grow-0 flex-shrink-0 ps-2 btn-group align-items-center">
            {headContent ? headContent : (
                <>
                    <Button
                        type="button"
                        className={clsx(
							'btn btn-outline-primary btn-sm',
							display === 'lists' && 'active'
						)}
						rest={{
							onClick: () => setDisplay('lists')
						}}
                    >
                        <FAIcon icon="bars" className="fa-fw" />
                    </Button>
                    <Button
                        type="button"
                        className={clsx(
							'btn btn-outline-primary btn-sm',
							display === 'images' && 'active'
						)}
						rest={{
							onClick: () => setDisplay('images')
						}}
                    >
                        <FAIcon icon="th-large" className="fa-fw" />
                    </Button>
                </>
            )}
        </div>
    )
}

export default ResultsLayoutSelector
