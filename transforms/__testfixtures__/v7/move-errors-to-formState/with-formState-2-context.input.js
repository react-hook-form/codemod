import { useFormContext } from 'react-hook-form';

const Form = () => {
  const { errors, formState } = useFormContext();

  const diry = formState.isDirty;

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
