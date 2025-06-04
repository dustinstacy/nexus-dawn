'use client'

import Image from 'next/image'
import React, { useState } from 'react'

import './howToPlay.scss'

import { Onboarding } from '@components'
import { useUserStore } from '@stores'

import { howToPlay } from './constants'

const HowToPlay = () => {
	const [currentPage, setCurrentPage] = useState(0)

	const totalPages = howToPlay.length

	const goToPage = (pageIndex: number) => {
		if (pageIndex >= 0 && pageIndex < totalPages) {
			setCurrentPage(pageIndex)
		}
	}

	const user = useUserStore((state) => state.user)
	const stage = user?.onboardingStage ?? {}

	return (
		<div className="how-to-play-container">
			{(stage === 4 || stage === 5) && <Onboarding />}
			<div className="content-wrapper">
				<aside className="toc">
					{howToPlay.map((section, index) => (
						<div
							key={index}
							className={`toc-item ${index === currentPage ? 'active' : ''}`}
							onClick={() => goToPage(index)}
						>
							{section.header}
						</div>
					))}
				</aside>

				<div className="content-area">
					<div className="how-to-play-content">
						<h2>{howToPlay[currentPage].header}</h2>
						{howToPlay[currentPage].body.map((item, i) => (
							<div
								key={i}
								className="section"
							>
								<h3>{item.title}</h3>
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
						>
							Previous
						</button>
						<button
							onClick={() => goToPage(currentPage + 1)}
							disabled={currentPage === totalPages - 1}
							className="next-button"
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
