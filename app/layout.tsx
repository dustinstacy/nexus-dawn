import type { Metadata } from "next"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import ClientLayout from "./client-layout"
import "./styles/base.scss"
import "./styles/layout.scss"
import "./styles/modules.scss"
import "./styles/state.scss"
import "./styles/theme.scss"

export const metadata: Metadata = {
    title: "Nexus Dawn",
    icons: {
        icon: [{ url: "/favicon.png" }],
    },
    description: "Nexus Dawn, Triple Triad reborn.",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
                <ClientLayout>{children}</ClientLayout>
                <ToastContainer />
            </body>
        </html>
    )
}
