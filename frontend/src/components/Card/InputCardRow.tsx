import React from 'react'
import { Row } from '@/components/HTML';
import { ContentCard } from '.';
import type { InputCardRowProps } from './Card.types';

const InputCardRow: React.FC<InputCardRowProps> = ({
	gap,
	cardClass,
	children
}) => {

    return (
        <ContentCard cardClass={cardClass}>
            <Row className={gap || "g-3"}>
                {children}
            </Row>
        </ContentCard>
    )
}

export default InputCardRow
