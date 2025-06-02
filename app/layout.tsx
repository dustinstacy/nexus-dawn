import type { Metadata } from 'next'
import { ToastContainer } from 'react-toastify'

import ClientLayout from './client-layout'
import './setup'

export const metadata: Metadata = {
	title: 'Nexus Dawn',
	icons: {
		icon: [{ url: '/favicon.png' }]
	},
	description: 'Nexus Dawn, Triple Triad reborn.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body>
				<ClientLayout>{children}</ClientLayout>
				<ToastContainer />
			</body>
		</html>
	)
}
