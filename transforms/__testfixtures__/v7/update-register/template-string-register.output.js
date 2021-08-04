import { useForm } from 'react-hook-form';

const id = 1;

const Form = () => {
  const { register } = useForm();

  useEffect(() => {
    register(`example.${id}`);
  }, [register]);

  return (
    <form>
      <input {...register(`example.${id}`, { required: true })} />
    </form>
  );
};

export default Form;
