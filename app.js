const ApiBuilder = require('claudia-api-builder')
const metascraper = require('metascraper')([
	require('metascraper-author')(),
	require('metascraper-date')(),
	require('metascraper-description')(),
	require('metascraper-image')(),
	require('metascraper-logo')(),
	require('metascraper-clearbit')({
		size: 256,
		format: 'jpg'
	}),
	require('metascraper-publisher')(),
	require('metascraper-title')(),
	require('metascraper-url')(),
	require('metascraper-soundcloud')(),
	require('metascraper-video')(),
	require('metascraper-youtube')()
])
const got = require('got')
const api = new ApiBuilder()

api.post('/metascraper', async req => {

	// let targetUrl = req.queryString.url

	/*
  if (!req.hasOwnProperty('queryString') || !req.queryString.hasOwnProperty('url')) {
    throw new Error('Invalid request. url parameter missing')
  }
  // Check if it's a somewhat valid URL

  if (!/^(http|https):\/\/[^ ']+$/.test(targetUrl)) {
    // Check if maybe only the http part is missing?
    targetUrl = 'http://' + targetUrl

    if (!/^(http|https):\/\/[^ ']+$/.test(targetUrl)) {
      throw new Error('Invalid request. url invalid or non-HTTP(S)')
    }
  }*/

	try {
		const { body: html, url } = await got(req.queryString.url)

		return await metascraper({url, html})

	} catch (error) {
		console.log(error.response.body)
	}
})

module.exports = api
