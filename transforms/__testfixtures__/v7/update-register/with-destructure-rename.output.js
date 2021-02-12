import { useForm as useRenamedForm } from 'react-hook-form';

const Form = () => {
  const { register: renamedRegister } = useRenamedForm();

  return (
    <form>
      <input {...renamedRegister('example')} />
    </form>
  );
};

export default Form;
