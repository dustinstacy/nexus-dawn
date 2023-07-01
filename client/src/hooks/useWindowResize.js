/**
 * Custom Hook: useWindowResize
 *
 * A reusable hook to track and retrieve the dimensions of the window.
 *
 * @returns {Object} The current dimensions of the window, containing `height` and `width` properties.
 *
 * Usage:
 *    const { height, width } = useWindowResize();
 *    - height: The current height of the window.
 *    - width: The current width of the window.
 **/
import { useState, useEffect } from 'react'

const useWindowResize = () => {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    })

    const handleResize = () => {
        setDimensions({
            height: window.innerHeight,
            width: window.innerWidth,
        })
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return dimensions
}

export default useWindowResize
