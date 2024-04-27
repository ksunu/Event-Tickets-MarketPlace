module.exports = {
  env: {
    stripePublicKey: process.env.STRIPE_KEY
  },
  webpack: config => {
    config.watchOptions.poll = 300
    return config
  }
}