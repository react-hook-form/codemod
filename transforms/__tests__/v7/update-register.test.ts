import { defineTest } from '../../../utils/defineTest';

/* global jest */
jest.autoMockOff();

const fixtures = [
  'already-migrated',
  'function-component-2',
  'function-component',
  'function-components',
  'no-transform',
  'with-destructure-rename'
];

fixtures.forEach(defineTest(__dirname, 'v7/update-register'));
