const ApiBuilder = require('claudia-api-builder')
const metascraper = require('metascraper')
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

  const {body: html, url} = await got(targetUrl)
  const meta = await metascraper({url, html})

  return meta
})

module.exports = api
