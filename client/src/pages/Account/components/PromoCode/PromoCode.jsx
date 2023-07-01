import React, { useState } from 'react'

import { addCoin, addExperience } from '@api'
import { Button, TextInput } from '@components'
import { useGlobalContext } from '@context'

import { checkPromoCode } from './utils'
import './PromoCode.scss'

const PromoCode = () => {
    const { user, getCurrentUser } = useGlobalContext()

    const [promoCode, setPromoCode] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        setError('') // Clear any previous errors
        setPromoCode(e.target.value)
    }

    const handleSubmit = async (e) => {
        setLoading(true)
        try {
            await checkPromoCode(promoCode)
            await addCoin(user, 1000000)
            await addExperience(user, 100000)
            await getCurrentUser() // Refresh user data after updating
        } catch (error) {
            setError(error.message) // Set the error message for display
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='promo-code'>
            <h1>Promo Code</h1>
            <div className='box center-column'>
                <TextInput
                    label='Enter promo code here'
                    name='promoCode'
                    value={promoCode}
                    onChange={handleInputChange}
                    loading={loading}
                />
                {error && <p className='error'>{error}</p>}
                <Button
                    label='Try that one'
                    onClick={handleSubmit}
                    disabled={promoCode.length === 0 || loading}
                />
            </div>
        </div>
    )
}

export default PromoCode
