
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { SettingsContext } from '../../context/Seettings.js'
import Button from 'react-bootstrap/Button'


import './list.scss'

function TodoList({ list, handleComplete, handleDelete }) {

  let context = useContext(SettingsContext)
  const [page, setPage] = useState(1);
  const [newList, setNewList] = useState(list)

  //handle completed
  const handleToggle = (e, settings) => {
    e.preventDefault()
    settings.updateCompleted(!settings.complete)
    displayComplete()

  }
  //handlesort
  const handleSort = (e, settings) => {
    e.preventDefault()
    settings.updateSort(e.target.value)
    listSort();
  }

  // setting item on page handler 
  const handleNumberItems = (e, settings) => {
    e.preventDefault()
    settings.updateNumber(e.target.numberItems.value)
    // console.log(settings.numberItems)
    pagination();
  }
  // switch page function 
  const switchPage = (e) => {
    if (e.target.innerText === 'previous') {
      if (page > 1) {
        setPage(page - 1)
        console.log('pagedes.....', page)
      }
    } else {
      setPage(page + 1)
      console.log('pagrincrement', page)
    }
  }
  


  const displayComplete = () => {
    if (context.completed === 'false') {
      setNewList(list)
    } else {
      setNewList(newList.filter(item => !item.completed))
    }
  }
  const listSort = () => {
    let param = context.sort;
    console.log(param);
    let nextList = newList.sort((a, b) => {
      if (a[context.sort] > b[context.sort]) {
        return 1;
      } else if (a[context.sort] < b[context.sort]) {
        return -1;
      } else
        return 0
    });
    setNewList(nextList);
  }

  const pagination = () => {
    if (newList[0]) {
      let nextList = [];
      console.log(list);

      let min = context.numberItems * (page - 1)
      let max = (context.numberItems * page);
      for (let i = min; i < max; i++) {
        // console.log(i);
        nextList.push(newList[i]);
      }
      // console.log(nextList);
      setNewList(nextList);
    }
  }



  useEffect(() => {
    setNewList(list);
  }, [list])


  return (
    <>
      <SettingsContext.Consumer>
        {settings => (
          <Card style={{ border: 'solid black', width: '50%', marginLeft: '20vw', marginTop: '30px' }}>
            <Card.Body>

              <div className="top">
                <label>  Display Completed
                  <Button style={{ marginLeft: '8px' }} size="sm" onClick={((e) => handleToggle(e, settings))}> {settings.completed}</Button>
                </label>
                {/* <label style={{ marginLeft: '4px' }}>
                Sort By
                </label> */}
                {/* <form className="numberofitems" onSubmit={((e) => handleNumberItems(e, settings))}>
              <input type="number" name="numberItems" required placeholder={settings.numberItems} ></input>
              <button className="ItemsonPage" type="submit">Items on Page</button>
             </form>  */}
                <select onChange={((e) => handleSort(e, settings))}>

                  <option value="difficulty">Sort By</option>
                  <option name="difficulty">Difficulty</option>
                  <option name="assignee" value="assignee">Assignee</option>
                  {/* <option name="text" value="text">Task</option> */}
                </select>

              </div>
              <label>Items on Page
                <input style={{ marginLeft: '8px', width: '5vw' }} onSubmit={(e) => handleNumberItems(e, settings)} type="number" name="numberItems" min="1" max={list.length} required placeholder={settings.numberItems} ></input>
              </label>

            </Card.Body>
          </Card>
        )}

      </SettingsContext.Consumer>
      <ListGroup style={{ width: '50%', marginLeft: '20vw', marginTop: '30px' }}>
        {list.map(item => (
          <Card key={item._id} style={{ width: '25rem', marginBottom: '4px' }}>
            <Card.Body>
              <Card.Title style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottom: '', height: '2.5vh' }}>
                <span className={item.complete === true ? "complete complete-pill" : "pending progress-pill"} onClick={() => handleComplete(item._id)}>{item.complete === true ? "Complete" : "Pending"}</span>
                <div>
                  <span className="assigned-person">{item.assignee}</span>
                </div>
                <button className="delete-button" onClick={() => handleDelete(item._id)}>
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
        <div className="flex-child">
          <Button size="sm" className="flex-child" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', color: "white", border: '0.1px solid black', width: "80px", height: '2.5vh' }} onClick={switchPage}>Previous</Button>
          <div className="pg-number">
            {page}
          </div>
          <Button className="flex-child" size="sm" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', color: "white", alignItems: 'center', border: " 0.1px solid black", width: "80px", height: '2.5vh' }} onClick={switchPage}>Next</Button>
        </div>

      </ListGroup>

    </>

  );

}

export default TodoList;




