import { FileInfo, API, ASTPath, VariableDeclarator } from 'jscodeshift';
import {
  findUseFormImportDeclarations,
  findUseFormDeclarators
} from '../../utils/getUseFormDeclarators';
import { REGISTER, USE_FORM_CONTEXT } from '../../utils/keys';

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

  const transformDeclaration = (
    useFormDeclarator: ASTPath<VariableDeclarator>
  ) => {
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
                nameAttribute.value.value.type !== 'StringLiteral' &&
                nameAttribute.value.value.type !== 'JSXExpressionContainer' // Handle template string case
              ) {
                return;
              }

              const name =
                nameAttribute.value.value.type === 'JSXExpressionContainer'
                  ? nameAttribute.value.value.expression
                  : j.literal(nameAttribute.value.value.value);

              /**
               *  Add name to register('name')
               *                        ^
               * */
              const args = [name];

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
  };

  findUseFormImportDeclarations(root, j).forEach((useFormImportDeclaration) => {
    const useFormDeclarators = findUseFormDeclarators(
      root,
      j
    )(useFormImportDeclaration);

    if (useFormDeclarators) {
      useFormDeclarators.forEach(transformDeclaration);
    }

    const useFormContextDeclarators = findUseFormDeclarators(
      root,
      j,
      USE_FORM_CONTEXT
    )(useFormImportDeclaration);

    if (useFormContextDeclarators) {
      useFormContextDeclarators.forEach(transformDeclaration);
    }
  });

  return root.toSource(printOptions);
}
