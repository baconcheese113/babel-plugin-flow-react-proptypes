const babel = require('babel-core');
const content = `
import type {NamedType} from './foo';
import type DefaultType from './bar';

type FooProps = {
  an_imported_named_type: NamedType,
  an_imported_default_type: DefaultType,
  optional_property?: NamedType,
  can_be_null_property: ?DefaultType,
  a_global_type: Date,
  a_undefined_type: FooBarBaz,
};

class C extends React.Component {
    props: FooProps
};
`;

it('import-object', () => {
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
