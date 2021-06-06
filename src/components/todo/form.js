import React from 'react';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import useForm from '../customHooks/useForm.js'


function TodoForm({addItem}) {
const [values, handleInputChange, handleSubmit] = useForm(addItem)

  // let [item, setItem ] = useState({})
  //   const handleInputChange = e => {
  //     setItem({item, [e.target.name]: e.target.value });
  //   };

  //  const  handleSubmit = (e) => {
  //     e.preventDefault();
  //     e.target.reset();
  //     addItem(item);

  //     setItem({});
  //   };


  return (
    <>
      <Card style={{ width: '25rem' }}>
        <h4>Add To Do Item</h4>
        <form onSubmit={handleSubmit}>
          <label>
            <span>To Do Item</span>
            <input data-testid="FORM"
              name="text"
              placeholder="Add To Do List Item"
              onChange={handleInputChange}
            />
          </label>
          <label>
            {/* <Form.Control type="email" placeholder="Enter email" /> */}
            <span>Difficulty Rating</span>
            < Form.Control defaultValue="1" type="range" min="1" max="5" name="difficulty" onChange={handleInputChange} />
          </label>
          <label>
            <span>Assigned To</span>
            <input type="text" name="assignee" placeholder="Assigned To" onChange={handleInputChange} />
          </label>
          <Button className="button" style={{ color: "white" }} variant="primary" type="submit">Add Item</Button>
        </form>
      </Card>
    </>
  );
}


export default TodoForm;


/* <Navbar className="toDoCount" style={{color:"white"}}bg="dark" variant="dark" >
To Do List Manager({list.filter(item => !item.complete).length})
</Navbar> */
