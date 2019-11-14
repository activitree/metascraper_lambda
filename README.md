# metascraper_lambda

<a href="https://www.repostatus.org/#active"><img src="https://www.repostatus.org/badges/latest/active.svg" alt="Project Status: Active – The project has reached a stable, usable state and is being actively developed." /></a>

Inspired by https://github.com/Tobi042/metascraper-lambda
Built with:
	
	1. Claudia.js - deploy Javascript environments to Lambda
	
	2. claudia-api-builder - used to build an API gateway in lambda where the metascraping service can be accessed like :
	https://...your_lambda_endpoint/metascraper?url=<your url>?_escaped_fragment_=
	
	3. got - Promise based requests
	
	4. metascraper from https://metascraper.js.org/#/
	
### Few instructions:
On OSX, it requires 2 files in the user root directory:
/.aws/config
```
[default]
output = json
region = eu-west-2 // or your prefered region
```


/.aws/credentials

```
[default]
aws_access_key_id = YOURKEYNOQUOTES
aws_secret_access_key = yoursecretnoquotes
```

On Lambda, preferably use a 1024MB memory for this function. Pick up a free account/tier, deploy. With a 192MB memory, the function takes arpximately 4 seconds. With a 1024 MB memory, a function takes 600ms to 1200ms (depends on the time of response of the website being scraped and on the complexity of the HTML being received. Parsing the HTML is the most intensive of the actions.
