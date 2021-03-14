import { useFormContext as useRenamedForm } from 'react-hook-form';

const Form = () => {
  const { register: customRegister } = useRenamedForm();

  return (
    <form>
      <input {...customRegister('example')} />
    </form>
  );
};

export default Form;
