'use client'

import Link from 'next/link'

import { Onboarding } from '@components'
import { mainPanels, subPanels } from '@constants'
import { User } from '@interfaces'
import stores from '@stores'
import { classSet } from '@utils'

import ClientLayout from './client-layout'
import './styles/home.scss'

export default function Home() {
	const { useUserStore } = stores
	const user = useUserStore((state) => state.user)

	const stage = user?.onboardingStage ?? {}

	const linkClasses = (className: string, type: string) =>
		classSet(`${className}-${type}`, 'panel', 'start-column', !user ? 'disabled' : '')

	return (
		<ClientLayout>
			{(stage as number) <= 5 && <Onboarding />}
			<div className="home page start">
				<div className="home-wrapper ">
					{mainPanels.map((panel) => (
						<Link
							key={panel.className}
							href={panel.to}
							className={linkClasses(panel.className, panel.type)}
						>
							<p>{panel.text}</p>
							<h1>{panel.header}</h1>
						</Link>
					))}
					<div className="subs start-column">
						{subPanels(user as User).map((panel) => (
							<Link
								key={panel.className}
								href={panel.to}
								className={linkClasses(panel.className, panel.type)}
							>
								{panel.jsx}
							</Link>
						))}
						<a
							className={linkClasses('contact', 'sub')}
							href="https://discord.gg/TTn4pCHxXT"
						>
							<h2>Contact</h2>
						</a>
					</div>
				</div>
			</div>
		</ClientLayout>
	)
}
