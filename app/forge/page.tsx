'use client'

import { useState } from 'react'

import { Button } from '@components'

import { CardModification, FluxFusion } from './components'
import './forge.scss'

const Forge = () => {
	const [cardModification, setCardModification] = useState(false)
	const [fluxFusion, setFluxFusion] = useState(false)

	return (
		<div className="forge center">
			{!cardModification && !fluxFusion && (
				<div className="forge__buttons center-column">
					<Button
						label="Card Modification"
						onClick={() => setCardModification(true)}
					/>
					<Button
						label="Flux Fusion"
						onClick={() => setFluxFusion(true)}
					/>
				</div>
			)}
			{cardModification && <CardModification setCardModification={setCardModification} />}
			{fluxFusion && <FluxFusion setFluxFusion={setFluxFusion} />}
		</div>
	)
}

export default Forge
