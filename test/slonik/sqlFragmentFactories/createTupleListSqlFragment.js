// @flow

import test from 'ava';
import createTupleListSqlFragment from '../../../src/sqlFragmentFactories/createTupleListSqlFragment';
import {
  TupleListTokenSymbol
} from '../../../src/symbols';

test('creates a single tuple with a single parameter', (t) => {
  const sqlFragment = createTupleListSqlFragment({
    tuples: [
      [
        'foo'
      ]
    ],
    type: TupleListTokenSymbol
  }, 0);

  t.assert(sqlFragment.sql === '($1)');
  t.deepEqual(sqlFragment.values, ['foo']);
});

test('creates a comma separated list of tuples with a single parameter', (t) => {
  const sqlFragment = createTupleListSqlFragment({
    tuples: [
      [
        'foo'
      ],
      [
        'bar'
      ],
      [
        'baz'
      ]
    ],
    type: TupleListTokenSymbol
  }, 0);

  t.assert(sqlFragment.sql === '($1), ($2), ($3)');
  t.deepEqual(sqlFragment.values, ['foo', 'bar', 'baz']);
});

test('offsets parameter position', (t) => {
  const sqlFragment = createTupleListSqlFragment({
    tuples: [
      [
        'foo'
      ],
      [
        'bar'
      ],
      [
        'baz'
      ]
    ],
    type: TupleListTokenSymbol
  }, 3);

  t.assert(sqlFragment.sql === '($4), ($5), ($6)');
  t.deepEqual(sqlFragment.values, ['foo', 'bar', 'baz']);
});

test('throws an error if tuple has no members', (t) => {
  t.throws(() => {
    createTupleListSqlFragment({
      tuples: [
        []
      ],
      type: TupleListTokenSymbol
    }, 0);
  }, 'Tuple must have at least 1 member.');
});

test('throws an error if tuple member number is inconsistent', (t) => {
  t.throws(() => {
    createTupleListSqlFragment({
      tuples: [
        [
          'foo',
          'foo'
        ],
        [
          'bar'
        ]
      ],
      type: TupleListTokenSymbol
    }, 0);
  }, 'Each tuple in a list of tuples must have an equal number of members.');
});
