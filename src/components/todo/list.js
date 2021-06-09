import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card'
import './list.scss'

function TodoList({ list, handleComplete, handleDelete }) {


 
  return (
    <ListGroup style={{ border: 'solid black', width: '65%', marginLeft: '20vw', marginTop: '2vh' }}>
      {list.map(item => (
        <Card key={item._id} style={{ width: '25rem', marginBottom: '4px' }}>
          <Card.Body>
            <Card.Title style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '0.1px solid yellow', height: '2.5vh' }}>
              <span className={item.complete === true ?  "complete complete-pill" : "pending progress-pill"} onClick={() => handleComplete(item._id)}>{ item.complete === true ? "Complete" : "Pending"}</span>
              <span className="assigned-person">{item.assignee}</span>
              <button className="delete-button" style={{ color: 'red' }} onClick={() => handleDelete(item._id)}>
                X
              </button>
            </Card.Title>

            <Card.Text style={{ color: 'green', fontSize: '1.20rem' }}>
              {item.text}
            </Card.Text>
            <Card.Link href="#"></Card.Link>
            <Card.Text style={{ float: 'right', fontSize: '0.80rem' }}>Difficulty: {item.difficulty}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </ListGroup>
  );

}

export default TodoList;