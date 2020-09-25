import * as ts from 'typescript';
import { removeDataTestIdTransformer } from '../src/transformer';

function transform(source: string) {
  return ts
    .transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2015,
        jsx: ts.JsxEmit.Preserve
      },
      transformers: { before: [removeDataTestIdTransformer()] }
    })
    .outputText.trim();
}

test('removes data-test-id', () => {
  const source = '<div data-test-id="test-el"></div>;';
  expect(transform(source)).toBe('<div></div>;');
});

test('removes nested data-test-id', () => {
  const source = '<div><span data-test-id="test-el">nested</span></div>;';
  expect(transform(source)).toBe('<div><span>nested</span></div>;');
});

test('keeps other data-* props', () => {
  const source = '<div data-other-prop></div>;';
  expect(transform(source)).toBe(source);
});

test('keeps props that contain data-test-id in their name', () => {
  const source = '<div almost-data-test-id=""></div>;';
  expect(transform(source)).toBe(source);
});

test('does not remove data-test-id inside a string', () => {
  let source = 'const a = \'data-test-id="id"\';';
  expect(transform(source)).toBe(source);

  source = 'const b = \'<div data-test-id="test-id"></div>\';';
  expect(transform(source)).toBe(source);
});

test('removes data-testid pattern', () => {
  const source = '<div><span data-testid="test-el">nested</span></div>;';
  expect(transform(source)).toBe('<div><span>nested</span></div>;');
});