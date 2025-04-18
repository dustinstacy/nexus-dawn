"use-client"
/**
 * Custom Hook: useLoading
 *
 * A reusable hook that manages a boolean load state.
 *
 * @returns {Array} An (tuple) array containing the loading state, start load function, and a stop load function
 *
 * Usage:
 *    const [isLoading, startLoading, stopLoading] = useLoading();
 *    - isLoading: The current state of the loader (true/false).
 *    - startLoading: Function to set the loading state to true.
 *    - stopLoading: Function to set the loading state to false
 */
import { useState } from "react"

type LoadingState = [boolean, () => void, () => void]
const useLoading = () : LoadingState  => {
    const [isLoading, setIsLoading] = useState(false);

    const startLoading = () => setIsLoading(true);
    const stopLoading = () => setIsLoading(false);
  
    return [
      isLoading,
      startLoading,
      stopLoading,
    ];
}

export default useLoading
