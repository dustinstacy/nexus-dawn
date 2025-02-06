import { smlogo } from "@assets"
import { Button, ModalOverlay } from "@components"
import { NextStage } from "src/global.interfaces"

import { onboardingStages } from "../../constants"

import "./HowToPlay.scss"

const HowToPlay = ({ nextStage }: NextStage) => {
    const handleClick = async () => {
        await nextStage()
    }

    return (
        <ModalOverlay>
            <div className='how-to-play stage around-column'>
                <div className='header-wrapper'>
                    <h1 className='header'>
                        {onboardingStages[4].header}
                        <img className='logo abs-center' src={smlogo} alt='small logo' />
                    </h1>
                </div>
                <div className='body box start-column'>
                    <p>{onboardingStages[4].body}</p>
                    <Button label={onboardingStages[4].label as string} onClick={handleClick} />
                </div>
            </div>
        </ModalOverlay>
    )
}

export default HowToPlay
