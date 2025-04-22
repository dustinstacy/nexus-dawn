import { classSet } from '@utils'
import { User } from '@interfaces'
import {
	GiAbstract062,
	GiAbstract021,
	GiAbstract005,
	GiAbstract088,
	GiAbstract112,
	GiAbstract120,
	GiAbstract116
} from 'react-icons/gi'

export const maxValues = {
	Common: 5,
	Uncommon: 6,
	Rare: 7,
	Epic: 8,
	Legendary: 9
}

export const userLevels = [
	0, 10, 40, 100, 200, 350, 560, 840, 1200, 1650, 2200, 11440, 12000, 12750, 13750, 15000, 16500,
	18250, 110000, 112200, 115300, 121400, 128900, 139100, 153400, 168800, 187600, 1110600, 1150000,
	1200000, 1300000
]

// The case of the names is intentionally varied to achieve different letter stylings
export const navlinks = [
	{
		name: 'HoMe',
		path: '/',
		image: <GiAbstract021 />
	},
	{
		name: 'BAttLe',
		path: '/opponent-select',
		image: <GiAbstract088 />
	},
	{
		name: 'COlleCtiON',
		path: '/collection',
		image: <GiAbstract062 />
	},
	{
		name: 'MarKet',
		path: '/market',
		image: <GiAbstract120 />
	},
	{
		name: 'OpeN PacKs',
		path: '/packs',
		image: <GiAbstract112 />
	},
	{
		name: 'ForGe',
		path: '/forge',
		image: <GiAbstract005 />
	},
	{
		name: 'HoW to pLAy',
		path: '/how-to-play',
		image: <GiAbstract116 />
	}
]

export const subPanels = (user: User) => {
	const userPacks = user?.inventory.filter((item) => item?.type === 'pack')

	const packsClasses = classSet(userPacks?.length ? 'unopened' : '', !user ? 'hidden' : '')

	return [
		{
			className: 'packs',
			type: 'sub',
			to: '/packs',
			jsx: (
				<>
					<p className={packsClasses}>
						Unopened Packs: <span>{userPacks?.length}</span>
					</p>
					<h2>Packs</h2>
				</>
			)
		},
		{
			className: 'how-to-play',
			type: 'sub',
			to: '/how-to-play',
			jsx: (
				<>
					<h2>How To Play</h2>
				</>
			)
		}
	]
}

export const mainPanels = [
	{
		className: 'battle',
		type: 'main',
		to: '/opponent-select',
		text: 'Test your skill',
		header: 'Battle'
	},
	{
		className: 'collection',
		type: 'main',
		to: '/collection',
		text: 'Prepare for battle',
		header: 'Deck'
	},
	{
		className: 'market',
		type: 'main',
		to: '/market',
		text: 'Purchase packs',
		header: 'Market'
	}
]
