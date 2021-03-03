import { useForm } from 'react-hook-form';

const Form = () => {
  const {
    formState: {
      isDirty,
      errors,
    },
  } = useForm();

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
