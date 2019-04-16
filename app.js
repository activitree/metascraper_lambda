const ApiBuilder = require('claudia-api-builder')
const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-description')(),
	require('metascraper-image')(),
	require('metascraper-logo')(),
	require('metascraper-clearbit-logo')(),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')()
])
const got = require('got')
const api = new ApiBuilder()

api.post('/metascraper', async req => {
  if (!req.hasOwnProperty('queryString') || !req.queryString.hasOwnProperty('url')) {
    throw new Error('Invalid request. url parameter missing')
  }
  // Check if it's a somewhat valid URL
  let targetUrl = req.queryString.url

  if (!/^(http|https):\/\/[^ ']+$/.test(targetUrl)) {
    // Check if maybe only the http part is missing?
    targetUrl = 'http://' + targetUrl

    if (!/^(http|https):\/\/[^ ']+$/.test(targetUrl)) {
      throw new Error('Invalid request. url invalid or non-HTTP(S)')
    }
  }

	try {
		const { body: html, url } = await got(targetUrl)

		return await metascraper({url, html})

	} catch (error) {
		console.log(error.response.body)
	}
})

module.exports = api
