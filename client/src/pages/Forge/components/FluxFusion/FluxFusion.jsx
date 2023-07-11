import React from 'react'

import { Button } from '@components'

import './FluxFusion.scss'

const FluxFusion = ({ setFluxFusion }) => {
    return (
        <div>
            <Button label='Exit' onClick={() => setFluxFusion(false)} />
        </div>
    )
}

export default FluxFusion
