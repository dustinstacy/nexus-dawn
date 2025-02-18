import { ReactNode } from "react"

import "./modalOverlay.scss"

// Screen overlay to disable and blur all elements behind Modal/Alert
// children: The desired Modal/Alert to be rendered
const ModalOverlay = ({ children }: { children: ReactNode }) => {
    return <div className='modal fill center-column'>{children}</div>
}

export default ModalOverlay
