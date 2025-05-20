import { AiFillEye } from '@react-icons/all-files/ai/AiFillEye'
import { AiFillEyeInvisible } from '@react-icons/all-files/ai/AiFillEyeInvisible'

import { useToggle } from '@hooks'
import { classSet } from '@utils'

import './textInput.scss'

interface TextInputProps {
	label: string
	name: string
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	loading: boolean
	autoFocus?: boolean
	autoComplete?: string
}

// A reusable component that represents a text input field with optional password visibility toggle.
// label: The label text for the input field.
// name: The name attribute for the input field.
// value: The current value of the input field.
// onChange: The event handler function for the onChange event.
// loading: Indicates whether the input field is in a loading state.
// autofocus: Indicates whether the input field should be autofocused.
const TextInput = ({
	label,
	name,
	value,
	onChange,
	loading,
	autoFocus,
	autoComplete
}: TextInputProps) => {
	const [passwordVisible, togglePasswordVisible] = useToggle()
	const isPasswordInput = label.includes('Password')

	const inputType = isPasswordInput && !passwordVisible ? 'password' : 'text'
	const EyeIcon = passwordVisible ? AiFillEye : AiFillEyeInvisible
	const inputClasses = classSet('input', value && 'has-content')

	return (
		<div
			className="text-input"
			data-cy="outer-container"
		>
			<input
				type={inputType}
				id={name}
				className={inputClasses}
				name={name}
				value={value}
				onChange={(e) => onChange(e)}
				disabled={loading}
				autoFocus={autoFocus}
				autoComplete={autoComplete}
				data-cy="input"
			/>
			{isPasswordInput && (
				<EyeIcon
					onClick={togglePasswordVisible}
					data-testid="eye-icon"
					data-cy={passwordVisible ? 'eye-icon-visible' : 'eye-icon-invisible'}
				/>
			)}
			<label
				htmlFor={name}
				data-cy="label"
			>
				{label}
			</label>
			<span className="focus-border">
				<i />
			</span>
		</div>
	)
}

export default TextInput
