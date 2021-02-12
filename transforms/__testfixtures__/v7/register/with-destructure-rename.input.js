import { useForm as useRenamedForm } from 'react-hook-form';

const Form = () => {
  const { register: renamedRegister } = useRenamedForm();

  return (
    <form>
      <input ref={renamedRegister} name="example" />
    </form>
  );
};

export default Form;
