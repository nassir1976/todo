
import { useState} from 'react';

// const useForm = (callback) => {
//   const [item, setItem] = useState({});
//   const handleInputChange = e => {
//     setItem({...item, [e.target.name]: e.target.value } );
//   };
  
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     e.target.reset();
//     callback(item);
//     setItem({});
//   };

// return[
//   handleInputChange,
//   handleSubmit
//   ]
// }


const useForm = (callback) => {
    const [values, setValue] = useState({});

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setValue({ ...values, [name]: value });
      }
    
      const handleSubmit = (e) => {
        e.preventDefault();
        e.target.reset();
        callback(values);
      }


      return [
        values,
        handleInputChange,
        handleSubmit
      ]

}


export default useForm;
