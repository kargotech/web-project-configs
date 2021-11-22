This is the sensible base eslint config for general typescript project at Kargo.

## Usage

### Installing requirements

Since our configs are extending Airbnb's, we need the [following devDependencies](https://github.com/airbnb/javascript/blob/36f23d7886e42aaa5530d2da0541b1f3faf8b4a6/packages/eslint-config-airbnb-base/package.json#L68-L69) to be imported in your project:

* **eslint**: ^5.16.0 || ^6.8.0 || ^7.2.0
* **eslint-plugin-import**: ^2.22.1
* **typescript**:
* **@typescript-eslint/eslint-plugin**: ^5.4.0,
* **@typescript-eslint/parser**: 5.4.0,
* **typescript**: ^4.5.2

Or simply:

```sh
npx install-peerdeps --dev @kargotech/eslint-config-base
npx install-peerdeps --dev @kargotech/eslint-config-typescript-base
```

### Installing config

If you are using npm:

```sh
npm i -D @kargotech/eslint-config-typescript-base
```

If you are using yarn:

```
yarn add @kargotech/eslint-config-typescript-base -D
```

Add this config to your eslint config:

```json
{
  "extends": "@kargotech/eslint-config-typescript-base"
}
```
