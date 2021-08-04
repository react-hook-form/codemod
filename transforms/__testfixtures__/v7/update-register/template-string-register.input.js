import { useForm } from 'react-hook-form';

const id = 1;

const Form = () => {
  const { register } = useForm();

  useEffect(() => {
    register(`example.${id}`);
  }, [register]);

  return (
    <form>
      <input ref={register({ required: true })} name={`example.${id}`} />
    </form>
  );
};

export default Form;
