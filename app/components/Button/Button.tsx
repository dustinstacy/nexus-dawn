import { useRouter } from "next/navigation"
import React from "react"

import { classSet } from "@utils"

import "./button.scss"

interface ButtonProps {
    label: string
    type?: string
    path?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    disabled?: boolean
    onKeyDown?: boolean
}

// Renders button component that can function as a navigation link or a custom onClick function.
// Set the prop 'type' to 'link' and provide a 'path' to navigate to a specific page.
// Set the prop 'onClick' to define a custom function to execute on button click.
const Button = ({ label, type, path, onClick, disabled }: ButtonProps) => {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        type === "link" ? router.push(`${path}`) : onClick?.(e)
    }

    const buttonClasses = classSet("button", "center", disabled ? "disabled" : "")

    return (
        <button className={buttonClasses} onClick={(e) => handleClick(e)}>
            <span>{label}</span>
        </button>
    )
}

export default Button
