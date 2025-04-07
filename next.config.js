/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "api.deepai.org",
				pathname: "/job-view-file/**",
			},
		],
	},
};

module.exports = nextConfig;
