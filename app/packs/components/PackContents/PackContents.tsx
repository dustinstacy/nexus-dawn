import { Button, Card } from '@components'
import { ICard } from '@interfaces'
import stores from '@stores'

import './packContents.scss'

interface PackContents {
	packContents: Array<ICard> | null
	setPackContents: React.Dispatch<React.SetStateAction<Array<ICard> | null>>
}

// Render contents of opened pack and button to return
const PackContents = ({ packContents, setPackContents }: PackContents) => {
	const user = stores.useUserStore((state) => state.user)
	const stage = user?.onboardingStage

	return (
		<div className="packs-contents fill center">
			{packContents?.map((data) => (
				<Card
					key={data._id}
					card={data}
					isShowing
				/>
			))}
			<Button
				label="Go Back"
				onClick={() => setPackContents(null)}
				disabled={(stage as number) < 5}
				dataCy="go-back-button"
			/>
		</div>
	)
}

export default PackContents
