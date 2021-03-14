import { useFormContext } from 'react-hook-form';

const Form = () => {
  const { errors: customErrors } = useFormContext();

  return (
    <form>
      <span>{customErrors.username.message}</span>
    </form>
  );
};

export default Form;
