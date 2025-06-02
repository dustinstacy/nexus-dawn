import { IItem } from '@interfaces'

import './userPack.scss'

interface UserPack {
	itemData: IItem | null
	allItems: Array<IItem>
}

// Renders the details of a user pack within the carousel
const UserPack: React.FC<UserPack> = ({ itemData, allItems }) => {
	const { contents, image, info, name } = itemData || {}

	return (
		<div className="user-pack around">
			{itemData && (
				<>
					<div className="pack-image">
						<img
							src={image}
							alt={name}
							data-cy="pack-image"
						/>
					</div>
					<div className="pack-info start-column">
						<h2
							className="pack-name between"
							data-cy="pack-name"
						>
							{name}
						</h2>
						<hr />
						<div className="pack-details ">
							<p data-cy="info">{info}</p>
							<div className="pack-odds">
								<h4 data-cy="odds-title">Odds:</h4>
								{contents?.odds &&
									Object.entries(contents?.odds).map(([key, value]) => (
										<div
											key={key}
											data-cy={`key-value-${key}`}
										>
											<p>
												{key}: &nbsp;
												{value as number}%
											</p>
										</div>
									))}
							</div>
						</div>
						<div
							className="available-inventory"
							data-cy="available-inventory"
						>
							<span>Available: &nbsp;</span>
							{allItems.filter((item) => item.name === name).length}
						</div>
					</div>
				</>
			)}
		</div>
	)
}

export default UserPack
