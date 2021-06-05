import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'

function TodoList({ list, handleComplete }) {
  return (
    <ListGroup as="ul">
      {list.map(item => (
        <Card style={{ width: '35rem',height:'10rem' }}
        onClick={() => handleComplete(item._id)}
          key={item._id}
        >
          < p className={`{item.complete}`}>{item.complete.toString()}</p>
          <h4> Assigned {item.assignee}<span></span></h4>
           <p className="job">{item.text}</p> 
          <span> Difficulty:{item.difficulty}</span>
          
          </Card>
        // </ListGroup.Item>
      ))}
    </ListGroup>
  );
}
export default TodoList;