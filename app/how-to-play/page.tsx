'use client'

import Image from 'next/image'
import { useState } from 'react'

import { howToPlay } from './constants'
import './howToPlay.scss'

const HowToPlay = () => {
	const [currentPage, setCurrentPage] = useState(0)
	const totalPages = howToPlay.length

	const goToPage = (pageIndex: number) => {
		if (pageIndex >= 0 && pageIndex < totalPages) {
			setCurrentPage(pageIndex)
		}
	}

	return (
		<div className="how-to-play-container">
			<div className="content-wrapper">
				<aside className="toc">
					{howToPlay.map((section, index) => (
						<div
							key={index}
							className={`toc-item ${index === currentPage ? 'active' : ''}`}
							onClick={() => goToPage(index)}
							data-cy="toc-item"
						>
							{section.header}
						</div>
					))}
				</aside>

				<div className="content-area">
					<div className="how-to-play-content">
						<h2 data-cy="how-to-play-heading">{howToPlay[currentPage].header}</h2>
						{howToPlay[currentPage].body.map((item, i) => (
							<div
								key={i}
								className="section"
								data-cy="section"
							>
								<h3 data-cy="section-title">{item.title}</h3>
								<ul className="rules-list">
									{item.content.map((point, j) => (
										<li key={j}>{point}</li>
									))}
								</ul>
								{item.imageSrc && (
									<div className="rule-image-container">
										<Image
											src={item.imageSrc}
											alt={item.title}
											className="rule-image"
										/>
									</div>
								)}
							</div>
						))}
					</div>

					<div className="nav-buttons">
						<button
							onClick={() => goToPage(currentPage - 1)}
							disabled={currentPage === 0}
							className="previous-button"
							data-cy="previous-button"
						>
							Previous
						</button>
						<button
							onClick={() => goToPage(currentPage + 1)}
							disabled={currentPage === totalPages - 1}
							className="next-button"
							data-cy="next-button"
						>
							Next
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default HowToPlay
