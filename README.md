# metascraper_lambda

Inspired by https://github.com/Tobi042/metascraper-lambda
Built with:
	
	1. Claudia.js - deploy Javascript environments to Lambda
	
	2. claudia-api-builder - used to build an API gateway in lambda where the metascraping service can be accessed like :
	https://...your_lambda_endpoint/metascraper?url=<your url>?_escaped_fragment_=
	
	3. got - Promise based requests
	
	4. metasraper from https://metascraper.js.org/#/
	
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

	
