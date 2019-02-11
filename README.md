# typescript-transformer-jsx-remove-data-test-id

Remove `data-test-id` attributes from production builds. Similar to [babel-plugin-jsx-remove-data-test-id](https://github.com/coderas/babel-plugin-jsx-remove-data-test-id)

# Installation

```bash
yarn add --dev typescript-transformer-jsx-remove-data-test-id
```

# Usage

## Set up the transformer

Currently, typescript does not provide a way to use custom transformers without creating your own compiler on top of it.

However, it can be used with `webpack` with `ts-loader` or `awesome-typescript-loader`

```js
const { removeDataTestIdTransformer } = require('typescript-transformer-jsx-remove-data-test-id');

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader', // or 'awesome-typescript-loader'
        options: {
          // ... other options
          getCustomTransformers: () => ({
            before: [removeDataTestIdTransformer()]
          })
        }
      }
    ]
  }
  // ...
};
```

## Add the attribute

Add `data-test-id` to your components

```typescript jsx
function TestComponent() {
  return <div data-test-id="test-component">Test</div>;
}
```
