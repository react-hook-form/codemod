import { defineTest } from '../../../utils/defineTest';

/* global jest */
jest.autoMockOff();

const fixtures = [
  'already-migrated',
  'function-component-2',
  'function-component',
  'function-components',
  'no-transform',
  'custom-register',
  'already-migrated-context',
  'function-component-2-context',
  'function-component-context',
  'function-components-context',
  'no-transform-context',
  'custom-register-context'
];

fixtures.forEach(defineTest(__dirname, 'v7/update-register'));
