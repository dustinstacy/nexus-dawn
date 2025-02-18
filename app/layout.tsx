import type { Metadata } from "next"
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
    viewport: "width=device-width, initial-scale=1",
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
            </body>
        </html>
    )
}
