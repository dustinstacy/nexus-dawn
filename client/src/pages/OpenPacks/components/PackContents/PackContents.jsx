import React from 'react'

import { Button, Card } from '@components'

import './PackContents.scss'

// Render contents of opened pack and button to return
const PackContents = ({ packContents, setPackContents }) => (
    <div className='packs-contents fill center'>
        {packContents?.map((data) => (
            <Card key={data._id} card={data} isShowing />
        ))}
        <Button label='Go Back' onClick={() => setPackContents(null)} />
    </div>
)

export default PackContents
