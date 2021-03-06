const babel = require('babel-core');
const content = `
var React = require('react');

type Props = {
  /** foo comment */
  foo: string,

  // bar comment
  bar: string,

  baz: {
    // subbar comment
    subbar: number,
  },
};

const C = (props: Props) => {
  return <div />;
};

export default C;
`;

it('preserve-comments', () => {
  const res = babel.transform(content, {
    babelrc: false,
    presets: ['@babel/env', '@babel/react', '@babel/flow'],
    plugins: [
      '@babel/syntax-flow',
      require('../'),
      "@babel/plugin-proposal-class-properties"
    ],
  }).code;
  expect(res).toMatchSnapshot();
});
