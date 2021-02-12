import path from 'path';
import { defineTest as jscodeshiftDefineTest } from 'jscodeshift/dist/testUtils';

export const defineTest = (basePath: string, testDirectory: string) => (
  testSuite: string
): void =>
  jscodeshiftDefineTest(
    path.join(basePath, '..'),
    testDirectory,
    null,
    `${testDirectory}/${testSuite}`
  );
