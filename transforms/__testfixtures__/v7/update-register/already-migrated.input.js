import { useForm } from 'react-hook-form';

const Form = () => {
  const { register } = useForm();

  return (
    <form>
      <input {...register('example', { required: true })} />
      <input {...register('example-2')} />
      <input {...register('example-3')} />
      <input ref="useless-ref" name="example" />
    </form>
  );
};

export default Form;
