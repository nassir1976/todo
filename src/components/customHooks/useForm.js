import { useState} from 'react'

const useForm = (callback) => {

  const [values, setValue] = useState({});

  function handleInputChange(e) {
    e.persist();
    let {name, value} = e.target;
    // let value = e.target.value;
    setValue({ ...values, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.target.reset();
    callback(values);
  }

  return [values, handleInputChange, handleSubmit,];

}

export default useForm;





