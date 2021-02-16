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
      <input {...register('example', { required: true })} />
      <input {...register('example-2')} />
      <input {...register('example-3')} />
      <Input {...register('example-4')} />
      <input ref="useless-ref" name="example" />
    </form>
  );
};

export default Form;
