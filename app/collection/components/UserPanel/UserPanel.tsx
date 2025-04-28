import { TbPlayCard } from 'react-icons/tb'

import { Avatar, ExperienceBar } from '@components'
import { useUserStore } from '@stores'

import './userPanel.scss'

// Renders user information including experience gained, battle stats, and card counts
const UserPanel = () => {
	const user = useUserStore((state) => state.user)
	const userCards = useUserStore((state) => state.userCards)
	const { level, stats, username } = user ?? {}
	const uniqueCards = [...new Set(userCards.map((card) => card.name))]

	return (
		<div className="user-panel center">
			<div className="panel center">
				<div className="user center-column">
					<div className="user__details end">
						<Avatar medium />
						<div>
							<div className="top between">
								<h1>{username}</h1>
								<h1>LVL &nbsp; {level}</h1>
							</div>
							<hr />
							<ExperienceBar />
						</div>
					</div>
					<div className="user__stats fill">
						<table>
							<tbody>
								<tr>
									<th>Battles:</th>
									<td>{stats?.battles}</td>
								</tr>
								<tr>
									<th>Wins :</th>
									<td>{stats?.wins}</td>
								</tr>
								<tr>
									<th>Losses :</th>
									<td>{stats?.losses}</td>
								</tr>
								<tr>
									<th>Draws :</th>
									<td>{stats?.draws}</td>
								</tr>
							</tbody>
						</table>
						<table>
							<tbody>
								<tr>
									<th>
										Total <TbPlayCard /> :
									</th>
									<td>{userCards.length}</td>
								</tr>
								<tr>
									<th>
										Unique <TbPlayCard /> :
									</th>
									<td>{uniqueCards.length}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserPanel
