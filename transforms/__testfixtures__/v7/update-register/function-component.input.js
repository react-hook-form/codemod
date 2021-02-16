import { useForm } from 'react-hook-form';

function Input() {
  return <input />;
}

const Form = () => {
  const { register } = useForm();

  useEffect(() => {
    register('example');
  }, [register]);

  return (
    <form>
      <input ref={register({ required: true })} name="example" />
      <input ref={register()} name="example-2" />
      <input ref={register} name="example-3" />
      <Input ref={register} name="example-4" />
      <input ref="useless-ref" name="example" />
    </form>
  );
};

export default Form;
