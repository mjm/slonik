// @flow

import test from 'ava';
import sql from '../../../../src/templateTags/sql';
import {
  SqlTokenSymbol
} from '../../../../src/symbols';

test('creates an object describing a query with inlined identifiers', (t) => {
  const query = sql`SELECT ${'foo'} FROM ${sql.identifier(['bar'])}`;

  t.deepEqual(query, {
    sql: 'SELECT $1 FROM "bar"',
    type: SqlTokenSymbol,
    values: [
      'foo'
    ]
  });
});

test('creates an object describing a query with inlined identifiers (specifier)', (t) => {
  const query = sql`SELECT ${'foo'} FROM ${sql.identifier(['bar', 'baz'])}`;

  t.deepEqual(query, {
    sql: 'SELECT $1 FROM "bar"."baz"',
    type: SqlTokenSymbol,
    values: [
      'foo'
    ]
  });
});

test('the resulting object is immutable', (t) => {
  const token = sql.identifier(['bar', 'baz']);

  t.throws(() => {
    // $FlowFixMe
    token.foo = 'bar';
  });
});
