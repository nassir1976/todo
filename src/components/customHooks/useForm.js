import { useState} from 'react'

const useForm = (callback) =>{
  const [item,setItem]= useState({})
  const handleInputChange = e=>{
    setItem({...item,[e.target.name]:e.target.value})
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    // e.target.reset();
    callback(item);
    setItem({});
  }
  return [handleSubmit, handleInputChange , item];
}
export default useForm;



// import {useState} from 'react';

// const useForm = (callback) => {

//   const [item, setItem] = useState({});

//   function handleInputChange(e) {
//     e.persist();
//     let name = e.target.name;
//     let value = e.target.value;
//     setItem({ ...item, [name]: value });
//   }

//   function handleSubmit(e) {
//     e.preventDefault();
//     callback(item);
//   }

//   return [handleSubmit, handleInputChange, item];

// }

// export default useForm;





