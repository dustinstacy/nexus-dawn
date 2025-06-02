import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { NextStage } from '@interfaces'

import { onboardingStages } from '../../constants'

import './howToPlay.scss'

const HowToPlay = ({ nextStage }: NextStage) => {
	const stageData = onboardingStages[4]

	const handleClick = async () => {
		await nextStage()
	}

	return (
		<ModalOverlay>
			<div
				className="how-to-play stage around-column"
				data-cy="wrapper"
			>
				<div className="header-wrapper">
					<h1
						className="header"
						data-cy="header"
					>
						{stageData.header}
						<img
							className="logo abs-center"
							src={smlogo.src}
							alt="small logo"
							data-cy="logo"
						/>
					</h1>
				</div>
				<div className="body box start-column">
					<p data-cy="body">{stageData.body}</p>
					<Button
						label={stageData.label as string}
						onClick={handleClick}
						dataCy="button"
					/>
				</div>
			</div>
		</ModalOverlay>
	)
}

export default HowToPlay
