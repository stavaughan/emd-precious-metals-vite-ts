import React from 'react'
import { ToolTip } from '@/components/ToolTip';
import { themeClasses } from '@/theme';
import clsx from 'clsx';
import { ModalButton } from '@/components/Buttons/Type';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const SettingsButton: React.FC<{
	className?: string;
	modalID: string;
}> = ({ className, modalID }) => {

    return (
        <ToolTip tip="Settings" span>
            <ModalButton
                className={clsx(
					themeClasses.button.icon.light,
					className
				)}
				modalID={modalID}
            >
				<FAIcon icon="cog" />
			</ModalButton>
        </ToolTip>
    )
}

export default SettingsButton
