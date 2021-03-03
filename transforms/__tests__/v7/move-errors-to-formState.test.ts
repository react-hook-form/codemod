import { defineTest } from '../../../utils/defineTest';

/* global jest */
jest.autoMockOff();

const fixtures = [
  'function-component',
  'with-custom-errors',
  'with-formState-1',
  'with-formState-2',
  'with-formState-3',
  'already-migrated'
];

fixtures.forEach(defineTest(__dirname, 'v7/move-errors-to-formState'));
