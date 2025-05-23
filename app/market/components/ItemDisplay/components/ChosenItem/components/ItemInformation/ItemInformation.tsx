import { IItem } from '@interfaces'
import stores from '@stores'

import './itemInformation.scss'

interface ItemInformation {
	chosenItem: IItem
}

// chosenItem: Item currently chosen from market items
const ItemInformation = ({ chosenItem }: ItemInformation) => {
	const user = stores.useUserStore((state) => state.user)
	const { image, info, contents, name } = chosenItem || {}
	console.log(user?.inventory)
	return (
		<div
			className="item-info start"
			data-cy="item-info"
		>
			<div className="item-image">
				<img
					src={image}
					alt={name}
					data-cy="item-image"
				/>
				<div
					className="owned-inventory"
					data-cy="owned-inventory"
				>
					<span>Owned: &nbsp;</span>
					{user?.inventory.filter((item: IItem) => item?.name === name).length}
				</div>
			</div>
			<div className="item-details between-column">
				<div className="section">
					<h2
						className="item-name"
						data-cy="item-name"
					>
						{name}
					</h2>
					<hr />
					<p
						className="item-desc"
						data-cy="item-desc"
					>
						{info}
					</p>
				</div>
				{contents?.odds && (
					<div
						className="item-odds"
						data-cy="item-odds"
					>
						<h4>Odds:</h4>
						{Object.entries(contents?.odds).map(([key, value]) => (
							<div key={key}>
								<p>
									{key}: &nbsp;{value as number} %
								</p>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default ItemInformation
