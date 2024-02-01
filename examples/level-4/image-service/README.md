# Image Transformer

## Usage

- `pnpm install`
- `pnpm sst dev` - for development mode
- `pnpm sst deploy` - to deploy

### Upload image(s)

```bash
curl -X PUT -F "image=@tests/testImages/check.png" <endpoint>/images | jq
#{
#  "image": "09602343-80aa-4e87-b71f-2c71f61f1040"
#}
```

### Read image(s)

```bash
# Original
curl -L <endpoint>/images/09602343-80aa-4e87-b71f-2c71f61f1040 --output tmp.png

# Dynamic Sizing
curl -L <endpoint>/images/09602343-80aa-4e87-b71f-2c71f61f1040\?w\=150\&h\=150 --output tmp.png
```
