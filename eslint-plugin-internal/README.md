Eslint plugin to register additional custom rule for Kargo internal use.

## Usage

### Installing requirements

Make sure these package(s) are imported in your project:

* **eslint**: ^5.16.0 || ^6.8.0 || ^7.2.0

```sh
# Alternatively using npx
npx install-peerdeps --dev @kargotech/eslint-plugin-internal
```

### Installing plugin

If you are using npm:

```sh
npm i -D @kargotech/eslint-plugin-internal
```

If you are using yarn:

```
yarn add @kargotech/eslint-plugin-internal -D
```

Add this plugin to your eslint config:

```json
{
  "plugins": ["@kargotech/internal"],
  "rules": {
    "@kargotech/internal/no-useless-boolean": "error",
  }
}
```
