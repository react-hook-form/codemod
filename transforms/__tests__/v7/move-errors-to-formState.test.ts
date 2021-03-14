import { defineTest } from '../../../utils/defineTest';

/* global jest */
jest.autoMockOff();

const fixtures = [
  'function-component',
  'function-component-context',
  'with-custom-errors',
  'with-custom-errors-context',
  'with-formState-1',
  'with-formState-1-context',
  'with-formState-2',
  'with-formState-2-context',
  'with-formState-3',
  'with-formState-3-context',
  'already-migrated',
  'already-migrated-context'
];

fixtures.forEach(defineTest(__dirname, 'v7/move-errors-to-formState'));
