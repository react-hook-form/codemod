import { useForm } from 'react-hook-form';

const Form = () => {
  const { errors, formState: { isDirty } } = useForm();

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
