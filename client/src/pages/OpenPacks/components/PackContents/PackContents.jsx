import React from 'react'

import { Button, Card } from '@components'
import { useGlobalContext } from '@context'

import './PackContents.scss'

// Render contents of opened pack and button to return
const PackContents = ({ packContents, setPackContents }) => {
    const { user } = useGlobalContext()
    const stage = user?.onboardingStage

    return (
        <div className='packs-contents fill center'>
            {packContents?.map((data) => (
                <Card key={data._id} card={data} isShowing />
            ))}
            <Button
                label='Go Back'
                onClick={() => setPackContents(null)}
                disabled={stage < 5}
            />
        </div>
    )
}

export default PackContents
