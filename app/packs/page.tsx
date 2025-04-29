'use client'

import { useState } from 'react'

import { Onboarding } from '@components'
import { ICard } from '@interfaces'
import { useUserStore } from '@stores'

import { Loader, PackContents, UserPacks } from './components'
import './packs.scss'

// Component for opening packs and displaying their contents
const OpenPacks = () => {
	const user = useUserStore((state) => state.user)
	const stage = user?.onboardingStage ?? {}

	const [packContents, setPackContents] = useState<Array<ICard> | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	return (
		<div className="open-packs page center">
			{stage === 2 && <Onboarding />}
			{packContents && !isLoading ?
				<PackContents
					packContents={packContents}
					setPackContents={setPackContents}
				/>
			: isLoading ?
				<div className="loader-container">
					<Loader depth={60} />
				</div>
			:	<UserPacks
					setIsLoading={setIsLoading}
					setPackContents={setPackContents}
				/>
			}
		</div>
	)
}

export default OpenPacks
