import React from 'react'

import { IItem } from '@interfaces'
import { useUserStore } from '@stores'

import './itemInformation.scss'
import Image from 'next/image'

interface ItemInformation {
	chosenItem: IItem
}

// chosenItem: Item currently chosen from market items
const ItemInformation = ({ chosenItem }: ItemInformation) => {
	const user = useUserStore((state) => state.user)
	const { image, info, contents, name } = chosenItem || {}

	return (
		<div className="item-info start">
			<div className="item-image">
				<Image
					src={image}
					alt={name}
				/>
				<div className="owned-inventory">
					<span>Owned: &nbsp;</span>
					{user?.inventory.filter((item: IItem) => item?.name === name).length}
				</div>
			</div>
			<div className="item-details between-column">
				<div className="section">
					<h2 className="item-name">{name}</h2>
					<hr />
					<p className="item-desc">{info}</p>
				</div>
				{contents?.odds && (
					<div className="item-odds">
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
