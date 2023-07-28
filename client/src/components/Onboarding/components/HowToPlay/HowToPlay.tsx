import { addItemToInventory } from '@api'
import { smlogo } from '@assets'
import { Button, ModalOverlay } from '@components'
import { useGlobalContext } from '@context'
import { NextStage, User } from 'src/global.interfaces'

import { onboardingStages } from '../../constants'

import './HowToPlay.scss'

const HowToPlay = ({ nextStage }: NextStage) => {
    const { user, allItems } = useGlobalContext()

    const handleClick = async () => {
        const rareCard = allItems.find((item) => item.name === 'Rare Card')
        await addItemToInventory(user as User, rareCard)
        await nextStage()
    }

    return (
        <ModalOverlay>
            <div className='how-to-play stage around-column'>
                <div className='header-wrapper'>
                    <h1 className='header'>
                        {onboardingStages[4].header}
                        <img
                            className='logo abs-center'
                            src={smlogo}
                            alt='small logo'
                        />
                    </h1>
                </div>
                <div className='body box start-column'>
                    <p>{onboardingStages[4].body}</p>
                    <Button
                        label={onboardingStages[4].label as string}
                        onClick={handleClick}
                    />
                </div>
            </div>
        </ModalOverlay>
    )
}

export default HowToPlay
