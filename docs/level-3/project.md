# Running a Project

To create and run a TypeScript project using the Serverless Stack (SST) framework, you need to follow a series of steps. 


Install SST CLI: First, install the SST CLI globally using npm:
```bash
npm install -g serverless-stack-cli
sst init my-sst-project --language typescript
cd my-sst-project
```

The project will have a default setup with a few directories and files, including:

* `lib/`: Where your stack is defined.
* `test/`: Contains test files.
* `package.json`: Defines project dependencies and scripts.

## Development
Write Your Application Code: In the lib/ directory, you'll find a sample stack. You can modify this or add new stacks as needed.


### Install project dependencis

Install Dependencies: If your project needs additional npm packages, install them using npm:

```bash
pnpm i
```

### Running Locally

Start the Live Lambda Development Environment:

```bash
pnpm start
```

### Deploy

```bash
pnpm run deploy --stage prod
```

### Remove all assets for a given project

```bash
pnpm run destroy
```

