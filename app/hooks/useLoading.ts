"use-client"
/**
 * Custom Hook: useToggle
 *
 * A reusable hook that manages a boolean toggle state.
 *
 * @param {boolean} initialState - The initial state of the toggle (default: false).
 * @returns {Array} An (tuple) array containing the toggle state, toggle function, and a manual toggle state setter.
 *
 * Usage:
 *    const [isOpen, toggleIsOpen, setToggleIsOpen] = useToggle();
 *    - isToggled: The current state of the toggle (true/false).
 *    - toggle: A function to toggle the state between true and false.
 *    - setToggleIsOpen: Set state of isOpen to desired value
 */
import { useState } from "react"

const useLoading = ()  => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);
  
    return {
      isLoading,
      startLoading,
      stopLoading,
    };
}

export default useLoading
