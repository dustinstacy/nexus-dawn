/**
 * Custom Hook: useToggle
 *
 * A reusable hook that manages a boolean toggle state.
 *
 * @param {boolean} initialState - The initial state of the toggle (default: false).
 * @returns {Array} An array containing the toggle state and toggle function.
 *
 * Usage:
 *    const [isOpen, toggleIsOpen, setToggleIsOpen] = useToggle();
 *    - isToggled: The current state of the toggle (true/false).
 *    - toggle: A function to toggle the state between true and false.
 *    - setToggleIsOpen: Set state of isOpen to desired value
 */
import { useState } from 'react'

const useToggle = (initialState = false) => {
    const [toggleState, setToggleState] = useState(initialState)

    const toggle = () => {
        setToggleState((prevState) => !prevState)
    }

    return [toggleState, toggle, setToggleState]
}

export default useToggle
