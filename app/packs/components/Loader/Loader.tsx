import utils from '@utils'

import './loader.scss'

interface Loader {
	depth: number
}

// Loader component that renders a recursive pattern of squares
const Loader = ({ depth }: Loader) => {
	const renderSquares = (currentDepth: number) => {
		if (currentDepth <= 0) {
			return null
		}

		// Determine the CSS classes for the square based on the current depth
		const squareClasses = utils.classSet(
			'square',
			currentDepth % 2 == 0 ? 'white' : 'background-gradient'
		)

		// Recursively render the nested squares
		return (
			<div
				className={squareClasses}
				data-cy="square"
			>
				{renderSquares(currentDepth - 1)}
			</div>
		)
	}

	return (
		<div className="container">
			<div className="square black">{renderSquares(depth)}</div>
		</div>
	)
}

export default Loader
