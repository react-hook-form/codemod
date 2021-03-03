import { useForm } from 'react-hook-form';

const Form = () => {
  const { formState: {
    errors,
  } } = useForm();

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
