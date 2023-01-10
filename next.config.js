const { withSentryConfig } = require('@sentry/nextjs')

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
// 	enabled: process.env.ANALYZE === 'true',
// })

// ToDo: Investigate how to use Bundle Analyzer in the remote builds
// const moduleExports = withBundleAnalyzer({
const moduleExports = {
  experimental: {
    craCompat: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: 'graphql-tag/loader',
    })

    // Important: return the modified config
    return config
  },
  // Remove this to leverage Next.js' static image handling
  // read more here: https://nextjs.org/docs/api-reference/next/image
  images: {
    disableStaticImages: true,
  },
  async rewrites() {
    return process.env.NEXT_PUBLIC_PROXY
      ? [
          {
            source: '/api/:p*',
            destination: `${process.env.NEXT_PUBLIC_PROXY}/api/:p*`,
          },
        ]
      : []
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  dryRun: true,
  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
}

module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions)
