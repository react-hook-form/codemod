import { useForm } from 'react-hook-form';

const Form = () => {
  const {
    formState,
  } = useForm();

  const {
    errors: customErrors,
  } = formState;

  const diry = formState.isDirty;

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
