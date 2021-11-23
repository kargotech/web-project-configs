This is the eslint annotator used in Kargo projects that uses eslint with Github Action.

## Usage

### Installing requirements

```sh
npx install-peerdeps --dev @kargotech/eslint-annotator-github
```

### Installing annotator

If you are using npm:

```sh
npm i -D @kargotech/eslint-annotator-github
```

If you are using yarn:

```
yarn add @kargotech/eslint-annotator-github -D
```

### Using the annotator

```sh
eslint -f @kargotech/eslint-annotator-github
```
