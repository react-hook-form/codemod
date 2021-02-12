import { useForm } from 'react-hook-form';

const Form = () => {
  const { register } = useForm();

  return (
    <form>
      <input ref={register({ required: true })} name="example" />
      <input ref={register()} name="example-2" />
      <input ref={register} name="example-3" />
      <input ref="useless-ref" name="example" />
    </form>
  );
};

export default Form;

export const Form2 = () => {
  const { register } = useForm();

  return (
    <form>
      <input ref={register({ required: true })} name="example" />
      <input ref={register()} name="example-2" />
      <input ref={register} name="example-3" />
      <input ref="useless-ref" name="example" />
    </form>
  );
};
