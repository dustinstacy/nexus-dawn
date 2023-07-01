import React from 'react'
import { describe, it, vi, expect } from 'vitest'
import { render, fireEvent } from '@testing-library/react'
import { CheckBox } from '@pages/Collection/components'

describe('CheckBox', () => {
    it('should call handleClick function when clicked', () => {
        const handleClick = vi.fn()

        const { container } = render(
            <CheckBox handleClick={handleClick} selected={false} />
        )
        expect(handleClick).toHaveBeenCalledTimes(0)

        fireEvent.click(container.firstChild)

        expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should display checked icon when selected prop is true', () => {
        const { container } = render(
            <CheckBox handleClick={() => {}} selected />
        )

        expect(container.querySelector('.check')).toBeDefined()
        expect(container.querySelector('.uncheck')).toBeNull()
    })

    it('should display unchecked icon when selected prop is false', () => {
        const { container } = render(
            <CheckBox handleClick={() => {}} selected={false} />
        )

        expect(container.querySelector('.uncheck')).toBeDefined()
        expect(container.querySelector('.check')).toBeNull()
    })
})
