'use client'

import { useState } from 'react'

import api from '@api'
import { Button, TextInput } from '@components'
import { User } from '@interfaces'
import stores from '@stores'

import './promoCode.scss'
import { checkPromoCode } from './utils'

const PromoCode = () => {
	const { addCoin, addExperience } = api
	const { useUserStore } = stores
	const user = useUserStore((state) => state.user)
	const fetchUserData = useUserStore((state) => state.fetchUserData)

	const [promoCode, setPromoCode] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setError('') // Clear any previous errors
		setPromoCode(e.target.value)
	}

	const handleSubmit = async () => {
		setLoading(true)
		try {
			await checkPromoCode(promoCode)
			await addCoin(user as User, 1000000)
			await addExperience(user as User, 100000) // Refresh user data after updating
			fetchUserData('coin')
			fetchUserData('xp')
		} catch (error: any) {
			setError(error.message) // Set the error message for display
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="promo-code">
			<h1>Promo Code</h1>
			<div className="box">
				<div className="wrapper center">
					<TextInput
						label="Enter promo code here"
						name="promoCode"
						value={promoCode}
						onChange={handleInputChange}
						loading={loading}
					/>
				</div>
				{error && <p className="error">{error}</p>}
				<div className="wrapper center">
					<div className="controls">
						<Button
							label="Try that one"
							onClick={handleSubmit}
							disabled={promoCode.length === 0 || loading}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default PromoCode
