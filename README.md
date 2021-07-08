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

On Lambda, preferably use a 1024MB memory for this function. Pick up a free account/tier, deploy. With a 192MB memory, the function takes approximately 4 seconds. With a 1024 MB memory, a function takes 600ms to 1200ms (depends on the time of response of the website being scraped and on the complexity of the HTML being received. Parsing the HTML is the most intensive of the actions.


UPDATES - USE FROM HERE:

Lambda has updates is re2 library and I am forced to build a docker image and deploy from this image instead of local Node

1. Should have a docker file that is usd to build a local Node 12.x image
2. In project root run: 'docker build -t lambda-deploy .'
3. At 2. I created the image, I now run the image and create my node environment from which I will deploy/update with Claudia to Lambda
4. I run Node in docker with a bash: 'docker run -e AWS_ACCESS_KEY_ID=xxxx -e AWS_SECRET_ACCESS_KEY=yyy -it lambda-deploy /bin/bash'. Credential can be found in the config file mentioned above.
5. At the bash prompt do 'npm run update' or 'npm run deploy'. 

CORS examples: https://github.com/claudiajs/example-projects/blob/master/web-api-custom-cors/web.js

if I have a previously created container in the local docker, connect to it
```javascript
docker attach amazing_pasteur
```
and run 5 from there.