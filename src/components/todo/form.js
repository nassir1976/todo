import React from 'react';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import useForm from '../customHooks/useForm.js'


function TodoForm({callback}) {
  const [handleInputChange, handleSubmit] = useForm(callback)


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



