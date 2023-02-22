import React from 'react'
import { Card, CardBody } from '.'
import type { ContentCardProps } from './Card.types'

const ContentCard: React.FC<ContentCardProps> = ({ cardClass, children }) => {

    return (
        <Card className={cardClass}>
            <CardBody>
                {children}
            </CardBody>
        </Card>
    )
}

export default ContentCard
