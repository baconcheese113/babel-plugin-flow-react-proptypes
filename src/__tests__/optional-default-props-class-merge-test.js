const babel = require('babel-core');
const content = `
var React = require('react');
var PropTypes = require('prop-types');

type FooProps = {
  a: number,
  b: number,
  c: string,
}

class Foo extends React.Component<FooProps> {
  static defaultProps = {
    a: 7
  }

  static propTypes = {
    a: PropTypes.string
  }

  render() {
    return (
      <div>
        {this.props.a}
        {this.props.b}
        {this.props.c}
      </div>
    );
  }
}

export default Foo;
`;

it('optional-default-props-class-merge-test', () => {
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
