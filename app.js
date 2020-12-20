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
	console.log('### Am I reaching here bau?!!')
	try {
		const { body: html, url } = await got(req.queryString.url)
		console.log('What do I get here: ', url, html)

		return await metascraper({url, html})

	} catch (error) {
		console.log('Getting an error here: ', error.response.body)
	}
})

module.exports = api
