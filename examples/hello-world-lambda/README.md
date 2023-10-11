# Hello World Lambda

Deploys a single lambda with associated url

1. pnpm dev
2. curl <lambda-url>
```bash
curl https://ssuedzhr7fmkkprws3w6lms2k40ajndt.lambda-url.eu-north-1.on.aws/ | jq
#   {
#     "hello": "world"
#   }
```
3. pnpm run deploy
4. 
```bash
curl https://ssuedzhr7fmkkprws3w6lms2k40ajndt.lambda-url.eu-north-1.on.aws/ | jq
#   {
#     "hello": "world"
#   }
```
5. pnpm run remove
