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
  require('metascraper-youtube')(),
  require('metascraper-iframe')(),
  require('metascraper-instagram')(),
  require('metascraper-media-provider')(),
  require('metascraper-telegram')(),
  require('metascraper-spotify')(),
])
const got = require('got')
const api = new ApiBuilder()
// api.corsOrigin('https://www.activitree.com')

api.corsOrigin(function (request) {
  'use strict';
  console.log('got request', JSON.stringify(request));
  console.log('si aici?', request.normalizedHeaders.origin);
  if (request.normalizedHeaders.origin?.includes('https://www.activitree.com')
	|| request.normalizedHeaders.origin?.includes('http://192.168.1.72:3000')) {
	return request.normalizedHeaders.origin;
  }
  return '';
});



api.corsHeaders('Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Api-Version')
api.corsMaxAge(6000) // seconds

api.post('/metascraper', async req => {
	// console.log('### Am I reaching here bau?!!')
	try {
		const { body: html, url } = await got(req.queryString.url)
		// console.log('What do I get here: ', url, html)

		return await metascraper({url, html})

	} catch (error) {
		console.log('Getting an error here: ', error.response.body)
	}
})

module.exports = api
