<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/docs/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" width="300px" />
        </a>
    </p>
</div>

<p align="center">Performant, flexible and extensible forms with easy to use validation.</p>

<div align="center">

[![npm downloads](https://img.shields.io/npm/dm/@hookform/codemod.svg?style=for-the-badge)](https://www.npmjs.com/package/@hookform/codemod)
[![npm](https://img.shields.io/npm/dt/@hookform/codemod.svg?style=for-the-badge)](https://www.npmjs.com/package/@hookform/codemod)
[![npm](https://img.shields.io/bundlephobia/minzip/@hookform/codemod?style=for-the-badge)](https://bundlephobia.com/result?p=@hookform/codemod)

</div>

## Goal

Migrate your React Hook Form codebase from older version to new without the hassle by using our codemod scripts

## Usage

`npx @hookform/codemod <transform> <path> [...options]`

- `transform` - name of transform, see available transforms below.
- `path` - files or directory to transform
- use the `--dry` option for a dry-run and use `--print` to print the output for comparison

This will start an interactive wizard, and then run the specified transform.

## Included transforms

### Migrate from V6 to V7

#### `v7/update-register`

Update the `register` API inside a component that use `useForm` of React Hook Form. This transform is not applied if the component doesn't use `useForm`.

    npx @hookform/codemod v7/update-register

<details>
    <summary>Examples</summary>

```diff
- <input ref={register} name="example" />
+ <input {...register('example')} />

- <input ref={register()} name="example" />
+ <input {...register('example')} />

- <input ref={register()} name="example" />
+ <input {...register('example')} />

- <input ref={register({ required: true })} name="example" />
+ <input {...register('example', { required: true })} />

- <TextInput ref={register({ required: true })} name="example" />
+ <TextInput {...register('example', { required: true })} />
```

With a custom `register` name

```diff
    function MyForm() {
      const { register: customRegister } = useForm();

      return (
        <form>
-         <input ref={customRegister} name="example" />
+         <input {...customRegister('example')} />
        </form>
      );
    }
```

</details>

#### `v7/move-errors-to-formState`

It moves `errors` API into `formState` inside a component that use `useForm` of React Hook Form. This transform is not applied if the component doesn't use `useForm`.

    npx @hookform/codemod v7/move-errors-to-formState

<details>
    <summary>Examples</summary>

```diff
- const { errors } = useForm();
+ const { formState: { errors } } = useForm();

- const { errors: customErrors } = useForm();
+ const { formState: { errors: customErrors } } = useForm();

- const { errors, formState: { isDirty } } = useForm();
+ const { formState: { isDirty, errors } } = useForm();

- const { errors: customErrors, formState: { isDirty } } = useForm();
+ const { formState: { isDirty, errors: customErrors } } = useForm();
```

With a custom `register` name

```diff
    function MyForm() {
-     const { errors, formState } = useForm();
+     const { formState } = useForm();
+     const { errors } = formState;

      const isDirty = formState.isDirty;

      return (
        //
      );
    }
```

</details>

## Backers

Thanks goes to all our backers! [[Become a backer](https://opencollective.com/react-hook-form#backer)].

<a href="https://opencollective.com/react-hook-form#backers">
    <img src="https://opencollective.com/react-hook-form/backers.svg?width=950" />
</a>

## Organizations

Thanks goes to these wonderful organizations! [[Contribute](https://opencollective.com/react-hook-form/contribute)].

<a href="https://github.com/react-hook-form/react-hook-form/graphs/contributors">
    <img src="https://opencollective.com/react-hook-form/organizations.svg?width=950" />
</a>

## Contributors

Thanks goes to these wonderful people! [[Become a contributor](CONTRIBUTING.md)].

<a href="https://github.com/react-hook-form/react-hook-form/graphs/contributors">
    <img src="https://opencollective.com/react-hook-form/contributors.svg?width=950" />
</a>
