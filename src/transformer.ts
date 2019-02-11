import * as ts from 'typescript';

export function removeDataTestIdTransformer<
  T extends ts.Node
>(): ts.TransformerFactory<T> {
  return context => {
    const visit: ts.Visitor = node => {
      if (ts.isJsxAttribute(node)) {
        if (node.name.getText() === 'data-test-id') {
          return undefined;
        }
      }
      return ts.visitEachChild(node, visit, context);
    };

    return node => ts.visitNode(node, visit);
  };
}
