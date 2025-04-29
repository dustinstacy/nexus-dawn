export const getCroppedImg = async (
	imageSrc: string,
	crop: { x: number; y: number; width: number; height: number },
	userName: string
) => {
	const avatarDimensions = { x: 192, y: 192 }
	const image = new Image()
	image.src = imageSrc

	return new Promise<File>((resolve, reject) => {
		image.onload = () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')

			if (!ctx) {
				return reject(new Error('Failed to get canvas context'))
			}

			canvas.width = avatarDimensions.x
			canvas.height = avatarDimensions.y

			ctx.drawImage(
				image,
				crop.x,
				crop.y,
				crop.width,
				crop.height,
				0,
				0,
				canvas.width,
				canvas.height
			)

			canvas.toBlob((blob) => {
				if (!blob) {
					return reject(new Error('Failed to create blob'))
				}
				resolve(new File([blob], `${userName.replaceAll(' ', '_')}_avatar`, { type: 'image/jpeg' }))
			}, 'image/jpeg')
		}

		image.onerror = (error) => reject(error)
	})
}
