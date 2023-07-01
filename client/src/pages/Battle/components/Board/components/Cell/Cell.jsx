import React from 'react'

import { classSet } from '@utils'

import './Cell.scss'

// Renders a single cell to be used on the board
const Cell = ({
    id,
    handleClick,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    cardSelected,
    children,
}) => {
    const cellClasses = classSet(
        'cell',
        'center',
        cardSelected && 'card-selected'
    )

    return (
        <div
            className={cellClasses}
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            id={id}
        >
            {children}
        </div>
    )
}

export default Cell
