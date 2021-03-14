import { useFormContext } from 'react-hook-form';

const Form = () => {
  const {
    formState,
  } = useFormContext();

  const {
    errors,
  } = formState;

  const diry = formState.isDirty;

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
