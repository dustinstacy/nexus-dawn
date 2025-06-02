import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: false,
	images: {
		domains: ['res.cloudinary.com']
	}
	// compiler: {
	// 	reactRemoveProperties: {
	// 		properties: ['data-cy']
	// 	}
	// }
}

export default nextConfig
