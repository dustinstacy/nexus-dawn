import { ImCheckboxChecked } from '@react-icons/all-files/im/ImCheckboxChecked'
import { ImCheckboxUnchecked } from '@react-icons/all-files/im/ImCheckboxUnchecked'

import { ICard } from '@interfaces'
import './checkBox.scss'

interface CheckBoxProps {
	card: ICard
	onClick: (card: ICard) => void
}

const CheckBox = ({ card, onClick }: CheckBoxProps) => {
	return (
		<div
			className={`checkbox ${card.selected ? 'checked' : ''}`}
			onClick={() => onClick(card)}
			data-cy="checkbox"
		>
			{card.selected ?
				<ImCheckboxChecked data-cy="checkbox-checked" />
			:	<ImCheckboxUnchecked data-cy="checkbox-unchecked" />}
		</div>
	)
}

export default CheckBox
