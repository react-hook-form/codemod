import { FileInfo, API } from 'jscodeshift';
import { REACT_HOOK_FORM, REGISTER, USE_FORM } from '../../utils/keys';

/**
 * `update-register` codemod which transforms react-hook-form v6 register api to v7
 */
export default function transformer(file: FileInfo, api: API, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true
  };

  /**
   * We search for all react-hook-form's imports
   * @example
   *  import { ... } from "react-hook-form"
   * */
  const reactHookFormImports = root.find(j.ImportDeclaration, {
    source: { value: REACT_HOOK_FORM }
  });

  reactHookFormImports.forEach((pathImport) => {
    /**
     * We search for `useForm` in import node
     * @example
     *  import { useForm } from "react-hook-form";
     *           ^
     * */
    const useFormImport = pathImport.value.specifiers.find(
      (specifier) =>
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.name === USE_FORM
    );

    if (!useFormImport) return;

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
    const useFormDeclarators = root.find(j.VariableDeclarator, {
      init: { callee: { name: useForm } }
    });

    useFormDeclarators.forEach((useFormDeclarator) => {
      /**
       * We search for all `register` properties
       * @example
       *  const { register } = useForm();
       *          ^
       * */
      const registerProperties = j(useFormDeclarator).find(j.Identifier, {
        name: REGISTER
      });

      registerProperties.forEach((registerProperty) => {
        /**
         * Retrieve `register` property name
         * @example
         *  const { register } = useForm();
         *  const { register: registerCustomName } = useForm();
         * */
        const register = registerProperty.parentPath.value.value.name;

        /**
         * Retrieve the related parent component
         */
        j(registerProperty)
          .closestScope()
          .forEach((component) => {
            /**
             * We search for all `register`
             * */
            const registerIdentifiers = j(component).find(j.Identifier, {
              name: register
            });

            registerIdentifiers.forEach((registerIdentifier) => {
              const isCallExpression =
                registerIdentifier.parent.value.type === 'CallExpression';

              /**
               * We filter `register` to keep only `ref`
               * @example
               *  <input ref={register} name="example" />
               *  <input ref={register()} name="example" />
               *  <input ref={register({ required: true })} name="example" />
               *  <input ref={registerCustomName({ required: true })} name="example" />
               * */
              if (
                registerIdentifier.parent.value.type !==
                  'JSXExpressionContainer' &&
                !isCallExpression
              ) {
                return;
              }

              const maybeJsxAttribute = isCallExpression
                ? registerIdentifier.parent.parent.parent
                : registerIdentifier.parent.parent;

              if (maybeJsxAttribute.value.name?.name !== 'ref') return;

              const jsxOpeningElement = j(maybeJsxAttribute.parentPath);
              // We search for all `name` attribute of the JSX element
              const nameAttributes = jsxOpeningElement.find(j.JSXAttribute, {
                name: { name: 'name' }
              });

              nameAttributes.forEach((nameAttribute) => {
                if (
                  nameAttribute.value.value.type !== 'Literal' &&
                  nameAttribute.value.value.type !== 'StringLiteral'
                ) {
                  return;
                }

                const name = nameAttribute.value.value.value;
                /**
                 *  Add name to register('name')
                 *                        ^
                 * */
                const args = [j.literal(name)];

                // If `register` have params, we add them to our new args
                if (isCallExpression) {
                  args.push(...registerIdentifier.parent.value.arguments);
                }

                /**
                 * Replace `name` attribute with the new `register` api and args
                 * @example
                 *  name="example" => {...register("example")}
                 * */
                j(nameAttribute).replaceWith(
                  j.jsxSpreadAttribute(
                    j.callExpression(j.identifier(register), args)
                  )
                );
              });

              // We remove the old `ref` attribute
              j(maybeJsxAttribute).remove();
            });
          });
      });
    });
  });

  return root.toSource(printOptions);
}
