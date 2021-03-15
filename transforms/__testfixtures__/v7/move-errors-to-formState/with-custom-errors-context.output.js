import { useFormContext } from 'react-hook-form';

const Form = () => {
  const { formState: {
    errors: customErrors,
  } } = useFormContext();

  return (
    <form>
      <span>{customErrors.username.message}</span>
    </form>
  );
};

export default Form;
