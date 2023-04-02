import React from 'react'
import { InputComponent } from '.'
import type { InputComponentProps } from './input-components.types'

const InputText: React.FC<InputComponentProps> = (props) => (
	<InputComponent {...props} />
);

export default InputText
