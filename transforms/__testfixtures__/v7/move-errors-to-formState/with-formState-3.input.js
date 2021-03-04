import { useForm } from 'react-hook-form';

const Form = () => {
  const { errors: customErrors, formState } = useForm();

  const diry = formState.isDirty;

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
