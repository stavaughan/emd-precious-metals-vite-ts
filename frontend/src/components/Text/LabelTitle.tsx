import React from 'react'

const LabelTitle: React.FC<{
	label?: string;
	value?: string;
}> = ({ label, value }) => {
    return (
        <>
            <span className="text-muted">
                {label}:
            </span>
            <span className="ms-2 text-dark">
                {value}
            </span>
        </>
    )
}

export default LabelTitle
