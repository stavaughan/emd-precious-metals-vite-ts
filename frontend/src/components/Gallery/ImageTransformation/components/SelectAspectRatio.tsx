import React from 'react';
import { themeClasses } from '@/theme';
import { Row } from '@/components/HTML'
import { AspectRatio, aspectRatios } from '.';
import type { SelectAspectRatioProps } from '../image-transformation.types';

const SelectAspectRatio: React.FC<SelectAspectRatioProps> = ({
	ratioID,
	setRatioID,
	base
}) => {

    return (
        <div className="ps-3">
            <label className={themeClasses.forms.inputGroups.label.field}>
				Aspect Ratio
			</label>
            <Row className="g-2">
                {aspectRatios(base).map(ratio => (
                    <AspectRatio
                        key={ratio._id}
                        ratio={ratio}
                        width={ratio.width}
                        height={ratio.height}
                        ratioID={ratioID}
                        setRatioID={setRatioID}
                    />
                ))}
            </Row>
        </div>
    )
}

export default SelectAspectRatio
