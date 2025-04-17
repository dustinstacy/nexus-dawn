import React, { MouseEventHandler } from 'react'

import { classSet } from '@utils'

import './cell.scss'

interface CellProps {
	id: number
	handleClick: MouseEventHandler<HTMLDivElement> | undefined
	handleDragEnter: MouseEventHandler<HTMLDivElement> | undefined
	handleDragLeave: MouseEventHandler<HTMLDivElement> | undefined
	handleDragOver: MouseEventHandler<HTMLDivElement> | undefined
	handleDrop: MouseEventHandler<HTMLDivElement> | undefined
	cardSelected: boolean
	children: React.ReactNode
}

// Renders a single cell to be used on the board
const Cell = ({
	id,
	handleClick,
	handleDragEnter,
	handleDragLeave,
	handleDragOver,
	handleDrop,
	cardSelected,
	children
}: CellProps) => {
	const cellClasses = classSet(
		'cell',
		'center',
		cardSelected ? 'card-selected' : ''
	)

	return (
		<div
			className={cellClasses}
			onClick={handleClick}
			onDragEnter={handleDragEnter}
			onDragLeave={handleDragLeave}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
			id={id.toString()}
		>
			{children}
		</div>
	)
}

export default Cell
