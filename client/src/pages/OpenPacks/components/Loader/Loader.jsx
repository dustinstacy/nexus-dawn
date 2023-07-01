import React from 'react'

import { classSet } from '@utils'
import './Loader.scss'

// Loader component that renders a recursive pattern of squares
const Loader = ({ depth }) => {
    const renderSquares = (currentDepth) => {
        if (currentDepth === 0) {
            return null
        }

        // Determine the CSS classes for the square based on the current depth
        const squareClasses = classSet(
            'square',
            currentDepth % 2 == 0 ? 'white' : 'background-gradient'
        )

        // Recursively render the nested squares
        return (
            <div className={squareClasses}>
                {renderSquares(currentDepth - 1)}
            </div>
        )
    }

    return (
        <div className='container'>
            <div className='square black'>{renderSquares(depth)}</div>
        </div>
    )
}

export default Loader
