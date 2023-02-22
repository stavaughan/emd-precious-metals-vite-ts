import React from 'react'
import { InputComponent } from '.'
import type { InputTextProps } from './input-components.types'

const InputText: React.FC<InputTextProps> = ({
	...props
}) => <InputComponent {...props} />

export default InputText
