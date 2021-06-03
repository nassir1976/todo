import React,{useState} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

 function TodoList({list, handleComplete}){
    return (
      <ListGroup as="ul">
        {list.map(item => (
          <ListGroup.Item as="li"
            className={`complete-${item.complete.toString()}`}
            key={item._id}
          >
            <span onClick={() => handleComplete(item._id)}>
              {item.text} assigned Person {item.assignee}
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    );
  }
export default TodoList;