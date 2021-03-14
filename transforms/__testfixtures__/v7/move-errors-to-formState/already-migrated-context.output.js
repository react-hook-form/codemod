import { useFormContext } from 'react-hook-form';

const Form = () => {
  const { formState: {
    errors,
  } } = useFormContext();

  return (
    <form>
      <span>{errors.username.message}</span>
    </form>
  );
};

export default Form;
