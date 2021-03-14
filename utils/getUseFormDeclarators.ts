import {
  ASTPath,
  Collection,
  ImportDeclaration,
  JSCodeshift,
  VariableDeclarator
} from 'jscodeshift';
import { REACT_HOOK_FORM, USE_FORM } from './keys';

export function findUseFormImportDeclarations(
  root: Collection<any>,
  j: JSCodeshift
) {
  /**
   * We search for all react-hook-form's imports
   * @example
   *  import { ... } from "react-hook-form"
   * */
  const reactHookFormImports = root.find(j.ImportDeclaration, {
    source: { value: REACT_HOOK_FORM }
  });

  return reactHookFormImports;
}

export const findUseFormDeclarators = (
  root: Collection<any>,
  j: JSCodeshift,
  specifierName = USE_FORM
) => (
  path: ASTPath<ImportDeclaration>
): Collection<VariableDeclarator> | null => {
  /**
   * We search for `useForm` in import node
   * @example
   *  import { useForm } from "react-hook-form";
   *           ^
   * */
  const useFormImport = path.value.specifiers.find(
    (specifier) =>
      specifier.type === 'ImportSpecifier' &&
      specifier.imported.name === specifierName
  );

  if (!useFormImport) return null;

  /**
   * Retrieve useForm method name: `useForm` or `useFormCustomName`
   * @example
   *  import { useForm } from "react-hook-form";
   *  import { useForm: useFormCustomName } from "react-hook-form";
   * */
  const useForm = useFormImport.local.name;

  /**
   * We search for all uses of `useForm` or `useFormCustomName`
   * @example
   *   const { ... } = useForm();
   *   const { ... } = useFormCustomName();
   * */
  return root.find(j.VariableDeclarator, {
    init: { callee: { name: useForm } }
  });
};
