import { FileInfo, API } from 'jscodeshift';
import {
  findUseFormImportDeclarations,
  findUseFormDeclarators
} from '../../utils/getUseFormDeclarators';

/**
 * `move-errors-to-formState` codemod which transforms react-hook-form v6 register api to v7
 */
export default function transformer(file: FileInfo, api: API, options) {
  const j = api.jscodeshift;
  const root = j(file.source);
  const printOptions = options.printOptions || {
    quote: 'single',
    trailingComma: true
  };

  findUseFormImportDeclarations(root, j).forEach((useFormImportDeclaration) => {
    const useFormDeclarators = findUseFormDeclarators(
      root,
      j
    )(useFormImportDeclaration);

    if (!useFormDeclarators) {
      return;
    }

    useFormDeclarators.forEach((useFormDeclarator) => {
      /**
       * We search for all `errors` properties
       * @example
       *  const { errors } = useForm();
       *          ^
       * */
      const errorsProperties = j(useFormDeclarator).find(j.Identifier, {
        name: 'errors'
      });

      errorsProperties
        .filter((p) => p.name === 'key')
        .forEach((errorProperty) => {
          /**
           * Retrieve `errors` property name
           * @example
           *  const { errors } = useForm();
           *  const { errors: customErrors } = useForm();
           * */
          const error = errorProperty.parentPath.value;

          /**
           * We search for all `formState`
           * @example
           *  const { formState } = useForm();
           *  const { formState: customFormState } = useForm();
           * */
          const formStateProperties = j(useFormDeclarator).find(j.Identifier, {
            name: 'formState'
          });

          /**
           * If any `formState`, create one then add `errors`
           * @example
           *  const { formState: { errors } } = useForm();
           * */
          if (formStateProperties.length === 0) {
            if (useFormDeclarator.value.id.type === 'ObjectPattern') {
              useFormDeclarator.value.id.properties.push(
                j.property(
                  'init',
                  j.identifier('formState'),
                  j.objectPattern([error])
                )
              );
            }
          } else {
            formStateProperties.forEach((formStateProperty) => {
              if (formStateProperty.name !== 'key') {
                return;
              }

              /**
               * If `formState` is an object then add `errors`
               * @example
               *  const { formState: { isDirty, errors } } = useForm();
               *                                ^
               * */
              if (
                formStateProperty.parent.value.value.type === 'ObjectPattern'
              ) {
                formStateProperty.parentPath.value.value.properties.push(
                  error.value
                );
              } else if (
                formStateProperty.parentPath.value.value.type === 'Identifier'
              ) {
                /**
                 * If `formState` is a key, create a `const` after `useForm` declaration
                 * @example
                 *  const { formState } = useForm();
                 *  const { errors } = formState;
                 * */
                j(useFormDeclarator.parentPath.parentPath).insertAfter(
                  j.variableDeclaration('const', [
                    j.variableDeclarator(
                      j.objectPattern([error]),
                      j.identifier(
                        formStateProperty.parentPath.value.value.name
                      )
                    )
                  ])
                );
              }
            });
          }

          j(errorProperty.parentPath).remove();
        });
    });
  });

  return root.toSource(printOptions);
}
